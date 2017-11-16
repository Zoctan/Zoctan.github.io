---
layout: blog
istop: true
study: true
ico: code
background: blue
background-image: 'http://ozg7h08dz.bkt.clouddn.com/lanqiao.png'
category: 学习
date: 2017-11-15
title: 斐波那契数列
tags:
  - 蓝桥杯
  - 入门训练
  - java
---

#### 介绍

问题描述

	Fibonacci数列的递推公式为：Fn=Fn-1+Fn-2，其中F1=F2=1。

	当n比较大时，Fn也非常大，现在我们想知道，Fn除以10007的余数是多少

输入格式

	输入包含一个整数n

输出格式

	输出一行，包含一个整数，表示Fn除以10007的余数

样例输入

	10

样例输出

	55

样例输入

	22

样例输出

	7704

数据规模与约定

	1 <= n <= 1,000,000

说明

	在本题中，答案是要求Fn除以10007的余数，因此我们只要能算出这个余数即可，

	而不需要先计算出Fn的准确值，再将计算的结果除以10007取余数，直接计算余数往往比先算出原数再取余简单。

#### 分析

以斐波那契为点的问题还有：跳台阶；

#### 方法 1：直接算

```java
import java.util.Scanner;

public class Main {
	public static void main(String args[]) {
		Scanner scanner = new Scanner(System.in);
		int n = scanner.nextInt();
		int[] array = new int[n];
		array[0] = array[1] = 1;
		for (int i = 2; i < array.length; i++) {
			array[i] = (array[i - 1] + array[i - 2]) % 10007;
		}
		System.out.println(array[n - 1]);
		scanner.close();
	}
}
```
