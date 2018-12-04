---
title: Sdkman 管理 JDK 版本
date: 2018-10-31
category: 使用过程
---

# 前记

JDK 版本越来越多，老是手动下载改环境变量很麻烦。

偶然看到 Sdkman：The Software Development Kit Manager。

它可以管理各种 kit：Ant、Java、Gradle、Maven、Springboot-cli、Groovy、Kotlin、Scala。

# 安装

安装很简单，跟着执行下面的命令就可以了：

> 注：curl 需要挂 VPN。

```bash
$ curl -s "https://get.sdkman.io" | bash
$ source "$HOME/.sdkman/bin/sdkman-init.sh"
$ sdk version
SDKMAN 5.7.3+337
```

# 使用

以安装 Java 为例：

```bash
$ sdk list java
================================================================================
Available Java Versions
================================================================================
     12.ea.15-open                                                              
     11.0.1-zulu                                                                
     11.0.1-open                                                                
     10.0.2-zulu                                                                
     10.0.2-open                                                                
     9.0.7-zulu                                                                 
     9.0.4-open                                                                 
     8.0.191-oracle                                                             
     8.0.181-zulu                                                               
     7.0.191-zulu                                                               
     6.0.113-zulu                                                               
     1.0.0-rc8-graal                                                            
     1.0.0-rc7-graal                                                            
                                                                                
                                                                                

================================================================================
+ - local version
* - installed
> - currently in use
================================================================================
```

因为没有安装过所以没有标记当前下载过和正在使用的 Java 版本。

安装需要的版本：

```bash
$ sdk install java 8.0.191-oracle

Oracle requires that you agree with the Oracle Binary Code License Agreement
prior to installation. The license agreement can be found at:

  http://www.oracle.com/technetwork/java/javase/terms/license/index.html

Do you agree to the terms of this agreement? (Y/n): y


Downloading: java 8.0.191-oracle

In progress...

########################################################################### 100.0%########################################################################### 100.0%

Repackaging Java 8.0.191-oracle...

Done repackaging...

Installing: java 8.0.191-oracle
Done installing!


Setting java 8.0.191-oracle as default.
```

安装完成了，可以看下当前的 Java 版本：

```bash
java -version
Picked up _JAVA_OPTIONS:   -Dawt.useSystemAAFontSettings=gasp
java version "1.8.0_191"
Java(TM) SE Runtime Environment (build 1.8.0_191-b12)
Java HotSpot(TM) 64-Bit Server VM (build 25.191-b12, mixed mode)
$ sdk list java
================================================================================
Available Java Versions
================================================================================
     12.ea.15-open                                                              
     11.0.1-zulu                                                                
     11.0.1-open                                                                
     10.0.2-zulu                                                                
     10.0.2-open                                                                
     9.0.7-zulu                                                                 
     9.0.4-open                                                                 
 > * 8.0.191-oracle                                                             
     8.0.181-zulu                                                               
     7.0.191-zulu                                                               
     6.0.113-zulu                                                               
     1.0.0-rc8-graal                                                            
     1.0.0-rc7-graal                                                            
                                                                                
                                                                                

================================================================================
+ - local version
* - installed
> - currently in use
================================================================================
```

如何切换版本？

```bash
$ sdk install java 7.0.141-zulu  

Downloading: java 7.0.141-zulu

In progress...

######################################################################## 100.0%

Repackaging Java 7.0.141-zulu...

Done repackaging...

Installing: java 7.0.141-zulu
Done installing!

Do you want java 7.0.141-zulu to be set as default? (Y/n): n
$ sdk default java 7.0.141-zulu

Default java version set to 7.0.141-zulu
$ java -version
openjdk version "1.7.0_141"
OpenJDK Runtime Environment (Zulu 7.18.0.3-linux64) (build 1.7.0_141-b11)
OpenJDK 64-Bit Server VM (Zulu 7.18.0.3-linux64) (build 24.141-b11, mixed mode)
```

> 注：zulu 的 JDK 是基于 OpenJDK 的一个改进版本，是另一个 JVM 的实现。

版本顺利改变。

这样 Sdkman 就完成了 JDK 的切换，类似的 Maven，Groovy 等都可以这样实现。
