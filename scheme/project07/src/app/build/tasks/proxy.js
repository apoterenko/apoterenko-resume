var gulp = require('gulp');
var minimist = require('minimist');

var knownOptions = {
  string: 'backend',
  default: { backend: 'imigo.kabym.ru' }
};

var options = minimist(process.argv.slice(2), knownOptions);

gulp.task('proxy', function(){
    try {
        var httpProxy = require('http-proxy');
        var http = require('http');
    } catch(err) {
        console.error("Please install http-proxy dependency with: npm install http-proxy")
        return
    }

    var proxy = httpProxy.createServer();
    var proxy_config = {target: {host: '', port: '80'}}
    var proxy_host = options.backend.split(':')
    proxy_config.target.host = proxy_host[0]
    if (proxy_host.length > 1)
        proxy_config.target.port = proxy_host[1]

    console.log("Starting backend server proxy:")
    console.log("\tupstream host: " + proxy_config.target.host)
    console.log("\t         port: " + proxy_config.target.port)

    proxy.on('error', function(err, req, res) {
       console.log("Something gone wrong")
       console.log(req.url)
    });

    http.createServer(function (req, res) {
        try {
            if (req.url.search(".*/api/.*") != -1 || req.url.search(".*swagger.*") != -1 || req.url.search(".*admin/api.*") != -1) {
                proxy.web(req, res, proxy_config);
            } else if (req.url.search(".*browser-sync.*") != -1) {
                proxy.ws(req, res, {target: {host: 'localhost', port: 9000}});
            } else {
                proxy.web(req, res, {target: {host: 'localhost', port: 9000}});
            }
        }
        catch(err) {
           console.log("failed for" + req.url)
           console.log(err)
        }
    }).listen(8889);
});
