---
title: MySQL Workbench 导出 ER 图
date: 2018-03-04
category: 使用过程
---

Debian 下安装：`sudo apt install mysql-workbench`

连接数据库：菜单栏 Database -> Connect to Database

![Connect](1.png)

逆向引擎：菜单栏 Database -> Reverse Engineer

![Reverse](2.png)

选择要逆向的数据库

![Reverse](3.png)

一直 next，最后 excute，可以看到已经生成的 ER 图

![EER](4.png)

![EER](5.png)

文件导出：菜单栏 File -> Export
