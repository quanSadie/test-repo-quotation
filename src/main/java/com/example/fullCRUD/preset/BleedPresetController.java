package com.example.fullCRUD.preset;

import com.example.fullCRUD.user.MyUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
public class BleedPresetController {

    @Autowired
    private final BleedService bleedService;

    @GetMapping(value = "/get_preset")
    public @ResponseBody BleedDAO getBleedPreset(Authentication authentication) {
        MyUserDetails user = (MyUserDetails) authentication.getPrincipal();
        BleedDAO bleed = new BleedDAO();
        BleedPreset preset = bleedService.getBleedPresetByUserID(user.getAppUserID());
        bleed.setBleedWidth(preset.getBleedWidth());
        bleed.setBleedLength(preset.getBleedLength());
        return bleed;
    }

    @GetMapping(value = "/bleedpreset")
    public @ResponseBody BleedDAO setBleedPreset(
            @RequestParam("bleedWidth") int bleedWidth,
            @RequestParam("bleedLength") int bleedLength,
            Authentication authentication
    ) {
        MyUserDetails user = (MyUserDetails) authentication.getPrincipal();
        BleedPreset preset = new BleedPreset();
        preset.setBleedWidth(bleedWidth);
        preset.setBleedLength(bleedLength);
        preset.setUser(user.getUser());
        bleedService.saveBleedPreset(preset); // Save the updated preset

        BleedDAO updatedBleed = new BleedDAO();
        updatedBleed.setBleedWidth(preset.getBleedWidth());
        updatedBleed.setBleedLength(preset.getBleedLength());
        return updatedBleed;
    }



}
