---
layout: blog
istop: true
code: true
background: blue
background-image: 'http://ozg7h08dz.bkt.clouddn.com/offer_index.png'
category: 学习
date: 2017-11-15
title: 丑数
tags:
  - 剑指offer
  - java
---

#### 介绍

丑数：只含因子 2、3、5 的数。

例如：4、6、8 是丑数；而 14 不是，因为其包含因子 7。

习惯上把 1 当作第一个丑数。

#### 分析

根据定义，一个丑数应该是另一个丑数乘以 2、3或5 的结果。

例如：4 是丑数 2 乘以 2 的结果，6 是丑数 2 乘以 3 的结果（或 3 乘以 2 ）。

#### 方法 1：3 个队列解决

1. 初始化 3 个队列 Q2、Q3、Q5，分别保存 2、3、5 的倍数
2. 初始化 x 为 1
3. 分别将 x * 2、 x * 3、x * 5 插入 3 个队列
4. 令 x 为 Q2 Q3 Q5 中队头最小值
5. 若 x 在：

    Q2：Q2 出队，将 x * 2、x * 3、x * 5 分别放入 Q2、Q3、Q5

    Q3：Q3 出队，将 x * 3、x * 5 分别放入 Q3、Q5

    Q5：Q5 出队，将 x * 5 放入 Q5

	（不将倍数全部插入队列是为了避免重复，
	队列先进先出，总会保持从小到大的顺序）
6. 重复 4 ~ 5，直到找到第 k 个元素

```java
import java.util.LinkedList;
import java.util.Queue;
import java.util.Scanner;
import java.lang.Math;

public class UglyNumber {
	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);
		int index = scanner.nextInt();
		UglyNumber uglyNumber = new UglyNumber();
		System.out.println(uglyNumber.GetUglyNumber_Solution(index));
		scanner.close();
	}
	
	public int GetUglyNumber_Solution(int index) {
	    if (index < 1) return 0;
	    int minVal = 0;
	    Queue<Integer> q2 = new LinkedList<Integer>();
	    Queue<Integer> q3 = new LinkedList<Integer>();
	    Queue<Integer> q5 = new LinkedList<Integer>();
	    q2.offer(1);
	    
	    for (int i = 0; i < index; i++) {
	    	int val2 = q2.isEmpty() ? Integer.MAX_VALUE : q2.element();
	    	int val3 = q3.isEmpty() ? Integer.MAX_VALUE : q3.element();
	    	int val5 = q5.isEmpty() ? Integer.MAX_VALUE : q5.element();
	    	
	        minVal = Math.min(val2, Math.min(val3, val5));
	 
	        if (minVal == val2) {
	            q2.poll();
	            q2.offer(2 * minVal);
	            q3.offer(3 * minVal);
	        }
	        else if (minVal == val3) {
	            q3.poll();
	            q3.offer(3 * minVal);
	        }
	        else {
	            q5.poll();
	        }
	 
	        q5.offer(5 * minVal);
	    }
	 
	    return minVal;
	}
}
```