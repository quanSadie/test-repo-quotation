package com.example.fullCRUD.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface AppUserRepository extends JpaRepository<AppUser, Long> {
	@Query("SELECT u FROM AppUser u WHERE u.username = ?1")
	public AppUser findByUsername(String username);

	@Query("SELECT u FROM AppUser u WHERE u.username = :username")
	public AppUser getUserByUsername(@Param("username") String username);

	@Query("SELECT u FROM AppUser u WHERE u.email = ?1")
	public AppUser findByEmail(String email);

	@Query("SELECT u FROM AppUser u JOIN u.roles r WHERE r.name = :roleName")
	List<AppUser> findByRoleName(String roleName);

	@Query("SELECT u FROM AppUser u JOIN u.roles r WHERE r.name = :roleName AND u.company.id = :companyId")
	List<AppUser> findByRoleNameAndCompanyId(String roleName, Long companyId);

	public AppUser findByResetPasswordToken(String token);

	List<AppUser> findByCompany_Id(Long companyId);
}
