var gulp = require('gulp');
var insert = require('gulp-insert');
var concatFile = require('gulp-concat');
var runSequence = require('run-sequence');
var paths = require('../paths');
var tar = require('gulp-tar');
var gzip = require('gulp-gzip');
var minifyCss = require('gulp-minify-css');
var del = require('del');
var vinylPaths = require('vinyl-paths');

gulp.task('build-archive', function () {
    return gulp.src([
        './admin',
        './admin/**/*',
        './dist',
        './dist/**/*',
        '!dist/*.tpl.js',
        '!dist/**/*.tpl.js',
        '!dist/common',
        '!dist/common/**/*',
        './docs',
        './docs/**/*',
        'index.html',
        'mobile.html',
        './jspm_packages/**/*'
    ], {base: '.'})
        .pipe(tar('imigo-front-' + gittag + '.tar'))
        .pipe(gzip())
        .pipe(gulp.dest(paths.outputArchive));
});

gulp.task('minify-css', function () {
  return gulp.src(paths.outputCss)
      .pipe(minifyCss({compatibility: 'ie8'}))
      .pipe(gulp.dest(paths.output));
});

gulp.task('clean-css', function () {
  return gulp.src([
        paths.outputCss,
        '!/**/imigo-core.css'
      ])
      .pipe(vinylPaths(del));
});

gulp.task('cache-bust', function () {
  var cacheBust = "var systemLocate = System.locate; System.locate = function(load) { var cacheBust = '?bust=' + '" + gittag +"'; return Promise.resolve(systemLocate.call(this, load)).then(function(address) { if (address.indexOf('bust') > -1 || address.indexOf('css') > -1 || address.indexOf('json') > -1) return address; return address + cacheBust; });}\n"
  return gulp.src('dist/app/app.js')
      .pipe(insert.prepend(cacheBust))
      .pipe(gulp.dest('dist/app'));
});

gulp.task('release', function (callback) {
  global.release = true;

  return runSequence(
    'clean',
    'build',
    'replace',
    'minify-css',
    'clean-css',
    'build-archive',
    callback
  );
});