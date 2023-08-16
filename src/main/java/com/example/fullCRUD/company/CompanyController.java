package com.example.fullCRUD.company;

import com.example.fullCRUD.color.Color;
import com.example.fullCRUD.color.ColorService;
import com.example.fullCRUD.user.AppUser;
import com.example.fullCRUD.user.MyUserDetails;
import com.example.fullCRUD.user.Role;
import com.example.fullCRUD.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Iterator;
import java.util.List;
import java.util.Set;

@Controller
@RequiredArgsConstructor
public class CompanyController {

    @Autowired
    private final CompanyService companyService;

    @Autowired
    private final UserService appUserService;

    @Autowired
    private final ColorService colorService;

    @RequestMapping("/addcompany")
    public String addCompany(Model model) {
        model.addAttribute("company", new Company());
        return "add_company";
    }

    @PostMapping("/save_company")
    public @ResponseBody String saveCompany(Company company) {
        companyService.addCompany(company);
        Color color1 = new Color();
        Color color2 = new Color();
        Color color3 = new Color();
        Color color4 = new Color();
        Color color5 = new Color();
        List<Company> cs = companyService.getCompanyList();
        for (Company c : cs) {
            if (c.getCompany_name().equals(company.getCompany_name())){

                color1.setColor_name("1C");
                color1.setPlatecost(30);
                color1.setCompany_id(c.getId());
                colorService.save(color1);

                color2.setColor_name("4C");
                color2.setPlatecost(110);
                color2.setCompany_id(c.getId());
                colorService.save(color2);

                color3.setColor_name("1C+1C");
                color3.setPlatecost(30);
                color3.setCompany_id(c.getId());
                colorService.save(color3);

                color4.setColor_name("4C+4C");
                color4.setPlatecost(110);
                color4.setCompany_id(c.getId());
                colorService.save(color4);

                color5.setColor_name("4C+1C");
                color5.setPlatecost(110);
                color5.setCompany_id(c.getId());
                colorService.save(color5);
            }
        }
        return "Company added successfully!";
    }

    @RequestMapping("/add_into_company/{id}") // TODO: Add path variable
    public String addIntoCompany(Model model, @PathVariable(name = "id") Long id) {

        model.addAttribute("user_to_add", appUserService.get(id));
        model.addAttribute("user_to_add_id", id);
        model.addAttribute("company_list", companyService.getCompanyList());
        return "add_to_company";
    }
}
