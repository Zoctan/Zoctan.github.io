---
title: Idea 读取 Java 源码
date: 2018-07-01
category: 学习
tags:
  - Java
  - 源码
---

# 前记

如果需要读 Java 源码，默认点查看读的是 Idea 反编译的文件，没有注释，参数名也被简化了。

所以如果需要更好的读源码，需要添加 src.zip 源码包。

# 官网下载

从搜索结果看，都说是直接添加 JDK 目录下的 src.zip，但是我的 JDK8 怎么都找不到。只好去官网下载整个 JDK，然后拿出我想要的源码包。

JDK8 下载地址：http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html

里面有 src.zip 源码包，放到 JDK 目录下。

如果 Idea 读取的 SDK 就是你当前使用的 JDK 版本，它会自动帮你添加。

File => Project Structure => SDKs，将 JDK 设置成刚才的 JDK 目录。
