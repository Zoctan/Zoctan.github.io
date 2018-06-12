---
title: 搬瓦工 Shadowsocks
date: 2018-6-12
category: 杂项
tags:
- 使用过程
---

# 前记

代码上的很多东西需要墙外的世界才能解决，免费 VPN 又找不到 emmm，所以就买了[搬瓦工](https://bandwagonhost.com)的一台最便宜的 VPS，大概一年120元，还支持支付宝，不着急用的话可以关注它们的优惠消息，简直就是送了，划算到不行。

还有搬瓦工的官网也需要翻墙才能上，所以建议先找个免费的限时 VPN 挂着上。

这里还有个中文网站有相关信息可以看看，还有优惠码：[banwago](https://www.banwago.com/114.html)

# 重装系统

虽然配置比较渣，但是一个月 500G 免费流量，挂上 Shadowsocks 后的速度也很快，也是满足了日常需求了。

初始系统是 Centos，版本太旧（但是有BBR加速），我就直接在[控制面板](https://bandwagonhost.com/clientarea.php?action=products)重装成了 Debian 9。

# 安装 Shadowsocks

Github 上的[shadowsocks](https://github.com/shadowsocks/shadowsocks/tree/master)

直接 apt 安装好像有问题，所以按照 Github 上的步骤安装了：

```
Debian / Ubuntu:

apt-get install python-pip
pip install git+https://github.com/shadowsocks/shadowsocks.git@master

CentOS:

yum install python-setuptools && easy_install pip
pip install git+https://github.com/shadowsocks/shadowsocks.git@master

For CentOS 7, if you need AEAD ciphers, you need install libsodium

dnf install libsodium python34-pip
pip3 install  git+https://github.com/shadowsocks/shadowsocks.git@master
```

`vim /etc/shadowsocks.json` 配置文件：

```
{
	"server":"VPS 的 IP",
	"server_port":对外开启SS的端口,
	"local_address":"127.0.0.1",
	"local_port":本地端口,
	"password":"连到 VPS 上SS需要的密码",
	"timeout":连接超时时间,
	"method":"aes-256-cfb",
	"fast_open":false
}
```

开启 SS：

```bash
ssserver -c /etc/shadowsocks.json -d start
```

开机自启：在 `/etc/rc.local` 中加入 ssserver -c /etc/shadowsocks.json -d start

本地再安装一下客户端即可看到墙外世界啦～

Github 上还有各种[客户端](https://github.com/search?o=desc&q=shadowsocks&s=stars&type=Repositories)可以玩耍～