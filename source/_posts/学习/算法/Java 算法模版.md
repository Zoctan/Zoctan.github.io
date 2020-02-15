---
title: Java 算法模版
date: 2018-05-01
category: 算法
---

# 前言

已经实现好的算法模版，拿来即用，建议常复习。

# 辗转相除法

求最大公约数
最小公倍数 = ab/最大公约数

```java 递归
long gcd(long a, long b) {
    return a == 0 ? b : gcd(b % a, a);
}
```

```java 迭代
long gcd(long a, long b) {
    long tmp;
    while ((tmp = a % b) != 0) {
        a = b;
        b = tmp;
    }
    return b;
}
```

# 斯特林公式

求 n 阶乘后的位数

```java
0.5 * log10(2 * n * PI) + n * log10(n / E) + 1
```

# 扩展欧几里德

求乘法逆元

```java
long[] extendEuclid(long a, long b) {
	if (b == 0) {
		return new long[] { a, 1, 0 };
	} else {
		long[] next = extendEuclid(b, a % b);
		long g = next[0];
		long x = next[2];
		long y = next[1] - next[2] * (a / b);
		return new long[] { g, x, y };
	}
}
```

# 中国剩余定理/孙子定理

```java
long CRT(long p[], long m[], long n) {
	long M = 1;
	long result = 0;
	for (int i = 0; i < n; i++) {
		M *= m[i];
	}
	for (int i = 0; i < n; i++) {
		long Mi = M / m[i];
		long x = extendEuclid(Mi, m[i])[1];
		result = (result + Mi * x * p[i]) % M;
	}
	if (result < 0) {
		result += M;
	}
	return result;
}
```

# 快速幂

```java
long quickPowerMod(long x, long n, long mod) {
    long result = 1;
    while (n > 0) {
        if ((n & 1) != 0)
            result = result * x % mod;
        x = x * x % mod;
        n >>= 1;
    }
    return result;
}
```

# 全排列

```java
/**
 * char[] a = { 'a', 'b', 'c' };
 * permutate(a, 0);
 */
void permutate(char[] A, int n) {
	if (n == A.length) {
		System.out.println(new String(A));
	} else {
		for (int i = n; i < A.length; i++) {
			if (isUnique(A, n, i)) {
				swap(A, n, i);
				permutate(A, n + 1);
				swap(A, n, i);
			}
		}
	}
}

// 如果有重复字符，要去重
boolean isUnique(char[] A, int start, int end) {
	for (int i = start; i < end; i++)
		if (A[i] == A[end])
			return false;
	return true;
}
```

# 最长公共子序列

两个字符串中的最长公共子序列，不要求子序列连续

```java
void LCS(String s1, String s2) {
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

	StringBuilder sb = new StringBuilder();
	// 利用上面得到的矩阵计算子序列，从最右下角往左上走
	for (int i = s1Length, j = s2Length; i > 0 && j > 0;) {
		// 相同时即为相同的子串
		if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
			sb.append(s1.charAt(i - 1));
			i--;
			j--;
		} else {
			if (dp[i - 1][j] > dp[i][j - 1]) {
				i--;
			} else {
				j--;
			}
		}
	}
	System.out.println(sb.reverse().toString());
	System.out.println("length: " + dp[s1Length][s2Length]);
}
```

# 最长公共子串

两个字符串中的最长公共子串，要求子串一定连续

```java
int Longest(String s1, String s2) {
	int s1Length = s1.length(), s2Length = s2.length();
	int[][] dp = new int[s1Length][s2Length];
	int longest = 0;

	for (int i = 0; i < s1Length; i++) {
		for (int j = 0; j < s2Length; j++) {
			if (s1.charAt(i) == s2.charAt(j)) {
				if (i == 0 || j == 0) {
					dp[i][j] = 1;
				} else {
					dp[i][j] = dp[i - 1][j - 1] + 1;
				}
				longest = Math.max(longest, dp[i][j]);
			}
		}
	}
	return longest;
}
```

# Manacher

求最长回文子串长度

