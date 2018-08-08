---
title: Bash游戏 V2
date: 2018-03-14
category: 算法
---

http://www.51nod.com/onlineJudge/questionCode.html#!problemId=1067

有一堆石子共有N个。A B两个人轮流拿，A先拿。每次只能拿1，3，4颗，拿到最后1颗石子的人获胜。
假设A B都非常聪明，拿石子的过程中不会出现失误。给出N，问最后谁能赢得比赛。

例如N = 2。A只能拿1颗，所以B可以拿到最后1颗石子。

Input

第1行：一个数T，表示后面用作输入测试的数的数量。（1 <= T <= 10000)
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
A
A

分析：

想不出来的话，可以通过 SG 函数打表发现规律：

```java
import java.util.Arrays;

public class Main {
	static int MAXN = 105;
	static int N = 3;
	static int[] f = { 1, 3, 4 };
	static boolean[] isVisit = new boolean[MAXN];
	static int[] SG = new int[MAXN];

	public static void main(String[] args) {
		getSG(100);
	}

	static void getSG(int n) {
		for (int i = 1; i < n; i++) {
			Arrays.fill(isVisit, false);
			for (int j = 0; j < N && f[j] <= i; j++) {
				isVisit[SG[i - f[j]]] = true;
			}
			for (int j = 0;; j++) {
				if (!isVisit[j]) {
					SG[i] = j;
					break;
				}
			}
			System.out.println(i + " " + SG[i]);
		}
	}
}
```

可以发现只有 mod 7 = 0、mod 7 = 2 必败。

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
		int[] a = new int[T];
		for (int i = 0; i < T; i++) {
			in.nextToken();
			a[i] = (int) in.nval;
		}

		for (int i = 0; i < T; i++) {
			out.println(a[i] % 7 == 0 || a[i] % 7 == 2 ? "B" : "A");
		}
		out.flush();
	}
}
```
