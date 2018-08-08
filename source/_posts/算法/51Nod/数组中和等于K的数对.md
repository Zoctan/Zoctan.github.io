---
title: 数组中和等于K的数对
date: 2018-03-14
category: 算法
---

http://www.51nod.com/onlineJudge/questionCode.html#!problemId=1001

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
