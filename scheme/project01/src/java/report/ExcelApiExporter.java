package qiwi.report.jasperreports.engine.export;

import jxl.biff.DisplayFormat;
import jxl.format.Border;
import jxl.write.*;
import jxl.write.Boolean;
import jxl.write.Number;
import jxl.write.biff.CellValue;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.export.JExcelApiExporter;
import net.sf.jasperreports.engine.export.data.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

public class ExcelApiExporter extends JExcelApiExporter {

	private static final transient Logger log = LoggerFactory.getLogger(ExcelApiExporter.class);

	@Override
	protected CellValue getDetectedCellValue(int x, int y, TextValue textValue, StyleInfo baseStyle, boolean complexFormat) throws JRException {
		final CellTextValueHandler handler = new CellTextValueHandler(x, y, baseStyle);
		try {
			textValue.handle(handler);
			return handler.getResult();
		} catch (JRException e) {
			log.error("ExcelApiExporter exception", e);
			throw new IllegalStateException(e);
		}
	}

	private class CellTextValueHandler implements TextValueHandler {

		private final int x;
		private final int y;
		private final StyleInfo baseStyle;

		private CellValue result;

		public CellTextValueHandler(int x, int y, StyleInfo baseStyle) {
			this.x = x;
			this.y = y;
			this.baseStyle = baseStyle;
		}

		@Override
		public void handle(StringTextValue textValue) throws JRException {
			final WritableCellFormat cellStyle = getLoadedCellStyle(baseStyle);
			result = new Label(x, y, textValue.getText(), cellStyle);
		}

		@Override
		public void handle(NumberTextValue textValue) throws JRException {

			String pattern = textValue.getPattern();
			NumberFormat format = null;

			if (pattern != null) {
				pattern = pattern.trim();
				format = new NumberFormat(textValue.getPattern());
				baseStyle.setDisplayFormat(format);
			}

			final WritableCellFormat cellStyle = pattern == null ?
				new WritableCellFormat()
				: new WritableCellFormat(
				formats.containsKey(pattern) ?
					new BuiltInFormat(formats.get(pattern))
					: format
			);

			loadStyle(cellStyle);

			if (textValue.getValue() == null) {
				result = blank(cellStyle);
			} else {
				result = new Number(x, y, textValue.getValue().doubleValue(), cellStyle);
			}
		}

		@Override
		public void handle(DateTextValue textValue) throws JRException {

			String pattern = textValue.getPattern();
			if (pattern != null) {
				pattern = pattern.trim();
			}
			final DateFormat format = new DateFormat(textValue.getPattern());

			final WritableCellFormat cellStyle = new WritableCellFormat(
				formats.containsKey(pattern) ?
					new BuiltInFormat(formats.get(pattern))
					: format
			);
			baseStyle.setDisplayFormat(format);

			loadStyle(cellStyle);

			if (textValue.getValue() == null) {
				result = blank(cellStyle);
			} else {
				result = new DateTime(x, y, textValue.getValue(), cellStyle);
			}
		}

		@Override
		public void handle(BooleanTextValue textValue) throws JRException {
			final WritableCellFormat cellStyle = getLoadedCellStyle(baseStyle);
			if (textValue.getValue() == null) {
				result = blank(cellStyle);
			} else {
				result = new Boolean(x, y, textValue.getValue(), cellStyle);
			}
		}

		private Blank blank(WritableCellFormat cellStyle) {
			return new Blank(x, y, cellStyle);
		}

		public CellValue getResult() {
			return result;
		}

		private void loadStyle(WritableCellFormat cellStyle) throws JRException {
			try {
				final WritableCellFormat style = getLoadedCellStyle(baseStyle);
				cellStyle.setBorder(Border.ALL, style.getBorder(Border.ALL));
				cellStyle.setBorder(Border.LEFT, style.getBorder(Border.LEFT));
				cellStyle.setBorder(Border.RIGHT, style.getBorder(Border.RIGHT));
				cellStyle.setBorder(Border.TOP, style.getBorder(Border.TOP));
				cellStyle.setBorder(Border.BOTTOM, style.getBorder(Border.BOTTOM));
				cellStyle.setBackground(style.getBackgroundColour());
				cellStyle.setAlignment(style.getAlignment());
				cellStyle.setOrientation(style.getOrientation());
				cellStyle.setWrap(style.getWrap());
				cellStyle.setLocked(style.isLocked());
			} catch (WriteException e) {
				throw new JRException(e);
			}

		}

	}

	private static class BuiltInFormat implements DisplayFormat {

		private int index;

		public BuiltInFormat(int i) {
			index = i;
		}

		@Override
		public int getFormatIndex() {
			return index;
		}

		@Override
		public boolean isInitialized() {
			return true;
		}

		@Override
		public void initialize(int pos) {
		}

		@Override
		public boolean isBuiltIn() {
			return true;
		}

		public boolean equals(Object o) {
			if (o == this) {
				return true;
			}
			if (!(o instanceof BuiltInFormat)) {
				return false;
			}
			final BuiltInFormat bif = (BuiltInFormat) o;
			return index == bif.index;
		}

		public int hashCode() {
			return index;
		}

	}

	private static final Map<String, Integer> formats = new HashMap<String, Integer>();

	static {
		formats.put("dd.MM.yyyy", 14);		// дата					26.09.2011
		formats.put("0.0#E0", 11);			// экспоненциальный		7,99E+04
		formats.put("¤ #,##0.00", 7);		// денежный				79 890,00р.
		formats.put("¤ #,##0", 6);			// денежный				79 890р.
		formats.put("#,##0.00", 4);			// числовой				79 890,00
		formats.put("#,##0", 3);			// числовой				79 890
		formats.put("#0", 1);				// числовой				79890
		formats.put("#0.00", 2);			// числовой				79890,00
	}

}
