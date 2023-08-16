package com.example.fullCRUD.paper;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class ExportPaper {
	private XSSFWorkbook workbook;
	private XSSFSheet sheet;
	private List<PaperCategory> listpp;

	public ExportPaper(List<PaperCategory> listpp) {
		this.listpp = listpp;
		workbook = new XSSFWorkbook();
	}

	private void writeHeaderLine() {
		sheet = workbook.createSheet("PaperType");

		Row row = sheet.createRow(0);

		CellStyle style = workbook.createCellStyle();
		XSSFFont font = workbook.createFont();
		font.setBold(true);
		font.setFontHeight(16);
		style.setFont(font);
		createCell(row, 0, "Paper Category", style);
		createCell(row, 1, "Paper Grammage", style);
		createCell(row, 2, "Paper Type", style);
		createCell(row, 3, "Price", style);
		createCell(row, 4, "Width", style);
		createCell(row, 5, "Length", style);
		createCell(row, 6, "Per Ream/Per Packet", style);
		createCell(row, 7, "Price Per Piece", style);
		createCell(row, 8, "Cut", style);
		createCell(row, 9, "Length After Cut", style);
		createCell(row, 10, "Digital Width", style);
		createCell(row, 11, "Digital Length", style);
		createCell(row, 12, "Inches Width", style);
		createCell(row, 13, "Inches Length", style);
		createCell(row, 14, "Inches Length After Cut", style);
		createCell(row, 15, "Inches Square", style);
		createCell(row, 16, "Inches Square After Cut", style);
		createCell(row, 17, "A3 Square Inches", style);
		createCell(row, 18, "Is Card?", style);
		createCell(row, 19, "Max Up For Books", style);
	}

	private void createCell(Row row, int columnCount, Object value, CellStyle style) {
		sheet.autoSizeColumn(columnCount);
		Cell cell = row.createCell(columnCount);
		if (value instanceof Integer) {
			cell.setCellValue((Integer) value);
		} else if (value instanceof Boolean) {
			cell.setCellValue((Boolean) value);
		} else if (value instanceof Double) {
			cell.setCellValue((Double) value);
		} else if (value instanceof Long){
			cell.setCellValue((Long) value);
		}
		else {
			cell.setCellValue((String) value);
		}
		cell.setCellStyle(style);
	}

	private void writeDataLines() {
		int rowCount = 1;

		CellStyle style = workbook.createCellStyle();
		XSSFFont font = workbook.createFont();
		font.setFontHeight(14);
		style.setFont(font);

		for (PaperCategory pc : listpp) {
			for (PaperGrammage pg: pc.getPgList()) {
				for (PaperType pt: pg.getPtList()) {
					Row row = sheet.createRow(rowCount++);
					int columnCount = 0;
					createCell(row, columnCount++, pc.getCategory(), style);
					createCell(row, columnCount++, pg.getGrammage(), style);
					createCell(row, columnCount++, pt.getType(), style);
					createCell(row, columnCount++, pt.getPrice(), style);
					createCell(row, columnCount++, pt.getWidth() , style);
					createCell(row, columnCount++, pt.getLength(), style);
					createCell(row, columnCount++, pt.getPerReamPackage(), style);
					createCell(row, columnCount++, pt.getPricePerCuts(), style);
					createCell(row, columnCount++, pt.getCut(), style);
					createCell(row, columnCount++, pt.getLengthAfterCut(), style);
					createCell(row, columnCount++, pt.getDigitalWidth(), style);
					createCell(row, columnCount++, pt.getDigitalLength(), style);
					createCell(row, columnCount++, pt.getInchesWidth(), style);
					createCell(row, columnCount++, pt.getInchesLength(), style);
					createCell(row, columnCount++, pt.getInchesLengthAfterCut(), style);
					createCell(row, columnCount++, pt.getInchesSquare(), style);
					createCell(row, columnCount++, pt.getInchesSquareAfterCut(), style);
					createCell(row, columnCount++, pt.getA3SquareInches(), style);
					createCell(row, columnCount++, pt.isIscard(), style);
					createCell(row, columnCount++, pt.getMaxUpForBooks(), style);
				}
			}
		}
	}

	public void export(HttpServletResponse response) throws IOException {
		writeHeaderLine();
		writeDataLines();

		ServletOutputStream outputStream = response.getOutputStream();
		workbook.write(outputStream);
		workbook.close();

		outputStream.close();

	}
}