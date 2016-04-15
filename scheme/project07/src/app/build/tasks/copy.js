var gulp = require('gulp'),
	paths = require('../paths');

gulp.task('copy', function () {
	return gulp.src(paths.index)
		.pipe(gulp.dest(paths.root));
});