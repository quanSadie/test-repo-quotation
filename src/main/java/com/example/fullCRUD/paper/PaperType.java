package com.example.fullCRUD.paper;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "papertype")

public class PaperType {

	@Override
	public String toString() {
		return "PaperType [id=" + id + ", pg_id=" + pg_id + ", type=" + type + ", price=" + price + ", width=" + width
				+ ", length=" + length + ", perReamPackage=" + perReamPackage + ", pricePerCuts=" + pricePerCuts
				+ ", cut=" + cut + ", lengthAfterCut=" + lengthAfterCut + ", digitalWidth=" + digitalWidth
				+ ", digitalLength=" + digitalLength + ", inchesWidth=" + inchesWidth + ", inchesLength=" + inchesLength
				+ ", inchesLengthAfterCut=" + inchesLengthAfterCut + ", inchesSquare=" + inchesSquare
				+ ", inchesSquareAfterCut=" + inchesSquareAfterCut + ", a3SquareInches=" + a3SquareInches + ", iscard="
				+ iscard + ", maxUpForBooks=" + maxUpForBooks;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pt_id", nullable = false)
	private Long id;

	@Column(name = "pg_id", nullable = false)
	private Long pg_id;

	protected PaperType(Long id, Long pg_id, String type, double price, double width, double length, int perReamPackage,
			double pricePerCuts, int cut, double lengthAfterCut, double digitalWidth, double digitalLength,
			double inchesWidth, double inchesLength, double inchesLengthAfterCut, double inchesSquare,
			double inchesSquareAfterCut, double a3SquareInches, boolean iscard, int maxUpForBooks, boolean isEnable) {
		super();
		this.id = id;
		this.pg_id = pg_id;
		this.type = type;
		this.price = price;
		this.width = width;
		this.length = length;
		this.perReamPackage = perReamPackage;
		this.pricePerCuts = pricePerCuts;
		this.cut = cut;
		this.lengthAfterCut = lengthAfterCut;
		this.digitalWidth = digitalWidth;
		this.digitalLength = digitalLength;
		this.inchesWidth = inchesWidth;
		this.inchesLength = inchesLength;
		this.inchesLengthAfterCut = inchesLengthAfterCut;
		this.inchesSquare = inchesSquare;
		this.inchesSquareAfterCut = inchesSquareAfterCut;
		this.a3SquareInches = a3SquareInches;
		this.iscard = iscard;
		this.maxUpForBooks = maxUpForBooks;
		this.isEnable = isEnable;
	}

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

	@Column(name = "isenable", nullable = false)
	private boolean isEnable;
	public boolean isIsEnable() {
		return isEnable;
	}

	public void setIsEnable(boolean isEnable) {
		this.isEnable = isEnable;
	}

	public int getPerReamPackage() {
		return perReamPackage;
	}

	public void setPerReamPackage(int perReamPackage) {
		this.perReamPackage = perReamPackage;
	}

	public double getPricePerCuts() {
		return pricePerCuts;
	}

	public void setPricePerCuts(double pricePerCuts) {
		this.pricePerCuts = pricePerCuts;
	}

	public int getCut() {
		return cut;
	}

	public void setCut(int cut) {
		this.cut = cut;
	}

	public double getLengthAfterCut() {
		return lengthAfterCut;
	}

	public void setLengthAfterCut(double lengthAfterCut) {
		this.lengthAfterCut = lengthAfterCut;
	}

	public double getDigitalWidth() {
		return digitalWidth;
	}

	public void setDigitalWidth(double digitalWidth) {
		this.digitalWidth = digitalWidth;
	}

	public double getDigitalLength() {
		return digitalLength;
	}

	public void setDigitalLength(double digitalLength) {
		this.digitalLength = digitalLength;
	}

	public double getInchesWidth() {
		return inchesWidth;
	}

	public void setInchesWidth(double inchesWidth) {
		this.inchesWidth = inchesWidth;
	}

	public double getInchesLength() {
		return inchesLength;
	}

	public void setInchesLength(double inchesLength) {
		this.inchesLength = inchesLength;
	}

	public double getInchesLengthAfterCut() {
		return inchesLengthAfterCut;
	}

	public void setInchesLengthAfterCut(double inchesLengthAfterCut) {
		this.inchesLengthAfterCut = inchesLengthAfterCut;
	}

	public double getInchesSquare() {
		return inchesSquare;
	}

	public void setInchesSquare(double inchesSquare) {
		this.inchesSquare = inchesSquare;
	}

	public double getInchesSquareAfterCut() {
		return inchesSquareAfterCut;
	}

	public void setInchesSquareAfterCut(double inchesSquareAfterCut) {
		this.inchesSquareAfterCut = inchesSquareAfterCut;
	}

	public double getA3SquareInches() {
		return a3SquareInches;
	}

	public void setA3SquareInches(double a3SquareInches) {
		this.a3SquareInches = a3SquareInches;
	}

	public boolean isIscard() {
		return iscard;
	}

	public void setIscard(boolean iscard) {
		this.iscard = iscard;
	}

	public int getMaxUpForBooks() {
		return maxUpForBooks;
	}

	public void setMaxUpForBooks(int maxUpForBooks) {
		this.maxUpForBooks = maxUpForBooks;
	}

	public PaperType() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getPg_id() {
		return pg_id;
	}

	public void setPg_id(Long pg_id) {
		this.pg_id = pg_id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public double getWidth() {
		return width;
	}

	public void setWidth(double width) {
		this.width = width;
	}

	public double getLength() {
		return length;
	}

	public void setLength(double length) {
		this.length = length;
	}

	@PreUpdate
	public void onPreUpdate() {
		System.out.println("PaperType being updated...");
	}
}
