---
title: GitLab 搭建
date: 2019-01-29
category: Docker
---

# 前言

有时候公司需要搭建私有仓库，这时 GitHub 就不能用了。

这里的私有仓库使用 GitLab，而且使用 Docker 方式运行，方便快速。

GitLab 有 CE 和 EE 版本，本文使用 CE 版本。

参考文章：
- [GitLab 官方文档](https://docs.gitlab.com/omnibus/docker/README.html)

# docker 使用

## 运行镜像

docker 会自动拉取镜像并配置运行：

```bash
sudo docker run --detach \
	--hostname local.gitlab.com \
	--publish 2200:22 --publish 8000:80 --publish 4330:433 \
	--name gitlab \
	--restart always \
	--volume /docker/gitlab/config:/etc/gitlab \
	--volume /docker/gitlab/log:/var/log/gitlab \
	--volume /docker/gitlab/data:/var/opt/gitlab \
	gitlab/gitlab-ce:latest
```

映射的端口：SSH, HTTP 和 HTTPS。

目录含义：
- /etc/gitlab：包含 gitlab 的配置文件
- /var/log/gitlab：gitlab 的日志目录
- /var/opt/gitlab：gitlab 使用的仓库保存所有版本库

因为部署在本地，又指定了 local.gitlab.com 作为域名，所以在 /etc/hosts 配置下，这样可以通过域名访问 gitlab。

```
127.0.0.1 local.gitlab.com
```

## 配置

进到容器的 shell 环境：

```bash
sudo docker exec -it gitlab /bin/bash
```

所有的配置都在 /etc/gitlab/gitlab.rb，需要注意其中的 external_url 是指向有效的 url 地址，比如：http://localhost。

更改 GitLab 的用户密码：

```bash
gitlab-rails console
user = User.where(username: 'root').first
user.password = 'root1234'
user.save!
```

重启 GitLab 服务：

```bash
gitlab-ctl restart
```

# SSH

生成公私钥：

```bash
ssh-keygen -t ed25519 -C 'root@gitlab.com'
```

这里只是测试，所以内容都按默认的填。

将公钥内容复制到 http://local.gitlab.com:8000/profile/keys：

![添加公钥](添加公钥.png)

由于不是默认的 22 端口，无法直接域名操作 Git，在 .ssh/config 文件中添加：

```
host gitlab
hostname local.gitlab.com
port 2200
```

测试：

```bash
ssh -T git@gitlab
```

# 测试项目

测试步骤：
1. 在 GitLab 添加仓库
2. 拉取到本地做修改
3. 上传回仓库

在 GitLab 添加仓库：

![添加仓库](添加仓库.png)

拉取到本地做修改：

```bash
git clone git@gitlab:root/demo.git
cd demo
git config user.email 'root@gitlab.com'
git config user.name 'root'
touch README.md
```

上传回仓库：

```bash
git add .
git commit -m 'init'
git push
```

到这里基本工作就结束了，其他关于 GitLab 的使用请看官方文档，说得非常清楚。
