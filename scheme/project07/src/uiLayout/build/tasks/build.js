var gulp = require('gulp'),
	changed = require('gulp-changed'),
	plumber = require('gulp-plumber'),
	less = require('gulp-less'),
	sourcemaps = require('gulp-sourcemaps'),
	runSequence = require('run-sequence'),
	cssnano = require('gulp-cssnano'),
	del = require('del'),
	vinylPaths = require('vinyl-paths'),
	paths = require('../paths');

gulp.task('build', function (callback) {
	return runSequence(
		'clean',
		'less',
		'minify',
		callback
	);
});

gulp.task('clean', function () {
	return gulp.src(paths.output)
		.pipe(vinylPaths(del));
});

gulp.task('less', function () {
	return gulp.src(paths.src)
		.pipe(plumber())
		.pipe(changed(paths.cssInput, {extension: '.css'}))
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(paths.cssInput));
});

gulp.task('minify', function () {
	return gulp.src(paths.cssSrc)
		.pipe(sourcemaps.init())
		.pipe(cssnano())
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(paths.cssOutput));
});
