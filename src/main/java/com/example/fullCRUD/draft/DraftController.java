package com.example.fullCRUD.draft;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import com.example.fullCRUD.paper.PaperGrammageReposistory;
import com.example.fullCRUD.paper.PaperService;
import com.example.fullCRUD.paper.PaperTypeService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.example.fullCRUD.user.AppUser;
import com.example.fullCRUD.user.MyUserDetails;
import com.example.fullCRUD.user.UserService;
import com.lowagie.text.DocumentException;

@Controller
@RequestMapping("/")
@Secured({"ADMIN", "SUPER_ADMIN"})
@RequiredArgsConstructor
public class DraftController {
    @Autowired
    private DraftService draftService;

    @Autowired
    private UserService userService;

    @Autowired
    private final PaperTypeService paperTypeService;

    @Autowired
    private final PaperGrammageReposistory paperGrammageReposistory;

    @Autowired
    private final PaperService paperService;

    @PostMapping("/newdraft")
    public @ResponseBody String AddDraft(Draft draft, Authentication authentication) {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        MyUserDetails user = (MyUserDetails) authentication.getPrincipal();
        draft.setUser_id(user.getAppUserID());
        draft.setSave_date(dtf.format(now));
        draft.setPending(true);
        draft.setState("Pending");
        draft.setPaid("Pending");
        if (draft.getFinal_selling_price() == null) {
            return "Error";
        } else {
            draftService.save(draft);
            return "Success";
        }
    }

    @RequestMapping(value = "/deletedraft/{id}")
    public String delete_draft(@PathVariable(name = "id") Long id) {
        draftService.delete(id);
        return "draft_delete";
    }

    @GetMapping(value = "/rejectdraft/{id}/{reason}")
    public @ResponseBody String reject_draft(@PathVariable(name = "id") Long id, @PathVariable(name = "reason") String reason) {
//		long id = Long.parseLong(params.get("id").toString());
//		String reason = (String) params.get("reason");
        Draft draft = draftService.get(id);
        if (draft.getState().equals("Approved") && draft.getPaid().equals("Approved")) {
            draft.setPending(false);
        } else draft.setPending(!draft.getState().equals("Rejected") || !draft.getPaid().equals("Rejected"));

        if (draft.getState() != null) {
            draft.setReason(draft.getReason() + ", " + reason);
        } else {
            draft.setReason(reason);
        }
        draft.setState("Rejected");
        draftService.save(draft);
        return "Success";
    }

    @RequestMapping(value = "/draft_save")
    public String draft_page(Model model, Authentication authentication) {
        List<Draft> drafts;
        MyUserDetails user = (MyUserDetails) authentication.getPrincipal();
        drafts = draftService.listAllOfUser(user.getAppUserID());
        model.addAttribute("drafts", drafts);
        return "drafts_saved";
    }

    @RequestMapping(value = "/draft/export/quote/{id}")
    public void export_draft_pdf(@PathVariable(name = "id") Long id, HttpServletResponse response,
                                 Authentication authentication) throws DocumentException, IOException {
        response.setContentType("application/pdf");
//		DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
//		String currentDateTime = dateFormatter.format(new Date());
        Draft draft = draftService.get(id);
        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=" + draft.getTitle() + "_" + userService.get(draft.getUser_id()).getFullName() + ".pdf";
        response.setHeader(headerKey, headerValue);

        if (!draft.getQuantity_per_design().contains("&&&Quantity")) {
            PDF_Quote exporter = new PDF_Quote(draft, paperTypeService, paperGrammageReposistory, paperService, userService);
            exporter.export(response);
        } else {
            PDF_Quote_Multiple exporter = new PDF_Quote_Multiple(draft, paperTypeService, paperGrammageReposistory, paperService, userService);
            exporter.export(response);
        }

    }

