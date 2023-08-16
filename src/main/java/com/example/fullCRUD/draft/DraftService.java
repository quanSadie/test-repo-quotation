package com.example.fullCRUD.draft;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class DraftService {
	@Autowired
	private DraftRepository repo;

	public List<Draft> listAll() {
		return repo.findAll();
	}

	public List<Draft> listAllOfUser(Long userID) {
		return repo.findByUserId(userID);
	}

	public void save(Draft draft) {
		repo.save(draft);
	}

	public Draft get(long id) {
		return repo.findById(id).get();
	}

	public void delete(long id) {
		repo.deleteById(id);
	}

	public Integer getDraftCount(Long companyId) {
		// TODO Auto-generated method stub
//		return repo.countPending();
		return pendingDraft(companyId);
	}

	public Integer pendingDraft(Long companyId){
		List<Draft> drafts = repo.pendingDrafts();
		int count = 0;
		for (Draft draft : drafts) {
			if (draft.getAppuser().getCompany().getId().equals(companyId)) {
				count++;
			}
		}
		return count;
	}
}
