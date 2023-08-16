package com.example.fullCRUD.paper;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PaperGrammageReposistory extends JpaRepository<PaperGrammage, Long> {
//    @Query("SELECT p FROM PaperGrammage p JOIN p.paperType_companiesList pt WHERE pt.company_id = :companyId")
//    public List<PaperGrammage> findAllPaperByCompany(@Param("companyId") Long companyId);

//    @Query("SELECT p FROM PaperGrammage p JOIN p.paperType_companiesList pt JOIN pt.company c WHERE c.id = :companyId")
//    List<PaperGrammage> findAllPaperByCompany(@Param("companyId") Long companyId);

    @Query("SELECT p FROM PaperGrammage p WHERE p.grammage = :p_grammage AND p.pc_id = :ppc_id")
    PaperGrammage findByCategoryAndGrammage(@Param("p_grammage") String p_grammage, @Param("ppc_id") Long ppc_id);
}
