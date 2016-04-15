var gulp = require('gulp'),
	del = require('del'),
	vinylPaths = require('vinyl-paths'),
	path = require('../path');

gulp.task('clean', function () {
	return gulp.src([path.output])
		.pipe(vinylPaths(del));
});