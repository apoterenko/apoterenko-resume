package ru.esoft.web.ui.core;

import ru.esoft.Common.service.CustomerService;

public interface CustomerServiceFactory {

	CustomerService makeInstance();
}