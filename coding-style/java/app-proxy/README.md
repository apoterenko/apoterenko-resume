### An example of proxy-server.

The application allows to create a local proxy server for local debugging of web applications.  

### Requirements
Installation of the Java 6 or higher.

### Build and run

```bash
mvn -f ./pom.xml -Dproxy.target=https://target.com -Denv.src.path=C:/sources/project -Denv.proxy.port=8090 -Dproxy.pattern=/api* -Dproxy.debug=true clean install
```

### Features

Ability to specify:  
+ debug mode (-Dproxy.debug)  
+ REST-pattern (-Dproxy.pattern)  
+ local server port (-Denv.proxy.port)  
+ remote server (-Dproxy.target)  
+ local web sources directory (-Denv.src.path)  

