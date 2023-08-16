package com.example.fullCRUD.paper;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface PaperCategoryRepository extends JpaRepository<PaperCategory, Long> {

//	@Query("SELECT p FROM PaperCategory p JOIN p.pgList pg JOIN pg.paperType_companiesList pt")
//	 List<PaperCategory> findAllPaper();

//	@Query("SELECT DISTINCT p,pg,pt FROM PaperCategory p JOIN  p.pgList pg JOIN  pg.paperType_companiesList pt WHERE pt.company_id = :companyId")
//	@Query("SELECT DISTINCT p FROM PaperCategory p JOIN p.pgList pg JOIN pg.paperType_companiesList pt JOIN pt.company c WHERE c.id = :companyId")
//	List<PaperCategory> findAllPaperByCompany(@Param("companyId") Long companyId);

	@Query("SELECT p FROM PaperCategory p WHERE p.company_id = :companyId")
	List<PaperCategory> findAllPaperByCompany(@Param("companyId") Long companyId);

	@Query("SELECT p FROM PaperCategory p WHERE p.category = :category AND p.company_id = :companyId")
	PaperCategory findByCategoryAndCompanyId(@Param("category") String category, @Param("companyId") Long companyId);

}
