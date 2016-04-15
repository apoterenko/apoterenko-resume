package ru.esoft.web.ui.core.impl;

import ru.esoft.Common.UniData.UniData;
import ru.esoft.Common.service.CustomerService;
import ru.esoft.web.ui.core.ServiceDataFactory;

import javax.inject.Inject;
import javax.inject.Provider;

public class ServiceDataFactoryImpl implements ServiceDataFactory {

	@Inject
	private Provider<CustomerService> customerServiceProvider;

	@Override
	public UniData getClientImports() {
		return getCustomerService().executeCommand("client-imports", null);
	}

	private CustomerService getCustomerService() {
		return customerServiceProvider.get();
	}
}