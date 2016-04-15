var gulp = require('gulp');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');
var less = require('gulp-less');
var htmlMin = require('gulp-minify-html');
var ngHtml2Js = require("gulp-ng-html2js");
var runSequence = require('run-sequence');
var replace = require('gulp-replace-task');
var file = require('gulp-file');
var gulpIntegrationTasks = require('gulp-integration-tasks');
var fs = require("fs");

var paths = require('../paths');
var compilerOptions = require('../babelOptions');

gulp.task('build', function (callback) {
  var releaseType = global.release;

  return runSequence(
    'clean',
    'git-tag',
    'copy',
    ['less', 'html', 'es6', 'move'],
    (releaseType ? ['bundle', 'boot'] : 'boot'),
    ['build-replace', 'make-config'],
    callback
  );
});

gulp.task('git-tag', function () {
  gulpIntegrationTasks.gitTag();
});

gulp.task('make-config', function () {
  var releaseType = global.release,
      buildType = releaseType ? 'release' : 'build',
      str = "defineCdnUrl('" + paths.cdnPath + "');";

  if (buildType) {
    return file(paths.cdnConfig, str, {src: true})
        .pipe(gulp.dest(paths.output));
  }
});

gulp.task('build-replace', function () {
  var releaseType = global.release,
      buildType = releaseType ? 'release' : 'build',
      appVersion = gittag,
      testProduction = appVersion.indexOf('snapshot') > -1,
      bootJs = fs.readFileSync(paths.output + 'Boot.js', "utf8");


  return gulp.src(paths.outputIndex)
      .pipe(replace({
        usePrefix: false,
        patterns: [
          {
            match: '{{jquery_path}}',
            replacement: paths.libs.jquery[buildType]
          },
          {
            match: '{{jquery_ui_path}}',
            replacement: paths.libs.jqueryUI[buildType]
          },
          {
            match: '{{jquery_ui_css_path}}',
            replacement: paths.libs.jqueryCSSUI[buildType]
          },
          {
            match: '{{scrollbar_path}}',
            replacement: paths.libs.scrollbar[buildType]
          },
          {
            match: '{{graphic_path}}',
            replacement: paths.libs.graphic[buildType]
          },
          {
            match: '{{es6shim_path}}',
            replacement: paths.libs.es6Shim[buildType]
          },
          {
            match: '{{release_mode}}',
            replacement: !!releaseType
          },
          {
            match: '{{root_path}}',
            replacement: paths.output
          },
          {
            match: '{{api_path}}',
            replacement: paths.api_path
          },
          {
            match: '{{app_path}}',
            replacement: [paths.output, 'app/app.js?_dc=', appVersion].join('')
          },
          {
            match: '{{cdn_config_path}}',
            replacement: [paths.output, paths.cdnConfig, '?_dc=', appVersion].join('')
          },
          {
            match: '{{app_version}}',
            replacement: appVersion
          },
          {
            match: '{{imigo_version}}',
            replacement: releaseType ? (testProduction ? appVersion : '') : appVersion
          },
          {
            match: '{{test_release_mode}}',
            replacement: testProduction
          },
          {
            match: '{{google_analytics}}',
            replacement: releaseType ? (testProduction ? paths.analytics.testRelease : paths.analytics.release) : ''
          },
          {
            match: '{{boot_js}}',
            replacement: bootJs
          }
        ]
      }))
      .pipe(gulp.dest('./'));
});

gulp.task('es6', function () {
  return gulp.src([paths.source, '!src/Boot.js'], { base: 'src' })
    .pipe(plumber())
    .pipe(changed(paths.output, { extension: '.js' }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(babel(compilerOptions))
    .pipe(ngAnnotate({
      sourceMap: true,
      gulpWarnings: false
    }))
    .pipe(sourcemaps.write("./sourcemaps", { sourceRoot: './src' }))
    .pipe(gulp.dest(paths.output))
});

gulp.task('html', function () {
  return gulp.src(paths.templates)
    .pipe(plumber())
    .pipe(changed(paths.output, { extension: '.html' }))
    .pipe(htmlMin({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(ngHtml2Js({
      template: "import angular from 'angular';\n" +
        "export default angular.module('<%= moduleName %>', []).run(['$templateCache', function($templateCache) {\n" +
        "   $templateCache.put('<%= template.url %>',\n    '<%= template.prettyEscapedContent %>');\n" +
        "}]);\n"
    }))
    .pipe(babel(compilerOptions))
    .pipe(gulp.dest(paths.output))
});

gulp.task('less', function () {
  var browserSync,
      releaseType = global.release,
      result = gulp.src(paths.less)
          .pipe(plumber())
          .pipe(changed(paths.output, {extension: '.css'}))
         .pipe(sourcemaps.init())
          .pipe(less())
         .pipe(sourcemaps.write("."))
          .pipe(gulp.dest(paths.output));

  if (!releaseType) {
    browserSync = require('browser-sync');
    return result.pipe(browserSync.reload({stream: true}))
  }
  return result;
});