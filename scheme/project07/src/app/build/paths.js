module.exports = {
  source: 'src/**/*.js',
  app: 'app/app.js',
  html: '**/*.html',
  json: 'src/**/*.json',
  templates: 'src/**/*.html',
  less: 'src/**/*.less',
  srcLanguages: 'src/languages',
  srcPo: 'src/po',
  srcBoot: 'src/Boot.js',
  output: 'dist/',
  outputCss: 'dist/**/*.css',
  outputIndex: './index.html',
  outputArchive: 'archive',
  index: './src/index.html',
  tests: 'test/e2e/**/*.spec.js',
  api_path: '/api/1/',
  root: '.',
  cdnPath: 'https://d1z184tjk5rg7j.cloudfront.net',
  cdnConfig: 'cdn_config.js',
  analytics: {
    testRelease: 'UA-72031769-1',
    release: 'UA-73658354-1'
  },
  libs: {
    // Cnd path
    jquery: {
      build: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.js',
      release: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js'
    },
    jqueryUI: {
      build: '//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.js',
      release: '//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js'
    },
    jqueryCSSUI: {
      build: '//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.css',
      release: '//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.css'
    },
    scrollbar: {
      build: '//cdnjs.cloudflare.com/ajax/libs/jquery.perfect-scrollbar/0.6.7/js/perfect-scrollbar.jquery.js',
      release: '//cdnjs.cloudflare.com/ajax/libs/jquery.perfect-scrollbar/0.6.7/js/min/perfect-scrollbar.jquery.min.js'
    },
    es6Shim: {
      build: '//cdnjs.cloudflare.com/ajax/libs/es6-shim/0.34.4/es6-shim.js',
      release: '//cdnjs.cloudflare.com/ajax/libs/es6-shim/0.34.4/es6-shim.min.js'
    },
    graphic: {
      build: '//cdnjs.cloudflare.com/ajax/libs/pixi.js/3.0.8/pixi.js',
      release: '//cdnjs.cloudflare.com/ajax/libs/pixi.js/3.0.8/pixi.min.js'
    }
  }
};