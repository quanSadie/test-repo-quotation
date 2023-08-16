package com.example.fullCRUD.paper;

import java.util.List;

import com.example.fullCRUD.user.AppUser;
import com.example.fullCRUD.user.MyUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PaperService {

	@Autowired
	private final PaperCategoryRepository categoryRepository;

	public PaperService(PaperCategoryRepository categoryRepository) {
		this.categoryRepository = categoryRepository;
	}

//	public List<PaperCategory> allPapers() {
//		return categoryRepository.findAllPaper();
//	}

	public List<PaperCategory> allPapersCompany(Long id) {
		return categoryRepository.findAllPaperByCompany(id);
	}

	public List<PaperCategory> listAll() {
		return categoryRepository.findAll();
	}

	public void save(PaperCategory paperCategory) {
		categoryRepository.save(paperCategory);
	}

	public void saveByCompany(PaperCategory paperCategory) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		MyUserDetails userdetails = (MyUserDetails) authentication.getPrincipal();
		AppUser currentUser = userdetails.getUser();
		Long companyId = currentUser.getCompany().getId();
//		paperCategory.setCompany(currentUser.getCompany());
//		paperCategory.getCompany().setId(companyId);
		paperCategory.setCompany_id(currentUser.getCompany().getId());
		List<PaperCategory> existedList = allPapersCompany(currentUser.getCompany().getId());
		int count = 0;
		for (PaperCategory category : existedList) {
			if (category.getCategory().equals(paperCategory.getCategory())){
				return;
			} else {
				count++;
			}
		}
		if (count == existedList.size()) {
			categoryRepository.save(paperCategory);
		}

	}

	public PaperCategory get(long id) {
		return categoryRepository.findById(id).get();
	}

	public PaperCategory getByCompany(String category, long companyId) {
		return categoryRepository.findByCategoryAndCompanyId(category, companyId);
	}

	public void delete(long id) {
		categoryRepository.deleteById(id);
	}

}
