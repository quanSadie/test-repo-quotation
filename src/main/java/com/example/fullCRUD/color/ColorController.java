package com.example.fullCRUD.color;

import com.example.fullCRUD.user.AppUser;
import com.example.fullCRUD.user.MyUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ColorController {

	@Autowired
	private final ColorService colorService;

	public ColorController(ColorService colorService) {
		this.colorService = colorService;
	}

	// ---------------------------------------------------------------------------------------
	// Go to update
	@RequestMapping("/editcolor/{id}")
	public ModelAndView showUpdateColorPage(@PathVariable(name = "id") int id) {
		ModelAndView mav = new ModelAndView("colorUpdate");
		Color color = colorService.get(id);
		mav.addObject("color", color);
		return mav;
	}

	// ---------------------------------------------------------------------------------------
	// Save the color data to database
	@PostMapping("/savecolor")
	public String saveColor(@ModelAttribute("color") Color color, Authentication authentication) {
		MyUserDetails userdetails = (MyUserDetails) authentication.getPrincipal();
		AppUser currentUser = userdetails.getUser();
		color.setCompany_id(currentUser.getCompany_id());
		colorService.save(color);
		return "redirect:papersList";
	}

	@RequestMapping("/deletecolor/{id}")
	public String deleteProduct(@PathVariable(name = "id") int id) {
		colorService.delete(id);
		return "delete_message";
	}

}
