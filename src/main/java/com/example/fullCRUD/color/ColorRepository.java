package com.example.fullCRUD.color;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ColorRepository extends JpaRepository<Color, Long> {
    @Query("SELECT c FROM Color c WHERE c.company_id = :companyId")
    List<Color> findAllPaperByCompany(@Param("companyId") Long companyId);

}
