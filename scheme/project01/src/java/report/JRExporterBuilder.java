package qiwi.report;

import java.io.OutputStream;

import net.sf.jasperreports.engine.JRExporter;
import net.sf.jasperreports.engine.JRExporterParameter;
import net.sf.jasperreports.engine.export.JRHtmlExporter;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.engine.export.JRXlsExporter;
import qiwi.report.jasperreports.engine.export.ExcelApiExporter;

public class JRExporterBuilder<E extends JRExporter> {

	private final E exporter;

	private JRExporterBuilder(E exporter) {
		this.exporter = exporter;
	}

	public static <E extends JRExporter> JRExporterBuilder<E> instance(E exporter) {
		return new JRExporterBuilder<E>(exporter);
	}

	public static JRExporterBuilder<ExcelApiExporter> excel() {
		return instance(new ExcelApiExporter());
	}

	public static JRExporterBuilder<JRHtmlExporter> html() {
		return instance(new JRHtmlExporter());
	}

	public static JRExporterBuilder<JRPdfExporter> pdf() {
		return instance(new JRPdfExporter());
	}

	public static JRExporterBuilder<JRXlsExporter> xls() {
		return instance(new JRXlsExporter());
	}

	public E to(StringBuffer buffer) {
		exporter.setParameter(JRExporterParameter.OUTPUT_STRING_BUFFER, buffer);
		return exporter;
	}

	public E to(OutputStream stream) {
		exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, stream);
		return exporter;
	}
}