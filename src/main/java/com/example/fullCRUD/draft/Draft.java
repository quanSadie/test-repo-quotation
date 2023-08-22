package com.example.fullCRUD.draft;

import com.example.fullCRUD.company.Company;
import com.example.fullCRUD.user.AppUser;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "draft")
public class Draft {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private Long id;

	@Column(name = "user_id")
	private Long user_id;

	@Column(name = "save_date")
	private String save_date;

	public Draft() {
		super();
	}

	@Column(name = "size")
	private String size;

	@Column(name = "quantity_per_design")
	private String quantity_per_design;

	@Column(name = "is_book_inner_content")
	private boolean is_book_inner_content;

	@Column(name = "bleed_width_length")
	private String bleed_width_length;

	@Column(name = "final_width_length_bleed")
	private String final_width_length_bleed;

	@Column(name = "area_size")
	private String area_size;

	@Column(name = "customer_supply_paper")
	private boolean customer_supply_paper;

	@Column(name = "customer_supply_plate")
	private boolean customer_supply_plate;

	@Column(name = "is_card")
	private boolean is_card;

	@Column(name = "paper_type")
	private String paper_type;

	@Column(name = "urgent_print")
	private boolean urgent_print;

	@Column(name = "color")
	private String color;

	@Column(name = "total_designs")
	private String total_designs;

	@Column(name = "finish_product_total_quantity")
	private String finish_product_total_quantity;

	@Column(name = "gloss_lam")
	private String gloss_lam;

	@Column(name = "matt_lam")
	private String matt_lam;

	@Column(name = "water_based")
	private String water_based;

	@Column(name = "uv")
	private String uv;

	@Column(name = "varnish")
	private String varnish;

	@Column(name = "spot_uv")
	private String spot_uv;

	@Column(name = "emboss_deboss")
	private String emboss_deboss;

	@Column(name = "hot_stamping")
	private String hot_stamping;

	@Column(name = "diecut")
	private String diecut;

	@Column(name = "perfect_bind")
	private String perfect_bind;

	@Column(name = "staple_bind")
	private String staple_bind;

	@Column(name = "hardcover")
	private String hardcover;

	@Column(name = "folding")
	private String folding;

	@Column(name = "creasing_line")
	private String creasing_line;

	@Column(name = "total_price")
	private String total_price;

	@Column(name = "markup")
	private String markup;

	@Column(name = "final_price")
	private String final_price;

	@Column(name = "final_price_rounded")
	private @Getter @Setter String final_price_rounded;

	@Column(name = "title")
	private @Getter @Setter String title;

	@Column(name = "deliverydate")
	private @Getter @Setter String deliverydate;

	@Column(name = "softtouch")
	private @Getter @Setter String softtouch;

	@Column(name = "reason")
	private @Getter @Setter String reason;

	@Column(name = "state")
	private @Getter @Setter String state;

	@Column(name = "paid")
	private @Getter @Setter String paid;

	@Column(name = "final_selling_price")
	private @Getter @Setter String final_selling_price;

	// newly added column
	@Column(name = "max_ups_per_paper")
	private @Getter @Setter String max_ups_per_paper;

	@Column(name = "ups_after_cut")
	private @Getter @Setter String ups_after_cut;

	@Column(name = "horizontal_ups")
	private @Getter @Setter String horizontal_ups;

	@Column(name = "vertical_ups")
	private @Getter @Setter String vertical_ups;

	@Column(name = "plates_needed")
	private @Getter @Setter String plates_needed;

	@Column(name = "paper_needed")
	private @Getter @Setter String paper_needed;

	@Column(name = "testing_paper_needed")
	private @Getter @Setter String testing_paper_needed;

	@Column(name = "cut_amount")
	private @Getter @Setter String cut_amount;

	@Column(name = "testing_paper_finishing")
	private @Getter @Setter String testing_paper_finishing;

	@Column(name = "actual_ups_paper")
	private @Getter @Setter String actual_ups_paper;

	@Column(name = "other_finishing")
	private @Getter @Setter String other_finishing;

	@Column(name = "pending")
	private boolean pending;

