var gulp = require('gulp'),
	runSequence = require('run-sequence');

gulp.task('build', function (callback) {
	return runSequence(
		'clean',
		'babel',
		callback
	);
});