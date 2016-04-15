package ru.esoft.web.ui.core.impl;

import com.google.inject.Provider;
import ru.esoft.Common.service.CustomerService;
import ru.esoft.fatclient.utils.ServiceFactory;
import ru.esoft.web.ui.core.CustomerServiceFactory;
import ru.esoft.web.ui.core.UserBean;

import javax.inject.Inject;
import javax.inject.Named;

public class CustomerServiceFactoryImpl implements CustomerServiceFactory {

	@Inject
	@Named("client")
	private Provider<String> clientNameProvider;
	@Inject
	private Provider<UserBean> userBeanProvider;

	@Override
	public CustomerService makeInstance() {
		final UserBean userBean = userBeanProvider.get();
		return ServiceFactory.getCustomerService(
				userBean.getLogin(),
				userBean.getPassword(),
				clientNameProvider.get(),
				null
		);
	}
}