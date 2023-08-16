package com.example.fullCRUD.preset;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BleedService {

    @Autowired
    private final BleedPresetRepository bleedPresetRepository;

    public BleedPreset getBleedPresetByUserID(Long userID) {
        return bleedPresetRepository.findByUser_AppUserId(userID);
    }

    public void saveBleedPreset(BleedPreset preset) {
        Long userId = preset.getUser().getAppUserId();

        // Check if a BleedPreset exists for the given user_id
        BleedPreset existingPreset = bleedPresetRepository.findByUser_AppUserId(userId);

        if (existingPreset != null) {
            // An existing preset is found, update its properties
            existingPreset.setBleedWidth(preset.getBleedWidth());
            existingPreset.setBleedLength(preset.getBleedLength());

            bleedPresetRepository.saveAndFlush(existingPreset);
        } else {
            // No existing preset found, save it as a new entity
            bleedPresetRepository.save(preset);
        }
    }

}
