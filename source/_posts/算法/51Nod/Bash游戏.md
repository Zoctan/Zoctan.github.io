---
title: Bash游戏
date: 2018-03-14
category: 算法
---

http://www.51nod.com/onlineJudge/questionCode.html#!problemId=1066

有一堆石子共有N个。A B两个人轮流拿，A先拿。每次最少拿1颗，最多拿K颗，拿到最后1颗石子的人获胜。
假设A B都非常聪明，拿石子的过程中不会出现失误。给出N和K，问最后谁能赢得比赛。

例如N = 3，K = 2。无论A如何拿，B都可以拿到最后1颗石子。

Input

第1行：一个数T，表示后面用作输入测试的数的数量。（1 <= T <= 10000)
第2 - T + 1行：每行2个数N，K。中间用空格分隔。（1 <= N,K <= 10^9)

Output

共T行，如果A获胜输出A，如果B获胜输出B。

Input示例

4
3 2
4 2
7 3
8 3

Output示例

B
A
A
B

分析：

N % (K + 1) == 0 时，先手必输。

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
		int T = (int) in.nval;
		int[] N = new int[T], K = new int[T];
		for (int i = 0; i < T; i++) {
			in.nextToken();
			N[i] = (int) in.nval;
			in.nextToken();
			K[i] = (int) in.nval;
		}

		for (int i = 0; i < T; i++) {
			if (N[i] % (K[i] + 1) == 0) {
				out.println("B");
			} else {
				out.println("A");
			}
		}
		out.flush();
	}
}
```
