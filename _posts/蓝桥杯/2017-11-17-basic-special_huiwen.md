---
layout: blog
istop: true
study: true
ico: code
background: blue
background-image: 'http://ozg7h08dz.bkt.clouddn.com/lanqiao.png'
category: 学习
date: 2017-11-17
title: 特殊回文数
tags:
  - 蓝桥杯
  - 基础练习
  - java
---

#### 介绍

问题描述

  123321是一个非常特殊的数，它从左边读和从右边读是一样的

  输入一个正整数n， 编程求所有这样的五位和六位十进制数，满足各位数字之和等于n

输入格式

	输入一行，包含一个正整数n

输出格式

	按从小到大的顺序输出满足条件的整数，每个整数占一行

样例输入

	52

样例输出

  899998

  989989

  998899

数据规模与约定

	1 <= n <= 54

#### 方法 1：直接来

```java
import java.util.Scanner;

public class Main {
	public static void main(String args[]) {
		Scanner scanner = new Scanner(System.in);
		int n = scanner.nextInt();
		if (1 <= n && n <= 54) {
			for (int i = 10000; i <= 999999; i++) {
				if (isEqual(i, n)) {
					if (isHuiWen(i)) {
						System.out.println(i);
					}
				}
			}
		} else {
			System.out.println();
		}
		scanner.close();
	}

	public static boolean isEqual(int i, int n) {
		if ((i % 10 + i / 10 % 10 + i / 100 % 10 + i / 1000 % 10 + i / 10000 % 10 + i / 100000 % 10) == n) {
			return true;
		}
		return false;
	}

	public static boolean isHuiWen(int i) {
		String num = Integer.toString(i);
		int front = 0;
		int reer = num.length() - 1;
		while (reer > front) {
			if (num.charAt(front) != num.charAt(reer)) {
				return false;
			}
			front++;
			reer--;
		}
		return true;
	}
}
```
