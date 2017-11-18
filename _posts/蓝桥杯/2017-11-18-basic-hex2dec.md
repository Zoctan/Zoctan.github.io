---
layout: blog
istop: true
study: true
ico: code
background: blue
background-image: 'http://ozg7h08dz.bkt.clouddn.com/lanqiao.png'
category: 学习
date: 2017-11-18
title: 十六进制转十进制
tags:
  - 蓝桥杯
  - 基础练习
  - java
---

#### 介绍

问题描述

  从键盘输入一个不超过8位的正的十六进制数字符串，将它转换为正的十进制数后输出

  注：十六进制数中的10~15分别用大写的英文字母A、B、C、D、E、F表示

样例输入

	FFFF

样例输出

  65535

锦囊

  按16进制展开

#### 方法1：直接用内置函数

```java
import java.util.Scanner;

public class Main {
	public static void main(String args[]) {
		Scanner scanner = new Scanner(System.in);
		String a = scanner.next();
		if (a != null) {
			System.out.println(Long.parseLong(a, 16));
		} else {
			System.out.println(a);
		}
		scanner.close();
	}
}
```

#### 方法2：按锦囊来

每位的进制幂之和

```java
import java.util.Scanner;

public class Main {
	public static void main(String args[]) {
		Scanner scanner = new Scanner(System.in);
		String a = scanner.next();
		if (a != null) {
			System.out.println(hex2dec(a));
		} else {
			System.out.println(a);
		}
		scanner.close();
	}

	public static long hex2dec(String hex) {
		int tmp = 0;
		long dec = 0;
		for (int i = 0; i < hex.length(); i++) {
			switch (Character.toUpperCase(hex.charAt(i))) {
			case 'A':
				tmp = 10;
				break;
			case 'B':
				tmp = 11;
				break;
			case 'C':
				tmp = 12;
				break;
			case 'D':
				tmp = 13;
				break;
			case 'E':
				tmp = 14;
				break;
			case 'F':
				tmp = 15;
				break;
			default:
				tmp = (int) hex.charAt(i) - 48;
				break;
			}
			dec += tmp * Math.pow(16, hex.length() - i - 1);
		}
		return dec;
	}
}
```
