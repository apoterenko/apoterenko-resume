package ru.esoft.web.ui.core;

import ru.esoft.Common.UniData.UniData;
import ru.esoft.fatclient.Core;

public interface CoreBean {

	Core getCore();

	UniData getImports();

	CoreBean cloneCoreBean();
}