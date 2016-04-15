package ru.esoft.web.ui.servlets.impl;

import com.google.common.collect.Maps;
import com.google.inject.Provider;
import com.thetransactioncompany.jsonrpc2.JSONRPC2Request;
import net.minidev.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ru.esoft.web.ui.core.CoreBean;
import ru.esoft.web.ui.servlets.CoreBeanManager;

import javax.annotation.Nullable;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;

public class CoreBeanManagerImpl implements CoreBeanManager {

	private static final Logger log = LoggerFactory.getLogger(CoreBeanManagerImpl.class);

	@Inject
	private Provider<HttpServletRequest> servletRequestProvider;
	@Inject
	private Provider<JSONRPC2Request> jsonrpc2RequestProvider;
	@Inject
	private Provider<CoreBean> coreBeanProvider;

	@Override
	public void destroyCoreBean(String session) throws Exception {
		getCoreBeanHolder().remove(session);
	}

	@Override
	public CoreBean getCoreBean(boolean clone) throws Exception {
		final JSONRPC2Request request = jsonrpc2RequestProvider.get();
		final @Nullable JSONObject jsonObject = request.toJSONObject();
		final @Nullable Object params = jsonObject != null ? jsonObject.get(PARAMS) : null;
		final @Nullable Object sessionKey = params instanceof JSONObject ? JSONObject.class.cast(params).get(SESSION_KEY) : null;

		final CoreBeanHolder coreBeanHolder = getCoreBeanHolder();
		return coreBeanHolder.get(sessionKey != null ? String.valueOf(sessionKey) : null, clone, coreBeanProvider);
	}

	private CoreBeanHolder getCoreBeanHolder() {
		final HttpServletRequest request = servletRequestProvider.get();
		final HttpSession session = request.getSession(false);

		@Nullable CoreBeanHolder coreBeanHolder = (CoreBeanHolder) session.getAttribute(CORE_BEAN_HOLDER_KEY);

		if (coreBeanHolder == null) {
			session.setAttribute(CORE_BEAN_HOLDER_KEY, coreBeanHolder = new CoreBeanHolder());
		}
		return coreBeanHolder;
	}

	private static final class CoreBeanHolder {

		private final Map<String, CoreBean> map = Maps.newHashMap();

		synchronized void remove(String session) throws Exception {
			logSessionMap();

			@Nullable CoreBean core = map.get(session);
			if (core != null) {
				core.getCore().remove();
				map.remove(session);

				log.debug("[CORE_MANAGER] Core is destroyed by key: {}, session map size: {}", session, map.size());
			}
		}

		synchronized CoreBean get(
				@Nullable String key,
				final boolean clone,
				final Provider<CoreBean> coreBeanProvider) throws Exception {

			@Nullable CoreBean coreBean;

			if (key == null) {
				coreBean = coreBeanProvider.get();
				map.put(String.valueOf(coreBean.getCore().getSessionId()), coreBean);

				logSessionMap();
				return coreBean;
			}

			coreBean = map.get(key);
			if (coreBean == null) {
				map.put(key, coreBean = coreBeanProvider.get());
			} else {
				if (clone) {
					coreBean = coreBean.cloneCoreBean();
					map.put(String.valueOf(coreBean.getCore().getSessionId()), coreBean);

					logSessionMap();
					return coreBean;
				}
			}

			logSessionMap();
			return coreBean;
		}

		private void logSessionMap() {
			log.debug("[CORE_MANAGER] Session map size: {}, map: {}", map.size(), map);
		}
	}

	private static final String CORE_BEAN_HOLDER_KEY = "__coreBeanHolderKey";
	private static final String SESSION_KEY = "__sessionKey";
	private static final String PARAMS = "params";
}