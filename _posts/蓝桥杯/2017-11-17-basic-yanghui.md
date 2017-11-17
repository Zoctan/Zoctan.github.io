---
layout: blog
istop: true
study: true
ico: code
background: blue
background-image: 'http://ozg7h08dz.bkt.clouddn.com/lanqiao.png'
category: 学习
date: 2017-11-17
title: 杨辉三角形
tags:
  - 蓝桥杯
  - 基础练习
  - java
---

#### 介绍

问题描述

  杨辉三角形又称Pascal三角形，它的第i+1行是(a+b)i的展开式的系数。

  它的一个重要性质是：三角形中的每个数字等于它两肩上的数字相加。

  下面给出了杨辉三角形的前4行：

  1

  1 1

  1 2 1

  1 3 3 1

  给出n，输出它的前n行

输入格式

	输入包含一个数n

输出格式

	输出杨辉三角形的前n行。每一行从这一行的第一个数开始依次输出，中间使用一个空格分隔。

  请不要在前面输出多余的空格

样例输入

	4

样例输出

  1

  1 1

  1 2 1

  1 3 3 1

数据规模与约定

	1 <= n <= 34

#### 方法 1：直接来

1

1 1

1 2 1

1 3 3 1

1 4 6 4 1

1 5 10 10 5 1

除了边上的1

中间值 = 上一行该位置的值 + 上一行前一位置的值

```java
import java.util.Scanner;

public class Main {
	public static void main(String args[]) {
		Scanner scanner = new Scanner(System.in);
		int n = scanner.nextInt();
		if (1 <= n && n <= 34) {
			int[][] array = new int[n][n];
			for (int i = 0; i < n; i++) {
				for (int j = 0; j <= i; j++) {
					if (j == 0 || i == j) {
						array[i][j] = 1;
					} else {
						array[i][j] = array[i - 1][j] + array[i - 1][j - 1];
					}
					System.out.print(array[i][j] + " ");
				}
				System.out.println();
			}
		} else {
			System.out.println();
		}
		scanner.close();
	}
}
```
