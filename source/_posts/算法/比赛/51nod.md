---
title: 51Nod
date: 2018-03-14
category: 算法
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
			// 如果当前最大子列和是正数，继续加
			if (currentSum > 0) {
				currentSum += array[i];
			} else {
				// 负数则丢弃，因为只会让和变小
				currentSum = array[i];
			}
			// 如果当前子列和更大，更新
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

# [质数检测 V2](http://www.51nod.com/onlineJudge/questionCode.html#!problemId=1186)

给出1个正整数N，检测N是否为质数。如果是，输出"Yes"，否则输出"No"。

Input

输入一个数N(2 <= N <= 10^30)

Output

如果N为质数，输出"Yes"，否则输出"No"。

Input示例

17

Output示例

Yes

分析：
我才发现 BigInteger 有 isProbablePrime 这种方法，已经实现好了的 Rabin Miller 算法，简直就是作弊……

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.math.BigInteger;

public class Main {
	public static void main(String[] args) throws IOException {
		BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
		PrintWriter out = new PrintWriter(new OutputStreamWriter(System.out));
		BigInteger n = new BigInteger(in.readLine());
		if (n.isProbablePrime(9)) {
			out.println("Yes");
		} else {
			out.println("No");
		}
		out.flush();
	}
}
```

# [欧拉函数](http://www.51nod.com/onlineJudge/questionCode.html#!problemId=1136)

对正整数n，欧拉函数是少于或等于n的数中与n互质的数的数目。
此函数以其首名研究者欧拉命名，它又称为Euler's totient function、φ函数、欧拉商数等。
例如：φ(8) = 4（Phi(8) = 4），因为1,3,5,7均和8互质。

Input

输入一个数N。(2 <= N <= 10^9)

Output

输出Phi(n)。

Input示例

8

Output示例

4

分析：

欧拉函数：就是求出在区间[1, n-1]中有m个数与n互质，求出m的值 

欧拉函数的求法：如果a1,a2,a3……是n的质因子数，那么 m = n * (1 - 1/a1) * (1- 1/a2) * (1- 1/a3)…… 

互质：2个数之间只有1是他们的公约数 

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
		out.println(euler(n));
		out.flush();
	}

	static int euler(int n) {
		int res = n;
		for (int i = 2; i * i <= n; i++) {
			if (n % i == 0) {
				res = res / i * (i - 1);
				while (n % i == 0) {
					n = n / i;
				}
			}
		}
		if (n != 1) {
			res = res * (n - 1) / n;
		}
		return res;
	}
}
```

# [Bash游戏](http://www.51nod.com/onlineJudge/questionCode.html#!problemId=1066)

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

# [Bash游戏 V2](http://www.51nod.com/onlineJudge/questionCode.html#!problemId=1067)

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

# [Bash游戏 V3](http://www.51nod.com/onlineJudge/questionCode.html#!problemId=1068)

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

# [Bash游戏 V4](http://www.51nod.com/onlineJudge/questionCode.html#!problemId=1070)

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

# [Nim游戏](http://www.51nod.com/onlineJudge/questionCode.html#!problemId=1069)

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

# [威佐夫游戏](http://www.51nod.com/onlineJudge/questionCode.html#!problemId=1072)

有2堆石子，A B两个人轮流拿，A先拿。每次可以从一堆中取任意个或从2堆中取相同数量的石子，但不可不取。拿到最后1颗石子的人获胜。
假设A B都非常聪明，拿石子的过程中不会出现失误。给出2堆石子的数量，问最后谁能赢得比赛。

例如：2堆石子分别为3颗和5颗。那么不论A怎样拿，B都有对应的方法拿到最后1颗。

Input

第1行：一个数T，表示后面用作输入测试的数的数量。（1 <= T <= 10000)
第2 - T + 1行：每行2个数分别是2堆石子的数量，中间用空格分隔。(1 <= N <= 2000000)

Output

共T行，如果A获胜输出A，如果B获胜输出B。

Input示例

3
3 5
3 4
1 9

Output示例

B
A
A

分析：

