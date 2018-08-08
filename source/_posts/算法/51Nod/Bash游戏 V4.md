---
title: Bash游戏 V4
date: 2018-03-14
category: 算法
---

http://www.51nod.com/onlineJudge/questionCode.html#!problemId=1070

有一堆石子共有N个。A B两个人轮流拿，A先拿。每次拿的数量最少1个，最多不超过对手上一次拿的数量的2倍（A第1次拿时要求不能全拿走）。拿到最后1颗石子的人获胜。假设A B都非常聪明，拿石子的过程中不会出现失误。给出N，问最后谁能赢得比赛。

例如N = 3。A只能拿1颗或2颗，所以B可以拿到最后1颗石子。

Input

第1行：一个数T，表示后面用作输入测试的数的数量。（1 <= T <= 1000)
第2 - T + 1行：每行1个数N。(1 <= N <= 10^9)

Output

共T行，如果A获胜输出A，如果B获胜输出B。

Input示例

3
2
3
4

Output示例

B
B
A

分析：

当石头数为斐波那契数时，必败。

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.StreamTokenizer;

public class Main {
	static int N = 50;
	static int[] f = new int[N];

	public static void main(String[] args) throws IOException {
		StreamTokenizer in = new StreamTokenizer(new BufferedReader(new InputStreamReader(System.in)));
		PrintWriter out = new PrintWriter(new OutputStreamWriter(System.out));
		getFibonacci();
		in.nextToken();
		int T = (int) in.nval;
		for (int i = 0; i < T; i++) {
			in.nextToken();
			int n = (int) in.nval;
			if (isFibonacci(n)) {
				out.println("B");
			} else {
				out.println("A");
			}
		}
		out.flush();
	}

	static void getFibonacci() {
		f[0] = f[1] = 1;
		for (int i = 2; i < N; i++) {
			f[i] = f[i - 1] + f[i - 2];
		}
	}

	static boolean isFibonacci(int n) {
		for (int j = 1; j < N; j++) {
			if (n == f[j]) {
				return true;
			}
		}
		return false;
	}
}
```
