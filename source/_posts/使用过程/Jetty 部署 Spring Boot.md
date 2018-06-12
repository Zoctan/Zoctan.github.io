---
title: Jetty 部署 Spring Boot
date: 2018-5-27
category: 杂项
tags:
- 使用过程
---

# 前记

项目需要部署到线上，原来都是直接 java -jar 这样运行的，后来才发现服务器的 CPU 占满了，不得不说第一次部署 Java 这么困难。打算用 Tomcat ，但是一直启动不了，各种奇怪的原因，无奈换成 Jetty。

# 下载

[官网下载地址](http://www.eclipse.org/jetty/download.html)，这里用的最新版9.4.10.v20180503。

当然还要装 JDK 环境什么的，我这里是 Linux 环境，就不介绍了。

然后把下载包解压放到你喜欢的位置就好了，比如 JETTY_HOME。

# Spring Boot 改造

首先去除内置的 Tomcat 环境，然后添加 Jetty，将打包方式改为 war：

```xml
<groupId>com.xx</groupId>
<artifactId>xx</artifactId>
<version>xx</version>
<!-- war 打包 -->
<packaging>war</packaging>

<dependencies>
	<dependency>
	    <groupId>org.springframework.boot</groupId>
	    <artifactId>spring-boot-starter-web</artifactId>
	    <exclusions><!-- 去除 -->
	        <exclusion>
	            <groupId>org.springframework.boot</groupId>
	            <artifactId>spring-boot-starter-tomcat</artifactId>
	        </exclusion>
	    </exclusions>
	</dependency>
	<dependency><!-- 添加 -->
	    <groupId>org.springframework.boot</groupId>
	    <artifactId>spring-boot-starter-jetty</artifactId>
	    <scope>provided</scope>
	<dependency>
</dependencies>
```

然后修改 Application：

```java
@SpringBootApplication
public class Application extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(final SpringApplicationBuilder builder) {
        // 注意 Application 是启动类
        return builder.sources(Application.class);
    }

    public static void main(final String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

然后在项目下打包（`-Dmaven.test.skip=true` 忽略测试）：

```bash
mvn clean package -Dmaven.test.skip=true
```

没有错误信息，`BUILD SUCCESS` 即成功打包。

# 部署

上面的步骤已经将项目打包到 target 目录下了，比如 xx.war。

将 xx.war 放到刚才下载解压的 Jetty 目录的 JETTY_HOME/webapps 即可。（可以在 jetty 运行时直接放进去，会动态检查）

然后运行 JETTY_HOME 下的 start.jar：

```bash
java -jar start.jar
```

或者 bin/jetty.sh：

```bash
./bin/jetty.sh start
```

访问 http://localhost:8080/xx/ 即可看到效果。

也可以修改 Jetty 的端口，在 JETTY_HOME/start.ini 下：

```
jetty.http.port=9090
```