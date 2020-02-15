---
title: Bash游戏 V3
date: 2018-03-14
category: 算法
---

http://www.51nod.com/onlineJudge/questionCode.html#!problemId=1068

有一堆石子共有N个。A B两个人轮流拿，A先拿。每次拿的数量只能是2的正整数次幂，比如(1,2,4,8,16....)，拿到最后1颗石子的人获胜。
假设A B都非常聪明，拿石子的过程中不会出现失误。给出N，问最后谁能赢得比赛。

例如N = 3。A只能拿1颗或2颗，所以B可以拿到最后1颗石子。（输入的N可能为大数）

Input

第1行：一个数T，表示后面用作输入测试的数的数量。（1 <= T <= 1000)
第2 - T + 1行：每行1个数N。(1 <= N <= 10^1000)

Output

共T行，如果A获胜输出A，如果B获胜输出B。

Input示例

3
2
3
4

Output示例

A
B
A

分析：

同样可以通过 SG 函数打表发现规律：

```java
import java.util.Arrays;

public class Main {
	static int MAXN = 105;
	static int N = 20;
	static int[] f = new int[N];
	static boolean[] isVisit = new boolean[MAXN];
	static int[] SG = new int[MAXN];

	public static void main(String[] args) throws IOException {
		for (int i = 0; i < N; i++) {
			f[i] = (int) Math.pow(2, i);
		}
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

mod 3 = 0 必败。

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.StreamTokenizer;
import java.math.BigInteger;

public class Main {
	public static void main(String[] args) throws IOException {
		BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
		PrintWriter out = new PrintWriter(new OutputStreamWriter(System.out));
		int T = Integer.parseInt(in.readLine());
		BigInteger three = BigInteger.valueOf(3);
		for (int i = 0; i < T; i++) {
			BigInteger N = new BigInteger(in.readLine());
			out.println(N.mod(three).intValue() == 0 ? "B" : "A");
		}
		out.flush();
	}
}
```