	protected Draft(Long id, Long user_id, String save_date, String size, String quantity_per_design,
					boolean is_book_inner_content, String bleed_width_length, String final_width_length_bleed, String area_size,
					boolean customer_supply_paper, boolean customer_supply_plate, boolean is_card, String paper_type,
					boolean urgent_print, String color, String total_designs, String finish_product_total_quantity,
					String gloss_lam, String matt_lam, String water_based, String uv, String varnish, String spot_uv,
					String emboss_deboss, String hot_stamping, String diecut, String stapleBind, String folding, String creasing_line, String total_price,
					String markup, String final_price, boolean pending) {
		super();
		this.id = id;
		this.user_id = user_id;
		this.save_date = save_date;
		this.size = size;
		this.quantity_per_design = quantity_per_design;
		this.is_book_inner_content = is_book_inner_content;
		this.bleed_width_length = bleed_width_length;
		this.final_width_length_bleed = final_width_length_bleed;
		this.area_size = area_size;
		this.customer_supply_paper = customer_supply_paper;
		this.customer_supply_plate = customer_supply_plate;
		this.is_card = is_card;
		this.paper_type = paper_type;
		this.urgent_print = urgent_print;
		this.color = color;
		this.total_designs = total_designs;
		this.finish_product_total_quantity = finish_product_total_quantity;
		this.gloss_lam = gloss_lam;
		this.matt_lam = matt_lam;
		this.water_based = water_based;
		this.uv = uv;
		this.varnish = varnish;
		this.spot_uv = spot_uv;
		this.emboss_deboss = emboss_deboss;
		this.hot_stamping = hot_stamping;
		this.diecut = diecut;
		staple_bind = stapleBind;
		this.folding = folding;
		this.creasing_line = creasing_line;
		this.total_price = total_price;
		this.markup = markup;
		this.final_price = final_price;
		this.pending = pending;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getQuantity_per_design() {
		return quantity_per_design;
	}

	public void setQuantity_per_design(String quantity_per_design) {
		this.quantity_per_design = quantity_per_design;
	}

	public boolean isIs_book_inner_content() {
		return is_book_inner_content;
	}

	public void setIs_book_inner_content(boolean is_book_inner_content) {
		this.is_book_inner_content = is_book_inner_content;
	}

	public String getBleed_width_length() {
		return bleed_width_length;
	}

	public void setBleed_width_length(String bleed_width_length) {
		this.bleed_width_length = bleed_width_length;
	}

	public String getFinal_width_length_bleed() {
		return final_width_length_bleed;
	}

	public void setFinal_width_length_bleed(String final_width_length_bleed) {
		this.final_width_length_bleed = final_width_length_bleed;
	}

	public String getArea_size() {
		return area_size;
	}

	public void setArea_size(String area_size) {
		this.area_size = area_size;
	}

	public boolean isCustomer_supply_paper() {
		return customer_supply_paper;
	}

	public void setCustomer_supply_paper(boolean customer_supply_paper) {
		this.customer_supply_paper = customer_supply_paper;
	}

	public boolean isCustomer_supply_plate() {
		return customer_supply_plate;
	}

	public void setCustomer_supply_plate(boolean customer_supply_plate) {
		this.customer_supply_plate = customer_supply_plate;
	}

	public boolean isIs_card() {
		return is_card;
	}

	public void setIs_card(boolean is_card) {
		this.is_card = is_card;
	}

	public String getPaper_type() {
		return paper_type;
	}

	public void setPaper_type(String paper_type) {
		this.paper_type = paper_type;
	}

	public boolean isUrgent_print() {
		return urgent_print;
	}

	public void setUrgent_print(boolean urgent_print) {
		this.urgent_print = urgent_print;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getTotal_designs() {
		return total_designs;
	}

	public void setTotal_designs(String total_designs) {
		this.total_designs = total_designs;
	}

	public String getFinish_product_total_quantity() {
		return finish_product_total_quantity;
	}

	public void setFinish_product_total_quantity(String finish_product_total_quantity) {
		this.finish_product_total_quantity = finish_product_total_quantity;
	}



	// ----------------------------------------------------------------



	public Long getId() {
		return id;
	}

	public String getSave_date() {
		return save_date;
	}

	public boolean isPending() {
		return pending;
	}

	public void setPending(boolean pending) {
		this.pending = pending;
	}

	public void setSave_date(String save_date) {
		this.save_date = save_date;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getUser_id() {
		return user_id;
	}

	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}

	public String getGloss_lam() {
		return gloss_lam;
	}

	public void setGloss_lam(String gloss_lam) {
		this.gloss_lam = gloss_lam;
	}

	public String getMatt_lam() {
		return matt_lam;
	}

	public void setMatt_lam(String matt_lam) {
		this.matt_lam = matt_lam;
	}

	public String getWater_based() {
		return water_based;
	}

	public void setWater_based(String water_based) {
		this.water_based = water_based;
	}

	public String getUv() {
		return uv;
	}

	public void setUv(String uv) {
		this.uv = uv;
	}

	public String getVarnish() {
		return varnish;
	}

	public void setVarnish(String varnish) {
		this.varnish = varnish;
	}

	public String getSpot_uv() {
		return spot_uv;
	}

	public void setSpot_uv(String spot_uv) {
		this.spot_uv = spot_uv;
	}

	public String getEmboss_deboss() {
		return emboss_deboss;
	}

	public void setEmboss_deboss(String emboss_deboss) {
		this.emboss_deboss = emboss_deboss;
	}

	public String getHot_stamping() {
		return hot_stamping;
	}

	public void setHot_stamping(String hot_stamping) {
		this.hot_stamping = hot_stamping;
	}

	public String getDiecut() {
		return diecut;
	}

	public void setDiecut(String diecut) {
		this.diecut = diecut;
	}

	public String getCreasing_line() {
		return creasing_line;
	}

	public void setCreasing_line(String creasing_line) {
		this.creasing_line = creasing_line;
	}

	public String getTotal_price() {
		return total_price;
	}

	public void setTotal_price(String total_price) {
		this.total_price = total_price;
	}

	public String getMarkup() {
		return markup;
	}

	public void setMarkup(String markup) {
		this.markup = markup;
	}

	public String getFinal_price() {
		return final_price;
	}

	public void setFinal_price(String final_price) {
		this.final_price = final_price;
	}

	public String getPerfect_bind() {
		return perfect_bind;
	}

	public void setPerfect_bind(String perfect_bind) {
		this.perfect_bind = perfect_bind;
	}

	public String getStaple_bind() {
		return staple_bind;
	}

	public void setStaple_bind(String staple_bind) {
		this.staple_bind = staple_bind;
	}

	public String getHardcover() {
		return hardcover;
	}

	public void setHardcover(String hardcover) {
		this.hardcover = hardcover;
	}

	public String getFolding() {
		return folding;
	}

	public void setFolding(String folding) {
		this.folding = folding;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", insertable = false, updatable = false)
	private @Getter @Setter AppUser appuser;
}
