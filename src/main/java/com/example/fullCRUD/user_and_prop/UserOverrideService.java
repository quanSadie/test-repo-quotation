package com.example.fullCRUD.user_and_prop;

import com.example.fullCRUD.user.AppUser;
import com.example.fullCRUD.user.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserOverrideService {
    @Autowired
    private final AppUserRepository appUserRepository;

    @Autowired
    private final UserOverrideRepository userOverrideRepository;

    public void saveForAllUsersWithSameCompanyId(UserOverride userOverride, Long companyId) {
        List<AppUser> users = appUserRepository.findByCompany_Id(companyId);
        for (AppUser user : users) {
            userOverride.setId(new UserPropertyId(user, userOverride.getId().getProperties()));
            userOverrideRepository.save(userOverride);
        }
    }
}
