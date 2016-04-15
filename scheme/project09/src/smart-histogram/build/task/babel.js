var gulp = require('gulp'),
	babel = require('gulp-babel'),
	path = require('../path');

gulp.task('babel', function () {
	return gulp.src(path.src, {base: 'src'})
		.pipe(babel({
			modules: 'umd',		// common/amd/umd
			stage: 3,
			optional: [
				"es7.decorators",
				"es7.classProperties"
			]
		}))
		.pipe(gulp.dest(path.output))
});