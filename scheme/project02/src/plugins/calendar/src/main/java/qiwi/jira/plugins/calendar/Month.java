package qiwi.jira.plugins.calendar;

public enum Month {

	JANUARY,
	FEBRUARY,
	MARCH,
	APRIL,
	MAY,
	JUNE,
	JULY,
	AUGUST,
	SEPTEMBER,
	OCTOBER,
	NOVEMBER,
	DECEMBER;

	private int number;

	public int getNumber() {
		if (number == 0) {
			number = findNumber(1);
		}
		return number;
	}

	private int findNumber(int base) {
		Month[] months = Month.values();
		for (int i = 0; i < months.length; i++) {
			if (months[i] == this) {
				return i + base;
			}
		}
		// The thing that should not be
		return 0;
	}

	public static Month byNumber(int number) {
		return Month.values()[number - 1];
	}
}
