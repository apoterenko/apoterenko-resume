package ru.esoft.web.ui.servlets;

import ru.esoft.web.ui.core.CoreBean;

public interface CoreBeanManager {

	CoreBean getCoreBean(boolean clone) throws Exception;

	void destroyCoreBean(String session) throws Exception;
}