package com.example.fullCRUD.paper;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import com.example.fullCRUD.prop.PropertiesRepository;
import com.example.fullCRUD.prop.PropertiesService;
import com.example.fullCRUD.user.AppUser;
import com.example.fullCRUD.user.MyUserDetails;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import com.example.fullCRUD.color.Color;
import com.example.fullCRUD.color.ColorService;

@Controller
@RequiredArgsConstructor
public class PaperController {

	@Autowired
	private final PaperService service;
	@Autowired
	private final PaperTypeService pService;
	@Autowired
	private final ColorService colorService;
	@Autowired
	private final PaperGrammageReposistory paperGrammageReposistory;
	@Autowired
	private final PropertiesRepository propertiesRepository;
	@RequestMapping("/papersList")
	public String viewPaperList(Model model, Authentication authentication) {
		MyUserDetails userdetails = (MyUserDetails) authentication.getPrincipal();
		AppUser currentUser = userdetails.getUser();
		List<Color> colorlist = colorService.listAll(currentUser.getCompany_id());
		List<PaperCategory> listPaper = service.allPapersCompany(currentUser.getCompany_id());
		model.addAttribute("papercompanies", listPaper);
		model.addAttribute("colorlist", colorlist);
		model.addAttribute("newpapertype",new PaperType()); // add new paper --- need modification
		return "papers";
	}

	// ---------------------------------------------------------------------------------------
	// Save the paper data to database
	@PostMapping("/savepaper")
	public String savePaper(@ModelAttribute("paper") PaperType pptype, Authentication authentication) {
//		MyUserDetails userdetails = (MyUserDetails) authentication.getPrincipal();
//		AppUser currentUser = userdetails.getUser();
//		Long companyId = currentUser.getCompany().getId()
//
//		UserPaperID userPaper = new UserPaperID(currentUser, pptype);
//		UserOverridePaper userOverridePaper = new UserOverridePaper(userPaper, pptype.getPrice(), pptype.getWidth(), pptype.getLength(),
//				pptype.getPerReamPackage(), pptype.getPricePerCuts(), pptype.getCut(), pptype.getLengthAfterCut(),
//				pptype.getDigitalWidth(), pptype.getDigitalLength(), pptype.getInchesWidth(),
//				pptype.getInchesLength(), pptype.getInchesLengthAfterCut(), pptype.getInchesSquare(),
//				pptype.getInchesSquareAfterCut(), pptype.getA3SquareInches(), pptype.getMaxUpForBooks());
//		userOverridePaperService.saveForAllUsersWithSameCompanyId(userOverridePaper, companyId);
		pService.save(pptype);
		return "redirect:papersList";
	}

	// ---------------------------------------------------------------------------------------
	// Go to update
	@Transactional
	@RequestMapping("/editpaper/{id}")
	public ModelAndView showUpdatePaperPage(@PathVariable(name = "id") Long id) {
		ModelAndView mav = new ModelAndView("paperTypeUpdate");
		mav.addObject("props", propertiesRepository.findAll());
		PaperType paper = pService.get(id);
		mav.addObject("paper", paper);
		return mav;
	}

	// ---------------------------------------------------------------------------------------

	// ---------------------------------------------------------------------------------------
	// Go to delete
	@Transactional
	@RequestMapping("/deletepaper/{id}")
	public String deleteProduct(@PathVariable(name = "id") Long id) {
		pService.delete(id);
		return "delete_message";
	}

	// ---------------------------------------------------------------------------------------
	// Export to excel
	@GetMapping("papers/export/excel")
	public void exportToExcel(HttpServletResponse response, Authentication authentication) throws IOException {
		response.setContentType("application/octet-stream");
		MyUserDetails userdetails = (MyUserDetails) authentication.getPrincipal();
		AppUser currentUser = userdetails.getUser();
		String headerKey = "Content-Disposition";
		String headerValue = "attachment; filename=papers_" + "price" + ".xlsx";
		response.setHeader(headerKey, headerValue);

		// export paper type
		List<PaperCategory> pc = service.allPapersCompany(currentUser.getCompany_id());

		ExportPaper excelExporter = new ExportPaper(pc);

		excelExporter.export(response);
	}

	@GetMapping("/addpaper")
	public String addNewPaper(Model model, Authentication authentication) {
		MyUserDetails userdetails = (MyUserDetails) authentication.getPrincipal();
		AppUser currentUser = userdetails.getUser();
		model.addAttribute("paperCat", new PaperCategory());
		model.addAttribute("paperGram", new PaperGrammage());
		model.addAttribute("paperTyp", new PaperType());
		model.addAttribute("props", propertiesRepository.findAll());
		model.addAttribute("existedpapercat", service.allPapersCompany(currentUser.getCompany_id()));
//		model.addAttribute("existedpapergram", paperGrammageReposistory.findAllPaperByCompany(currentUser.getCompany_id()));
//		model.addAttribute("existedpapergram", paperGrammageReposistory.findAll());
		return "add_paper_form";
	}

