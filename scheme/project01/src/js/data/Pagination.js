/**
 * @class qiwi.data.reader.Pagination
 * Общий функционал для PaginationArray и PaginationJson
 * Ридеры, позволяющие читать данные постранично. Эффективность класса протестирована на ~30000 выгружаемых на клиент
 * записей – разница во времени при пагинации с использованием ридера и без использования ридера ощутима значительно
 */
Ext.define('qiwi.data.reader.Pagination', {
	singleton: true,

	/**
	 * @public
	 */
	read: function (response) {
		/**
		 * Каждый прокси обязан поставлять в его ридер в его переменную response значения start и limit
		 */
		this.__paginationInfo = {
			start: response.start,
			limit: response.limit
		};
	},

	/**
	 * @protected
	 */
	extractData: function (root) {

		var start,
			limit,
			pi = this.__paginationInfo;

		if (pi) {
			start = pi.start;
			limit = pi.limit;

			if (Ext.isDefined(start) && Ext.isDefined(limit)) {
				root = root.slice(start, start + limit);
			}
		}

		return root;
	}
}, function () {

	/**
	 * @class qiwi.data.reader.PaginationJson
	 * @extends Ext.data.reader.Json
	 */
	Ext.define('qiwi.data.reader.PaginationJson', {
		extend: 'qiwi.data.reader.Json',
		//extend: 'Ext.data.reader.Json', // TODO
		alias: 'reader.qiwi.pagination.json',

		/**
		 * @public
		 */
		read: function () {
			qiwi.data.reader.Pagination.read.apply(this, arguments);

			return this.callParent(arguments);
		},

		/**
		 * @protected
		 */
		extractData: function () {
			return this.callParent([
				qiwi.data.reader.Pagination.extractData.apply(this, arguments)
			]);
		}
	});

	/**
	 * @class qiwi.data.reader.PaginationJson
	 * @extends Ext.data.reader.Json
	 * @Deprecated Use qiwi.data.reader.PagingArray
	 */
	Ext.define('qiwi.data.reader.PaginationArray', {
		extend: 'qiwi.data.reader.Array', // Содержит грубую ошибку при копипасте: data[index] <<|| null;>>
		//extend: 'Ext.data.reader.Array', // TODO
		alias: 'reader.qiwi.pagination.array',

		/**
		 * @public
		 */
		read: function () {
			qiwi.data.reader.Pagination.read.apply(this, arguments);

			return this.callParent(arguments);
		},

		/**
		 * @protected
		 */
		extractData: function () {
			return this.callParent([
				qiwi.data.reader.Pagination.extractData.apply(this, arguments)
			]);
		}
	});

	/**
	 * @class qiwi.data.reader.PagingArray
	 * @extends Ext.data.reader.Array
	 */
	Ext.define('qiwi.data.reader.PagingArray', {
		extend: 'Ext.data.reader.Array',
		alias: 'reader.qiwi.paging.array',

		/**
		 * @public
		 */
		read: function () {
			qiwi.data.reader.Pagination.read.apply(this, arguments);

			return this.callParent(arguments);
		},

		/**
		 * @protected
		 */
		extractData: function () {
			return this.callParent([
				qiwi.data.reader.Pagination.extractData.apply(this, arguments)
			]);
		}
	});

	/**
	 * @class qiwi.data.reader.PagingJson
	 * @extends Ext.data.reader.Array
	 */
	Ext.define('qiwi.data.reader.PagingJson', {
		extend: 'Ext.data.reader.Json',
		alias: 'reader.qiwi.paging.json',

		/**
		 * @public
		 */
		read: function () {
			qiwi.data.reader.Pagination.read.apply(this, arguments);

			return this.callParent(arguments);
		},

		/**
		 * @protected
		 */
		extractData: function () {
			return this.callParent([
				qiwi.data.reader.Pagination.extractData.apply(this, arguments)
			]);
		}
	});
});