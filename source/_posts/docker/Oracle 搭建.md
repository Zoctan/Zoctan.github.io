---
title: Oracle 搭建
date: 2018-05-21
category: Docker
---

# 前记

项目需要用到 Oracle 数据库，但以前没有用过。本来想直接安装在主机上的，但是看了 ArchWiki 后觉得好麻烦，然后就想起了 Docker。

Spring 项目里用到了 Oracle JDBC 的驱动，但是 Maven 怎么都下载不到本地，搜索了一番才发现 Oracle 没有授权是不能直接下载的，所以这里只能手动下载添加。

这里就记录一下 Docker 安装使用 Oracle 的过程，以及在项目里导入从官网下的 JDBC 驱动。

# 安装 Oracle

查找 Oracle 相关的镜像：`sudo docker search oracle`

国内用户在拉取镜像前，可以把 docker 的源换成阿里的，这样快很多（来自 CSDN [docker使用阿里云Docker镜像库加速(修订版)](https://blog.csdn.net/bwlab/article/details/50542261)）：

```bash
sudo echo '{ "registry-mirrors": [ "https://pee6w651.mirror.aliyuncs.com"] }' > /etc/docker/daemon.json
sudo systemctl restart docker
```

这里使用 oracle-12c：

```bash
sudo docker pull sath89/oracle-12c
```

创建容器：

```bash
sudo docker run --detach \
	--publish 8080:8080 --publish 1521:1521 \
	--name oracle \
	--restart always \
	sath89/oracle-12c
```

容器 8080 和 1521 端口分别映射本地的 8080 和 1521，并且命名为 oracle。

> 冒号前为本地，冒号后为容器

查看容器日志：

```bash
sudo docker logs -f oracle
```

进入容器的 shell 环境：

```bash
sudo docker exec -it oracle /bin/bash
```

进入 Oracle 的 HOME 目录，然后运行 sqlplus：

```bash
cd $ORACLE_HOME
bin/sqlplus
```

默认账户密码：system/oracle

----

我还发现了更优雅的安装方法。（这种方式我还没试过，有待验证）

安装好 docker-compose：[官方文档](https://docs.docker.com/compose/install/#install-compose)

执行 `docker-compose up -d`，它会读取当前路径下的 docker-compose.yml 配置来 pull/run 容器。

```yml
# http://wiki.jikexueyuan.com/project/docker-technology-and-combat/yaml_file.html
version: '3'
services:
  oracle:
    # sid: XE
    # username: system
    # password: oracle
    # 指定为镜像名称或镜像 ID
    image: sath89/oracle-12c
    # 卷挂载路径设置（HOST:CONTAINER）
    #volumes:
      #- /home/xx/data:/u01/app/oracle
    # 暴露端口（HOST:CONTAINER）
    ports:
      - 1521:1521
```

# JDBC

Oracle 官网的链接：http://www.oracle.com/technetwork/database/application-development/jdbc/downloads/index.html

这里使用 Oracle 12.2.0.1 JDBC，只下载 ojdbc8.jar 就好了。（还要登录和确认协议）

## 本地安装：

```bash
cd 下载目录
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

如果上面的本地安装后 Idea 还找不到 ojdbc8，就参照下面的步骤手动将 ojdbc8 添加到本地仓库。

## 手动添加

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

到此就完成了 ojdbc8 的手动添加。

这时的 Idea 还没刷新仓库内容，你可以稍微改下你的 pom.xml 文件，让其自动更新。
