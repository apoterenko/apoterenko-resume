package ru.esoft.wftools.lotus.imrt.xml;

import com.google.common.collect.ImmutableList;
import com.google.common.collect.Maps;
import net.jcip.annotations.NotThreadSafe;
import org.jetbrains.annotations.Nullable;
import ru.esoft.wftools.lotus.imrt.xml.element.Column;
import ru.esoft.wftools.lotus.imrt.xml.element.Table;

import java.util.List;
import java.util.Map;

@NotThreadSafe
public class TableProvider {

	private static final Map<String, Table> tables = Maps.newHashMap();

	private static Table registerTable(String tableName, Table table) {
		tables.put(tableName, table);
		return table;
	}

	public static Table getTable(String tableName) {
		return tables.get(tableName);
	}

	public static Table getDistrictTable() {
		return tables.get(DistrictTableFactory.DISTRICT_TABLE.getName());
	}

	public static Table getLevelTable() {
		return tables.get(LevelTableFactory.LEVEL_TABLE.getName());
	}

	public static List<Table> getDependencyTables() {
		return DEPENDENCY_TABLES;
	}

	public static Table fromXml(String tableName) {
		@Nullable Table table = getTable(tableName);
		if (table != null) {
			return table;
		}

		table = XmlObjectProvider.fromXml(tableName);
		return registerTable(tableName, table.init());
	}

	private static final class DistrictTableFactory {

		final static Table DISTRICT_TABLE;

		static {
			DISTRICT_TABLE = new Table().setPath("РЕГИОНЫ");
			DISTRICT_TABLE.setName("lotusd_districts");
			DISTRICT_TABLE.addColumn((new Column().setName("ld_dstr_id").setType("integer").setNotNull(true).setPrimary(true)));
			DISTRICT_TABLE.addColumn(new Column().setName("ld_dstr_name").setType("text").setNotNull(true));
			DISTRICT_TABLE.init();

			registerTable(DISTRICT_TABLE.getName(), DISTRICT_TABLE);
		}
	}

	private static final class LevelTableFactory {

		final static Table LEVEL_TABLE;

		static {
			LEVEL_TABLE = new Table().setPath("УРОВНИ");
			LEVEL_TABLE.setName("lotusd_levels");
			LEVEL_TABLE.addColumn((new Column().setName("ld_level_id").setType("integer").setNotNull(true).setPrimary(true)));
			LEVEL_TABLE.addColumn(new Column().setName("ld_level_name").setType("text").setNotNull(true));
			LEVEL_TABLE.init();

			registerTable(LEVEL_TABLE.getName(), LEVEL_TABLE);
		}
	}