当 k = bk - ak，当 ak == [φ * k] 时，先手输。
黄金比例 φ = 1.618033（不知道为什么不能用，只能用 (Math.sqrt(5) + 1) / 2.0 代替）

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
		int[] b = new int[T];
		for (int i = 0; i < T; i++) {
			in.nextToken();
			a[i] = (int) in.nval;
			in.nextToken();
			b[i] = (int) in.nval;
		}

		for (int i = 0; i < T; i++) {
			if (a[i] > b[i]) {
				swap(a, b, i);
			}
			int k = b[i] - a[i];
			int t = (int) (k * (Math.sqrt(5) + 1) / 2.0);
			out.println(a[i] == t ? "B" : "A");
		}
		out.flush();
	}

	static void swap(int[] a, int[] b, int i) {
		int t = a[i];
		a[i] = b[i];
		b[i] = t;
	}
}
```

# [威佐夫游戏 V2](http://www.51nod.com/onlineJudge/questionCode.html#!problemId=1185)

有2堆石子。A B两个人轮流拿，A先拿。每次可以从一堆中取任意个或从2堆中取相同数量的石子，但不可不取。拿到最后1颗石子的人获胜。
假设A B都非常聪明，拿石子的过程中不会出现失误。给出2堆石子的数量，问最后谁能赢得比赛。

例如：2堆石子分别为3颗和5颗。那么不论A怎样拿，B都有对应的方法拿到最后1颗。

Input

第1行：一个数T，表示后面用作输入测试的数的数量。（1 <= T <= 10000)
第2 - T + 1行：每行2个数分别是2堆石子的数量，中间用空格分隔。(1 <= N <= 10^18)

Output

共T行，如果A获胜输出A，如果B获胜输出B。

Input示例

3
3 5
3 4
1 9

Output示例

B
A
A

分析：

输入数据变大，精度要求更高了，可以通过 windows 自带的计算机求出这个黄金比例。

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.StreamTokenizer;
import java.math.BigDecimal;
import java.math.BigInteger;

public class Main {
	public static void main(String[] args) throws IOException {
		BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
		PrintWriter out = new PrintWriter(new OutputStreamWriter(System.out));
		BigDecimal g = new BigDecimal("1.6180339887498948482045868343656");

		int T = Integer.parseInt(in.readLine());
		long[] a = new long[T];
		long[] b = new long[T];
		for (int i = 0; i < T; i++) {
			String[] tmp = in.readLine().split(" ");
			a[i] = Long.parseLong(tmp[0]);
			b[i] = Long.parseLong(tmp[1]);
		}

		for (int i = 0; i < T; i++) {
			if (a[i] > b[i]) {
				swap(a, b, i);
			}

			long k = new BigDecimal(b[i] - a[i]).multiply(g).longValue();
			out.println(a[i] == k ? "B" : "A");
		}
		out.flush();
	}

	static void swap(long[] a, long[] b, int i) {
		long t = a[i];
		a[i] = b[i];
		b[i] = t;
	}
}
```

# [最长回文子串](http://www.51nod.com/onlineJudge/questionCode.html#!problemId=1088)

回文串是指aba、abba、cccbccc、aaaa这种左右对称的字符串。
输入一个字符串Str，输出Str里最长回文子串的长度。

Input

输入Str（Str的长度 <= 1000)

Output

输出最长回文子串的长度L。

Input示例

daabaac

Output示例

