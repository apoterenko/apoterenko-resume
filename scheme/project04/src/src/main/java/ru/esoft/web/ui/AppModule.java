package ru.esoft.web.ui;

import com.google.inject.Binder;
import com.google.inject.Module;
import com.google.inject.Provider;
import com.google.inject.Provides;
import com.google.inject.name.Names;
import com.google.inject.servlet.RequestScoped;
import com.thetransactioncompany.jsonrpc2.JSONRPC2Request;
import com.thetransactioncompany.jsonrpc2.server.Dispatcher;
import com.thetransactioncompany.jsonrpc2.server.RequestHandler;
import org.apache.commons.io.IOUtils;
import ru.esoft.Common.service.CustomerService;
import ru.esoft.Common.util.IKey;
import ru.esoft.Platform.CoreCallback;
import ru.esoft.Platform.CoreCallbackFactory;
import ru.esoft.web.ui.converter.ConverterFactory;
import ru.esoft.web.ui.converter.ValueConverter;
import ru.esoft.web.ui.converter.impl.ConverterFactoryImpl;
import ru.esoft.web.ui.converter.impl.ValueConverterImpl;
import ru.esoft.web.ui.core.*;
import ru.esoft.web.ui.core.impl.CoreBeanFactoryImpl;
import ru.esoft.web.ui.core.impl.CustomerServiceFactoryImpl;
import ru.esoft.web.ui.core.impl.ServiceDataFactoryImpl;
import ru.esoft.web.ui.core.impl.UserBeanImpl;
import ru.esoft.web.ui.jsonrpc.impl.GlobalRequestHandler;
import ru.esoft.web.ui.servlets.AppDispatcher;
import ru.esoft.web.ui.servlets.ArtifactVersionResolver;
import ru.esoft.web.ui.servlets.CoreBeanManager;
import ru.esoft.web.ui.servlets.impl.AppDispatcherImpl;
import ru.esoft.web.ui.servlets.impl.ArtifactVersionResolverImpl;
import ru.esoft.web.ui.servlets.impl.CoreBeanManagerImpl;
import ru.esoft.web.ui.xml.Formatter;
import ru.esoft.web.ui.xml.Parser;
import ru.esoft.web.ui.xml.impl.FormatterImpl;
import ru.esoft.web.ui.xml.impl.ParserImpl;

import javax.servlet.http.HttpServletRequest;
import javax.xml.parsers.DocumentBuilderFactory;
import java.util.Map;

public class AppModule implements Module {

	@Override
	public void configure(Binder binder) {
		binder.bindConstant().annotatedWith(Names.named("platform")).to(IKey.PLATFORM_WF);
		binder.bindConstant().annotatedWith(Names.named("client")).to(IKey.CLIENT_BASIC);
		binder.bind(CoreCallback.class).toInstance(CoreCallbackFactory.getInstance());
		binder.bind(ArtifactVersionResolver.class).toInstance(new ArtifactVersionResolverImpl());
		binder.bind(CoreBeanFactory.class).to(CoreBeanFactoryImpl.class).asEagerSingleton();
		binder.bind(CoreBeanManager.class).to(CoreBeanManagerImpl.class).asEagerSingleton();
		binder.bind(CustomerServiceFactory.class).to(CustomerServiceFactoryImpl.class).asEagerSingleton();
		binder.bind(ServiceDataFactory.class).to(ServiceDataFactoryImpl.class).asEagerSingleton();
		binder.bind(AppDispatcher.class).to(AppDispatcherImpl.class).asEagerSingleton();
		binder.bind(RequestHandler.class).to(GlobalRequestHandler.class).asEagerSingleton();
		binder.bind(ConverterFactory.class).to(ConverterFactoryImpl.class).asEagerSingleton();
		binder.bind(ValueConverter.class).to(ValueConverterImpl.class).asEagerSingleton();
		binder.bind(Parser.class).to(ParserImpl.class).asEagerSingleton();
		binder.bind(Formatter.class).to(FormatterImpl.class).asEagerSingleton();
		binder.bind(DocumentBuilderFactory.class).toInstance(DocumentBuilderFactory.newInstance());
	}

	@Provides
	@RequestScoped
	protected Dispatcher getDispatcher(RequestHandler requestHandler) {
		final Dispatcher dispatcher = new Dispatcher();
		dispatcher.register(requestHandler);
		return dispatcher;
	}

	@Provides
	@RequestScoped
	protected JSONRPC2Request getJSONRPC2Request(Provider<HttpServletRequest> requestProvider) throws Exception {
		return JSONRPC2Request.parse(
				IOUtils.toString(requestProvider.get().getReader()),
				false, false, true
		);
	}

	@Provides
	@RequestScoped
	protected UserBean getUserBean(Provider<JSONRPC2Request> jsonRequestProvider) {
		final Map<String, Object> request = jsonRequestProvider.get().getNamedParams();

		return new UserBeanImpl(
				String.valueOf(request.get("login")),
				String.valueOf(request.get("password"))
		);
	}

	@Provides
	@RequestScoped
	protected CustomerService getCustomerService(Provider<CustomerServiceFactory> customerServiceFactoryProvider) {
		return customerServiceFactoryProvider.get().makeInstance();
	}

	@Provides
	protected CoreBean getCoreBean(CoreBeanFactory coreBeanFactory) throws Exception {
		return coreBeanFactory.makeInstance();
	}
}