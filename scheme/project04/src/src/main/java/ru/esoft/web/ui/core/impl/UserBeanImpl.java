package ru.esoft.web.ui.core.impl;

import ru.esoft.web.ui.core.UserBean;

public class UserBeanImpl implements UserBean {

	private final String login;
	private final String password;

	public UserBeanImpl(String login, String password) {
		this.login = login;
		this.password = password;
	}

	@Override
	public String getLogin() {
		return login;
	}

	@Override
	public String getPassword() {
		return password;
	}
}