    @RequestMapping(value = "/draft/export/jobsheet/{id}")
    public void export_jobsheet_pdf(@PathVariable(name = "id") Long id, HttpServletResponse response,
                                    Authentication authentication) throws DocumentException, IOException {
        response.setContentType("application/pdf");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String currentDateTime = dateFormatter.format(new Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=jobsheet_" + currentDateTime + ".pdf";
        response.setHeader(headerKey, headerValue);

        Draft draft = draftService.get(id);
        PDF_Export_Draft pdfExport = new PDF_Export_Draft(draft, userService);
        pdfExport.export(response);
    }

    @RequestMapping(value = "/confirm_draft/{id}")
    public String confirmDraft(@PathVariable(name = "id") String id, Model model) {
        Draft draft = new Draft();
        if (NumberUtils.isCreatable(id)) {
            long draftId = Long.parseLong(id);
            draft = draftService.get(draftId);
            draft.setState("Approved");
            if (draft.getState().equals("Approved") && draft.getPaid().equals("Approved")) {
                draft.setPending(false);
            } else draft.setPending(!draft.getState().equals("Rejected") || !draft.getPaid().equals("Rejected"));
            draftService.save(draft);
        }
        String name = userService.get(draft.getUser_id()).getFullName();
        model.addAttribute("fullname", name);
        return "confirmed_drafts";
    }

    @RequestMapping(value = "/confirm_draft_account/{id}")
    public String confirmDraft_account(@PathVariable(name = "id") String id, Model model) {
        Draft draft = new Draft();
        if (NumberUtils.isCreatable(id)) {
            long draftId = Long.parseLong(id);
            draft = draftService.get(draftId);
            draft.setPaid("Approved");
            if (draft.getState().equals("Approved") && draft.getPaid().equals("Approved")) {
                draft.setPending(false);
            } else draft.setPending(!draft.getState().equals("Rejected") || !draft.getPaid().equals("Rejected"));
            draftService.save(draft);
        }
        String name = userService.get(draft.getUser_id()).getFullName();
        model.addAttribute("fullname", name);
        return "confirmed_drafts";
    }

    @GetMapping(value = "/rejectdraft_account/{id}/{reason}")
    public @ResponseBody String reject_draft_account(@PathVariable(name = "id") Long id, @PathVariable(name = "reason") String reason) {
//		long id = Long.parseLong(params.get("id").toString());
//		String reason = (String) params.get("reason");
        Draft draft = draftService.get(id);
        if (draft.getState().equals("Approved") && draft.getPaid().equals("Approved")) {
            draft.setPending(false);
        } else draft.setPending(!draft.getState().equals("Rejected") || !draft.getPaid().equals("Rejected"));

        if (draft.getState() != null) {
            draft.setReason(draft.getReason() + ", " + reason);
        } else {
            draft.setReason(reason);
        }
        draft.setPaid("Rejected");
        draftService.save(draft);
        return "Success";
    }

    @RequestMapping(value = "/pending_drafts")
    public String pendingdraftpage(Model model, Authentication authentication) {
        MyUserDetails userdetails = (MyUserDetails) authentication.getPrincipal();
        AppUser currentUser = userdetails.getUser();
        List<Draft> drafts = new ArrayList<Draft>();
        drafts = draftService.listAll();
        List<Draft> pendingdraft = new ArrayList<Draft>();
        for (Draft draft : drafts) {
            if (draft.isPending() && !draft.getState().equals("Rejected") && !draft.getState().equals("Approved")) {
                pendingdraft.add(draft);
            }
        }
        Map<String, Draft> user_draft = new HashMap<String, Draft>();
        for (Draft draft : pendingdraft) {
            if (userService.get(draft.getUser_id()).getCompany().getId().equals(currentUser.getCompany().getId())) {
                String user_fullname = userService.get(draft.getUser_id()).getFullName();
                user_draft.put(user_fullname + " at " + draft.getSave_date(), draft);
            }
        }

        List<Draft> approved_draft = new ArrayList<Draft>();
        for (Draft draft : drafts) {
            if (!draft.isPending()) {
                approved_draft.add(draft);
            }
        }
        Map<String, Draft> user_draft_approved = new HashMap<String, Draft>();
        for (Draft draft : approved_draft) {
            if (userService.get(draft.getUser_id()).getCompany().getId().equals(currentUser.getCompany().getId())) {
                String user_fullname = userService.get(draft.getUser_id()).getFullName();
                user_draft_approved.put(user_fullname + " at " + draft.getSave_date(), draft);
            }
        }
        model.addAttribute("pendingdrafts", user_draft);
        model.addAttribute("approveddrafts", user_draft_approved);
        return "pending_draft";
    }

    @RequestMapping(value = "/pending_drafts_account")
    public String pendingdraftpage_account(Model model, Authentication authentication) {
        MyUserDetails userdetails = (MyUserDetails) authentication.getPrincipal();
        AppUser currentUser = userdetails.getUser();
        List<Draft> drafts = new ArrayList<Draft>();
        drafts = draftService.listAll();
        List<Draft> pendingdraft = new ArrayList<Draft>();
        for (Draft draft : drafts) {
            if (draft.isPending() && !draft.getPaid().equals("Rejected") && !draft.getPaid().equals("Approved")) {
                pendingdraft.add(draft);
            }
        }
        Map<String, Draft> user_draft = new HashMap<String, Draft>();
        for (Draft draft : pendingdraft) {
            if (userService.get(draft.getUser_id()).getCompany().getId().equals(currentUser.getCompany().getId())) {
                String user_fullname = userService.get(draft.getUser_id()).getFullName();
                user_draft.put(user_fullname + " at " + draft.getSave_date(), draft);
            }
        }
        model.addAttribute("pendingdrafts", user_draft);
        return "account_confirm_draft";
    }

    @GetMapping("/api/draftCount")
    public @ResponseBody Integer getDraftCount(Authentication authentication) {
        MyUserDetails userdetails = (MyUserDetails) authentication.getPrincipal();
        AppUser currentUser = userdetails.getUser();
        return draftService.getDraftCount(currentUser.getCompany().getId());
    }


    @RequestMapping(value = "/userpendingdraft/{id}")
    public String currentUserDraft(@PathVariable(name = "id") String id, Model model) {
        AppUser user = new AppUser();
        if (NumberUtils.isCreatable(id)) {
            long userID = Long.parseLong(id);
            user = userService.get(userID);
        }
        model.addAttribute("userpendingdrafts", user);
        return "pending-user-profile";
    }
}
