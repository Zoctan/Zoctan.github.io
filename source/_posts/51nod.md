---
title: 51Nod
date: 2018-3-14
category: 学习
tags:
  - 算法
  - Java
---

# [最大子段和](http://www.51nod.com/onlineJudge/questionCode.html#!problemId=1049)

N个整数组成的序列a[1],a[2],a[3],…,a[n]，求该序列如a[i]+a[i+1]+…+a[j]的连续子段和的最大值。当所给的整数均为负数时和为0。
例如：-2,11,-4,13,-5,-2，和最大的子段为：11,-4,13。和为20。
Input

第1行：整数序列的长度N（2 <= N <= 50000)
第2 - N + 1行：N个整数（-10^9 <= A[i] <= 10^9）

Output

输出最大子段和。

Input示例

6
-2
11
-4
13
-5
-2

Output示例

20

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;

public class Main {
	static BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
	static PrintWriter out = new PrintWriter(new OutputStreamWriter(System.out));

	public static void main(String[] args) throws IOException {
		int n = Integer.parseInt(in.readLine());
		long[] array = new long[n];
		int k = 0;
		for (int i = 0; i < n; i++) {
			array[i] = Long.parseLong(in.readLine());
			if (array[i] < 0) {
				k++;
			}
		}
		if (k == n) {
			out.println(0);
			out.flush();
			return;
		}

		// 当前最大子列和以及最大子列和
		long currentSum = 0;
		long max = array[0];
		for (int i = 0; i < n; i++) {
			// 如果当前最大子列和正数则继续加
			if (currentSum > 0) {
				currentSum += array[i];
			} else {
				currentSum = array[i];
			}
			// 负数则丢弃，因为只会让和变小
			// 如果当前子列和更大，更新答案
			if (currentSum > max) {
				max = currentSum;
			}
		}
		out.println(max);
		out.flush();
	}
}
```

# [数组中和等于K的数对](http://www.51nod.com/onlineJudge/questionCode.html#!problemId=1001)

给出一个整数K和一个无序数组A，A的元素为N个互不相同的整数，找出数组A中所有和等于K的数对。例如K = 8，数组A：{-1,6,5,3,4,2,9,0,8}，所有和等于8的数对包括(-1,9)，(0,8)，(2,6)，(3,5)。
Input

第1行：用空格隔开的2个数，K N，N为A数组的长度。(2 <= N <= 50000，-10^9 <= K <= 10^9)
第2 - N + 1行：A数组的N个元素。（-10^9 <= A[i] <= 10^9) 

Output

第1 - M行：每行2个数，要求较小的数在前面，并且这M个数对按照较小的数升序排列。
如果不存在任何一组解则输出：No Solution。

Input示例

8 9
-1
6
5
3
4
2
9
0
8

Output示例

-1 9
0 8
2 6
3 5

分析：
先排序，再用双指针，一个头一个尾，向中间扫

```java 双指针
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.StreamTokenizer;
import java.util.Arrays;
import java.util.LinkedHashSet;

public class Main {
	static class Pair {
		long a, b;

		public Pair(long a, long b) {
			this.a = a;
			this.b = b;
		}
	}

	public static void main(String[] args) throws IOException {
		StreamTokenizer in = new StreamTokenizer(new BufferedReader(new InputStreamReader(System.in)));
		PrintWriter out = new PrintWriter(new OutputStreamWriter(System.out));
		in.nextToken();
		long k = (long) in.nval;
		in.nextToken();
		int n = (int) in.nval;
		long[] array = new long[n];
		for (int i = 0; i < n; i++) {
			in.nextToken();
			array[i] = (long) in.nval;
		}
		Arrays.sort(array);

		int front = 0, end = n - 1;
		LinkedHashSet<Pair> set = new LinkedHashSet<>();
		while (front < end) {
			if (array[front] + array[end] == k) {
				set.add(new Pair(array[front], array[end]));
				front++;
				end--;
			} else if (array[front] + array[end] > k) {
				end--;
			} else {
				front++;
			}
		}

		if (set.size() == 0) {
			out.println("No Solution");
		} else {
			for (Pair pair : set) {
				out.println(pair.a + " " + pair.b);
			}
		}
		out.flush();
	}
}
```

# [数塔取数问题](http://www.51nod.com/onlineJudge/questionCode.html#!problemId=1002)

一个高度为N的由正整数组成的三角形，从上走到下，求经过的数字和的最大值。
每次只能走到下一层相邻的数上，例如从第3层的6向下走，只能走到第4层的2或9上。

```
   5
  8 4
 3 6 9
7 2 9 5
```

例子中的最优方案是：5 + 8 + 6 + 9 = 28
Input

第1行：N，N为数塔的高度。(2 <= N <= 500)
第2 - N + 1行：每行包括1层数塔的数字，第2行1个数，第3行2个数......第k+1行k个数。数与数之间用空格分隔（0 <= A[i] <= 10^5) 。

Output

输出最大值

Input示例

4
5
8 4
3 6 9
7 2 9 5

Output示例

28

分析：
坑……由示例推断是贪心，结果后面一半的测试样例都错了，看到题解才发现是由下往上更新的动态规划。

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.StreamTokenizer;

public class Main {
	public static void main(String[] args) throws IOException {
		StreamTokenizer in = new StreamTokenizer(new BufferedReader(new InputStreamReader(System.in)));
		PrintWriter out = new PrintWriter(new OutputStreamWriter(System.out));
		in.nextToken();
		int n = (int) in.nval;
		long[][] array = new long[n][n + 1];
		for (int i = 0; i < n; i++) {
			for (int j = 0; j <= i; j++) {
				in.nextToken();
				array[i][j] = (long) in.nval;
			}
		}

		for (int i = n - 1; i >= 1; i--) {
			for (int j = 0; j <= i; j++) {
				array[i - 1][j] += Math.max(array[i][j], array[i][j + 1]);
			}
		}
		out.println(array[0][0]);
		out.flush();
	}
}
```