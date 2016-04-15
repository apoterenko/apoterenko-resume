package ru.esoft.web.ui.core.impl;

import ru.esoft.Platform.CoreCallback;
import ru.esoft.fatclient.Core;
import ru.esoft.web.ui.core.CoreBean;
import ru.esoft.web.ui.core.CoreBeanFactory;
import ru.esoft.web.ui.core.ServiceDataFactory;
import ru.esoft.web.ui.core.UserBean;

import javax.inject.Inject;
import javax.inject.Named;
import javax.inject.Provider;

public class CoreBeanFactoryImpl implements CoreBeanFactory {

	@Inject
	@Named("platform")
	private String platform;
	@Inject
	@Named("client")
	private String client;
	@Inject
	private Provider<UserBean> userBeanProvider;
	@Inject
	private Provider<CoreCallback> coreCallbackProvider;
	@Inject
	private ServiceDataFactory serviceDataFactory;

	@Override
	public CoreBean makeInstance() throws Exception {
		final UserBean userBean = userBeanProvider.get();
		final CoreCallback coreCallback = coreCallbackProvider.get();

		final Core core = Core.init(coreCallback);
		core.setType(platform);
		core.doLogin(userBean.getLogin(), userBean.getPassword(), client, null);

		return new CoreBeanImpl(
				core,
				serviceDataFactory.getClientImports()
		);
	}
}