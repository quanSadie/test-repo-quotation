package com.example.fullCRUD.color;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class ColorService {

	@Autowired
	private final ColorRepository colorRepository;

	public ColorService(ColorRepository colorRepository) {
		this.colorRepository = colorRepository;
	}

	public List<Color> listAll(Long companyId) {
		return colorRepository.findAllPaperByCompany(companyId);
	}

	public void save(Color color) {
		colorRepository.save(color);
	}

	public Color get(long id) {
		return colorRepository.findById(id).get();
	}

	public void delete(long id) {
		colorRepository.deleteById(id);
	}
}
