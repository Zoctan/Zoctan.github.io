---
layout: blog
istop: true
study: true
ico: code
background: blue
background-image: 'http://ozg7h08dz.bkt.clouddn.com/lanqiao.png'
category: 学习
date: 2017-11-17
title: 特殊的数字
tags:
  - 蓝桥杯
  - 基础练习
  - java
---

#### 介绍

问题描述

	153是一个非常特殊的数，它等于它的每位数字的立方和，即153=1*1*1+5*5*5+3*3*3。

  求所有满足这种条件的三位十进制数

输出格式

	按从小到大的顺序输出满足条件的三位十进制数，每个数占一行

#### 方法1：直接来

```java
import java.util.Scanner;

public class Main {
	public static void main(String args[]) {
		for (int i = 100; i <= 999; i++) {
			if (Math.pow(i % 10, 3) + Math.pow(i / 10 % 10, 3) + Math.pow(i / 100, 3) == i) {
				System.out.println(i);
			}
		}
	}
}
```
