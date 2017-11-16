---
layout: blog
istop: true
study: true
ico: code
background: blue
background-image: 'http://ozg7h08dz.bkt.clouddn.com/lanqiao.png'
category: 学习
date: 2017-11-16
title: 查找整数
tags:
  - 蓝桥杯
  - 基础练习
  - java
---

#### 介绍

问题描述
	
	给出一个包含n个整数的数列，问整数a在数列中的第一次出现是第几个

输入格式
	
	第一行包含一个整数n

	第二行包含n个非负整数，为给定的数列，数列中的每个数都不大于10000

	第三行包含一个整数a，为待查找的数

输出格式

	如果a在数列中出现了，输出它第一次出现的位置(位置从1开始编号)，否则输出-1

样例输入

	5

	1 3 -2 4 5

样例输出

	5

	-2

	11

数据规模与约定

	1 <= n <= 10000

#### 方法 1：边输入边判断

```java
import java.util.Scanner;

public class Main {
	public static void main(String args[]) {
		Scanner scanner = new Scanner(System.in);
		int n = scanner.nextInt();
		if (1 <= n && n <= 10000) {
			int buf, min = 0, max = 0, sum = 0;
			for (int i = 0; i < n; i++) {
				buf = scanner.nextInt();
				if (i == 0) {
					min = max = buf;
				}
				if (buf < min) {
					min = buf;
				}
				if (buf > max) {
					max = buf;
				}
				sum += buf;
			}
			System.out.println(max);
			System.out.println(min);
			System.out.println(sum);
		} else {
			System.out.println();
		}
		scanner.close();
	}
}
```
