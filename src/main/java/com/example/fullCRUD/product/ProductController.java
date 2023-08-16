package com.example.fullCRUD.product;

import java.util.List;

import com.example.fullCRUD.paper.*;
import com.example.fullCRUD.preset.BleedDAO;
import com.example.fullCRUD.preset.BleedPreset;
import com.example.fullCRUD.preset.BleedService;
import com.example.fullCRUD.user.AppUser;
import com.example.fullCRUD.user.MyUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.fullCRUD.color.Color;
import com.example.fullCRUD.color.ColorService;
import com.example.fullCRUD.draft.Draft;
import com.example.fullCRUD.prop.Properties;
import com.example.fullCRUD.prop.PropertiesService;

@Controller
@RequiredArgsConstructor
public class ProductController {
	@Autowired
	private final ProductService productService;
	@Autowired
	private final PaperService paperService;
	@Autowired
	private final ColorService colorService;
	@Autowired
	private final PropertiesService propertiesService;

	@Autowired
	private final BleedService bleedService;

	@GetMapping("/quotation")
	public String processToQuotation(Model model, Authentication authentication) {
		MyUserDetails userdetails = (MyUserDetails) authentication.getPrincipal();
		AppUser currentUser = userdetails.getUser();

		List<Product> listProduct = productService.listAll();

		List<PaperCategory> paperCats = paperService.allPapersCompany(currentUser.getCompany_id());

		List<Color> colors = colorService.listAll(currentUser.getCompany_id());

		List<Properties> props = propertiesService.listAllofUser(currentUser.getAppUserId());

		// get bleed
		BleedDAO bleedDAO = new BleedDAO();
		BleedPreset bleed = bleedService.getBleedPresetByUserID(currentUser.getAppUserId());
		if (bleed != null) {
			bleedDAO.setBleedWidth(bleed.getBleedWidth());
			bleedDAO.setBleedLength(bleed.getBleedLength());
		} else {
			bleedDAO.setBleedWidth(-1);
			bleedDAO.setBleedLength(-1);
		}


		Draft draft = new Draft();

		model.addAttribute("listProduct", listProduct);
		model.addAttribute("paperCats", paperCats);
		model.addAttribute("colors", colors);
		model.addAttribute("props", props);
		model.addAttribute("formdraft", draft);
		model.addAttribute("prebleed", bleedDAO);
		return "quotation";
	}
}
