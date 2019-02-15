---
title: Registry 搭建
date: 2019-01-29
category: Docker
---

# 前言

Docker Hub 是 Docker 公司提供的公共镜像存储空间，类似 GitHub、Maven。

和它们一样，公司为了节省网络带宽，防止一些安全问题，一般会搭建私有仓库。

本文使用的私有仓库是 Registry。

参考文章：
- [Docker容器学习梳理--私有仓库Registry使用](https://www.cnblogs.com/kevingrace/p/6628062.html)
- [Registry私有仓库搭建及认证](https://www.cnblogs.com/zhaojiankai/p/7813969.html)

# 启动

docker 会自动拉取镜像并配置运行：

```bash
sudo docker run --detach \
	--name registry \
	--restart always \
	--publish 5000:5000 \
	--volume /docker/registry:/tmp/registry \
	registry
```

默认情况下，Registry 把私有仓库存放在容器内的 /tmp/registry，一关机 /tmp 目录就删除了，所以这里就把它映射到本地的 /docker/registry。

# 测试

这里使用官方的测试镜像测试：

```bash
sudo docker pull hello-world
```

更改镜像（做过某些修改镜像）的 tag 标识：

```bash
sudo docker tag hello-world localhost:5000/hello-world
```

上传到私有仓库：

```bash
sudo docker push localhost:5000/hello-world
```

删除本地的镜像：

```bash
sudo docker image remove localhost:5000/hello-world
```

测试拉取私有仓库的镜像：

```bash
sudo docker pull localhost:5000/hello-world
```

这里因为是本地测试所以一切顺利，涉及到远程服务器的私有仓库，还需要签名认证，这里暂时不做……
