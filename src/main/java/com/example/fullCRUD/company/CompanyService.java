package com.example.fullCRUD.company;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CompanyService {

    @Autowired
    private final CompanyRepo companyRepo;

    public void addCompany(Company company) {
        companyRepo.save(company);
    }

    public List<Company> getCompanyList() {
        return companyRepo.findAll();
    }
}
