package com.example.fullCRUD.user_and_paper;

import com.example.fullCRUD.paper.PaperTypeService;
import com.example.fullCRUD.user.AppUser;
import com.example.fullCRUD.user.AppUserRepository;
import com.example.fullCRUD.user_and_prop.UserOverride;
import com.example.fullCRUD.user_and_prop.UserOverrideService;
import com.example.fullCRUD.user_and_prop.UserPropertyId;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserOverridePaperService {

    @Autowired
    private final AppUserRepository appUserRepository;

    @Autowired
    private final UserOverridePaperRepository userOverridePaperRepository;

    public void saveForAllUsersWithSameCompanyId(UserOverridePaper userOverride, Long companyId) {
        List<AppUser> users = appUserRepository.findByCompany_Id(companyId);
        for (AppUser user : users) {
            userOverride.setId(new UserPaperID(user, userOverride.getId().getPaperType()));
            userOverridePaperRepository.save(userOverride);
        }
    }
}
