package com.example.fullCRUD.color;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "color")
@AllArgsConstructor
@NoArgsConstructor
public class Color {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "c_id", nullable = false)
	private Long id;

	@Column(name = "color_name", nullable = false)
	private String color_name;

	@Column(name = "platecost", nullable = false)
	private double platecost;

	@Column(name = "company_id")
	private @Getter @Setter Long company_id;


	protected Color(String color_name, double platecost) {
		super();
		this.color_name = color_name;
		this.platecost = platecost;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getColor_name() {
		return color_name;
	}

	public void setColor_name(String color_name) {
		this.color_name = color_name;
	}

	public double getPlatecost() {
		return platecost;
	}

	public void setPlatecost(double platecost) {
		this.platecost = platecost;
	}
}
