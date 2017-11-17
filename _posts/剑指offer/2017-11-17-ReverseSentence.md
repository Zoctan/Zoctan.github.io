---
layout: blog
istop: true
study: true
ico: code
background: blue
background-image: 'http://ozg7h08dz.bkt.clouddn.com/offer_index.png'
category: 学习
date: 2017-11-17
title: 翻转单词顺序
tags:
  - 剑指offer
  - java
---

#### 介绍

题目描述
	
	翻转单词顺序

	如：“student. a am I”
	正确的句子应该是“I am a student.”

#### 方法 1：使用split

```java
import java.util.Scanner;

public class Main {
	public static void main(String args[]) {
		Scanner scanner = new Scanner(System.in);
		String string = scanner.nextLine();
		System.out.println(ReverseSentence(string));
		scanner.close();
	}

	public static String ReverseSentence(String str) {
		if (str == null || str.trim().equals("")) {
			return str;
		}
		String[] strings = str.split(" ");
		StringBuilder stringBuilder = new StringBuilder();
		for (int i = strings.length - 1; i >= 0; i--) {
			stringBuilder.append(strings[i]);
			if (i != 0) {
				stringBuilder.append(" ");
			}
		}
		return stringBuilder.toString();
	}
}
```

#### 方法 1：不使用split

暂略