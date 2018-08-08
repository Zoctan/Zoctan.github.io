---
title: Redshift 色温控制
date: 2018-04-15
category: 使用过程
---

# 前记

最近看电脑时间越来越长，电脑的光太刺眼了，眼睛很不舒服，所以搜了下 Linux 下可以使用的色温软件，找到了这两款软件：
- F.lux：It makes the color of your computer's display adapt to the time of day, warm at night and like sunlight during the day.（[官网](https://justgetflux.com/) | [Github](https://github.com/xflux-gui/fluxgui)） 
- Redshift：It adjusts the color temperature of your screen according to your surroundings.（[官网](http://jonls.dk/redshift/) | [Github](https://github.com/jonls/redshift)）

它们都支持 Windows 和 Linux。

以前在 Windows 用过 F.lux，所以这次先试了它。可能是白天测试的原因，没有色温变化，而我想要白天夜晚都可以控制色温的，所以放弃了 F.lux。

Redshift 在简单的安装后就能使用了，挺方便的，所以设置为了开机自启，以下是安装过程和设置过程：

# Debian 安装

```bash
sudo apt-get install redshift
```

## 配置

切换到 `~/.config` 目录下，并新建文件 `redshift.conf`，配置内容如下：

```bash
[redshift]
; 白天屏幕温度
temp-day=5800
; 夜晚屏幕温度
temp-night=4600
; 昼夜是否平滑过度(1/0)
transition=1
; 全局屏幕亮度
;brightness=0.9
; 昼夜屏幕亮度(version >= 1.8)
brightness-day=0.9
brightness-night=0.7
; 屏幕gamma
gamma=0.9
; 位置提供方式(redshift -l list)
location-provider=manual
; 调整工具(redshift -m list)
adjustment-method=randr

; 屏幕调整工具设置
[randr]
; 第1 块屏幕(0)
screen=0

[manual]
; 位置提供方式设置
; 经纬度(北京)
lat=39.90
lon=116.41
```

## 开机自启

切换到 `/etc/systemd/user` 目录下，新建文件 `redshift.service`，配置内容如下：

```bash
[Unit]
Description=Redshift display colour temperature adjustment
Documentation=http://jonls.dk/redshift/
After=display-manager.service

[Service]
Environment=DISPLAY=:0
ExecStart=/usr/bin/redshift
Restart=always
RestartSec=20

[Install]
WantedBy=default.target
```

对于新创建的 unit 文件或修改了的 unit 文件，要通知 systemd 重载此配置文件：

```bash
systemctl daemon-reload
```

然后以用户级别启动开机自启服务：

```bash
systemctl --user enable redshift.service
```

## 开启/停止/重启

像其他用户服务一样使用：

开启：`systemctl --user start redshift.service`

停止：`systemctl --user stop redshift.service`

重启：`systemctl --user restart redshift.service`

# Arch 安装

Arch 就更简单了，直接 `sudo pacman -S redshift` 即可，而且有图形化界面，除了上面的配置外其他的直接通过按钮即可开启。
