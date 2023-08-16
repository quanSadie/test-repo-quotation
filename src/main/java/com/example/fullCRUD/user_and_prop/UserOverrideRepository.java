package com.example.fullCRUD.user_and_prop;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserOverrideRepository extends JpaRepository<UserOverride, UserPropertyId> {
//    @Query("SELECT u FROM UserOverride u WHERE u.id.appUser.appUserId = :userId AND u.id.properties.id = :propertyId")
//    UserOverride findByUserIdAndPropertyId(@Param("userId") Long userId, @Param("propertyId") Long propertyId);

    @Query("SELECT u.numberOverride FROM UserOverride u WHERE u.id.appUser.id = :userId AND u.id.properties.id = :propertyId")
    double findNumberOverrideByUserIdAndPropertyId(@Param("userId") Long userId, @Param("propertyId") Long propertyId);

    @Query("SELECT u.id.properties, u.numberOverride FROM UserOverride u WHERE u.id.appUser.id = :userId")
    List<Object[]> findPropertyAndNumberByUserId(@Param("userId") Long userId);
}