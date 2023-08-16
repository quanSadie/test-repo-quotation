package com.example.fullCRUD.paper;

import com.example.fullCRUD.company.Company;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Objects;

import javax.persistence.*;

@Entity
@Table(name = "papercategory")
public class PaperCategory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pc_id")
	private Long id;

	@Column(name = "category")
	private String category;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "pc_id", cascade = CascadeType.REMOVE)
	private List<PaperGrammage> pgList;

	@Override
	public String toString() {

		return "PaperCategory [Category=" + category + ", Grammage=" + pgList + "]";
	}

	public PaperCategory() {
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public List<PaperGrammage> getPgList() {
		return pgList;
	}

	public void setPgList(List<PaperGrammage> pgList) {
		this.pgList = pgList;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj == null || getClass() != obj.getClass()) {
			return false;
		}
		PaperCategory other = (PaperCategory) obj;
		return Objects.equals(id, other.id);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Column(name = "company_id")
	private @Getter @Setter Long company_id;
}
