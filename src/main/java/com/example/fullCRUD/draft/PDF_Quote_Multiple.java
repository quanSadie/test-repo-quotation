package com.example.fullCRUD.draft;

import com.example.fullCRUD.paper.*;
import com.example.fullCRUD.user.AppUser;
import com.example.fullCRUD.user.MyUserDetails;
import com.example.fullCRUD.user.UserService;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RequiredArgsConstructor
public class PDF_Quote_Multiple {
    private final Draft draft;

    private final PaperTypeService paperTypeService;

    private final PaperGrammageReposistory paperGrammageReposistory;

    private final PaperService paperService;

    private final UserService userService;



    private void writeTableHeader(PdfPTable table, Document document) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        MyUserDetails userdetails = (MyUserDetails) authentication.getPrincipal();
        AppUser currentUser = userdetails.getUser();
        Long companyId = currentUser.getCompany().getId();
        PaperType paperType =  null;
        List<PaperCategory> paperCategoryList = paperService.allPapersCompany(companyId);


        Font font = FontFactory.getFont(FontFactory.HELVETICA, 10);
        Font font_bold = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10);
        Font font_title = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 24);
        PdfPCell cell = new PdfPCell();


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




        // ----------------------------------------------------------------
        // multiple quantity
        List<String> quantity_arr = extractDataAfterQuantity(draft.getQuantity_per_design()); // ---------------------------------
        System.out.println("multiquantity: " + draft.getQuantity_per_design());
        List<String> finalselling_price_arr = extractDataAfterQuantity(draft.getFinal_selling_price());
        List<String> finished_quantity_arr = extractDataAfterQuantity(draft.getFinish_product_total_quantity());
        List<String> pptype_arr = extractDataAfterQuantity(draft.getPaper_type());
        List<String> glosslam_arr = extractDataAfterQuantity(draft.getGloss_lam());
        List<String> mattlam_arr = extractDataAfterQuantity(draft.getMatt_lam());
        List<String> waterbased_arr = extractDataAfterQuantity(draft.getWater_based());
        List<String> uv_arr = extractDataAfterQuantity(draft.getUv());
        List<String> varnish_arr = extractDataAfterQuantity(draft.getVarnish());
        List<String> spotuv_arr = extractDataAfterQuantity(draft.getSpot_uv());
        List<String> softtouch_arr = extractDataAfterQuantity(draft.getSofttouch());
        List<String> ed_arr = extractDataAfterQuantity(draft.getEmboss_deboss());
        List<String> hs_arr = extractDataAfterQuantity(draft.getHot_stamping());
        List<String> diecut_arr = extractDataAfterQuantity(draft.getDiecut());
        List<String> creasing_arr = extractDataAfterQuantity(draft.getCreasing_line());
        List<String> perfectbind_arr = extractDataAfterQuantity(draft.getPerfect_bind());
        List<String> staplebind_arr = extractDataAfterQuantity(draft.getStaple_bind());
        List<String> hardcover_arr = extractDataAfterQuantity(draft.getHardcover());
        List<String> fold_arr = extractDataAfterQuantity(draft.getFolding());
        List<String> other_arr = extractDataAfterQuantity(draft.getOther_finishing());



        for (int index = 0; index < quantity_arr.size(); index++) {
            if (index >= 1) {
                document.newPage();
            }
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
            cell.setPhrase(new Phrase("\n" + quantity_arr.get(index), font));
            table.addCell(cell);
            cell.setPhrase(new Phrase("\n" + Double.parseDouble(finalselling_price_arr.get(index)) / Double.parseDouble(quantity_arr.get(index)), font));
            table.addCell(cell);
            cell.setPhrase(new Phrase("\n" + finished_quantity_arr.get(index), font));
            table.addCell(cell);
            // Size          ----------------------------------------------------------------

            // Material ----------------------------------------------------------------

            for (PaperCategory p : paperCategoryList) {
                for (PaperGrammage pg: p.getPgList()) {
                    for (PaperType pt: pg.getPtList()) {
                        if (pt.getType().equals(pptype_arr.get(index))){
                            paperType = pt;
                        }
                    }
                }
            }

            assert paperType != null;
            String ppg = paperGrammageReposistory.getReferenceById(paperType.getPg_id()).getGrammage();
            cell.setPhrase(new Phrase("Material\n   " + ppg + "\n"
                    + "   Color " + draft.getColor() + "\n"
                    + "   Total Design: " + draft.getTotal_designs() + "\n"
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

            if (!glosslam_arr.get(index).equals("Null")) {
                matcher = pattern.matcher(glosslam_arr.get(index));
                String price = "";
                if (matcher.find()) {
                    price = matcher.group(1);
                }
                priceArray.add(price);
                finishing.append("\nGloss Lamination\n");
            }

            if (!mattlam_arr.get(index).equals("Null")) {
                matcher = pattern.matcher(mattlam_arr.get(index));
                String price = "";
                if (matcher.find()) {
                    price = matcher.group(1);
                }
                priceArray.add(price);
                finishing.append("Matt Lamination\n");
            }

            if (!waterbased_arr.get(index).equals("Null")) {
                matcher = pattern.matcher(waterbased_arr.get(index));
                String price = "";
                if (matcher.find()) {
                    price = matcher.group(1);
                }
                priceArray.add(price);
                finishing.append("Water Based\n");
            }

            if (!uv_arr.get(index).equals("Null")) {
                matcher = pattern.matcher(uv_arr.get(index));
                String price = "";
                if (matcher.find()) {
                    price = matcher.group(1);
                }
                priceArray.add(price);
                finishing.append("UV\n");
            }

            if (!varnish_arr.get(index).equals("Null")) {
                matcher = pattern.matcher(varnish_arr.get(index));
                String price = "";
                if (matcher.find()) {
                    price = matcher.group(1);
                }
                priceArray.add(price);
                finishing.append("Varnish\n");
            }

            if (!spotuv_arr.get(index).equals("Null")) {
                matcher = pattern.matcher(spotuv_arr.get(index));
                String price = "";
                if (matcher.find()) {
                    price = matcher.group(1);
                }
                priceArray.add(price);
                finishing.append("Spot UV\n");
            }

            if (!softtouch_arr.get(index).equals("Null")) {
                matcher = pattern.matcher(softtouch_arr.get(index));
                String price = "";
                if (matcher.find()) {
                    price = matcher.group(1);
                }
                priceArray.add(price);
                finishing.append("Soft Touch Lamination\n");
            }

            if (!ed_arr.get(index).equals("Null")) {
                matcher = pattern.matcher(ed_arr.get(index));
                String price = "";
                if (matcher.find()) {
                    price = matcher.group(1);
                }
                priceArray.add(price);
                finishing.append("Emboss/Deboss\n");
            }

            if (!hs_arr.get(index).equals("Null")) {
                matcher = pattern.matcher(hs_arr.get(index));
                String price = "";
                if (matcher.find()) {
                    price = matcher.group(1);
                }
                priceArray.add(price);
                finishing.append("Hot Stamping\n");
            }

            if (!diecut_arr.get(index).equals("Null")) {
                matcher = pattern.matcher(diecut_arr.get(index));
                String price = "";
                if (matcher.find()) {
                    price = matcher.group(1);
                }
                priceArray.add(price);
                finishing.append("Diecut\n");
            }

            if (!perfectbind_arr.get(index).equals("Null")) {
                matcher = pattern.matcher(perfectbind_arr.get(index));
                String price = "";
                if (matcher.find()) {
                    price = matcher.group(1);
                }
                priceArray.add(price);
                finishing.append("Perfect Bind\n");
            }

            if (!staplebind_arr.get(index).equals("Null")) {
                matcher = pattern.matcher(staplebind_arr.get(index));
                String price = "";
                if (matcher.find()) {
                    price = matcher.group(1);
                }
                priceArray.add(price);
                finishing.append("Staple Bind\n");
            }

            if (!hardcover_arr.get(index).equals("Null")) {
                matcher = pattern.matcher(hardcover_arr.get(index));
                String price = "";
                if (matcher.find()) {
                    price = matcher.group(1);
                }
                priceArray.add(price);
                finishing.append("Perfect Bind Threadsew\n");
            }

            if (!creasing_arr.get(index).equals("Null")) {
                matcher = pattern.matcher(creasing_arr.get(index));
                String price = "";
                if (matcher.find()) {
                    price = matcher.group(1);
                }
                priceArray.add(price);
                finishing.append("Creasing Line\n");
            }

            if (!fold_arr.get(index).equals("Null")) {
                matcher = pattern.matcher(fold_arr.get(index));
                String price = "";
                if (matcher.find()) {
                    price = matcher.group(1);
                }
                priceArray.add(price);
                finishing.append("Folding\n");
            }

            if (other_arr.get(index) != null) {

                String[] part10 = other_arr.get(index).split("-");
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
            cell.setPhrase(new Phrase("" + finalselling_price_arr.get(index) + "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", font_bold));
            table.addCell(cell);



        }




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

        writeTableHeader(table, document);


        document.add(table);


        document.close();

    }

    // ----------------------------------------------------------------
    public static double extractNumericValue(String s1) {
        // Remove all non-numeric characters except period (for decimal point) and comma (for thousand separator)
        String numericString = s1.replaceAll("[^0-9.,]", "");

        // Replace comma with period for decimal values (e.g., 12,32 -> 12.32)
        numericString = numericString.replace(",", ".");

        // Parse the string as a double (decimal) or integer
        System.out.println("Number: " + numericString);
        return Double.parseDouble(numericString);
    }
    // ----------------------------------------------------------------
    public static List<String> extractDataAfterQuantity(String input) {
        List<String> extractedData = new ArrayList<>();
        String pattern = "&&&Quantity:(.*?)(?=&&&|$)";

        Pattern regexPattern = Pattern.compile(pattern);
        Matcher matcher = regexPattern.matcher(input);

        while (matcher.find()) {
            String extracted = matcher.group(1);
            extractedData.add(extracted);
        }

        return extractedData;
    }
}
