package com.example.fullCRUD.draft;

import java.awt.Color;
import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import com.example.fullCRUD.user.UserService;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class PDF_Export_Draft {
	private final Draft draft;

	private final UserService userService;
	private void writeTableHeader(PdfPTable table) {
		PdfPCell cell = new PdfPCell();

		cell.setPadding(5);

		Font font = FontFactory.getFont(FontFactory.HELVETICA);
		font.setColor(Color.BLACK);


		if (draft.getState().equals("Rejected")) {
			cell.setBackgroundColor(Color.decode("#CFBF95"));
			cell.setPhrase(new Phrase("Reason for rejection", font));
			table.addCell(cell);
			cell.setBackgroundColor(Color.WHITE);
			table.addCell(draft.getReason());
		}
		// -----------------------------------
		cell.setBackgroundColor(Color.decode("#CFBF95"));
		cell.setPhrase(new Phrase("Title", font));
		table.addCell(cell);
		cell.setBackgroundColor(Color.WHITE);
		table.addCell(draft.getTitle());

		cell.setBackgroundColor(Color.decode("#CFBF95"));
		cell.setPhrase(new Phrase("User: ", font));
		table.addCell(cell);
		cell.setBackgroundColor(Color.WHITE);
		table.addCell(userService.get(draft.getUser_id()).getFullName());

		cell.setBackgroundColor(Color.decode("#CFBF95"));
		cell.setPhrase(new Phrase("Phone: ", font));
		table.addCell(cell);
		cell.setBackgroundColor(Color.WHITE);
		table.addCell(userService.get(draft.getUser_id()).getPhone());


		cell.setBackgroundColor(Color.decode("#CFBF95"));
		cell.setPhrase(new Phrase("Delivery date", font));
		table.addCell(cell);
		cell.setBackgroundColor(Color.WHITE);
		table.addCell(draft.getDeliverydate());

		cell.setBackgroundColor(Color.decode("#CFBF95"));
		cell.setPhrase(new Phrase("Size", font));
		table.addCell(cell);
		cell.setBorder(Rectangle.NO_BORDER);
		cell.setBackgroundColor(Color.WHITE);
		table.addCell("");
		String size = draft.getSize();
		String[] part1 = size.split("-");
		for (String item : part1) {
			cell.setPhrase(new Phrase("", font));
			table.addCell(cell);
			table.addCell(item);
		}

		cell.setBorder(Rectangle.ALIGN_CENTER);
		cell.setBackgroundColor(Color.decode("#CFBF95"));
		cell.setPhrase(new Phrase("Quantity Per Design", font));
		table.addCell(cell);
		cell.setBackgroundColor(Color.WHITE);
		table.addCell(draft.getQuantity_per_design());

		cell.setBackgroundColor(Color.decode("#CFBF95"));
		cell.setPhrase(new Phrase("Is Book Inner Content?", font));
		table.addCell(cell);
		cell.setBackgroundColor(Color.WHITE);
		String innercontent = draft.isIs_book_inner_content() ? "Yes" : "No";
		table.addCell(innercontent);

		cell.setBackgroundColor(Color.decode("#CFBF95"));
		cell.setPhrase(new Phrase("Bleed", font));
		table.addCell(cell);
		cell.setBorder(Rectangle.NO_BORDER);
		cell.setBackgroundColor(Color.WHITE);
		table.addCell("");
		String bleed = draft.getBleed_width_length();
		String[] part2 = bleed.split("-");
		for (String value : part2) {
			cell.setPhrase(new Phrase("", font));
			table.addCell(cell);
			table.addCell(value);
		}

		cell.setBorder(Rectangle.ALIGN_CENTER);
		cell.setBackgroundColor(Color.decode("#CFBF95"));
		cell.setPhrase(new Phrase("Final Size With Bleed", font));
		table.addCell(cell);
		cell.setBackgroundColor(Color.WHITE);
		cell.setBorder(Rectangle.NO_BORDER);
		table.addCell("");
		String bleedfinal = draft.getFinal_width_length_bleed();
		String[] part3 = bleedfinal.split("-");
		for (String value : part3) {
			cell.setPhrase(new Phrase("", font));
			table.addCell(cell);
			table.addCell(value);
		}

		cell.setBorder(Rectangle.ALIGN_CENTER);
		cell.setBackgroundColor(Color.decode("#CFBF95"));
		cell.setPhrase(new Phrase("Max Ups Per Paper", font));
		table.addCell(cell);
		cell.setBackgroundColor(Color.WHITE);
		String psize = draft.getMax_ups_per_paper();
		table.addCell(String.valueOf(psize));

		cell.setBackgroundColor(Color.decode("#CFBF95"));
		cell.setPhrase(new Phrase("Ups After Cut", font));
		table.addCell(cell);
		cell.setBackgroundColor(Color.WHITE);
		String psize1 = draft.getUps_after_cut();
		table.addCell(String.valueOf(psize1));

		cell.setBackgroundColor(Color.decode("#CFBF95"));
		cell.setPhrase(new Phrase("Horizontal Ups", font));
		table.addCell(cell);
		cell.setBackgroundColor(Color.WHITE);
		String psize2 = draft.getHorizontal_ups();
		table.addCell(String.valueOf(psize2));

		cell.setBackgroundColor(Color.decode("#CFBF95"));
		cell.setPhrase(new Phrase("Vertical Ups", font));
		table.addCell(cell);
		cell.setBackgroundColor(Color.WHITE);
		String psize3 = draft.getVertical_ups();
		table.addCell(String.valueOf(psize3));

		cell.setBackgroundColor(Color.decode("#CFBF95"));
		cell.setPhrase(new Phrase("Plates Needed", font));
		table.addCell(cell);
		cell.setBackgroundColor(Color.WHITE);
		String psize4 = draft.getPlates_needed();
		table.addCell(String.valueOf(psize4));

		cell.setBackgroundColor(Color.decode("#CFBF95"));
		cell.setPhrase(new Phrase("Paper Needed", font));
		table.addCell(cell);
		cell.setBackgroundColor(Color.WHITE);
		String psize5 = draft.getPaper_needed();
		table.addCell(String.valueOf(psize5));

		cell.setBackgroundColor(Color.decode("#CFBF95"));
		cell.setPhrase(new Phrase("Testing Paper Needed", font));
		table.addCell(cell);
		cell.setBackgroundColor(Color.WHITE);
		String psize6 = draft.getTesting_paper_needed();
		table.addCell(String.valueOf(psize6));

		cell.setBackgroundColor(Color.decode("#CFBF95"));
		cell.setPhrase(new Phrase("Cut Amount", font));
		table.addCell(cell);
		cell.setBackgroundColor(Color.WHITE);
		String psize7 = draft.getCut_amount();
		table.addCell(String.valueOf(psize7));

		cell.setBackgroundColor(Color.decode("#CFBF95"));
		cell.setPhrase(new Phrase("Testing Paper Needed For Finishing", font));
		table.addCell(cell);
		cell.setBackgroundColor(Color.WHITE);
		String psize8 = draft.getTesting_paper_finishing();
		table.addCell(String.valueOf(psize8));

		cell.setBackgroundColor(Color.decode("#CFBF95"));
		cell.setPhrase(new Phrase("Actual Ups Per Paper", font));
		table.addCell(cell);
		cell.setBackgroundColor(Color.WHITE);
		String psize9 = draft.getActual_ups_paper();
		table.addCell(String.valueOf(psize9));

		cell.setBackgroundColor(Color.decode("#CFBF95"));
		cell.setPhrase(new Phrase("Customer Supply Paper", font));
		table.addCell(cell);
		cell.setBackgroundColor(Color.WHITE);
		String customer_supply = draft.isCustomer_supply_paper() ? "Yes" : "No";
		table.addCell(customer_supply);

		cell.setBackgroundColor(Color.decode("#CFBF95"));
		cell.setPhrase(new Phrase("Customer Supply Plate", font));
		table.addCell(cell);
		cell.setBackgroundColor(Color.WHITE);
		String customer_supply_plate = draft.isCustomer_supply_plate() ? "Yes" : "No";
		table.addCell(customer_supply_plate);

		cell.setBackgroundColor(Color.decode("#CFBF95"));
		cell.setPhrase(new Phrase("Is Card?", font));
		table.addCell(cell);
		cell.setBackgroundColor(Color.WHITE);
		String is_card = draft.isIs_card() ? "Yes" : "No";
		table.addCell(is_card);

		cell.setBackgroundColor(Color.decode("#CFBF95"));
		cell.setPhrase(new Phrase("Paper", font));
		table.addCell(cell);
		cell.setBackgroundColor(Color.WHITE);
		table.addCell(draft.getPaper_type());

		cell.setBackgroundColor(Color.decode("#CFBF95"));
		cell.setPhrase(new Phrase("Urgent Print?", font));
		table.addCell(cell);
		cell.setBackgroundColor(Color.WHITE);
		String urgent_print = draft.isUrgent_print() ? "Yes" : "No";
		table.addCell(urgent_print);

		cell.setBackgroundColor(Color.decode("#CFBF95"));
		cell.setPhrase(new Phrase("Color", font));
		table.addCell(cell);
		cell.setBackgroundColor(Color.WHITE);
		table.addCell(draft.getColor());

		cell.setBackgroundColor(Color.decode("#CFBF95"));
		cell.setPhrase(new Phrase("Total Designs", font));
		table.addCell(cell);
		cell.setBackgroundColor(Color.WHITE);
		table.addCell(draft.getTotal_designs());

		cell.setBackgroundColor(Color.decode("#CFBF95"));
		cell.setPhrase(new Phrase("Finish Product Total Quantity", font));
		table.addCell(cell);
		cell.setBackgroundColor(Color.WHITE);
		table.addCell(draft.getFinish_product_total_quantity());

		if (!draft.getGloss_lam().equals("Null")) {
			cell.setBackgroundColor(Color.decode("#CFBF95"));
			cell.setPhrase(new Phrase("Gloss Lamination", font));
			table.addCell(cell);
			cell.setBackgroundColor(Color.WHITE);
			table.addCell("");
			String gloss = draft.getGloss_lam();
			String[] part5 = gloss.split("-");
			for (String s : part5) {
				cell.setPhrase(new Phrase("", font));
				table.addCell(cell);
				table.addCell(s);
			}
		}

		if (!draft.getMatt_lam().equals("Null")) {
			cell.setBackgroundColor(Color.decode("#CFBF95"));
			cell.setPhrase(new Phrase("Matt Lamination", font));
			table.addCell(cell);
			cell.setBackgroundColor(Color.WHITE);
			table.addCell("");
			String matt = draft.getMatt_lam();
			String[] part6 = matt.split("-");
			for (String s : part6) {
				cell.setPhrase(new Phrase("", font));
				table.addCell(cell);
				table.addCell(s);
			}
		}

		if (!draft.getWater_based().equals("Null")) {
			cell.setBackgroundColor(Color.decode("#CFBF95"));
			cell.setPhrase(new Phrase("Water Based", font));
			table.addCell(cell);
			cell.setBackgroundColor(Color.WHITE);
			table.addCell("");
			String water = draft.getWater_based();
			String[] part7 = water.split("-");
			for (String s : part7) {
				cell.setPhrase(new Phrase("", font));
				table.addCell(cell);
				table.addCell(s);
			}
		}

		if (!draft.getUv().equals("Null")) {
			cell.setBackgroundColor(Color.decode("#CFBF95"));
			cell.setPhrase(new Phrase("UV", font));
			table.addCell(cell);
			cell.setBackgroundColor(Color.WHITE);
			table.addCell("");
			String uv = draft.getUv();
			String[] part8 = uv.split("-");
			for (String s : part8) {
				cell.setPhrase(new Phrase("", font));
				table.addCell(cell);
				table.addCell(s);
			}
		}

		if (!draft.getVarnish().equals("Null")) {
			cell.setBackgroundColor(Color.decode("#CFBF95"));
			cell.setPhrase(new Phrase("Varnish", font));
			table.addCell(cell);
			cell.setBackgroundColor(Color.WHITE);
			table.addCell("");
			String varnish = draft.getVarnish();
			String[] part9 = varnish.split("-");
			for (String s : part9) {
				cell.setPhrase(new Phrase("", font));
				table.addCell(cell);
				table.addCell(s);
			}
		}

		if (!draft.getSpot_uv().equals("Null")) {
			cell.setBackgroundColor(Color.decode("#CFBF95"));
			cell.setPhrase(new Phrase("Spot UV", font));
			table.addCell(cell);
			cell.setBackgroundColor(Color.WHITE);
			table.addCell("");
			String spotuv = draft.getSpot_uv();
			String[] part10 = spotuv.split(",");
			for (String s : part10) {
				cell.setPhrase(new Phrase("", font));
				table.addCell(cell);
				table.addCell(s);
			}
		}

		if (!draft.getSofttouch().equals("Null")) {
			cell.setBackgroundColor(Color.decode("#CFBF95"));
			cell.setPhrase(new Phrase("Soft Touch Lamination", font));
			table.addCell(cell);
			cell.setBackgroundColor(Color.WHITE);
			table.addCell("");
			String softtouch = draft.getSofttouch();
			if (softtouch == null) {
				softtouch = "";
			}
			String[] part105 = softtouch.split(",");
			for (String s : part105) {
				cell.setPhrase(new Phrase("", font));
				table.addCell(cell);
				table.addCell(s);
			}
		}

		if (!draft.getEmboss_deboss().equals("Null")) {
			cell.setBackgroundColor(Color.decode("#CFBF95"));
			cell.setPhrase(new Phrase("Emboss/Deboss", font));
			table.addCell(cell);
			cell.setBackgroundColor(Color.WHITE);
			table.addCell("");
			String boss = draft.getEmboss_deboss();
			String[] part11 = boss.split(",");
			for (String s : part11) {
				cell.setPhrase(new Phrase("", font));
				table.addCell(cell);
				table.addCell(s);
			}
		}

		if (!draft.getHot_stamping().equals("Null")) {
			cell.setBackgroundColor(Color.decode("#CFBF95"));
			cell.setPhrase(new Phrase("Hot Stamping", font));
			table.addCell(cell);
			cell.setBackgroundColor(Color.WHITE);
			table.addCell("");
			String hs = draft.getHot_stamping();
			String[] part12 = hs.split(",");
			for (String s : part12) {
				cell.setPhrase(new Phrase("", font));
				table.addCell(cell);
				table.addCell(s);
			}
		}

		if (!draft.getDiecut().equals("Null")) {
			cell.setBackgroundColor(Color.decode("#CFBF95"));
			cell.setPhrase(new Phrase("Diecut", font));
			table.addCell(cell);
			cell.setBackgroundColor(Color.WHITE);
			table.addCell("");
			String diecut = draft.getDiecut();
			String[] part13 = diecut.split(",");
			for (String s : part13) {
				cell.setPhrase(new Phrase("", font));
				table.addCell(cell);
				table.addCell(s);
			}
		}

		if (!draft.getPerfect_bind().equals("Null")) {
			cell.setBackgroundColor(Color.decode("#CFBF95"));
			cell.setPhrase(new Phrase("Perfect Bind", font));
			table.addCell(cell);
			cell.setBackgroundColor(Color.WHITE);
			table.addCell("");
			String perfect_bind = draft.getPerfect_bind();
			String[] partperfectbind = perfect_bind.split(",");
			for (String s : partperfectbind) {
				cell.setPhrase(new Phrase("", font));
				table.addCell(cell);
				table.addCell(s);
			}

		}

		if (!draft.getStaple_bind().equals("Null")) {
			cell.setBackgroundColor(Color.decode("#CFBF95"));
			cell.setPhrase(new Phrase("Staple Bind", font));
			table.addCell(cell);
			cell.setBackgroundColor(Color.WHITE);
			table.addCell("");
			String staple_bind = draft.getStaple_bind();
			String[] partstaplebind = staple_bind.split(",");
			for (String s : partstaplebind) {
				cell.setPhrase(new Phrase("", font));
				table.addCell(cell);
				table.addCell(s);
			}
		}

		if (!draft.getHardcover().equals("Null")) {
			cell.setBackgroundColor(Color.decode("#CFBF95"));
			cell.setPhrase(new Phrase("Perfect Bind (Thread Sew)", font));
			table.addCell(cell);
			cell.setBackgroundColor(Color.WHITE);
			table.addCell("");
			String hard_cover = draft.getHardcover();
			String[] hardcv = hard_cover.split(",");
			for (String s : hardcv) {
				cell.setPhrase(new Phrase("", font));
				table.addCell(cell);
				table.addCell(s);
			}
		}

		if (!draft.getCreasing_line().equals("Null")) {
			cell.setBackgroundColor(Color.decode("#CFBF95"));
			cell.setPhrase(new Phrase("Creasing Line", font));
			table.addCell(cell);
			cell.setBackgroundColor(Color.WHITE);
			table.addCell("");
			String creasing = draft.getCreasing_line();
			String[] part14 = creasing.split("-");
			for (String s : part14) {
				cell.setPhrase(new Phrase("", font));
				table.addCell(cell);
				table.addCell(s);
			}
		}

		if (!draft.getFolding().equals("Null")) {
			cell.setBackgroundColor(Color.decode("#CFBF95"));
			cell.setPhrase(new Phrase("Folding", font));
			table.addCell(cell);
			cell.setBackgroundColor(Color.WHITE);
			table.addCell("");
			String folds = draft.getFolding();
			String[] partfolds = folds.split(",");
			for (String partfold : partfolds) {
				cell.setPhrase(new Phrase("", font));
				table.addCell(cell);
				table.addCell(partfold);
			}
		}

		if (draft.getOther_finishing() != null) {
			String[] part20 = draft.getOther_finishing().split("-");
			for (String s : part20) {
				String[] part21 = s.split(",");
				int other_finishing_count = 1;
				for (String s1 : part21) {
					if (other_finishing_count % 2 == 1) {
						cell.setBackgroundColor(Color.decode("#CFBF95"));
						cell.setPhrase(new Phrase(s1, font));
						table.addCell(cell);
					}
					if (other_finishing_count % 2 == 0) {
						cell.setBackgroundColor(Color.WHITE);
						table.addCell(s1);
					}
					other_finishing_count ++;
				}
			}

		}
	}

	public void export(HttpServletResponse response) throws DocumentException, IOException {
		Document document = new Document(PageSize.A4);
		PdfWriter.getInstance(document, response.getOutputStream());

		document.open();
		Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
		font.setSize(18);
		font.setColor(Color.BLUE);

		Paragraph p = new Paragraph("Job Sheet", font);
		p.setAlignment(Paragraph.ALIGN_CENTER);

		document.add(p);

		PdfPTable table = new PdfPTable(2);
		float[] columnWidths = { 3f, 7f };
		table.setWidths(columnWidths);
		table.setWidthPercentage(100f);
		table.setSpacingBefore(10);

		writeTableHeader(table);

		document.add(table);

		document.close();

	}
}
