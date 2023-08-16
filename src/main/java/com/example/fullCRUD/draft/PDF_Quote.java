package com.example.fullCRUD.draft;

import java.awt.Color;
import java.io.IOException;
import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import com.example.fullCRUD.paper.*;
import com.example.fullCRUD.user.AppUser;
import com.example.fullCRUD.user.MyUserDetails;
import com.example.fullCRUD.user.UserService;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import static javax.swing.text.StyleConstants.FontFamily;

@RequiredArgsConstructor
public class PDF_Quote {
    private final Draft draft;

    private final PaperTypeService paperTypeService;

    private final PaperGrammageReposistory paperGrammageReposistory;

    private final PaperService paperService;

    private final UserService userService;



    private void writeTableHeader(PdfPTable table) {
        Font font = FontFactory.getFont(FontFactory.HELVETICA, 10);
        Font font_bold = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10);
        Font font_title = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 24);
        PdfPCell cell = new PdfPCell();

        //        cell.setPadding(5);

        //        Font font = FontFactory.getFont(FontFactory.HELVETICA);
        //        font.setColor(Color.BLACK);

        // Header fields include Quote title, created date, expected delivery date
        cell.setBorder(Rectangle.NO_BORDER);
        cell.setPhrase(new Phrase("Quote", font_title));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Created Date", font_bold));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Expected Delivery Date", font_bold));
        table.addCell(cell);
        cell.setPhrase(new Phrase("", font));
        table.addCell(cell);

        cell.setBorder(Rectangle.NO_BORDER);
        cell.setPhrase(new Phrase("Title: " + draft.getTitle(), font_bold));
        table.addCell(cell);
        cell.setPhrase(new Phrase(draft.getSave_date(), font));
        table.addCell(cell);
        cell.setPhrase(new Phrase(draft.getDeliverydate(), font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("", font));
        table.addCell(cell);

        cell.setBorder(Rectangle.NO_BORDER);
        cell.setPhrase(new Phrase("\n\n\nUser: " + userService.get(draft.getUser_id()).getFullName()
                + "\nPhone: " + userService.get(draft.getUser_id()).getPhone(), font_bold));
        table.addCell(cell);
        table.addCell("");
        table.addCell("");
        table.addCell("");

        // line space
        table.addCell("");
        table.addCell("");
        table.addCell("");
        table.addCell("");
        table.addCell("");
        table.addCell("");
        table.addCell("");
        table.addCell("");
        table.addCell("");
        table.addCell("");
        table.addCell("");
        table.addCell("");

        cell.setBorder(PdfPCell.BOTTOM);
        cell.setPhrase(new Phrase("\n\n\nDescription", font_bold));
        table.addCell(cell);
        cell.setPhrase(new Phrase("\n\n\nQuantity", font_bold));
        table.addCell(cell);
        cell.setPhrase(new Phrase("\n\n\nUnit Price", font_bold));
        table.addCell(cell);
        cell.setPhrase(new Phrase("\n\n\nAmount MYR", font_bold));
        table.addCell(cell);

        cell.setBorder(Rectangle.NO_BORDER);

        // add table rows

        // handle "-" characters ----------------------------------------------------------------
        String str = draft.getSize();
        str = str.replace("-", "\n");
        String width1 = "";
        String length1 = "";
        String[] lines = str.split("\n");

        for (String line : lines) {
            String[] parts = line.split(":");
            if (parts[0].equals("Width")) {
                width1 = parts[1].trim();
            } else if (parts[0].equals("Length")) {
                length1 = parts[1].trim();
            }
        }
        String output = width1 + "mm x " + length1 + "mm";
        cell.setPhrase(new Phrase("\nSize\n   " + output + "\n ", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("\n" + draft.getQuantity_per_design(), font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("\n" + String.valueOf(draft.getFinal_selling_price() / Double.parseDouble(draft.getQuantity_per_design())), font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("\n" + draft.getFinish_product_total_quantity(), font));
        table.addCell(cell);
        // Size          ----------------------------------------------------------------

        // Material ----------------------------------------------------------------
//        String bookinner = "Yes";
//        if (!draft.isIs_book_inner_content()) {
//            bookinner = "No";
//        }
//        String customer_supply = draft.isCustomer_supply_paper() ? "Yes" : "No";
//        String customer_supply_plate = draft.isCustomer_supply_plate() ? "Yes" : "No";
//        String is_card = draft.isIs_card() ? "Yes" : "No";
//        String urgent_print = draft.isUrgent_print() ? "Yes" : "No";
//        String str1 = draft.getFinal_width_length_bleed();
//        str1 = str1.replace("-", "\n");
//        String width2 = "";
//        String length2 = "";
//        String[] lines1 = str1.split("\n");
//        for (String line : lines1) {
//            String[] parts = line.split(":");
//            if (parts[0].equals("Width")) {
//                width2 = parts[1].trim();
//            } else if (parts[0].equals("Length")) {
//                length2 = parts[1].trim();
//            }
//        }
//        String output1 = width2 + "mm x " + length2 + "mm";
        PaperType paperType =  null;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        MyUserDetails userdetails = (MyUserDetails) authentication.getPrincipal();
        AppUser currentUser = userdetails.getUser();
        Long companyId = currentUser.getCompany().getId();
        List<PaperCategory> paperCategoryList = paperService.allPapersCompany(companyId);
        for (PaperCategory p : paperCategoryList) {
            for (PaperGrammage pg: p.getPgList()) {
                for (PaperType pt: pg.getPtList()) {
                    if (pt.getType().equals(draft.getPaper_type())){
                        paperType = pt;
                    }
                }
            }
        }

        assert paperType != null;
        String ppg = paperGrammageReposistory.getReferenceById(paperType.getPg_id()).getGrammage();
        cell.setPhrase(new Phrase("Material\n   " + ppg + "\n"
                                    + "   Color " + draft.getColor() + "\n"
//                                    + "   Is Book Inner Content?: " + bookinner + "\n"
//                                    + "   Bleed: " + draft.getBleed_width_length() + "\n"
//                                    + "   Final Size With Bleed: " + output1 + "\n"
//                                    + "   Customer Supply Paper: " + customer_supply + "\n"
//                                    + "   Customer Supply Plate: " + customer_supply_plate + "\n"
//                                    + "   Is Card?: " + is_card + "\n"
//                                    + "   Urgent Print: " + urgent_print + "\n"
                                    + "   Total Design: " + draft.getTotal_designs() + "\n"
//                                    + "   Finished Product Total Quantity: " + draft.getFinish_product_total_quantity() + "\n"
                , font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("", font));
        table.addCell(cell);
        table.addCell("");
        // Material ----------------------------------------------------------------

        // finishing ----------------------------------------------------------------



        StringBuilder finishing = new StringBuilder();
        String regex = "Price:\\s*(\\d+(\\.\\d{2})?)";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher;
        ArrayList<String> priceArray = new ArrayList<>();
        if (!draft.getGloss_lam().equals("Null")) {
            matcher = pattern.matcher(draft.getGloss_lam());
            String price = "";
            if (matcher.find()) {
                price = matcher.group(1);
            }
            priceArray.add(price);
            finishing.append("\nGloss Lamination\n");
        }

        if (!draft.getMatt_lam().equals("Null")) {
            matcher = pattern.matcher(draft.getMatt_lam());
            String price = "";
            if (matcher.find()) {
                price = matcher.group(1);
            }
            priceArray.add(price);
            finishing.append("Matt Lamination\n");
        }

        if (!draft.getWater_based().equals("Null")) {
            matcher = pattern.matcher(draft.getWater_based());
            String price = "";
            if (matcher.find()) {
                price = matcher.group(1);
            }
            priceArray.add(price);
            finishing.append("Water Based\n");
        }

        if (!draft.getUv().equals("Null")) {
            matcher = pattern.matcher(draft.getUv());
            String price = "";
            if (matcher.find()) {
                price = matcher.group(1);
            }
            priceArray.add(price);
            finishing.append("UV\n");
        }

        if (!draft.getVarnish().equals("Null")) {
            matcher = pattern.matcher(draft.getVarnish());
            String price = "";
            if (matcher.find()) {
                price = matcher.group(1);
            }
            priceArray.add(price);
            finishing.append("Varnish\n");
        }

        if (!draft.getSpot_uv().equals("Null")) {
            matcher = pattern.matcher(draft.getSpot_uv());
            String price = "";
            if (matcher.find()) {
                price = matcher.group(1);
            }
            priceArray.add(price);
            finishing.append("Spot UV\n");
        }

        if (!draft.getSofttouch().equals("Null")) {
            matcher = pattern.matcher(draft.getSofttouch());
            String price = "";
            if (matcher.find()) {
                price = matcher.group(1);
            }
            priceArray.add(price);
            finishing.append("Soft Touch Lamination\n");
        }

        if (!draft.getEmboss_deboss().equals("Null")) {
            matcher = pattern.matcher(draft.getEmboss_deboss());
            String price = "";
            if (matcher.find()) {
                price = matcher.group(1);
            }
            priceArray.add(price);
            finishing.append("Emboss/Deboss\n");
        }

        if (!draft.getHot_stamping().equals("Null")) {
            matcher = pattern.matcher(draft.getHot_stamping());
            String price = "";
            if (matcher.find()) {
                price = matcher.group(1);
            }
            priceArray.add(price);
            finishing.append("Hot Stamping\n");
        }

        if (!draft.getDiecut().equals("Null")) {
            matcher = pattern.matcher(draft.getDiecut());
            String price = "";
            if (matcher.find()) {
                price = matcher.group(1);
            }
            priceArray.add(price);
            finishing.append("Diecut\n");
        }

        if (!draft.getPerfect_bind().equals("Null")) {
            matcher = pattern.matcher(draft.getPerfect_bind());
            String price = "";
            if (matcher.find()) {
                price = matcher.group(1);
            }
            priceArray.add(price);
            finishing.append("Perfect Bind\n");
        }

        if (!draft.getStaple_bind().equals("Null")) {
            matcher = pattern.matcher(draft.getStaple_bind());
            String price = "";
            if (matcher.find()) {
                price = matcher.group(1);
            }
            priceArray.add(price);
            finishing.append("Staple Bind\n");
        }

        if (!draft.getHardcover().equals("Null")) {
            matcher = pattern.matcher(draft.getHardcover());
            String price = "";
            if (matcher.find()) {
                price = matcher.group(1);
            }
            priceArray.add(price);
            finishing.append("Perfect Bind Threadsew\n");
        }

        if (!draft.getCreasing_line().equals("Null")) {
            matcher = pattern.matcher(draft.getCreasing_line());
            String price = "";
            if (matcher.find()) {
                price = matcher.group(1);
            }
            priceArray.add(price);
            finishing.append("Creasing Line\n");
        }

        if (!draft.getFolding().equals("Null")) {
            matcher = pattern.matcher(draft.getFolding());
            String price = "";
            if (matcher.find()) {
                price = matcher.group(1);
            }
            priceArray.add(price);
            finishing.append("Folding\n");
        }

        if (draft.getOther_finishing() != null) {

            String[] part10 = draft.getOther_finishing().split("-");
            for (String s : part10) {
                String[] part11 = s.split(",");
                int other_finishing_count = 1;
                for (String s1 : part11) {
                    if (s1 != null && s1.length() > 0) {
                        if (other_finishing_count % 2 == 1) {
                            finishing.append(s1).append("\n");
                        }
                        if (other_finishing_count % 2 == 0) {
                            priceArray.add(String.valueOf(extractNumericValue(s1)));
                        }
                        other_finishing_count ++;
                    }
                }
            }
        }

        if (finishing.length()>0) {
            cell.setBorder(PdfPCell.BOTTOM);
            cell.setPhrase(new Phrase("\n\nFinishing", font_bold));
            table.addCell(cell);
            cell.setPhrase(new Phrase("\n\nPrice", font_bold));
            table.addCell(cell);
            cell.setPhrase(new Phrase("", font_bold));
            table.addCell(cell);
            cell.setPhrase(new Phrase("", font));
            table.addCell(cell);
            cell.setBorder(Rectangle.NO_BORDER);


            cell.setPhrase(new Phrase(finishing.toString(), font));
            table.addCell(cell);
            StringBuilder finishingprice = new StringBuilder("");
            for (String i: priceArray) {
                finishingprice.append(i).append("\n");
            }
            cell.setPhrase(new Phrase(finishingprice.toString(), font));
            table.addCell(cell);
            table.addCell("");
            table.addCell("");
        }


        // price
        cell.setBorder(PdfPCell.BOTTOM);
        cell.setPhrase(new Phrase("\n\n\nPrice", font_bold));
        table.addCell(cell);
        cell.setPhrase(new Phrase("\n\n\n", font_bold));
        table.addCell(cell);
        cell.setPhrase(new Phrase("\n\n\n", font_bold));
        table.addCell(cell);
        cell.setPhrase(new Phrase("\n\n\n", font_bold));
        table.addCell(cell);

        cell.setBorder(Rectangle.NO_BORDER);
        cell.setPhrase(new Phrase("", font_bold));
        table.addCell(cell);
        cell.setPhrase(new Phrase("", font_bold));
        table.addCell(cell);
        cell.setBorder(PdfPCell.HEADER);
        cell.setPhrase(new Phrase("Total Price", font_bold));
        table.addCell(cell);
        cell.setPhrase(new Phrase("" + draft.getFinal_selling_price(), font_bold));
        table.addCell(cell);


        // finishing ----------------------------------------------------------------
    }

    public void export(HttpServletResponse response) throws DocumentException, IOException {
        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, response.getOutputStream());

        document.open();

        PdfPTable table = new PdfPTable(4);
        float[] columnWidths = { 10f, 4f, 4f, 4f };
        table.setWidths(columnWidths);
        table.setWidthPercentage(100); // set table width to 100% of page width
        table.getDefaultCell().setBorder(Rectangle.NO_BORDER); // remove border around cells
        table.setSpacingBefore(100);
//        float[] columnWidths = { 3f, 7f };
//        table.setWidths(columnWidths);
//        table.setWidthPercentage(100f);
//        table.setSpacingBefore(10);

        writeTableHeader(table);


        document.add(table);


        document.close();

    }

    public static double extractNumericValue(String s1) {
        // Remove all non-numeric characters except period (for decimal point) and comma (for thousand separator)
        String numericString = s1.replaceAll("[^0-9.,]", "");

        // Replace comma with period for decimal values (e.g., 12,32 -> 12.32)
        numericString = numericString.replace(",", ".");

        // Parse the string as a double (decimal) or integer
        System.out.println("Number: " + numericString);
        return Double.parseDouble(numericString);
    }
}
