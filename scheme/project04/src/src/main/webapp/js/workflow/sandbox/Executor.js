/**
 * "Provide" section
 */
goog.provide("Workflow.sandbox.Executor");
goog.provide("WF.EXR");

/**
 * "Require" section
 */
goog.require("Workflow.ShortHand");
goog.require("Workflow.sandbox.Sandbox");
goog.require("Workflow.sandbox.SandboxConfig");

/**
 * Sandbox implementation
 *
 * @constructor
 */
WF.EXR = Workflow.sandbox.Executor = {

	/**
	 * @public
	 */
	executeOnAction: function (action, config) {
		var scriptContext,
			actionParameters,
			callback = config.callback,
			script = action.callbacks[callback],
			context = action.isContext(),
			properties = {};

		config.properties = properties;

		actionParameters = this.executeScript(script, config);
		actionParameters.actionId = action.getId();

		scriptContext = properties.isContext === true;

		delete config.properties;
		return context || scriptContext ? false : actionParameters;
	},

	/**
	 * @public
	 */
	executeOnLoadAction: function (config) {
		var action,
			sbcConfig = config.sbcConfig,
			clientData = config.actionParameters;

		if (config.action.isSameWindow()) {
			/**
			 * Также при закрытии выполняем “код закрытия диалога”
			 */
			action = sbcConfig && sbcConfig.getAction();

			if (SH.DNN(action)) {
				this.executeScript(action.getEventDialogClosed(), {
					sbcConfig: sbcConfig.getPreviousConfig(),
					clientData: clientData
				});
			}

			/**
			 * Выполнение action приводит к клонированию ядра, поэтому если мы сразу закрываем UI, то и
			 * закрываем сессию
			 */
			this.destroySession(WF.JRR.readFrom(config.response).session);

			/**
			 * Если открытие формы происходит в том же окне, то сразу скрываем все элементы формы, чтобы не было
			 * возможности дважды подряд вызвать одно и то же действие...
			 */
			return false;
		}
		return true;
	},

	/**
	 * @public
	 */
	executeOnLoadScript: function (element, config) {
		this.executeScript(element.getOnLoad(), config);
	},

	/**
	 * @public
	 */
	executeOnChangeScript: function (element, config) {
		this.executeScript(element.getOnChange(), config);
	},

	/**
	 * @public
	 */
	executeScript: function (script, config) {
		var sandbox,
			env,
			args = {},
			sbc = config.sbcConfig;

		if (SH.NDNN(script)) {
			return args;
		}

		if (SH.DNN(script)) {
			sandbox = new WF.SBX(config);
			sandbox.execute(script);
			env = sandbox.getEnvironment();
		}

		SH.DEF(env) && (args = env.getData().getAllFields());
		SH.DNN(sbc) && sbc.applySessionKey(args);

		return args;
	},

	/**
	 * @public
	 */
	destroySession: function (session) {
		if (SH.NDNN(session)) {
			return;
		}

		WF.JRS.doDestroySession({
			params: {
				session: session
			}
		});
	},

	/**
	 * @public
	 */
	toViewTypeConfig: function (config) {
		var action = config.action,
			result = {
				sbcConfig: WF.SBC.create(WF.JRR.readFrom(config.response))
					.setAction(action)
					.setPreviousConfig(config.sbcConfig)
			};

		if (!action || action.isSameWindow() || action.isNewWindow()) {
			result.type = 'main';
		} else if (action.isNewDialog()) {
			result.type = 'window';
		}
		return result;
	}
};