```java
int Manacher(String str) {
	// 构造新的字符串
	// 为了避免奇数回文和偶数回文的不同处理问题，在原字符串中插入'#'，将所有回文变成奇数回文
	StringBuilder newStr = new StringBuilder();
	newStr.append('#');
	for (int i = 0; i < str.length(); i++) {
		newStr.append(str.charAt(i));
		newStr.append('#');
	}
	// rad[i]表示以i为中心的回文的最大半径，i至少为1，即该字符本身
	int[] rad = new int[newStr.length()];
	// right表示已知的回文中，最右的边界的坐标
	int right = -1;
	// id表示已知的回文中，拥有最右边界的回文的中点坐标
	int id = -1;
	// 计算所有的rad
	// 这个算法是O(n)的，因为right只会随着里层while的迭代而增长，不会减少。
	for (int i = 0; i < newStr.length(); i++) {
		// 确定一个最小的半径
		int r = 1;
		if (i <= right) {
			r = Math.min(rad[id] - i + id, rad[2 * id - i]);
		}
		// 尝试更大的半径
		while (i - r >= 0 && i + r < newStr.length() && newStr.charAt(i - r) == newStr.charAt(i + r)) {
			r++;
		}
		// 更新边界和回文中心坐标
		if (i + r - 1 > right) {
			right = i + r - 1;
			id = i;
		}
		rad[i] = r;
	}

	// 扫描一遍rad数组，找出最大的半径
	int maxLength = 0;
	for (int r : rad) {
		maxLength = Math.max(r, maxLength);
	}
	return maxLength - 1;
}
```

# 埃拉托斯特尼筛法

```java
ArrayList<Integer> getPrime(int n) {
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
```

# KMP

匹配字符串

```java
public static void main(String[] args) {
	String a = "ababa";
	String b = "ssdfgasdbababa";
	int[] next = KMPNext(a);
	int res = KMP(b, a, next);
	System.out.println(res); //9
}

static int KMP(String source, String dest, int[] next) {
	for (int i = 0, j = 0; i < source.length(); i++) {
		while (j > 0 && source.charAt(i) != dest.charAt(j)) {
			j = next[j - 1];
		}
		if (source.charAt(i) == dest.charAt(j)) {
			j++;
		}
		if (j == dest.length()) {
			return i - j + 1;
		}
	}
	return 0;
}

static int[] KMPNext(String dest) {
	int[] next = new int[dest.length()];
	for (int i = 1, j = 0; i < dest.length(); i++) {
		while (j > 0 && dest.charAt(j) != dest.charAt(i)) {
			j = next[j - 1];
		}
		if (dest.charAt(i) == dest.charAt(j)) {
			j++;
		}
		next[i] = j;
	}
	return next;
}
```

# 判断线段相交

```java
double crossProduct(Point a, Point b, Point c) {
	return (a.x - c.x) * (b.y - c.y) - (a.y - c.y) * (b.x - c.x);
}

boolean isIntersects(Point a, Point b, Point c, Point d) {
	// 判断叉积是否异号
	// 为正顺时针方向，为负则逆时针方向
	// 即判断c、d两点是否在ab线段的两侧
	// 再判断a、b两点是否在cd线段的两侧
	// 都成立才正确
	return crossProduct(a, b, c) * crossProduct(a, b, d) <= 0
			&& crossProduct(c, d, a) * crossProduct(c, d, b) <= 0;
}
```

# 01背包

```java
int capacity = 12;
int items = 5;
int[] weight = new int[] { 2, 2, 6, 5, 4 };
int[] value = new int[] { 6, 3, 5, 4, 6 };
int[] dp = new int[capacity + 1];

void bagOneZero() {
	for (int i = 0; i < items; i++) {
		for (int j = capacity; j >= weight[i]; j--) { // 逆序
			dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i]);
		}
	}
}
```

# 完全背包

```java
void bagComplete() {
	for (int i = 0; i < items; i++) {
		for (int j = weight[i]; j <= capacity; j++) { // 顺序
			dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i]);
		}
	}
}
// 初始化分两种情况：
// 1. 背包要求正好装满：dp[0] = 0, dp[1~w] = Integer.MIN_VALUE;  
// 2. 不需要正好装满：dp[0~v] = 0;
```

# 多重背包

```java
int capacity = 12;
int items = 5;
int[] weight = new int[] { 2, 2, 6, 5, 4 };
int[] value = new int[] { 6, 3, 5, 4, 6 };
int[] num = new int[] { 2, 3, 1, 4, 2 };
int[] dp = new int[capacity + 1];

void bagMultiple() {
	for (int i = 0; i < items; i++) {
		for (int k = 0; k < num[i]; k++) { // 比01背包多一个数量限制
			for (int j = capacity; j >= weight[i]; j--) {
				dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i]);
			}
		}
	}
}
```

# 快排

```java
int partition(int[] A, int low, int high) {
	int i = low;
	int j = high + 1;
	int pivot = A[low]; // 基准
	while (true) {
		// 左边的比基准值小
		while (i < high && A[++i] < pivot);
		// 右边的比基准值大
		while (A[--j] > pivot);
		if (i >= j)	break;
		swap(A, i, j);
	}
	// 基准值交换到 i j 相遇的位置
	swap(A, low, j);
	return j;
}

void quicksort(int[] A, int low, int high) {
	if (low < high) {
		int mid = partition(A, low, high);
		quicksort(A, low, mid - 1);
		quicksort(A, mid + 1, high);
	}
}
```

