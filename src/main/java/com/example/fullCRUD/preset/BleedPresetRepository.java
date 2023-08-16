package com.example.fullCRUD.preset;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BleedPresetRepository extends JpaRepository<BleedPreset, Long> {
    BleedPreset findByUser_AppUserId(Long userId);

}
