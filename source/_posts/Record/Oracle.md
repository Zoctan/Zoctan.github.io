---
title: Oracle
date: 2018-5-21
category: 杂项
tags:
- 使用过程
---

# 前记

项目需要用到 Oracle　数据库，但是没有用过，本来想直接安装在主机上的，但是看了 ArchWiki 后觉得好麻烦，然后就想起了 docker。还有 Spring 项目里用到了 Oracle JDBC 的驱动，但是 Maven 怎么都下载不到本地，搜索了一番才发现 Oracle 没有授权，也是醉了。这里就记录一下 docker 的使用过程以及在项目里导入官网下的 JDBC 驱动。

# docker

docker 的安装过程就不累述了，网上很多。

查找 Oracle 相关的镜像：

```bash
sudo docker search oracle
```

```
NAME                                DESCRIPTION                                     STARS               OFFICIAL            AUTOMATED
oraclelinux                         Official Docker builds of Oracle Linux.         452                 [OK]                
frolvlad/alpine-oraclejdk8          The smallest Docker image with OracleJDK 8 (…   303                                     [OK]
sath89/oracle-12c                   Oracle Standard Edition 12c Release 1 with d…   299                                     [OK]
alexeiled/docker-oracle-xe-11g      This is a working (hopefully) Oracle XE 11.2…   252                                     [OK]
sath89/oracle-xe-11g                Oracle xe 11g with database files mount supp…   185                                     [OK
```

国内用户在拉取镜像前，可以把 docker 的源换成阿里的，这样快很多（来自 CSDN [docker使用阿里云Docker镜像库加速(修订版)](https://blog.csdn.net/bwlab/article/details/50542261)）：

```bash
sudo echo '{ "registry-mirrors": [ "https://pee6w651.mirror.aliyuncs.com"] }' > /etc/docker/daemon.json
systemctl restart docker
```

这里使用 oracle-12c：

```bash
sudo docker pull sath89/oracle-12c
```

创建 docker oracle 容器：

```bash
sudo docker run -d -p 8080:8080 -p 1521:1521 sath89/oracle-12c
```

如果还要挂载主机上某个文件夹的话（-v参数，冒号前为宿主机目录，必须为绝对路径，冒号后为镜像内挂载的路径）：

```bash
sudo docker run -d -p 8080:8080 -p 1521:1521 -it -v /home/xx/abc:/media sath89/oracle-12c /bin/bash
```

查看一下日志：

```bash
sudo docker logs -f 上面创建容器返回的镜像ID
```

进入镜像的 shell 环境对数据库进一步控制：

```bash
sudo docker exec -it 镜像ID /bin/bash
```

可以看下端口情况：

```bash
netstat -nlpt
```

先进入 Oracle 的 HOME 目录，然后运行 sqlplus：

```bash
cd $ORACLE_HOME
bin/sqlplus
```

默认账户密码：system/oracle

----

我还发现了更优雅的安装方法。

配好 docker-compose：[官方文档](https://docs.docker.com/compose/install/#install-compose)

```bash
sudo curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
```

加上可执行权限：

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

执行 `docker-compose up -d`，它会根据 compose.yaml 的配置来 pull/run 容器。

```yaml
# http://wiki.jikexueyuan.com/project/docker-technology-and-combat/yaml_file.html
version: '2'
services:
  oracle:
    # sid: XE
    # username: system
    # password: oracle
    # 指定为镜像名称或镜像 ID
    image: sath89/oracle-12c
    # 卷挂载路径设置（HOST:CONTAINER）
    volumes:
      - /home/xx/data:/u01/app/oracle
    # 暴露端口（HOST:CONTAINER）
    ports:
      - 1521:1521
```

不过这种方式我还没试过，有待验证。

# JDBC

Oracle 官网的链接：http://www.oracle.com/technetwork/database/application-development/jdbc/downloads/index.html

这里使用 Oracle 12.2.0.1 JDBC，只下载 ojdbc8.jar 就好了。（还要登录，并且确认协议）

本地安装（如果还不行，请看最后）：

```bash
mvn install:install-file -Dfile=ojdbc8.jar -DgroupId=com.oracle -DartifactId=ojdbc8 -Dversion=12.2.0.1 -Dpackaging=jar
```

然后就可以在 Maven 项目里导入了：

```xml
<dependencies>

    <dependency>
        <groupId>com.oracle</groupId>
        <artifactId>ojdbc8</artifactId>
        <version>12.2.0.1</version>
    </dependency>
    
</dependencies>
```

----

上面的本地安装后 Idea 还找不到的话，就手动添加到本地仓库：

一般仓库位置在 `/home/（用户名）/.m2/repository/`

以上面的 JDBC 版本为例，进到 `com/oracle/ojdbc8/12.2.0.1`（没有的话就创建这些目录），把下载的 `ojdbc8.jar` 放到这里，并且重命名为 `ojdbc8-12.2.0.1.jar`。

参考其他仓库模式，添加 pom 文件 `ojdbc8-12.2.0.1.pom`：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd" xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.oracle</groupId>
  <artifactId>ojdbc8</artifactId>
  <version>12.2.0.1</version>
  <description>POM was created from install:install-file</description>
</project>
```

这时的 Idea 还没刷新，你可以稍微改下你的 pom.xml 文件，让其自动更新。