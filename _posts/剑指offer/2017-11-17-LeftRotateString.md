---
layout: blog
istop: true
study: true
ico: code
background: blue
background-image: 'http://ozg7h08dz.bkt.clouddn.com/offer_index.png'
category: 学习
date: 2017-11-17
title: 左旋转字符串
tags:
  - 剑指offer
  - java
---

#### 介绍

题目描述
	
	用字符串模拟循环左移	

	如：字符序列S=”abcXYZdef”，要求输出循环左移3位后的结果，即“XYZdefabc”

#### 方法 1：使用内置函数直接来

```java
import java.util.Scanner;

public class Main {
	public static void main(String args[]) {
		Scanner scanner = new Scanner(System.in);
		int n = scanner.nextInt();
		String string = scanner.next();
		System.out.println(LeftRotateString(string, n));
		scanner.close();
	}

	public static String LeftRotateString(String str, int n) {
		if (str == null) {
			return "";
		}
		n = n % str.length();
		if (n == 0) {
			return str;
		}
		return str.substring(n) + str.substring(0, n);
	}
}
```

#### 方法 2：手动实现

暂略