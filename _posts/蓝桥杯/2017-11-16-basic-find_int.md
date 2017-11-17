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

	6

	1 9 4 8 3 9

	9 

样例输出

	2

数据规模与约定

	1 <= n <= 1000

#### 方法 1：直接来

```java
import java.util.Scanner;

public class Main {
	public static void main(String args[]) {
		Scanner scanner = new Scanner(System.in);
		int n = scanner.nextInt();
		if (1 <= n && n <= 1000) {
			int[] array = new int[n];
			for (int i = 0; i < n; i++) {
				array[i] = scanner.nextInt();
			}
			int a = scanner.nextInt();

			int position = -1;
			for (int i = 0; i < n; i++) {
				if (array[i] == a) {
					position = i + 1;
					break;
				}
			}
			System.out.println(position);
		} else {
			System.out.println();
		}
		scanner.close();
	}
}
```
