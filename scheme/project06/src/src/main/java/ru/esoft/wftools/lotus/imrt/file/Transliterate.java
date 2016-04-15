package ru.esoft.wftools.lotus.imrt.file;

import org.jooq.tools.StringUtils;

import java.util.HashMap;
import java.util.Map;

public class Transliterate {

	private static final Map<Character, String> map = new HashMap<Character, String>();

	static {
		map.put((char) 32, "_");
		map.put((char) 1100, "_1");
		map.put((char) 1101, "a");
		map.put((char) 1102, "u");
		map.put((char) 1103, "y");
		map.put((char) 1096, "h");
		map.put((char) 1097, "a2");
		map.put((char) 1098, "_2");
		map.put((char) 1099, "i");
		map.put((char) 1092, "f");
		map.put((char) 1093, "h1");
		map.put((char) 1094, "c");
		map.put((char) 1095, "h2");
		map.put((char) 1088, "r");
		map.put((char) 1089, "s");
		map.put((char) 1090, "t");
		map.put((char) 1091, "u1");
		map.put((char) 1105, "e");
		map.put((char) 1025, "E");
		map.put((char) 1049, "I");
		map.put((char) 1048, "I2");
		map.put((char) 1051, "L");
		map.put((char) 1050, "K");
		map.put((char) 1053, "N");
		map.put((char) 1052, "M");
		map.put((char) 1055, "P");
		map.put((char) 1054, "O");
		map.put((char) 1041, "B");
		map.put((char) 1040, "A");
		map.put((char) 1043, "G");
		map.put((char) 1042, "V");
		map.put((char) 1045, "E3");
		map.put((char) 1044, "D");
		map.put((char) 1047, "Z");
		map.put((char) 1046, "J");
		map.put((char) 1066, "_3");
		map.put((char) 1067, "I3");
		map.put((char) 1064, "H");
		map.put((char) 1065, "H1");
		map.put((char) 1070, "U");
		map.put((char) 1071, "Y");
		map.put((char) 1068, "_4");
		map.put((char) 1069, "A1");
		map.put((char) 1058, "T");
		map.put((char) 1059, "U1");
		map.put((char) 1056, "R");
		map.put((char) 1057, "S");
		map.put((char) 1062, "C");
		map.put((char) 1063, "H2");
		map.put((char) 1060, "F");
		map.put((char) 1061, "H3");
		map.put((char) 1083, "l");
		map.put((char) 1082, "k");
		map.put((char) 1081, "i1");
		map.put((char) 1080, "i2");
		map.put((char) 1087, "p");
		map.put((char) 1086, "o");
		map.put((char) 1085, "n");
		map.put((char) 1084, "m");
		map.put((char) 1075, "g");
		map.put((char) 1074, "v");
		map.put((char) 1073, "b");
		map.put((char) 1072, "a1");
		map.put((char) 1079, "z");
		map.put((char) 1078, "j");
		map.put((char) 1077, "e2");
		map.put((char) 1076, "d");
		map.put((char) 8470, "_32");
	}

	public static String translate(String s) {
		if (StringUtils.isEmpty(s)) {
			return StringUtils.EMPTY;
		}
		s = s.trim();

		if (StringUtils.isEmpty(s)) {
			return StringUtils.EMPTY;
		}

		final StringBuilder sb = new StringBuilder();
		for (int i = 0; i < s.length(); i++) {
			String ch = map.get(s.charAt(i));
			if (ch == null) {
				sb.append(s.charAt(i));
			} else {
				sb.append(ch);
			}
		}
		return sb.toString();
	}
}