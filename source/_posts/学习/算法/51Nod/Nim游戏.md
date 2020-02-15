---
title: Nim游戏
date: 2018-03-14
category: 算法
---

http://www.51nod.com/onlineJudge/questionCode.html#!problemId=1069

有N堆石子。A B两个人轮流拿，A先拿。每次只能从一堆中取若干个，可将一堆全取走，但不可不取，拿到最后1颗石子的人获胜。
假设A B都非常聪明，拿石子的过程中不会出现失误。给出N及每堆石子的数量，问最后谁能赢得比赛。

例如：3堆石子，每堆1颗。A拿1颗，B拿1颗，此时还剩1堆，所以A可以拿到最后1颗石子。

Input

第1行：一个数N，表示有N堆石子。（1 <= N <= 1000)
第2 - N + 1行：N堆石子的数量。(1 <= A[i] <= 10^9)

Output

如果A获胜输出A，如果B获胜输出B。

Input示例

3
1
1
1

Output示例

A

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
		int N = (int) in.nval;
		int[] A = new int[N];
		for (int i = 0; i < N; i++) {
			in.nextToken();
			A[i] = (int) in.nval;
		}

		for (int i = 1; i < N; i++) {
			A[i] ^= A[i - 1];
		}
		if (A[N - 1] == 0) {
			out.println("B");
		} else {
			out.println("A");
		}
		out.flush();
	}
}
```
