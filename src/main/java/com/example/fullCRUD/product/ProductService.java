package com.example.fullCRUD.product;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ProductService {
	@Autowired
	private ProductRepository productRepository;

	public List<Product> listAll() {
		return productRepository.findAll();
	}

	public void save(Product product) {
		productRepository.save(product);
	}

	public Product get(long id) {
		return productRepository.findById(id).get();
	}

	public void delete(long id) {
		productRepository.deleteById(id);
	}
}
