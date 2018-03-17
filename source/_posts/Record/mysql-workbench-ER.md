---
title: mysql-workbench导出ER图
date: 2018-3-4
category: 学习
---

Debian下安装

```bash
sudo apt install mysql-workbench
```

连接数据库：菜单栏 Database -> Connect to Database

{% asset_img 1.png Connect %}

逆向引擎：菜单栏 Database -> Reverse Engineer

{% asset_img 2.png Reverse %}

选择要逆向的数据库

{% asset_img 3.png Reverse %}

一直 next，最后 excute，可以看到已经生成的 ER 图

{% asset_img 4.png EER %}

{% asset_img 5.png EER %}

文件导出：菜单栏 File -> Export
