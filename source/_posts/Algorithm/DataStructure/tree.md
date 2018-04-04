---
title: 树
date: 2018-3-19
category: 学习
tags:
  - 数据结构
  - Java
  - 算法
---

# 二叉搜索树

二叉搜索树/二叉排序树（Binary Search Tree）：

![BinarySearchTree](BinarySearchTree.png)

1. 根的左子树不空，则左子树上所有结点的值均小于它的根结点的值。
2. 根的右子树不空，则右子树上所有结点的值均大于它的根结点的值。
3. 根的左、右子树也分别为二叉搜索树。

**模版**

```java
class BSTree {
	class Node {
		int key, value;
		Node leftChild, rightChild;

		Node(int key, int value) {
			this.key = key;
			this.value = value;
		}
	}

	Node root;

	/**
	 * 查找指定节点
	 * 
	 * @param key 键
	 * 
	 * @return 指定节点
	 */
	Node query(int key) {
		Node currentNode = root;
		while (currentNode != null && currentNode.key != key) {
			if (key < currentNode.key) {
				currentNode = currentNode.leftChild;
			} else {
				currentNode = currentNode.rightChild;
			}
		}
		return currentNode;
	}

	/**
	 * 插入节点
	 * 
	 * @param key 键
	 * @param value 值
	 */
	void insert(int key, int value) {
		if (root == null) {
			root = new Node(key, value);
			return;
		}
		Node currentNode = root;
		Node parentNode = root;
		boolean isLeftChild = true;
		// 待插入的节点需要从根节点开始进行比较
		// 小于根节点则与根节点左子树比较，反之则与右子树比较
		// 直到左子树为空或右子树为空，插入到相应为空的位置
		while (currentNode != null) {
			parentNode = currentNode;
			if (key < currentNode.key) {
				currentNode = currentNode.leftChild;
				isLeftChild = true;
			} else {
				currentNode = currentNode.rightChild;
				isLeftChild = false;
			}
		}
		Node newNode = new Node(key, value);
		if (isLeftChild) {
			parentNode.leftChild = newNode;
		} else {
			parentNode.rightChild = newNode;
		}
	}

	/**
	 * 删除指定节点
	 * 
	 * @param key 键
	 * 
	 * @return 是否删除成功
	 */
	boolean delete(int key) {
		Node currentNode = root;
		Node parentNode = root;
		boolean isLeftChild = true;
		while (currentNode != null && currentNode.key != key) {
			parentNode = currentNode;
			if (key < currentNode.key) {
				currentNode = currentNode.leftChild;
				isLeftChild = true;
			} else {
				currentNode = currentNode.rightChild;
				isLeftChild = false;
			}
		}
		if (currentNode == null) {
			return false;
		}
		if (currentNode.leftChild == null && currentNode.rightChild == null) {
			// 要删除的节点为叶子节点
			if (currentNode == root) {
				root = null;
			} else if (isLeftChild) {
				parentNode.leftChild = null;
			} else {
				parentNode.rightChild = null;
			}
		} else if (currentNode.rightChild == null) {// 要删除的节点只有左孩子
			if (currentNode == root) {
				root = currentNode.leftChild;
			} else if (isLeftChild) {
				parentNode.leftChild = currentNode.leftChild;
			} else {
				parentNode.rightChild = currentNode.leftChild;
			}
		} else if (currentNode.leftChild == null) {// 要删除的节点只有右孩子
			if (currentNode == root) {
				root = currentNode.rightChild;
			} else if (isLeftChild) {
				parentNode.leftChild = currentNode.rightChild;
			} else {
				parentNode.rightChild = currentNode.rightChild;
			}
		} else {
			// 要删除的节点既有左孩子又有右孩子
			// 思路：用待删除节点右子树中的key值最小节点的值来替代要删除的节点的值，然后删除右子树中key值最小的节点
			// 右子树key最小的节点一定不含左子树，所以删除这个key最小的节点一定是属于叶子节点或者只有右子树的节点
			Node directPostNode = getDirectPostNode(currentNode);
			currentNode.key = directPostNode.key;
			currentNode.value = directPostNode.value;
		}
		return true;
	}

	/**
	 * 得到待删除节点的直接后继节点
	 * 
	 * @param delNode 待删除节点
	 * 
	 * @return 直接后继节点
	 */
	Node getDirectPostNode(Node delNode) {
		Node parentNode = delNode;// 用来保存待删除节点的直接后继节点的父亲节点
		Node directPostNode = delNode;// 用来保存待删除节点的直接后继节点
		Node currentNode = delNode.rightChild;
		while (currentNode != null) {
			parentNode = directPostNode;
			directPostNode = currentNode;
			currentNode = currentNode.leftChild;
		}
		if (directPostNode != delNode.rightChild) {// 从树中删除此直接后继节点
			parentNode.leftChild = directPostNode.rightChild;
			directPostNode.rightChild = null;
		}
		return directPostNode;// 返回此直接后继节点

	}

	/**
	 * 先序遍历
	 * 
	 * @param rootNode 根节点
	 */
	void preOrder(Node rootNode) {
		if (rootNode != null) {
			System.out.println("key: " + rootNode.key + " " + "value: " + rootNode.value);
			preOrder(rootNode.leftChild);
			preOrder(rootNode.rightChild);
		}
	}

	/**
	 * 中序遍历
	 * 
	 * @param rootNode 根节点
	 */
	void inOrder(Node rootNode) {
		if (rootNode != null) {
			inOrder(rootNode.leftChild);
			System.out.println("key: " + rootNode.key + " " + "value: " + rootNode.value);
			inOrder(rootNode.rightChild);
		}
	}

	/**
	 * 后序遍历
	 * 
	 * @param rootNode 根节点
	 */
	void postOrder(Node rootNode) {
		if (rootNode != null) {
			postOrder(rootNode.leftChild);
			postOrder(rootNode.rightChild);
			System.out.println("key: " + rootNode.key + " " + "value: " + rootNode.value);
		}
	}
}
```

