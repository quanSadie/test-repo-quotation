package com.example.fullCRUD.paper;

import org.hibernate.annotations.BatchSize;

import java.util.List;
import java.util.Objects;

import javax.persistence.*;

@Entity
@Table(name = "papergrammage")
public class PaperGrammage {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pg_id", nullable = false)
	private Long id;

	@Column(name = "pc_id", nullable = false)
	private Long pc_id;

	@Column(name = "grammage", nullable = false)
	private String grammage;

	@OneToMany(fetch = FetchType.EAGER, mappedBy = "pg_id", cascade = CascadeType.REMOVE)
	@BatchSize(size = 10)
	private List<PaperType> ptList;

	public List<PaperType> getPtList() {
		return ptList;
	}

//	@OneToMany(mappedBy = "pg_id")
//	@BatchSize(size = 10)
//	private List<PaperType_Company> paperType_companiesList;
//
//	public List<PaperType_Company> getpaperType_companiesList() {
//		return paperType_companiesList;
//	}
//
//	public void setPt_cList(List<PaperType_Company> ptList) {
//		this.paperType_companiesList = ptList;
//	}

//	public void setPtList(List<PaperType> ptList) {
//		this.ptList = ptList;
//	}

	protected PaperGrammage() {

	}

	protected PaperGrammage(Long pc_id, String grammage) {
		super();
		this.pc_id = pc_id;
		this.grammage = grammage;
	}

	protected PaperGrammage(Long id, Long pc_id, String grammage) {
		super();
		this.id = id;
		this.pc_id = pc_id;
		this.grammage = grammage;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getPc_id() {
		return pc_id;
	}

	public void setPc_id(Long pc_id) {
		this.pc_id = pc_id;
	}

	public String getGrammage() {
		return grammage;
	}

	public void setGrammage(String grammage) {
		this.grammage = grammage;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj == null || getClass() != obj.getClass()) {
			return false;
		}
		PaperGrammage other = (PaperGrammage) obj;
		return Objects.equals(id, other.id);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}
}
