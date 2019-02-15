---
title: Jenkins 自动化部署
date: 2019-01-31
category: Docker
---

# 前言

流程：
1. Jenkins 拉取 GitLab 仓库源码
2. Jenkins 本地构建打包应用
3. 把应用按 Dockerfile 打包进 Docker 镜像
4. 使用 shell 或 Docker 相关的 Jenkins 插件把镜像上传到 Docker 私有仓库
5. 执行 shell 脚本删除旧 Docker 容器，运行新 Docker 容器

参考文章：
- [Jenkins集成Docker镜像实现自动发布](https://segmentfault.com/a/1190000007837054?utm_source=tag-newest)
- [docker+jenkins+git搭建java自动化部署](https://zhuanlan.zhihu.com/p/39289273)
- [实战docker+jenkins+git+registry构建持续集成环境](http://blog.51cto.com/ganbing/2085769)
- [基于Docker+Jenkins+Gitlab搭建持续集成环境](https://www.jianshu.com/p/8b1241a90d7a)

# Git docker

参考《GitLab 搭建》

GitLab 上传了 [tale](https://github.com/otale/tale) 项目：

![tale](GitLab项目.png)

# 私有仓库 docker

参考《Registry 搭建》

# Jenkins docker

Jenkins 有很多使用方式，这里使用 Docker 部署：

```bash
sudo docker run --detach \
	--publish 50000:50000 --publish 16000:8080 \
	--link gitlab:local.gitlab.com \
	--user root \
	--name jenkins \
	--restart always \
	--volume /var/run/docker.sock:/var/run/docker.sock \
	--volume /usr/bin/docker:/usr/bin/docker \
	--volume /docker/jenkins:/var/jenkins_home \
	--volume /usr/local/maven:/usr/local/maven \
	--volume /usr/lib/jvm/jdk-8u201:/usr/local/jdk \
	jenkins/jenkins:lts
```

> --volume /var/run/docker.sock:/var/run/docker.sock
> --volume /usr/bin/docker:/usr/bin/docker
> docker in docker 的方式，可以让 jenkins 构建 docker 容器，这里需要进容器里安装一个库，不然容器无法使用 docker：
> ```bash
> apt-get update && apt-get install -y libltdl7
> ```

> 注意：映射本地的 maven 和 jdk 目录，这样容器内就不用再进行安装。

由于 Jenkins 容器的用户默认不是 root，所以在启动时需要指定 root 用户。否则映射目录就需要更改拥有者，不然会因为映射权限不足而无法启动（相关文章：[Docker Volume 之权限管理](https://www.cnblogs.com/jackluo/p/5783116.html)）：

```bash
sudo chown -R 1000 /docker/jenkins
```

## 配置

启动后看日志，里面有安装时需要用到的密码：

```bash
sudo docker logs -f jenkins

*************************************************************

Jenkins initial setup is required. An admin user has been created and a password generated.
Please use the following password to proceed to installation:

b0ef7a9de503459395b4db8433f5f291

This may also be found at: /var/jenkins_home/secrets/initialAdminPassword

*************************************************************
```

访问 localhost:16000，插件这里就选择推荐的安装了，图略。

之后继续安装一些插件，进入系统管理 -> 插件管理 -> available，搜索安装以下插件：

```
Docker plugin
docker-build-step
Gitlab Hook Plugin
GitLab Plugin
Maven Integration plugin
Publish Over SSH
```

对环境变量进行配置，进入系统管理 -> 全局工具配置：

![全局工具配置](全局工具配置.png)

编辑本地 /usr/lib/systemd/system/docker.service，修改其中的 ExecStart 属性：

```
[Service]
Type=notify
# the default is not to use systemd for cgroups because the delegate issues still
# exists and systemd currently does not support the cgroup feature set required
# for containers run by docker
ExecStart=/usr/bin/dockerd --tls=false -H unix:///var/run/docker.sock -H tcp://0.0.0.0:2375
```

进入 Jenkins 界面的系统管理 -> 系统配置，修改 Docker Builder 下的 Docker URL 为：tcp://x.x.x.x:2375，注意这里的 x.x.x.x 是本地的网卡 IP 地址，之后点击测试，确认是否可以连接。

## 本地打包构建测试

这里先测试下 Jenkins 拉取 GitLab 项目并进行打包是否可行，新建一个 Jenkins 的 Maven 项目，配置如下：

![新建 Maven 项目](Jenkins项目.png)

在项目里的 Console Output 看是否打包成功：

![打包日志](打包日志.png)

可以从日志中看到，打好的包放在 /var/jenkins_home/workspace/test/target/dist，对应的映射本地目录：/docker/jenkins/workspace/test/target/dist
