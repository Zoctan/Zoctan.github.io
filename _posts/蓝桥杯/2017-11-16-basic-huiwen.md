---
layout: blog
istop: true
study: true
ico: code
background: blue
background-image: 'http://ozg7h08dz.bkt.clouddn.com/lanqiao.png'
category: 学习
date: 2017-11-16
title: 回文数
tags:
  - 蓝桥杯
  - 基础练习
  - java
---

#### 介绍

问题描述

	1221是一个非常特殊的数，它从左边读和从右边读是一样的，编程求所有这样的四位十进制数

输出格式

	按从小到大的顺序输出满足条件的四位十进制数

#### 方法 1：暴力输出

```java
public class Main {
	public static void main(String args[]) {
		for (int i = 1; i <= 9; i++) {
			for (int j = 0; j <= 9; j++) {
				System.out.println(i + "" + j + "" + j + "" + i + "");
			}
		}
	}
}
```
