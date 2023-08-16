package com.example.fullCRUD.paper_company;

import com.example.fullCRUD.paper.PaperType;
import com.example.fullCRUD.user.AppUser;
import com.example.fullCRUD.user.MyUserDetails;
import com.example.fullCRUD.user_and_paper.UserOverridePaper;
import com.example.fullCRUD.user_and_paper.UserPaperID;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class Paper_CompanyService {

    @Autowired
    private final PaperType_CompanyRepository paperTypeCompanyRepository;

    public void save(PaperType_Company paperTypeCompany) {
        paperTypeCompanyRepository.save(paperTypeCompany);
    }

    public List<PaperType_Company> findAllByCompany(Long companyID) {
        return paperTypeCompanyRepository.findByCompanyId(companyID);
    }

    public void saveByCompany(PaperType_Company pptype) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        MyUserDetails userdetails = (MyUserDetails) authentication.getPrincipal();
        AppUser currentUser = userdetails.getUser();
        Long companyId = currentUser.getCompany().getId();
        pptype.setCompany_id(companyId);
        save(pptype);
    }

    public PaperType_Company get(Long id) {
        return paperTypeCompanyRepository.getReferenceById(id);
    }

    public void delete(Long id) {
        paperTypeCompanyRepository.deleteById(id);
    }

    public PaperType_Company getByType(String type) {
        return paperTypeCompanyRepository.findByType(type);
    }
}