	@Transactional
	@PostMapping("/newpapercategory")
	public @ResponseBody List<PaperCategory> addNewPaperCategory(PaperCategory paperCategory, Authentication authentication) {
		MyUserDetails userdetails = (MyUserDetails) authentication.getPrincipal();
		AppUser currentUser = userdetails.getUser();
		service.saveByCompany(paperCategory);
		return service.allPapersCompany(currentUser.getCompany_id());
	}


	@Transactional
	@GetMapping("/displayppcats")
	public String displayppcats(Model model, Authentication authentication) {
		MyUserDetails userdetails = (MyUserDetails) authentication.getPrincipal();
		AppUser currentUser = userdetails.getUser();
		model.addAttribute("papercategories", service.allPapersCompany(currentUser.getCompany_id()));
		return "display_paper_category";
	}


	@Transactional
	@PostMapping("/newpapergrammage")
	public @ResponseBody List<PaperGrammage> addNewPaperGrammage(PaperGrammage paperGrammage, Authentication authentication) {
		paperGrammageReposistory.save(paperGrammage);
		MyUserDetails userdetails = (MyUserDetails) authentication.getPrincipal();
		AppUser currentUser = userdetails.getUser();
		List<PaperCategory> pclist = service.allPapersCompany(currentUser.getCompany_id());
		List<PaperGrammage> list = new ArrayList<PaperGrammage>();
		for (PaperCategory category : pclist) {
			list.addAll(category.getPgList());
		}
		return list;
	}

	@Transactional
	@PostMapping("/newpapertype")
	public @ResponseBody String addNewPaperType(PaperType paperType) {
//		pService.save(paperType);
		paperType.setIsEnable(true);
		pService.save(paperType);
//		paperTypeRepository.save(paperType);
		return "Succeed!";
	}

	@Transactional
	@RequestMapping("/editordeletepapercategory/{id}")
	public ModelAndView showUpdatePaperCategoryPage(@PathVariable(name = "id") Long id) {
		ModelAndView mav = new ModelAndView("paperCategoryUpdate");
		PaperCategory paper = service.get(id);
		mav.addObject("paper", paper);
		return mav;
	}

	@Transactional
	@PostMapping("/savepapercat")
	public @ResponseBody String savePaperCat(PaperCategory paperCategory) {
		service.saveByCompany(paperCategory);
		return paperCategory.getCategory();
	}

	@Transactional
	@RequestMapping("/deletepapercategory/{id}")
	public String deletePaperCat(@PathVariable(name = "id") Long id) {
//		List<PaperGrammage> ppg = service.get(id).getPgList();
//		for (int i = 0; i < ppg.size(); i++) {
//			for (int j = 0; j < ppg.get(i).getPtList().size(); i++) {
//				pService.delete(ppg.get(i).getPtList().get(j).getId());
//			}
//			paperGrammageReposistory.deleteById(ppg.get(i).getId());
//		}
		service.delete(id);
		return "delete_message";
	}


	@Transactional
	@GetMapping("/displayppgrams")
	public String displayppgrams(Model model, Authentication authentication) {
//		model.addAttribute("papergrams", paperGrammageReposistory.findAllPaperByCompany(currentUser.getCompany_id()));
		MyUserDetails userdetails = (MyUserDetails) authentication.getPrincipal();
		AppUser currentUser = userdetails.getUser();
		List<PaperCategory> pclist = service.allPapersCompany(currentUser.getCompany_id());
		List<PaperGrammage> list = new ArrayList<PaperGrammage>();
		for (PaperCategory category : pclist) {
			list.addAll(category.getPgList());
		}
		model.addAttribute("papergrams", list);
		return "display_paper_gram";
	}

	@Transactional
	@RequestMapping("/editordeletepapergrammage/{id}")
	public ModelAndView showUpdatePaperGrammagePage(@PathVariable(name = "id") Long id) {
		ModelAndView mav = new ModelAndView("PaperGrammageUpdate");
		PaperGrammage paper = paperGrammageReposistory.findById(id).get();
		mav.addObject("paper", paper);
		return mav;
	}
	@Transactional
	@PostMapping("/savepapergramm")
	public @ResponseBody String savePaperGramm(PaperGrammage paperGrammage) {
		paperGrammageReposistory.save(paperGrammage);
		return paperGrammage.getGrammage();
	}

	@Transactional
	@RequestMapping("/deleteppgramm/{id}")
	public String deletePaperGramm(@PathVariable(name = "id") Long id) {
//		List<PaperType> ppt = paperGrammageReposistory.findById(id).get().getPtList();
//		for (int i = 0; i < ppt.size(); i++) {
//			pService.delete(ppt.get(i).getId());
//		}
		paperGrammageReposistory.deleteById(id);
		return "delete_message";
	}
}
