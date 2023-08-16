package com.example.fullCRUD.paper;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface PaperTypeRepository extends JpaRepository<PaperType, Long> {
    @Query("SELECT pt FROM PaperType pt WHERE pt.pg_id = :grammageId AND pt.type = :type")
    PaperType findByGrammageIdAndType(@Param("grammageId") Long grammageId, @Param("type") String type);
}