# 树状数组

树状数组/二叉索引树（Binary Indexed Tree）：

![BinaryIndexedTree](BinaryIndexedTree.png)

A 数组就是原数组，C 数组则是树状数组。

通过观察可以发现：

```
[1, 1]  C1 = A1
[1, 2]  C2 = A1 + A2
[3, 3]  C3 = A3
[1, 4]  C4 = A1 + A2 + A3 + A4
[5, 5]  C5 = A5
[5, 6]  C6 = A5 + A6
[7, 7]  C7 = A7
[1, 8]  C8 = A1 + A2 + A3 + A4 + A5 + A6 + A7 + A8

C[i] 管理的区间：[i - bitLow(i) + 1, i]
```

它的查询和修改的时间复杂度都是 O(logN)，空间复杂度则为 O(N)，这是因为树状数组通过将线性结构转化成树状结构，从而进行跳跃式扫描。

通常使用在高效的计算数列的前缀和，区间和。

**模版**

```java
class BinaryIndexedTree {
	int length;
	int[] tree;// 数组有效范围 1~length

	/**
	 * 为了统一下标，tree[0]不被使用
	 * 
	 * @param length 数组长度
	 */
	BinaryIndexedTree(int length) {
		this.length = length;
		tree = new int[length + 1];
	}

	/**
	 * index一直加上lowBit(index)，直到index为length
	 * 这些位置的值都加上value
	 * 
	 * @param index 索引
	 * @param value 值
	 */
	void put(int index, int value) {
		while (index <= length) {
			tree[index] += value;
			index += lowBit(index);
		}
	}

	/**
	 * index一直减去lowBit(index)，直到index为length
	 * 这些位置的值都减去value
	 * 
	 * @param index 索引
	 */
	int get(int index) {
		int sum = tree[index];
		int z = index - lowBit(index);
		index--;
		while (index != z) {
			sum -= tree[index];
			index -= lowBit(index);
		}
		return sum;
	}

	/**
	 * 保留k的二进制最低位1的值
	 * 
	 * @param index 索引
	 */
	static int lowBit(int k) {
		// 1110保留最低位1，即最右边1：0010
		return k & -k;
	}

	/**
	 * 计算1~index范围内和
	 * 
	 * @param index 索引
	 */
	int sum(int index) {
		int sum = 0;
		while (index > 0) {
			sum += tree[index];
			index -= lowBit(index);
		}
		return sum;
	}

	/**
	 * 计算start~end范围内和
	 * 
	 * @param start 起始
	 * @param end 终点
	 */
	int sum(int start, int end) {
		return sum(end) - sum(start - 1);
	}
}
```

# 线段树

线段树/区间树（Segment tree）是一种二叉搜索树：

![SegmentTree](SegmentTree.png)

特点：
- 每个结点表示的是一个线段，或者说是一个区间。
- 当父节点的区间为$[x, y]$时，左孩子的区间就为$[x, \frac{ (x + y) }{ 2 }]$，右孩子的区间就为$[\frac{ (x + y) }{ 2 } + 1, y]$。
- 对于每一棵线段树上的节点，都有三个值：左区间、右区间以及权值。
（在某些情况下只有左右区间，这个时候线段树只是作为维护某个值而使用的数据结构，如扫描线）

