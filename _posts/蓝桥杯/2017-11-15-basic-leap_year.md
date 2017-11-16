---
layout: blog
istop: true
study: true
ico: code
background: blue
background-image: 'http://ozg7h08dz.bkt.clouddn.com/lanqiao.png'
category: 学习
date: 2017-11-15
title: 闰年判断
tags:
  - 蓝桥杯
  - 基础练习
  - java
---

#### 介绍

问题描述

	给定一个年份，判断这一年是不是闰年。
	
	当以下情况之一满足时，这一年是闰年：
	
	1. 年份是4的倍数而不是100的倍数；
	
	2. 年份是400的倍数。
	
	其他的年份都不是闰年。

输入格式

	输入包含一个整数y，表示当前的年份

输出格式

	输出一行，如果给定的年份是闰年，则输出yes，否则输出no

样例输入

	2013

样例输出

	no

样例输入

	2016

样例输出

	yes

数据规模与约定

	1990 <= y <= 2050

说明
	
	当试题指定你输出一个字符串作为结果
	
	（比如本题的yes或者no，你需要严格按照试题中给定的大小写，写错大小写将不得分

#### 分析

判断语句顺序也能左右运行时间

#### 方法 1：分多个判断

```java
import java.util.Scanner;

public class Main {
	public static void main(String args[]) {
		Scanner scanner = new Scanner(System.in);
		int y = scanner.nextInt();
		if (y % 400 == 0) {
			System.out.println("yes");
		} else if (y % 4 == 0 && y % 100 != 0) {
			System.out.println("yes");
		} else {
			System.out.println("no");
		}
		scanner.close();
	}
}
```
