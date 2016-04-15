var Server = require('karma').Server,
	gulp = require('gulp'),
	path = require('../path');

gulp.task('test', ['build'], function (done) {
	new Server({configFile: __dirname + '/../../karma.conf.js'}, done)
		.start();
});