package com.example.fullCRUD.user;

import java.util.List;
import java.util.Set;

import com.example.fullCRUD.company.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class AppController {

	@Autowired
	private UserService userService;

	@Autowired
	private CompanyService companyService;

	@GetMapping("/403")
	public String accessDenied() {
		return "403";
	}

	// View home page
	@GetMapping("")
	public String showHomePage(Model model) {
		return "redirect:/quotation";
	}

	// redirect to registration or login
	@GetMapping("/login")
	public String showLoginForm(Model model) {
		model.addAttribute("user", new AppUser());

		return "login";
	}

	// Handle registration
	@RequestMapping("/add_user_to_my_company")
	public String goToAddUser(Model model) {
		model.addAttribute("user", new AppUser());
		model.addAttribute("company_list", companyService.getCompanyList());
		List<Role> listRoles = userService.getRolesCompany();
		model.addAttribute("listRoles", listRoles);
		return "add_to_current_company";
	}

	@PostMapping("/process_register")
	public @ResponseBody String processRegister(AppUser user, Authentication authentication) {
		MyUserDetails userdetails = (MyUserDetails) authentication.getPrincipal();
		AppUser currentUser = userdetails.getUser();
		String state = "";

		// for super admin add user
		// -----------------------
		Set<Role> roles = currentUser.getRoles();
		for (Role role : roles) {
			if (role.getName().equals("SUPER_ADMIN")) {
				state = userService.checkUser(user, user.getCompany_id());
				return state;
			}
		}
		state = userService.checkUser(user, currentUser.getCompany_id());
		// ------------------------
		return state;
	}

	// Go to users list
	@GetMapping("/users")
	public String processToUsers(Model model, Authentication authentication) {
		MyUserDetails userdetails = (MyUserDetails) authentication.getPrincipal();
		AppUser currentUser = userdetails.getUser();
		Set<Role> roles = currentUser.getRoles();
//		List<AppUser> listUsers = userService.findAllByRole("USER");
		List<AppUser> listUsers = userService.findAllByRoleAndCompany("USER", currentUser.getCompany_id());
		listUsers.addAll(userService.findAllByRoleAndCompany("ACCOUNT", currentUser.getCompany_id()));
		listUsers.addAll(userService.findAllByRoleAndCompany("PRODUCTION_MANAGER", currentUser.getCompany_id()));
		for (Role role : roles) {
			if (role.getName().equals("SUPER_ADMIN")) {
				listUsers = userService.listAll();
			}
		}
		for (int i = 0; i < listUsers.size(); i++) {
			Set<Role> this_roles = listUsers.get(i).getRoles();
			for (Role role : this_roles) {
				if (role.getName().equals("SUPER_ADMIN")) {
					listUsers.remove(i);
				}
			}
		}
//		model.addAttribute("allusers", listUsers);
//		List<AppUser> listUsers = userService.listAll();
		model.addAttribute("listUsers", listUsers);

		return "users";
	}

	// Change user info
	@GetMapping("/edituser/{id}")
	public String editUser(@PathVariable("id") Long id, Model model) {
		AppUser user = userService.get(id);
		List<Role> listRoles = userService.getRoles();
		model.addAttribute("user", user);
		model.addAttribute("listRoles", listRoles);
		return "user_form";
	}

	// Save change role
	@PostMapping("/saveuser")
	public String saveUser(AppUser user) {
		userService.save(user);
		return "redirect:/users";
	}

	@PostMapping("/saveuser_company")
	public String saveUserCompany(AppUser user) {

		userService.saveCompany(user);
		return "redirect:/users";
	}

	// Get current user's profile
	@RequestMapping("/userprofile")
	public String getUserProfile(Model model, Authentication authentication) {
		MyUserDetails user = (MyUserDetails) authentication.getPrincipal();
		AppUser appUser = new AppUser();
		model.addAttribute("currentuser", user);
		model.addAttribute("currentpw", appUser);
		return "user-profile";
	}

	@PostMapping("/changepw")
	public @ResponseBody String savenewpw(AppUser appUser, Authentication authentication) {
		MyUserDetails userdetails = (MyUserDetails) authentication.getPrincipal();
		AppUser currentUser = userdetails.getUser();
		if (appUser.getPassword().length() < 6) {
			return "Password should be at least 6 characters!";
		}
		userService.updatePassword(currentUser, appUser.getPassword());
		return "Password Updated";
	}

}
