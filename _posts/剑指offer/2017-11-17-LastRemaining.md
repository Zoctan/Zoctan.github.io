---
layout: blog
istop: true
study: true
ico: code
background: blue
background-image: 'http://ozg7h08dz.bkt.clouddn.com/offer_index.png'
category: 学习
date: 2017-11-17
title: 孩子们的游戏(圆圈中最后剩下的数)
tags:
  - 剑指offer
  - java
---

#### 介绍

题目描述
	
	首先,让小朋友们围成一个大圈。

	然后,他随机指定一个数m,让编号为0的小朋友开始报数。

	每次喊到m-1的那个小朋友要出列唱首歌,然后可以在礼品箱中任意的挑选礼物,并且不再回到圈中,从他的下一个小朋友开始,继续0...m-1报数....

	这样下去....直到剩下最后一个小朋友,哪个小朋友会得到这份礼品呢？(注：小朋友的编号是从0到n-1)

#### 分析

约瑟夫环问题
	
	N个人围城一桌（首位相连），约定从1报数，报到数为k的人出局，然后下一位又从1开始报，以此类推。最后留下的人获胜。

	（有很多类似问题，如猴子选代王等等，解法都一样）

递推公式

	f[1] = 0

	f[i] = (f[i-1] + m) % i (i > 1)

#### 方法 1：直接用递归公式

```java
import java.util.Scanner;

public class Main {
	public static void main(String args[]) {
		Scanner scanner = new Scanner(System.in);
		int n = scanner.nextInt();
		int m = scanner.nextInt();
		System.out.println(LastRemaining_Solution(n, m));
		scanner.close();
	}

	public static int LastRemaining_Solution(int n, int m) {
		if (n == 0) {
			return -1;
		}
		int last = 0;
		for (int i = 2; i <= n; i++) {
			last = (last + m) % i;
		}
		return last;
	}
}
```