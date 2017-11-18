---
layout: blog
istop: true
study: true
ico: code
background: blue
background-image: 'http://ozg7h08dz.bkt.clouddn.com/lanqiao.png'
category: 学习
date: 2017-11-17
title: 十六进制转八进制
tags:
  - 蓝桥杯
  - 基础练习
  - java
---

#### 介绍

问题描述

	给定n个十六进制正整数，输出它们对应的八进制数

输入格式

	输入的第一行为一个正整数n （1<=n<=10）

	接下来n行，每行一个由0~9、大写字母A~F组成的字符串，

  表示要转换的十六进制正整数，每个十六进制数长度不超过100000。

输出格式

	输出n行，每行为输入对应的八进制正整数

样例输入

	2

	39

	123ABC

样例输出

	71

	4435274

说明

	先将十六进制数转换成某进制数，再由某进制数转换成八进制。

#### 方法 1：手动实现进制转换

```java
import java.util.Scanner;

public class Main {
	public static void main(String args[]) {
		Scanner scanner = new Scanner(System.in);
		int n = scanner.nextInt();
		if (1 <= n && n <= 10) {
			String[] hexArray = new String[n];
			for (int i = 0; i < n; i++) {
				hexArray[i] = scanner.next();
			}
			for (int i = 0; i < n; i++) {
				String strBinary = hex2bin(hexArray[i]);
				int len_strBin = strBinary.length();
				if (len_strBin % 3 != 0) {
					for (int j = 0; j < (3 - len_strBin % 3); j++) {
						strBinary = "0" + strBinary;
					}
				}
				String strOctal = bin2oct(strBinary);
				System.out.println(strOctal);
			}
		} else {
			System.out.println(n);
		}
		scanner.close();
	}

	private static String bin2oct(String bin) {
		StringBuilder stb = new StringBuilder();
		int i = bin.substring(0, 3).equals("000") ? 3 : 0;
		for (; i < bin.length() - 2; i += 3) {
			switch (bin.substring(i, i + 3)) {
			case "000":
				stb.append("0");
				break;
			case "001":
				stb.append("1");
				break;
			case "010":
				stb.append("2");
				break;
			case "011":
				stb.append("3");
				break;
			case "100":
				stb.append("4");
				break;
			case "101":
				stb.append("5");
				break;
			case "110":
				stb.append("6");
				break;
			case "111":
				stb.append("7");
				break;
			}
		}
		return stb.toString();
	}

	private static String hex2bin(String hex) {
		StringBuffer stb = new StringBuffer();
		for (int i = 0; i < hex.length(); i++) {
			switch (hex.charAt(i)) {
			case '0':
				stb.append("0000");
				break;
			case '1':
				stb.append("0001");
				break;
			case '2':
				stb.append("0010");
				break;
			case '3':
				stb.append("0011");
				break;
			case '4':
				stb.append("0100");
				break;
			case '5':
				stb.append("0101");
				break;
			case '6':
				stb.append("0110");
				break;
			case '7':
				stb.append("0111");
				break;
			case '8':
				stb.append("1000");
				break;
			case '9':
				stb.append("1001");
				break;
			case 'A':
				stb.append("1010");
				break;
			case 'B':
				stb.append("1011");
				break;
			case 'C':
				stb.append("1100");
				break;
			case 'D':
				stb.append("1101");
				break;
			case 'E':
				stb.append("1110");
				break;
			case 'F':
				stb.append("1111");
				break;
			}
		}
		return stb.toString();
	}
}
```