5

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
		while (in.nextToken() != StreamTokenizer.TT_EOF) {
			String s1 = in.sval;
			out.println(Manacher(s1));
		}
		out.flush();
	}

	static int Manacher(String str) {
		String s = "$#";
		for (int i = 0; i < str.length(); i++) {
			s += str.charAt(i) + "#";
		}
		int max = 0;
		int id = 0;
		int[] p = new int[s.length()];
		for (int i = 0; i < s.length(); i++) {
			int maxLen = p[id] + id;
			if (maxLen > i) {
				p[i] = Math.min(p[2 * id - i], maxLen - i);
			}
			while (i + p[i] < s.length() && i - p[i] >= 0 && s.charAt(i - p[i]) == s.charAt(i + p[i])) {
				p[i]++;
			}
			if (maxLen < i + p[i]) {
				id = i;
			}
			max = Math.max(max, p[i]);
		}
		return max - 1;
	}
}
```

# [最长回文子串 V2](http://www.51nod.com/onlineJudge/questionCode.html#!problemId=1089)

回文串是指aba、abba、cccbccc、aaaa这种左右对称的字符串。
输入一个字符串Str，输出Str里最长回文子串的长度。

Input

输入Str（Str的长度 <= 100000)

Output

输出最长回文子串的长度L。

Input示例

daabaac

Output示例

5

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.StreamTokenizer;

public class Main {
	public static void main(String[] args) throws IOException {
		BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
		PrintWriter out = new PrintWriter(new OutputStreamWriter(System.out));
		String s1 = in.readLine();
		out.println(Manacher(s1));
		out.flush();
	}

	static int Manacher(String str) {
		StringBuilder newStr = new StringBuilder();
		newStr.append('#');
		for (int i = 0; i < str.length(); i++) {
			newStr.append(str.charAt(i));
			newStr.append('#');
		}
		int[] rad = new int[newStr.length()];
		int right = -1;
		int id = -1;
		for (int i = 0; i < newStr.length(); i++) {
			int r = 1;
			if (i <= right) {
				r = Math.min(rad[id] - i + id, rad[2 * id - i]);
			}
			while (i - r >= 0 && i + r < newStr.length() && newStr.charAt(i - r) == newStr.charAt(i + r)) {
				r++;
			}
			if (i + r - 1 > right) {
				right = i + r - 1;
				id = i;
			}
			rad[i] = r;
		}
		int maxLength = 0;
		for (int r : rad) {
			maxLength = Math.max(r, maxLength);
		}
		return maxLength - 1;
	}
}
```

# [构造回文](https://www.nowcoder.com/test/question/28c1dc06bc9b4afd957b01acdf046e69?pid=1725829&tid=14425231)

给定一个字符串s，你可以从中删除一些字符，使得剩下的串是一个回文串。如何删除才能使得回文串最长呢？
输出需要删除的字符个数。

输入描述:
输入数据有多组，每组包含一个字符串s，且保证:1<=s.length<=1000.

输出描述:
对于每组数据，输出一个整数，代表最少需要删除的字符个数。

输入例子1:
abcda
google

输出例子1:
2
2

分析：

回文翻转后和原来是一样的，这样就是求两个字符串中的最长公共子序列了，不要求子串连续。
比如：abcda 翻转后 -> adcba，明显只有 aba 是最长的回文，而且是最长的公共子序列。

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
		while (in.nextToken() != StreamTokenizer.TT_EOF) {
			String s1 = in.sval;
			StringBuffer tmp = new StringBuffer(s1);
			String s2 = tmp.reverse().toString();
			out.println(s1.length() - LCS(s1, s2));
		}
		out.flush();
	}

	static int LCS(String s1, String s2) {
		int s1Length = s1.length(), s2Length = s2.length();
		int[][] dp = new int[s1Length + 1][s2Length + 1];

		for (int i = 1; i <= s1Length; i++) {
			for (int j = 1; j <= s2Length; j++) {
				if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
					dp[i][j] = dp[i - 1][j - 1] + 1;
				} else {
					dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
				}
			}
		}
		return dp[s1Length][s2Length];
	}
}
```

# [子段求和](http://www.51nod.com/onlineJudge/questionCode.html#!problemId=1081)

给出一个长度为N的数组，进行Q次查询，查询从第i个元素开始长度为l的子段所有元素之和。
例如，1 3 7 9 -1，查询第2个元素开始长度为3的子段和，1 {3 7 9} -1。3 + 7 + 9 = 19，输出19。

Input

第1行：一个数N，N为数组的长度(2 <= N <= 50000)。
第2 至 N + 1行：数组的N个元素。(-10^9 <= N[i] <= 10^9)
第N + 2行：1个数Q，Q为查询的数量。
第N + 3 至 N + Q + 2行：每行2个数，i，l（1 <= i <= N，i + l <= N)

Output

共Q行，对应Q次查询的计算结果。

Input示例

5
1
3
7
9
-1
4
1 2
2 2
3 2
1 5

Output示例

4
10
16
19

分析：

树状数组模版题

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
		BinaryIndexedTree tree = new BinaryIndexedTree(N);
		for (int i = 1; i <= N + 1; i++) {
			in.nextToken();
			int a = (int) in.nval;
			tree.put(i, a);
		}
		int Q = (int) in.nval;
		for (int i = 0; i < Q; i++) {
			in.nextToken();
			int k = (int) in.nval;
			in.nextToken();
			int l = (int) in.nval;
			out.println(tree.sum(k + l - 1) - tree.sum(k - 1));
		}
		out.flush();
	}

	static class BinaryIndexedTree {
		int length;
		long[] tree;

		BinaryIndexedTree(int length) {
			this.length = length;
			tree = new long[length + 1];
		}

		void put(int index, int value) {
			while (index <= length) {
				tree[index] += value;
				index += lowBit(index);
			}
		}

		static int lowBit(int k) {
			return k & -k;
		}

		long sum(int index) {
			long sum = 0;
			while (index > 0) {
				sum += tree[index];
				index -= lowBit(index);
			}
			return sum;
		}
	}
}
```

