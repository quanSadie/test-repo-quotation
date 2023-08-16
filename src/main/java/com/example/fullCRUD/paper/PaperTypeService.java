package com.example.fullCRUD.paper;

import java.util.List;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class PaperTypeService {
	@Autowired
	private final PaperTypeRepository paperTypeRepository;

	public List<PaperType> listAll(){

		return paperTypeRepository.findAll();
//		return paperTypeRepository.findAll();
	}

	public PaperType get(long id) {
		// TODO Auto-generated method stub
		return paperTypeRepository.findById(id).get();
	}

	public PaperType getByGrammage(Long pg_id, String type){
		return paperTypeRepository.findByGrammageIdAndType(pg_id, type);
	}


	public void save(PaperType type) {
		paperTypeRepository.save(type);
	}

	public void delete(long id) {
		paperTypeRepository.deleteById(id);
	}
}
