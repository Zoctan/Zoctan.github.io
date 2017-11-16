---
layout: blog
istop: true
study: true
ico: code
background: blue
background-image: 'http://ozg7h08dz.bkt.clouddn.com/lanqiao.png'
category: 学习
date: 2017-11-16
title: 字母图形
tags:
  - 蓝桥杯
  - 基础练习
  - java
---

#### 介绍

问题描述

	利用字母可以组成一些美丽的图形，下面给出了一个例子：
	
	ABCDEFG
	
	BABCDEF
	
	CBABCDE
	
	DCBABCD
	
	EDCBABC
	
	这是一个5行7列的图形，请找出这个图形的规律，并输出一个n行m列的图形

输入格式
	
	输入一行，包含两个整数n和m，分别表示你要输出的图形的行数的列数

输出格式

	输出n行，每行m个字符

样例输入

	5 7

样例输出

	ABCDEFG

	BABCDEF

	CBABCDE

	DCBABCD

	EDCBABC

数据规模与约定

	1 <= n, m <= 26

#### 方法 1：暴力输出

每一行：上一行的第一个字母的后一位 + 上一行去掉最后一个字母的子串

步骤：

1. 先初始化第一行字母

2. 之后的每行都是上一行的修改

```java
import java.util.ArrayList;
import java.util.Scanner;

public class Main {
	public static void main(String args[]) {
		Scanner scanner = new Scanner(System.in);
		int n = scanner.nextInt();
		int m = scanner.nextInt();
		if (1 <= n && m <= 26) {
			ArrayList<String> chArrayLists = new ArrayList<String>();
			String string = new String();
			Character start = 'A';
			for (int i = 0; i < m; i++) {
				string += start.toString();
				start++;
			}
			chArrayLists.add(string);
			for (int i = 0; i < n - 1; i++) {
				string = chArrayLists.get(chArrayLists.size() - 1);
				start = string.charAt(0);
				start++;
				string = start.toString() + string;
				chArrayLists.add(string.substring(0, m));
			}
			for (int i = 0; i < n; i++) {
				System.out.println(chArrayLists.get(i));
			}
		} else {
			System.out.println();
		}
		scanner.close();
	}
}
```
