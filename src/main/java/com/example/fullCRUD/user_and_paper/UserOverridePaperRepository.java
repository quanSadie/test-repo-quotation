package com.example.fullCRUD.user_and_paper;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserOverridePaperRepository extends JpaRepository<UserOverridePaper, UserPaperID> {
//    @Query("SELECT u.price_override FROM UserOverridePaper u WHERE u.id.appUser.id = :userId AND u.id.paperType.id = :pt_id")
//    double findNumberOverrideByUserIdAndPaperId(@Param("userId") Long userId, @Param("pt_id") Long pt_id);

    @Query("SELECT u.id.paperType, u.price_override, u.width_override, u.length_override, u.perream_override, u.priceperpiece_override, u.cut_override, u.lengthaftercut_override, u.digitalwidth_override, u.digitallength_override, u.incheswidth_override, u.incheslength_override, u.incheslengthaftercut_override, u.inchessquare_override, u.inchessquareaftercut_override, u.a3squareinches_override, u.maxup_override FROM UserOverridePaper u WHERE u.id.appUser.id = :userId")
    List<Object[]> findPaperTypeAndNumberByUserId(@Param("userId") Long userId);
}