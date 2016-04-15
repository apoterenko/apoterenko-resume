var gulp = require('gulp'),
	Builder = require('systemjs-builder'),
	paths = require('../paths'),
	uglify = require('gulp-uglify');

gulp.task('boot', function () {
	return gulp.src(paths.srcBoot)
		.pipe(uglify())
		.pipe(gulp.dest(paths.output));
});

gulp.task('bundle', function () {
	new Builder('.', './system.config.js')
		.buildStatic(paths.app, paths.output + paths.app, {minify: !!global.release, sourceMaps: true})
		.then(function () {
			console.log('Build complete..');
		})
		.catch(function (err) {
			console.log('Build error:', err);
		});
});