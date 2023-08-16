package com.example.fullCRUD.paper;

import com.example.fullCRUD.prop.Properties;
import com.example.fullCRUD.prop.PropertiesService;
import com.example.fullCRUD.user.MyUserDetails;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class UploadExcelController {
    private static final String UPLOAD_DIR = "/path/to/upload/dir";

    @Autowired
    private final PaperService service;

    @Autowired
    private final PaperGrammageReposistory paperGrammageReposistory;

    @Autowired
    private final PaperTypeService paperTypeService;

    @Autowired
    private final PropertiesService propertiesService;

    @PostMapping("/upload-excel")
    public String uploadFile(@RequestParam("file") MultipartFile file, Authentication authentication) {
        try {
            MyUserDetails userDetails = (MyUserDetails) authentication.getPrincipal();
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            File excelFile = new File(uploadDir.getAbsolutePath() + "/" + file.getOriginalFilename());
            file.transferTo(excelFile);

            // Read the Excel file and insert rows into the database
            readExcelFile(excelFile, userDetails.getUser().getAppUserId(), userDetails.getUser().getCompany_id());

            // Delete the uploaded file
            excelFile.delete();

            return "File uploaded and processed successfully!";
        } catch (IOException e) {
            e.printStackTrace();
            return "Error uploading file: " + e.getMessage();
        }
    }

    private void readExcelFile(File excelFile, Long id, long companyID) {
        try {
            List<Properties> props = propertiesService.listAllofUser(id);
            double unprintableArea = 3;
            double digitalUnprintableArea = 0;
            for (Properties prop : props) {
                if (prop.getProperty().equals("Unprintable Area(mm)")){
                    unprintableArea = prop.getNumber();
                }
                if (prop.getProperty().equals("Digital Unprintable Area (mm)")){
                    digitalUnprintableArea = prop.getNumber();
                }
            }
            FileInputStream inputStream = new FileInputStream(excelFile);
            Workbook workbook = new XSSFWorkbook(inputStream);
            Sheet sheet = workbook.getSheetAt(0);

            Iterator<Row> rowIterator = sheet.iterator();
            if (rowIterator.hasNext()) {
                // Skip the header row
                rowIterator.next();
            }

            while (rowIterator.hasNext()) {
                Row row = rowIterator.next();

                // Read the row data and insert into the database
                insertRowToDatabase(row, unprintableArea, digitalUnprintableArea, companyID);
            }

            workbook.close();
            inputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void insertRowToDatabase(Row row, double unprintableArea, double digitalUnprintableArea, long companyID) {
        try {
                // save category

                PaperCategory category = new PaperCategory();
                category.setCategory(row.getCell(0).getStringCellValue());
                service.saveByCompany(category);

                // save grammage
                PaperCategory currentCategory = service.getByCompany(category.getCategory(), companyID);
                PaperGrammage grammage = paperGrammageReposistory.findByCategoryAndGrammage(row.getCell(1).getStringCellValue(), currentCategory.getId());
                if (grammage == null) {
                    grammage = new PaperGrammage();
                    grammage.setGrammage(row.getCell(1).getStringCellValue());
                    grammage.setPc_id(currentCategory.getId());
                    paperGrammageReposistory.save(grammage);
                } else {
                    grammage.setGrammage(row.getCell(1).getStringCellValue());
                    paperGrammageReposistory.save(grammage);
                }


                    PaperGrammage currentGrammage = paperGrammageReposistory.findByCategoryAndGrammage(grammage.getGrammage(), currentCategory.getId());
                    PaperType paperType = paperTypeService.getByGrammage(currentGrammage.getId(),row.getCell(2).getStringCellValue());
                    if (paperType == null) {
                        paperType = new PaperType();
                        paperType.setPg_id(currentGrammage.getId());
                        paperType.setType(row.getCell(2).getStringCellValue());
                        paperType.setPrice(row.getCell(3).getNumericCellValue());
                        paperType.setWidth(row.getCell(4).getNumericCellValue());
                        paperType.setLength(row.getCell(5).getNumericCellValue());
                        paperType.setPerReamPackage((int) row.getCell(6).getNumericCellValue());
                        paperType.setPricePerCuts(paperType.getPrice() / paperType.getPerReamPackage());
                        paperType.setCut((int) row.getCell(8).getNumericCellValue());
                        paperType.setLengthAfterCut(paperType.getLength());
                        if (paperType.getCut() == 1) {
                            paperType.setLengthAfterCut(paperType.getLength() / 2);
                        }
                        paperType.setDigitalWidth(Math.ceil(paperType.getWidth()/2) + unprintableArea - digitalUnprintableArea);
                        paperType.setDigitalLength(Math.ceil(paperType.getLength()/2) + unprintableArea - digitalUnprintableArea);
                        paperType.setInchesWidth(row.getCell(12).getNumericCellValue());
                        paperType.setInchesLength(row.getCell(13).getNumericCellValue());
                        paperType.setInchesLengthAfterCut(paperType.getInchesLength());
                        if (paperType.getCut() == 1) {
                            paperType.setInchesLengthAfterCut(paperType.getInchesLength() / 2);
                        }
                        paperType.setInchesSquare(paperType.getInchesLength() * paperType.getInchesWidth());
                        paperType.setInchesSquareAfterCut(paperType.getInchesLengthAfterCut() * paperType.getInchesWidth());
                        paperType.setA3SquareInches(paperType.getInchesWidth() / 2 * paperType.getInchesLength() / 2);
                        if (paperType.getCut() == 1) {
                            paperType.setA3SquareInches(0);
                        }
                        paperType.setIscard(row.getCell(18).getBooleanCellValue());
                        paperType.setMaxUpForBooks((int) row.getCell(19).getNumericCellValue());
                        paperTypeService.save(paperType);
                    } else {
                        paperType.setPrice(row.getCell(3).getNumericCellValue());
                        paperType.setWidth(row.getCell(4).getNumericCellValue());
                        paperType.setLength(row.getCell(5).getNumericCellValue());
                        paperType.setPerReamPackage((int) row.getCell(6).getNumericCellValue());
                        paperType.setPricePerCuts(paperType.getPrice() / paperType.getPerReamPackage());
                        paperType.setCut((int) row.getCell(8).getNumericCellValue());
                        paperType.setLengthAfterCut(paperType.getLength());
                        if (paperType.getCut() == 1) {
                            paperType.setLengthAfterCut(paperType.getLength() / 2);
                        }
                        paperType.setDigitalWidth(Math.ceil(paperType.getWidth()/2) + unprintableArea - digitalUnprintableArea);
                        paperType.setDigitalLength(Math.ceil(paperType.getLength()/2) + unprintableArea - digitalUnprintableArea);
                        paperType.setInchesWidth(row.getCell(12).getNumericCellValue());
                        paperType.setInchesLength(row.getCell(13).getNumericCellValue());
                        paperType.setInchesLengthAfterCut(paperType.getInchesLength());
                        if (paperType.getCut() == 1) {
                            paperType.setInchesLengthAfterCut(paperType.getInchesLength() / 2);
                        }
                        paperType.setInchesSquare(paperType.getInchesLength() * paperType.getInchesWidth());
                        paperType.setInchesSquareAfterCut(paperType.getInchesLengthAfterCut() * paperType.getInchesWidth());
                        paperType.setA3SquareInches(paperType.getInchesWidth() / 2 * paperType.getInchesLength() / 2);
                        if (paperType.getCut() == 1) {
                            paperType.setA3SquareInches(0);
                        }
                        paperType.setIscard(row.getCell(18).getBooleanCellValue());
                        paperType.setMaxUpForBooks((int) row.getCell(19).getNumericCellValue());
                        paperType.setIsEnable(true);
                        paperTypeService.save(paperType);
                    }
                // save type


        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}

