package com.example.fullCRUD.paper_company;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "papertype_company")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PaperType_Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pt_id", nullable = false)
    private Long id;

    @Column(name = "pg_id", nullable = false)
    private Long pg_id;
    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "price", nullable = false)
    private double price;

    @Column(name = "width", nullable = false)
    private double width;

    @Column(name = "length", nullable = false)
    private double length;

    @Column(name = "perreampackage", nullable = false)
    private int perReamPackage;

    @Column(name = "priceperpiece", nullable = false)
    private double pricePerCuts;

    @Column(name = "cut", nullable = false)
    private int cut;

    @Column(name = "lengthaftercut", nullable = false)
    private double lengthAfterCut;

    @Column(name = "digitalwidth", nullable = false)
    private double digitalWidth;

    @Column(name = "digitallength", nullable = false)
    private double digitalLength;

    @Column(name = "incheswidth", nullable = false)
    private double inchesWidth;

    @Column(name = "incheslength", nullable = false)
    private double inchesLength;

    @Column(name = "incheslengthaftercut", nullable = false)
    private double inchesLengthAfterCut;

    @Column(name = "inchessquare", nullable = false)
    private double inchesSquare;

    @Column(name = "inchessquareaftercut", nullable = false)
    private double inchesSquareAfterCut;

    @Column(name = "abasquareinches", nullable = false)
    private double a3SquareInches;

    @Column(name = "iscard", nullable = false)
    private boolean iscard;

    @Column(name = "maxupforbooks", nullable = false)
    private int maxUpForBooks;

    @Column(name = "company_id", nullable = false)
    private Long company_id;
}
