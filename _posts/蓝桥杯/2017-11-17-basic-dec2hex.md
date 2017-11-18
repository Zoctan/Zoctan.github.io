---
layout: blog
istop: true
study: true
ico: code
background: blue
background-image: 'http://ozg7h08dz.bkt.clouddn.com/lanqiao.png'
category: 学习
date: 2017-11-17
title: 十进制转十六进制
tags:
  - 蓝桥杯
  - 基础练习
  - java
---

#### 介绍

问题描述

  十六进制数是在程序设计时经常要使用到的一种整数的表示方式。

  它有0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F共16个符号，分别表示十进制数的0至15

  十六进制的计数方法是满16进1，所以十进制数16在十六进制中是10

  而十进制的17在十六进制中是11，以此类推，十进制的30在十六进制中是1E

  给出一个非负整数，将它表示成十六进制的形式

输入格式

	输入包含一个非负整数a，表示要转换的数。0<=a<=2147483647

输出格式

	输出这个整数的16进制表示

样例输入

	30

样例输出

  1E

锦囊

  按除16取余倒数（也可使用格式输出）

#### 方法1：直接用内置函数

```java
import java.util.Scanner;

public class Main {
	public static void main(String args[]) {
		Scanner scanner = new Scanner(System.in);
		int a = scanner.nextInt();
		if (1 <= a && a <= 2147483647) {
			System.out.println(Integer.toHexString(a).toUpperCase());
		} else {
			System.out.println(a);
		}
		scanner.close();
	}
}
```

#### 方法2：按锦囊来


```java
import java.util.Scanner;

public class Main {
	public static void main(String args[]) {
		Scanner scanner = new Scanner(System.in);
		int a = scanner.nextInt();
		if (1 <= a && a <= 2147483647) {
			System.out.println(dec2hex(a));
		} else {
			System.out.println(a);
		}
		scanner.close();
	}

	public static String dec2hex(int dec) {
		String hex = "";
		String tmp = "";
		do {
			tmp = dec % 16 + "";
			switch (tmp) {
			case "10":
				tmp = "A";
				break;
			case "11":
				tmp = "B";
				break;
			case "12":
				tmp = "C";
				break;
			case "13":
				tmp = "D";
				break;
			case "14":
				tmp = "E";
				break;
			case "15":
				tmp = "F";
				break;
			}
			hex = tmp + hex;
			dec = dec / 16;
		} while (dec != 0);
		return hex;
	}
}
```