	private static final List<Table> DEPENDENCY_TABLES = ImmutableList.<Table>builder()
			.add(new Table().setName("lotusd_chancery_in_org_from")
					.setPath("КАНЦЕЛЯРИЯ/Входящие/Организации <От кого>")
					.setParentTable("lotusd_chancery_in"))
			.add(new Table().setName("lotusd_chancery_in_inner_destinations_from")
					.setPath("КАНЦЕЛЯРИЯ/Входящие/Внутренние адресаты <От кого>")
					.setParentTable("lotusd_chancery_in"))
			.add(new Table().setName("lotusd_chancery_in_forward_document")
					.setPath("КАНЦЕЛЯРИЯ/Входящие/Пересланные документы")
					.setParentTable("lotusd_chancery_in"))
			.add(new Table().setName("lotusd_chancery_in_recipients_who")
					.setPath("КАНЦЕЛЯРИЯ/Входящие/Адресаты <Кому>")
					.setParentTable("lotusd_chancery_in"))
			.add(new Table().setName("lotusd_chancery_in_resolution")
					.setPath("КАНЦЕЛЯРИЯ/Входящие/Резолюции")
					.setParentTable("lotusd_chancery_in"))
			.add(new Table().setName("lotusd_chancery_in_about")
					.setPath("КАНЦЕЛЯРИЯ/Входящие/Структурные подразделения назначения для ознакомления")
					.setParentTable("lotusd_chancery_in"))
			.add(new Table().setName("lotusd_chancery_in_already_read")
					.setPath("КАНЦЕЛЯРИЯ/Входящие/Уже ознакомились")
					.setParentTable("lotusd_chancery_in"))
			.add(new Table().setName("lotusd_chancery_in_discontinue_supervision")
					.setPath("КАНЦЕЛЯРИЯ/Входящие/Снятые с контроля")
					.setParentTable("lotusd_chancery_in"))
			.add(new Table().setName("lotusd_chancery_out_foreign_destination")
					.setPath("КАНЦЕЛЯРИЯ/Исходящие/Внешние организации адресаты")
					.setParentTable("lotusd_chancery_out"))
			.add(new Table().setName("lotusd_chancery_out_inner_destination")
					.setPath("КАНЦЕЛЯРИЯ/Исходящие/Внутренние подразделения-адресаты")
					.setParentTable("lotusd_chancery_out"))
			.add(new Table().setName("lotusd_out_exp_foreign_destination")
					.setPath("ИСХОДЯЩИЕ_ЭКСПЕДИЦИИ/Исходящие/Внешние организации-адресаты")
					.setParentTable("lotusd_out_exp"))
			.add(new Table().setName("lotusd_ord_docs_send_confirm")
					.setPath("ОРД/Документы/Документы на утверждение")
					.setParentTable("lotusd_ord_docs"))
			.add(new Table().setName("lotusd_ord_docs_structural_unit")
					.setPath("ОРД/Документы/Отправленные на рассмотрение")
					.setParentTable("lotusd_ord_docs"))
			.add(new Table().setName("lotusd_ord_docs_access_documents")
					.setPath("ОРД/Документы/Ознакомившиеся с документом")
					.setParentTable("lotusd_ord_docs"))
			.add(new Table().setName("lotusd_ord_docs_foreign_destination")
					.setPath("ОРД/Документы/Внешние адресаты")
					.setParentTable("lotusd_ord_docs"))
			.add(new Table().setName("lotusd_ord_docs_internal_destination")
					.setPath("ОРД/Документы/Внутренние адресаты")
					.setParentTable("lotusd_ord_docs"))
			.add(new Table().setName("lotusd_ord_tasks_division_executive")
					.setPath("ОРД/Задачи/Исполнители задачи")
					.setParentTable("lotusd_ord_tasks"))
			.add(new Table().setName("lotusd_ord_tasks_division_co_executive")
					.setPath("ОРД/Задачи/Соисполнители задачи")
					.setParentTable("lotusd_ord_tasks"))
			.add(new Table().setName("lotusd_procuratory_postponement")
					.setPath("ПОРУЧЕНИЯ/Поручения/Истории переноса сроков")
					.setParentTable("lotusd_procuratory"))
			.add(new Table().setName("lotusd_procuratory_coauthors")
					.setPath("ПОРУЧЕНИЯ/Поручения/Соисполнители поручений")
					.setParentTable("lotusd_procuratory"))
			.add(new Table().setName("lotusd_procuratory_return")
					.setPath("ПОРУЧЕНИЯ/Поручения/Возврат поручения")
					.setParentTable("lotusd_procuratory"))
			.add(new Table().setName("lotusd_files"))
			.add(new Table().setName("lotusd_ed_send_list_send_list")
					.setPath("ВНЕШНИЕ_АДРЕСАТЫ/Списки рассылки/Получатели рассылки")
					.setParentTable("lotusd_ed_send_list"))
			.add(new Table().setName("lotusd_org_send_list_send_list")
					.setPath("ОРГ_СТРУКТУРА/Списки рассылки/Внутренние подразделения адресаты")
					.setParentTable("lotusd_org_send_list"))
			.build();

	static {
		for (Table table : DEPENDENCY_TABLES) {
			registerTable(table.getName(), table);
		}
	}
}