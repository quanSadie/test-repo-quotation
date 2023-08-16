package com.example.fullCRUD.draft;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

@Repository
@Transactional
public interface DraftRepository extends JpaRepository<Draft, Long> {

	@Query("SELECT d FROM Draft d WHERE d.user_id = :userId")
	List<Draft> findByUserId(@Param("userId") Long userId);

	@Query(value = "SELECT COUNT(*) FROM Draft d WHERE d.pending = true")
	Integer countPending();

	@Query(value = "SELECT d FROM Draft d WHERE d.pending = true")
	List<Draft> pendingDrafts();
}