线段树主要用于高效解决连续区间的动态查询问题，由于二叉结构的特性，使用线段树可以快速的查找某一个节点在若干条线段中出现的次数，时间复杂度为 O(logN）。而未优化的空间复杂度为 2N，因此有时需要离散化来压缩空间。

**模版**

```java

class SegmentTree {
	class Node {
		int left, right;// 左右区间的值
		boolean cover;// 表示是否被覆盖
		int count;// 表示此节点表示的线段区间出现的次数（被覆盖的次数），默认为0
		Node leftChild, rightChild;

		Node(int left, int right) {
			this.left = left;
			this.right = right;
			this.count = 0;
			this.cover = false;
		}
	}

	Node root;

	/**
	 * 建立一棵线段树
	 * 
	 * @param left 左区间
	 * @param right 右区间
	 */
	void build(int left, int right) {
		root = new Node(left, right);
		build(root);
	}

	/**
	 * 建立一棵线段树
	 * 
	 * @param root 根节点
	 */
	void build(Node root) {
		int left = root.left;
		int right = root.right;
		// root节点为叶子节点
		if (right - left == 1) {
			return;
		} else if (right - left > 1) {
			int mid = (left + right) >> 1;//// 将左右区间平分
			Node leftNode = new Node(left, mid);
			Node rightNode = new Node(mid, right);
			root.leftChild = leftNode;
			root.rightChild = rightNode;
			// 递归的创建左右子树
			build(leftNode);
			build(rightNode);
		}
	}

	/**
	 * 插入一条线段[left, right]
	 * 
	 * @param left 左端点
	 * @param right 右端点
	 */
	void insert(int left, int right) {
		insert(left, right, root);
	}

	/**
	 * 插入一条线段[left, right]
	 * 
	 * @param left 左端点
	 * @param right 右端点
	 * @param node 节点
	 */
	void insert(int left, int right, Node node) {
		if (node == null || left < node.left || right > node.right) {
			System.out.println("输入的参数不合法!" + "left:" + left + " " + "right:" + right);
			System.out.println("root:" + node.left + " " + node.right);
			return;
		}
		if (node.left == left && node.right == right) {
			node.count++;
			node.cover = true;
			return;
		}
		int mid = (node.left + node.right) >> 1;
		if (right <= mid) {
			insert(left, right, node.leftChild);
		} else if (left >= mid) {
			insert(left, right, node.rightChild);
		} else {
			insert(left, mid, node.leftChild);
			insert(mid, right, node.rightChild);
		}
	}

	/**
	 * 删除一条线段[left, right]
	 * 
	 * @param left 左端点
	 * @param right 右端点
	 */
	void delete(int left, int right) {
		delete(left, right, root);
	}

	/**
	 * 删除一条线段[left, right]
	 * 
	 * @param left 左端点
	 * @param right 右端点
	 * @param node 节点
	 */
	void delete(int left, int right, Node node) {
		if (node == null || left < node.left || right > node.right) {
			System.out.println("输入的参数不合法!");
			return;
		}
		if (left == node.left && right == node.right) {
			node.count--;
			if (node.count == 0) {
				node.cover = false;
			}
			return;
		}
		int mid = (node.left + node.right) >> 1;
		if (right <= mid) {
			delete(left, right, node.leftChild);
		} else if (left >= mid) {
			delete(left, right, node.rightChild);
		} else {
			delete(left, mid, node.leftChild);
			// 注意不是mid+1，比如区间[1, 10]的左右两部分分别是[1, 5]，[5, 10]
			delete(mid, right, node.rightChild);
		}
	}

	/**
	 * 前序遍历
	 */
	void preOrder() {
		preOrder(root);
	}

	/**
	 * 前序遍历
	 * 
	 * @param root 根节点
	 */
	void preOrder(Node root) {
		if (root.right - root.left == 1) {
			System.out.println("[" + root.left + "," + root.right + "]:" + root.count);
			return;
		} else if (root.right - root.left > 1) {
			System.out.println("[" + root.left + "," + root.right + "]:" + root.count);
			preOrder(root.leftChild);
			preOrder(root.rightChild);
		}
	}

	/**
	 * 统计线段树中cover为true的线段的总长度
	 */
	int count() {
		return count(root);
	}

	/**
	 * 统计线段树中cover为true的线段的总长度
	 * 
	 * @param node 节点
	 */
	int count(Node node) {
		if (node.cover == true) {// 不继续往下查找，否则会重复
			return node.right - node.left;
		} else {
			if (node.right - node.left == 1) {
				return 0;
			} else {
				return count(node.leftChild) + count(node.rightChild);
			}
		}
	}
}
```

**优点**

- 时间快，操作多

线段树的所有操作都是基于分治算法，再经过 pushUp 优化，整个算法十分稳定。比起一般的数组暴力算法，线段树是明显更优的。

结构   |   修改  |   求和  |  平均
:-----:|:------:|:-------:|:------:
线段树 | O(logN) | O(logN) | O(logN)
前缀和 |  O(N)   |  O(1)   | O(N/2)
普通   |  O(1)   |  O(N)   | O(N/2)

另外，它操作多样化，比起树状数组，多了区间最值一种操作。　　

**缺点**

- 浪费空间

线段树一直是一棵满二叉树，所以无论如何，它所开的空间必须是四倍。
但是在某些情况，线段树会浪费三倍的空间(只有一条链等)，但你又不能省掉这三倍空间，还是得苦逼的开四倍。

和树状数组比起来，一棵普通的线段树是树状数组空间的四倍。

# 字典树

字典树/前缀树/单词查找树/键树（Trie）：

![Trie](Trie.png)

上图表示了关键字集合 {“a”, “to”, “tea”, “ted”, “ten”, “i”, “in”, “inn”} 。

基本性质：
1. 根节点不包含字符，除根节点外的每一个子节点都包含一个字符。
2. 从根节点到某一个节点，路径上经过的字符连接起来，为该节点对应的字符串。
3. 每个节点的所有子节点包含的字符互不相同。
4. 从第一字符开始有连续重复的字符只占用一个节点，比如上面的to，和ten，中重复的单词t只占用了一个节点。

应用：
1. 前缀匹配
2. 字符串检索
3. 词频统计
4. 字符串排序

**模版**

```java

class Trie {
	class Node {
		int num;// 有多少单词通过这个节点，即由根至该节点组成的字符串模式出现的次数
		Node[] child;// 所有的子节点
		boolean isEnd;// 是不是最后一个节点
		char value;// 节点的值

		Node() {
			num = 1;
			child = new Node[SIZE];
			isEnd = false;
		}
	}

	int SIZE = 26;
	Node root;

	/**
	 * 插入一个单词
	 * 
	 * @param str 单词
	 */
	void insert(String str) {
		if (root == null) {
			root = new Node();
			return;
		}
		if (str == null || str.length() == 0) {
			return;
		}
		Node node = root;
		char[] letters = str.toCharArray();// 将目标单词转换为字符数组
		for (int i = 0, len = str.length(); i < len; i++) {
			int pos = letters[i] - 'a';
			// 如果当前节点的儿子节点中没有该字符，则构建一个TrieNode并复值该字符
			if (node.child[pos] == null) {
				node.child[pos] = new Node();
				node.child[pos].value = letters[i];
			} else {
				// 如果已经存在，则将由根至该儿子节点组成的字符串模式出现的次数+1
				node.child[pos].num++;
			}
			node = node.child[pos];
		}
		node.isEnd = true;
	}

	/**
	 * 计算单词前缀的数量
	 * 
	 * @param prefix 前缀
	 * @return 单词前缀的数量
	 */
	int countPrefix(String prefix) {
		if (prefix == null || prefix.length() == 0) {
			return -1;
		}
		Node node = root;
		char[] letters = prefix.toCharArray();
		for (int i = 0, len = prefix.length(); i < len; i++) {
			int pos = letters[i] - 'a';
			if (node.child[pos] == null) {
				return 0;
			} else {
				node = node.child[pos];
			}
		}
		return node.num;
	}

	/**
	 * 打印指定前缀的单词
	 * 
	 * @param prefix 前缀
	 * @return 单词
	 */
	String hasPrefix(String prefix) {
		if (prefix == null || prefix.length() == 0) {
			return null;
		}
		Node node = root;
		char[] letters = prefix.toCharArray();
		for (int i = 0, len = prefix.length(); i < len; i++) {
			int pos = letters[i] - 'a';
			if (node.child[pos] == null) {
				return null;
			} else {
				node = node.child[pos];
			}
		}
		preTraverse(node, prefix);
		return null;
	}

	/**
	 * 遍历经过此节点的单词
	 * 
	 * @param node 节点
	 * @param prefix 前缀
	 */
	void preTraverse(Node node, String prefix) {
		if (!node.isEnd) {
			for (Node child : node.child) {
				if (child != null) {
					preTraverse(child, prefix + child.value);
				}
			}
			return;
		}
		System.out.println(prefix);
	}

	/**
	 * 存在完全匹配的单词
	 * 
	 * @param str 单词
	 * @return boolean
	 */
	boolean has(String str) {
		if (str == null || str.length() == 0) {
			return false;
		}
		Node node = root;
		char[] letters = str.toCharArray();
		for (int i = 0, len = str.length(); i < len; i++) {
			int pos = letters[i] - 'a';
			if (node.child[pos] != null) {
				node = node.child[pos];
			} else {
				return false;
			}
		}
		// 走到这一步，表明可能完全匹配，可能部分匹配，如果最后一个字符节点为末端节点，则是完全匹配，否则是部分匹配
		return node.isEnd;
	}

	/**
	 * 前序遍历
	 * 
	 * @param node 节点
	 */
	void preTraverse(Node node) {
		if (node != null) {
			System.out.print(node.value + "-");
			for (Node child : node.child) {
				preTraverse(child);
			}
		}
	}
}
```