# 矩阵乘法

```java
class Matrix {
	int[][] matrix;

	Matrix(int n) {
		matrix = new int[n][n];
	}
}

Matrix mul(Matrix a, Matrix b) {
	Matrix c = new Matrix(n);
	for (int i = 0; i < n; i++)
		for (int j = 0; j < n; j++)
			for (int k = 0; k < n; k++)
				c.matrix[i][j] += a.matrix[i][k] * b.matrix[k][j];
	return c;
}
```

# 三角形外心

```java
Point circumcenter(Point a, Point b, Point c) { // 返回三角形的外心
	double a1 = b.x - a.x;
	double b1 = b.y - a.y;
	double c1 = (a1 * a1 + b1 * b1) / 2;
	double a2 = c.x - a.x;
	double b2 = c.y - a.y;
	double c2 = (a2 * a2 + b2 * b2) / 2;
	double d = a1 * b2 - a2 * b1;
	return new Point(a.x + (c1 * b2 - c2 * b1) / d, a.y + (a1 * c2 - a2 * c1) / d);
}
```

# 多边形面积

```java
double Cross(Point a, Point b) {
	return a.x * b.y - a.y * b.x;
}
```

```c
/*
Kruskal算法
适用于 稀疏图 求最小生成树
*/
/*
    第一步：点、边、加入vector，把所有边按从小到大排序
    第二步：并查集部分 + 下面的code
*/
void Kruskal() {    
    ans = 0;    
    for (int i = 0; i<len; i++) {    
        if (Find(edge[i].a) != Find(edge[i].b)) {    
            Union(edge[i].a, edge[i].b);    
            ans += edge[i].len;    
        }    
    }    
}    

/*
Prim算法
适用于 稠密图 求最小生成树
堆优化版，时间复杂度：O(elgn)
*/
struct node {  
    int v, len;  
    node(int v = 0, int len = 0) :v(v), len(len) {}  
    bool operator < (const node &a)const {  // 加入队列的元素自动按距离从小到大排序  
        return len> a.len;  
    }  
};
vector<node> G[maxn];int vis[maxn];int dis[maxn];
void init() {  
    for (int i = 0; i<maxn; i++) {  
        G[i].clear();  
        dis[i] = INF;  
        vis[i] = false;  
    }  
}  int Prim(int s) {  
    priority_queue<node>Q; // 定义优先队列  
    int ans = 0;  
    Q.push(node(s,0));  // 起点加入队列  
    while (!Q.empty()) {   
        node now = Q.top(); Q.pop();  // 取出距离最小的点  
        int v = now.v;  
        if (vis[v]) continue;  // 同一个节点，可能会推入2次或2次以上队列，这样第一个被标记后，剩下的需要直接跳过。  
        vis[v] = true;  // 标记一下  
        ans += now.len;  
        for (int i = 0; i<G[v].size(); i++) {  // 开始更新  
            int v2 = G[v][i].v;  
            int len = G[v][i].len;  
            if (!vis[v2] && dis[v2] > len) {   
                dis[v2] = len;  
                Q.push(node(v2, dis[v2]));  // 更新的点加入队列并排序  
            }  
        }  
    }  
    return ans;
}  

/*
    Dijkstra算法
    适用于边权为正的有向图或者无向图
    求从单个源点出发，到所有节点的最短路
    优化版：时间复杂度 O(elbn)
*/
struct node {  
    int v, len;  
    node(int v = 0, int len = 0) :v(v), len(len) {}  
    bool operator < (const node &a)const {  //  距离从小到大排序  
        return len > a.len;  
    }  
};  
vector<node>G[maxn];  bool vis[maxn];  int dis[maxn];
void init() {  
    for (int i = 0; i<maxn; i++) {  
        G[i].clear();  
        vis[i] = false;  
        dis[i] = INF;  
    }  
}  int dijkstra(int s, int e) {  
    priority_queue<node>Q;  
    Q.push(node(s, 0)); //  加入队列并排序  
    dis[s] = 0;  
    while (!Q.empty()) {  
        node now = Q.top();     //  取出当前最小的  
        Q.pop();  
        int v = now.v;  
        if (vis[v]) continue;   //  如果标记过了, 直接continue  
        vis[v] = true;  
        for (int i = 0; i<G[v].size(); i++) {   //  更新  
            int v2 = G[v][i].v;  
            int len = G[v][i].len;  
            if (!vis[v2] && dis[v2] > dis[v] + len) {  
                dis[v2] = dis[v] + len;  
                Q.push(node(v2, dis[v2]));  
            }  
        }  
    }  
    return dis[e];  
}  

/*
    SPFA算法
    队列优化
    可处理负环
*/
vector<node> G[maxn];bool inqueue[maxn];int dist[maxn];
void Init() {  
    for(int i = 0 ; i < maxn ; ++i){  
        G[i].clear();  
        dist[i] = INF;  
    }  
}
int SPFA(int s,int e) {  
    int v1,v2,weight;  
    queue<int> Q;  
    memset(inqueue,false,sizeof(inqueue)); // 标记是否在队列中  
    memset(cnt,0,sizeof(cnt)); // 加入队列的次数  
    dist[s] = 0;  
    Q.push(s); // 起点加入队列  
    inqueue[s] = true; // 标记  
    while(!Q.empty()){  
        v1 = Q.front();  
        Q.pop();  
        inqueue[v1] = false; // 取消标记  
        for(int i = 0 ; i < G[v1].size() ; ++i){ // 搜索v1的链表  
            v2 = G[v1][i].vex;  
            weight = G[v1][i].weight;  
            if(dist[v2] > dist[v1] + weight){ // 松弛操作  
                dist[v2] = dist[v1] + weight;  
                if(inqueue[v2] == false){  // 再次加入队列  
                    inqueue[v2] = true;  
                    //cnt[v2]++;  // 判负环  
                    //if(cnt[v2] > n) return -1;  
                    Q.push(v2);  
                } } }  
    }  
    return dist[e];  
}
/*
    不断的将s的邻接点加入队列，取出不断的进行松弛操作，直到队列为空  

    如果一个结点被加入队列超过n-1次，那么显然图中有负环  
*/

/*
    Floyd算法
    任意点对最短路算法
    求图中任意两点的最短距离的算法
*/
for (int i = 0; i < n; i++) {   //  初始化为0  
    for (int j = 0; j < n; j++)  
        scanf("%lf", &dis[i][j]);  
}  for (int k = 0; k < n; k++) {  
    for (int i = 0; i < n; i++) {  
        for (int j = 0; j < n; j++) {  
            dis[i][j] = min(dis[i][j], dis[i][k] + dis[k][j]);  
        }  
    }
}

/*
    |交叉染色法判断二分图|
    |16/11/05ztx|
*/
int bipartite(int s) {  
    int u, v;  
    queue<int>Q;  
    color[s] = 1;  
    Q.push(s);  
    while (!Q.empty()) {  
        u = Q.front();  
        Q.pop();  
        for (int i = 0; i < G[u].size(); i++) {  
            v = G[u][i];  
            if (color[v] == 0) {  
                color[v] = -color[u];  
                Q.push(v);  
            }  
            else if (color[v] == color[u])  
                return 0;  
        }  
    }  
    return 1;  
}  

/*
    |求解最大匹配问题|
    |递归实现|
    |16/11/05ztx|
*/
vector<int>G[maxn];  bool inpath[maxn];  //  标记  int match[maxn];    //  记录匹配对象  void init()  
{  
    memset(match, -1, sizeof(match));  
    for (int i = 0; i < maxn; ++i) {  
        G[i].clear();  
    }  
}  bool findpath(int k) {  
    for (int i = 0; i < G[k].size(); ++i) {  
        int v = G[k][i];  
        if (!inpath[v]) {  
            inpath[v] = true;  
            if (match[v] == -1 || findpath(match[v])) { // 递归  
                match[v] = k; // 即匹配对象是“k妹子”的  
                return true;  
            }  
        }  
    }  
    return false;  
}  
void hungary() {  
    int cnt = 0;  
    for (int i = 1; i <= m; i++) {  // m为需要匹配的“妹子”数  
        memset(inpath, false, sizeof(inpath)); // 每次都要初始化  
        if (findpath(i)) cnt++;  
    }  
    cout << cnt << endl;  
}  

/*
    |求解最大匹配问题|
    |dfs实现|
    |16/11/05ztx|
*/
int v1, v2;  bool Map[501][501];  bool visit[501];  int link[501];  int result;  
bool dfs(int x)  {  
    for (int y = 1; y <= v2; ++y)  {  
        if (Map[x][y] && !visit[y])  {  
            visit[y] = true;  
            if (link[y] == 0 || dfs(link[y]))  {  
                link[y] = x;  
                return true;  
            } } }  
    return false;  
}  

void Search()  {  
    for (int x = 1; x <= v1; x++)  {  
        memset(visit,false,sizeof(visit));  
        if (dfs(x))  
            result++;  
    }
}

/*
    |最长上升子序列|
    |状态转移|
    |16/11/05ztx|
*/
/*
    状态转移dp[i] = max{ 1.dp[j] + 1 };  j<i; a[j]<a[i];
    d[i]是以i结尾的最长上升子序列
    与i之前的 每个a[j]<a[i]的 j的位置的最长上升子序列+1后的值比较
*/
void solve(){   // 参考挑战程序设计入门经典;
    for(int i = 0; i < n; ++i){  
        dp[i] = 1;  
        for(int j = 0; j < i; ++j){  
            if(a[j] < a[i]){  
                dp[i] = max(dp[i], dp[j] + 1);  
            } } }
}  
/*
    优化方法：
    dp[i]表示长度为i+1的上升子序列的最末尾元素  
    找到第一个比dp末尾大的来代替
*/

    void solve() {  
        for (int i = 0; i < n; ++i){
            dp[i] = INF;
        }
        for (int i = 0; i < n; ++i) {  
            *lower_bound(dp, dp + n, a[i]) = a[i];  //  返回一个指针  
        }  
        printf("%d\n", *lower_bound(dp, dp + n, INF) - dp;  
    }
/*  
    函数lower_bound()返回一个 iterator 它指向在[first,last)标记的有序序列中可以插入value，而不会破坏容器顺序的第一个位置，而这个位置标记了一个不小于value的值。
*/

AC自动机
/*
    |16/11/06ztx|*/
#include<iostream>  #include<cstdio>  #include<cstring>  #include<string>  

using namespace std;  
#define N 1000010  

char str[N], keyword[N];  int head, tail;  

struct node {  
    node *fail;  
    node *next[26];  
    int count;  
    node() { //init  
        fail = NULL;// 默认为空  
        count = 0;  
        for(int i = 0; i < 26; ++i)  
            next[i] = NULL;  
    }  
}*q[N];  

node *root;  

void insert(char *str)  { // 建立Trie  
    int temp, len;  
    node *p = root;  
    len = strlen(str);  
    for(int i = 0; i < len; ++i)  {  
        temp = str[i] - 'a';  
        if(p->next[temp] == NULL)  
            p->next[temp] = new node();  
        p = p->next[temp];  
    }  
    p->count++;  
}  

void build_ac() { // 初始化fail指针，BFS 数组模拟队列：   
    q[tail++] = root;  
    while(head != tail)  {  
        node *p = q[head++]; // 弹出队头  
        node *temp = NULL;  
        for(int i = 0; i < 26; ++i)  {  
            if(p->next[i] != NULL)  {  
                if(p == root) { // 第一个元素fail必指向根  
                    p->next[i]->fail = root;
                }else {  
                    temp = p->fail; // 失败指针  
                    while(temp != NULL) { // 2种情况结束：匹配为空or找到匹配
                        if(temp->next[i] != NULL) { // 找到匹配  
                            p->next[i]->fail = temp->next[i];  
                            break;  
                        }  
                        temp = temp->fail;  
                    }  
                    if(temp == NULL) // 为空则从头匹配  
                        p->next[i]->fail = root;  
                }  
                q[tail++] = p->next[i]; // 入队  
            } } }  
}  
int query() // 扫描  
{  
    int index, len, result;  
    node *p = root; // Tire入口  
    result = 0;  
    len = strlen(str);  
    for(int i = 0; i < len; ++i)  
    {  
        index = str[i] - 'a';  
        while(p->next[index] == NULL && p != root) // 跳转失败指针  
            p = p->fail;  
        p = p->next[index];  
        if(p == NULL)  
            p = root;  
        node *temp = p; // p不动，temp计算后缀串  
        while(temp != root && temp->count != -1)   {  
            result += temp->count;  
            temp->count = -1;  
            temp = temp->fail;  
        }  
    }  
    return result;  
}  
int main() {  
    int num;  
    head= tail = 0;  
    root = new node();  
    scanf("%d", &num);  
    getchar();  
    for(int i = 0; i < num; ++i) {  
       scanf("%s",keyword);  
        insert(keyword);  
    }  
    build_ac();  
    scanf("%s", str);  
    if(query())  
        printf("YES\n");  
    else  
        printf("NO\n");  
    return 0;  
}  

/*
    假设有N个模式串，平均长度为L；文章长度为M。 建立Trie树：O(N*L) 建立fail指针：O(N*L) 模式匹配：O(M*L) 所以，总时间复杂度为:O( (N+M)*L )。*/

```
