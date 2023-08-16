package com.example.fullCRUD.product;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "product")
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "p_id")
	private Long p_id;

	@Column(name = "sizename", nullable = false)
	private String sizename;

	@Column(name = "p_width", nullable = false)
	private double p_width;

	@Column(name = "p_length", nullable = false)
	private double p_length;

	@Column(name = "bookups", nullable = false)
	private int bookups;

	@Column(name = "paperused", nullable = false)
	private int paperused;

	protected Product() {

	}

	public Long getP_id() {
		return p_id;
	}

	public void setP_id(Long p_id) {
		this.p_id = p_id;
	}

	public String getSizename() {
		return sizename;
	}

	public void setSizename(String sizename) {
		this.sizename = sizename;
	}

	protected Product(String sizename, double p_width, double p_length, int bookups, int paperused) {
		super();
		this.sizename = sizename;
		this.p_width = p_width;
		this.p_length = p_length;
		this.bookups = bookups;
		this.paperused = paperused;
	}

	protected Product(Long p_id, String sizename, double p_width, double p_length, int bookups, int paperused) {
		super();
		this.p_id = p_id;
		this.sizename = sizename;
		this.p_width = p_width;
		this.p_length = p_length;
		this.bookups = bookups;
		this.paperused = paperused;
	}

	public double getP_width() {
		return p_width;
	}

	public void setP_width(double p_width) {
		this.p_width = p_width;
	}

	public double getP_length() {
		return p_length;
	}

	public void setP_length(double p_length) {
		this.p_length = p_length;
	}

	public int getBookups() {
		return bookups;
	}

	public void setBookups(int bookups) {
		this.bookups = bookups;
	}

	public int getPaperused() {
		return paperused;
	}

	public void setPaperused(int paperused) {
		this.paperused = paperused;
	}
}
