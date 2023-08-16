package com.example.fullCRUD.company;

import com.example.fullCRUD.color.Color;
import com.example.fullCRUD.paper.PaperCategory;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.BatchSize;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "COMPANY")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "company_name")
    private String company_name;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "company_id", cascade = CascadeType.REMOVE)
    private List<PaperCategory> paperCats_companiesList;

    public List<PaperCategory> getpaperType_companiesList() {
        return paperCats_companiesList;
    }

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "company_id", cascade = CascadeType.REMOVE)
    private List<Color> color_companiesList;

    public List<Color> getcolor_companiesList() {
        return color_companiesList;
    }
}
