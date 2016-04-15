var gulp = require('gulp'),
	gettext = require('gulp-angular-gettext'),
	paths = require('../paths');

gulp.task('gettext', function () {
	return gulp.src([paths.templates, paths.source])
		.pipe(gettext.extract('template.pot'))
		.pipe(gulp.dest(paths.srcPo));
});

gulp.task('gettext-translations', function () {
	return gulp.src(paths.srcPo + '/**/*.po')
		.pipe(gettext.compile({
			format: 'json'
		}))
		.pipe(gulp.dest(paths.srcLanguages));
});