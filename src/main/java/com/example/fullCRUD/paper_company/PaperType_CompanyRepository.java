package com.example.fullCRUD.paper_company;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaperType_CompanyRepository extends JpaRepository<PaperType_Company, Long> {

    @Query("SELECT p FROM PaperType_Company p WHERE p.company_id = :companyId")
    List<PaperType_Company> findByCompanyId(@Param("companyId") Long companyId);

    public PaperType_Company findByType(String type);
}
