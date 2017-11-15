---
layout: blog
istop: true
ico: code
background: blue
background-image: 'http://ozg7h08dz.bkt.clouddn.com/lanqiao.png'
category: 学习
date: 2017-11-15
title: 数列排序
tags:
  - 蓝桥杯
  - 基础练习
  - java
---

#### 介绍

问题描述

	给定一个长度为n的数列，将这个数列按从小到大的顺序排列。1<=n<=200

输入格式

	第一行为一个整数n。

	第二行包含n个整数，为待排序的数，每个整数的绝对值小于10000。

输出格式

	输出一行，按从小到大的顺序输出排序后的数列。

样例输入

	5

	8 3 6 4 9

样例输出

	3 4 6 8 9

#### 分析

排序千千万。

#### 方法 1：直接调用 Arrays 的 sort 方法

```java
import java.util.Arrays;
import java.util.Scanner;

public class ArraySort {
	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);
		int n = scanner.nextInt();
		int[] num = new int[n];
		for (int i = 0; i < n; i++) {
			num[i] = scanner.nextInt();
		}
		Arrays.sort(num);
		for (int i = 0; i < n; i++) {
			System.out.print(num[i] + " ");
		}
		scanner.close();
	}
}
```

#### 方法2：三向切分快速排序

核心思想：将待排序的数据分为三部分，左边都小于比较值，右边都大于比较值，中间的数和比较值相等。

特性：遇到和比较值相同时，不进行数据交换。

对于有大量重复数据的排序时，该算法就会优于普通快速排序算法。
但由于它整体判断代码比普通快速排序多一点，所以对于常见的大量非重复数据，它并不能比普通快速排序多大多的优势。

```java
import java.util.Scanner;

public class ArraySort {
	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);
		int n = scanner.nextInt();
		int[] num = new int[n];
		for (int i = 0; i < n; i++) {
			num[i] = scanner.nextInt();
		}
		quickSort(num, 0, num.length - 1);
		for (int i = 0; i < n; i++) {
			System.out.print(num[i] + " ");
		}
		scanner.close();
	}

	public static int partition(int[] array, int low, int high) {
		int mid = low + (high - low) / 2;
		if (array[mid] > array[high]) {
			swap(array[mid], array[high]);
		}
		if (array[low] > array[high]) {
			swap(array[low], array[high]);
		}
		if (array[mid] > array[low]) {
			swap(array[mid], array[low]);
		}
		int key = array[low];

		while (low < high) {
			while (array[high] >= key && high > low) {
				high--;
			}
			array[low] = array[high];
			while (array[low] <= key && high > low) {
				low++;
			}
			array[high] = array[low];
		}
		array[high] = key;
		return high;
	}

	public static void swap(int a, int b) {
		a ^= b ^= a ^= b;
	}

	public static void quickSort(int[] array, int low, int high) {
		if (low >= high) {
			return;
		}
		int index = partition(array, low, high);
		quickSort(array, low, index - 1);
		quickSort(array, index + 1, high);
	}
}
```