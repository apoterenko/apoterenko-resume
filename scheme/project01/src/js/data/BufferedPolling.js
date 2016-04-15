/**
 * Данный прокси работает таким образом, что в ответ на каждую CRUD-операцию сервер должен присылать нам слепок данных
 * полностью (то есть все записи, которые только могут быть). Если объем данных слепка очень большой и это вызывает
 * накладные расходы – мы должны переопределить поведение в потомке данного прокси
 *
 * @class qiwi.data.proxy.BufferedPolling
 * @extends qiwi.data.proxy.Polling
 * @alias qiwi.data.proxy.buffered.polling
 */
Ext.define('qiwi.data.proxy.BufferedPolling', {
	extend: 'qiwi.data.proxy.Polling',
	alias: 'proxy.qiwi.data.proxy.buffered.polling',

	/**
	 * @protected
	 */
	doProviderLoad: function (request) {
		if (request.action === 'read' && this.__response) {
			/**
			 * При очередном вызове “read” мы смотрим, есть ли кеш с прошлого вызова, если есть – имитируем досрочный
			 * ответ от сервера
			 */
			this.onProviderLoad(this, this.__response);

			return request;
		}

		/**
		 * Используя данный прокси, мы также можем выполнять вызовы “create”, “update”, “delete”, поэтому работаем в
		 * обычно режиме
		 */
		this.callParent(arguments);
	},

	/**
	 * @protected
	 */
	onProviderLoad: function (scope, response) {
		var operation = this.getCurrentOperation();

		if (operation.action === 'read') {
			this.onProviderRead(response);
		} else if (operation.action !== 'destroy') {
			this.onProviderCreateUpdate(response);
		}

		this.reloadBuffer(response);

		this.callParent(arguments);
	},

	/**
	 * @protected
	 */
	extractResponseData: function (response) {
		var operation = this.getCurrentOperation();

		/**
		 * Поддержка “постраничных” ридеров
		 */
		response.start = operation.start;
		response.limit = operation.limit;

		return response;
	},

	/**
	 * @protected
	 */
	onProviderRead: function (response) {
		this.__readOperation = this.getCurrentOperation();
	},

	/**
	 * Если нам нужен данный тип прокси, но мы не желаем отсылать на каждый CUD слепок целиком – здесь мы должны в
	 * потомке вручную обновить кеш на уровне сырых данных
	 *
	 * @protected
	 */
	onProviderCreateUpdate: function (response) {
		/**
		 * При выполнении операции “create”, “update” мы должны имитировать операцию чтения, чтобы Store
		 * автоматически подгрузил нам новый слепок данных, который пришел как ответ на очередную операцию
		 * изменения данных (создание, обновление). В случае же операции "delete" – нам нужны те записи, что
		 * удалились, а они не приходят с сервера, поэтому нам нет надобности имитировать Operation – он есть такой,
		 * какой есть
		 */
		this.setCurrentOperation(this.__readOperation);
	},

	/**
	 * @protected
	 */
	reloadBuffer: function (response) {
		/**
		 * Здесь важный момент – если прокси используется лишь для выполнения “read”, то все нормально, но если
		 * выполняются операции CRUD, то на каждую такую операцию сервер должен присылать новый слепок данных целиком,
		 * чтобы мы могли подменить слепок из кеша на новый слепок. Тут важно понимать, что слепки могут быть
		 * достаточно большие, поэтому в некоторых случаях требуется переопределять поведение – вручную обновлять
		 * данные RAW в кеше, но и тут может быть подвох – данные с сервера во многих случаях приходят видоизмененными
		 * или дополненными, поэтому обновлять вручную слепок достаточно неприятная задача
		 */
		this.__response = response;
	},

	/**
	 * @public
	 */
	resetBuffer: function () {
		delete this.__response;
		delete this.__readOperation;
	},

	/**
	 * @public
	 */
	isLoaded: function () {
		return Ext.isDefined(this.__response);
	}
});