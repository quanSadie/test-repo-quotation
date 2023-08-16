package com.example.fullCRUD.prop;

import java.text.Collator;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import com.example.fullCRUD.user.AppUser;
import com.example.fullCRUD.user.MyUserDetails;
import com.example.fullCRUD.user_and_prop.UserOverride;
import com.example.fullCRUD.user_and_prop.UserOverrideRepository;
import com.example.fullCRUD.user_and_prop.UserOverrideService;
import com.example.fullCRUD.user_and_prop.UserPropertyId;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequiredArgsConstructor
public class PropertiesController {

	@Autowired
	private final PropertiesService propertiesService;

	@Autowired
	private final UserOverrideRepository userOverrideRepository;

	@Autowired
	private final UserOverrideService userOverrideService;

	@GetMapping("/finishingProps")
	public String processToQuotation(Model model, Authentication authentication) {
		MyUserDetails userdetails = (MyUserDetails) authentication.getPrincipal();
		AppUser currentUser = userdetails.getUser();
		List<Properties> finishingProps = propertiesService.listAllofUser(currentUser.getAppUserId());
		finishingProps.sort(new Comparator<Properties>() {
			@Override
			public int compare(Properties prop1, Properties prop2) {
				return prop1.getProperty().compareTo(prop2.getProperty());
			}
		});
		List<String> formattedNumbers = new ArrayList<>();
		for (Properties number : finishingProps) {
			String formattedNumber;
			if (Math.abs(number.getNumber()) < 1e-3) {
				formattedNumber = String.format("%.5f", number.getNumber());
			} else {
				formattedNumber = String.valueOf(number.getNumber());
			}
			formattedNumbers.add(formattedNumber);
		}
		model.addAttribute("formattedNumbers", formattedNumbers);
		model.addAttribute("finishingprops", finishingProps);
		return "finishing";
	}

	// ---------------------------------------------------------------------------------------
	// Go to update
	@RequestMapping("/editprops/{id}")
	public ModelAndView showUpdatePropPage(@PathVariable(name = "id") int id, Authentication authentication) {
		MyUserDetails userdetails = (MyUserDetails) authentication.getPrincipal();
		AppUser currentUser = userdetails.getUser();
		ModelAndView mav = new ModelAndView("propUpdate");
		Properties properties = propertiesService.getOverride(id, currentUser.getAppUserId());
		mav.addObject("properties", properties);
		return mav;
	}

	// Save the data to database
	@PostMapping("/saveprop")
	public String saveProp(@ModelAttribute("properties") Properties properties, Authentication authentication) {
		MyUserDetails userdetails = (MyUserDetails) authentication.getPrincipal();
		AppUser currentUser = userdetails.getUser();
		Long companyId = currentUser.getCompany().getId();
		UserPropertyId id = new UserPropertyId(currentUser, properties);
		UserOverride userOverride = new UserOverride(id, properties.getNumber());
		userOverrideService.saveForAllUsersWithSameCompanyId(userOverride, companyId);
//		userOverrideRepository.save(userOverride);
//		propertiesService.save(properties);
		return "redirect:finishingProps";
	}
//	@GetMapping("/getnewnumber/{user_id}/{prop_id}")
//	public @ResponseBody double getNewNumber(@PathVariable(name = "user_id") Long user_id, @PathVariable(name = "prop_id") Long prop_id) {
//		return userOverrideRepository.findNumberOverrideByUserIdAndPropertyId(user_id, prop_id);
//	}
}

