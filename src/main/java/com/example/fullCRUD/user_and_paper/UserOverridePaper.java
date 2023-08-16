package com.example.fullCRUD.user_and_paper;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user_overrides_paper")
public class UserOverridePaper {
    @EmbeddedId
    private UserPaperID id;

    @Column(name = "price_override")
    private double price_override;

    @Column(name = "width_override")
    private double width_override;

    @Column(name = "length_override")
    private double length_override;

    @Column(name = "perream_override")
    private int perream_override;

    @Column(name = "priceperpiece_override")
    private double priceperpiece_override;

    @Column(name = "cut_override")
    private int cut_override;

    @Column(name = "lengthaftercut_override")
    private double lengthaftercut_override;

    @Column(name = "digitalwidth_override")
    private double digitalwidth_override;

    @Column(name = "digitallength_override")
    private double digitallength_override;

    @Column(name = "incheswidth_override")
    private double incheswidth_override;

    @Column(name = "incheslength_override")
    private double incheslength_override;

    @Column(name = "incheslengthaftercut_override")
    private double incheslengthaftercut_override;

    @Column(name = "inchessquare_override")
    private double inchessquare_override;

    @Column(name = "inchessquareaftercut_override")
    private double inchessquareaftercut_override;

    @Column(name = "a3squareinches_override")
    private double a3squareinches_override;

    @Column(name = "maxup_override")
    private int maxup_override;

    // constructors, getters, setters
}

