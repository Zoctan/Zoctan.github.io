---
layout: blog
istop: true
study: true
ico: code
background: blue
background-image: 'http://ozg7h08dz.bkt.clouddn.com/lanqiao.png'
category: 学习
date: 2017-11-16
title: 数列特征
tags:
  - 蓝桥杯
  - 基础练习
  - java
---

#### 介绍

问题描述
	
	给出n个数，找出这n个数的最大值，最小值，和

输入格式
	
	第一行为整数n，表示数的个数
	
	第二行有n个数，为给定的n个数，每个数的绝对值都小于10000

输出格式

	输出三行，每行一个整数。

	第一行表示这些数中的最大值，第二行表示这些数中的最小值，第三行表示这些数的和

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