# [原根](http://www.51nod.com/onlineJudge/questionCode.html#!problemId=1135)

设m是正整数，a是整数，若a模m的阶等于φ(m)，则称a为模m的一个原根。（其中φ(m)表示m的欧拉函数）
给出1个质数P，找出P最小的原根。

Input

输入1个质数P(3 <= P <= 10^9)

Output

输出P最小的原根。

Input示例

3

Output示例

2

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.StreamTokenizer;
import java.util.ArrayList;

public class Main {
	static ArrayList<Integer> prime = getPrime(1000000);
	static ArrayList<Integer> sprime = new ArrayList<>();// 存储P-1的素因子

	public static void main(String[] args) throws IOException {
		StreamTokenizer in = new StreamTokenizer(new BufferedReader(new InputStreamReader(System.in)));
		PrintWriter out = new PrintWriter(System.out);
		in.nextToken();
		int p = (int) in.nval;
		divide(p - 1);
		for (int g = 2; g < p; g++) {
			boolean flag = true;
			for (int i = 0; i < sprime.size(); i++) {
				int t = (p - 1) / sprime.get(i);
				if (quickPowerMod(g, t, p) == 1) {
					flag = false;
					break;
				}
			}
			if (flag) {
				out.println(g);
				break;// 去掉break的话是求所有的原根，加上break是求最小的原根、
			}
		}
		out.flush();
	}

	static void divide(int n) {
		// 将n分解为素因子
		int t = (int) Math.sqrt(n);
		for (int i = 0; prime.get(i) <= t; i++) {
			if (n % prime.get(i) == 0) {
				sprime.add(prime.get(i));
				// 因为有可能有多个prime[i]
				while (n % prime.get(i) == 0) {
					n /= prime.get(i);
				}
			}
		}
		if (n > 1) {
			sprime.add(n);// 可能只有自己一个素因子
		}
	}

	static long quickPowerMod(long x, long n, long mod) {
		long result = 1;
		while (n > 0) {
			x = x % mod;
			if ((n & 1) != 0)
				result = result * x % mod;
			x = x * x % mod;
			n >>= 1;
		}
		return result;
	}

	static ArrayList<Integer> getPrime(int n) {
		boolean[] notPrime = new boolean[n + 1];
		int sqrtN = (int) Math.sqrt(n);
		for (int i = 2; i <= sqrtN; i++) {
			if (notPrime[i])
				continue;
			for (int j = i * i; j <= n; j += i) {
				// j是i的倍数，即不是素数
				notPrime[j] = true;
			}
		}

		ArrayList<Integer> prime = new ArrayList<>();
		if (n > 1)
			prime.add(2);
		for (int i = 3; i <= n; i += 2) {
			if (notPrime[i])
				continue;
			prime.add(i);
		}
		return prime;
	}
}
```