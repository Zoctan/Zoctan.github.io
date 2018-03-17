---
title: 《Java 8 函数式编程》笔记
date: 2018-3-5
category: 学习
tags:
  - Java
---

# 前记

在图书馆找有关 `Java` 的书时发现了这本动物出版社的书，大一时就听过 `lambda`，匿名函数之类的了（虽然两者不同），一直没机会接触前者，鉴于前段时间写的程序有好多匿名函数，很是冗余，本着好奇以及打算重构的心，就借来这本书打算学习一遍 `lambda`。本笔记按照章节顺序从第 2 章开始。

纸质书读起来很有滋味，建议买来或借来品味一番。

随书的资料在作者的 [github](https://github.com/RichardWarburton/java-8-lambdas-exercises) 中可以下载到。

本笔记代码也全部放在 [github](https://github.com/Zoctan/Java-8-Lambdas/tree/master) 中，建议搭配代码食用~

# 设置断言

`Idea` 和 `Eclipse` 都是默认不开启断言的，请先设置好。

# lambda 表达式

## 第一行 lambda

使用匿名类将按钮和点击行为关联起来：

```java
button.addActionListener(new ActionListener() {
	@Override
	public void actionPerformed(ActionEvent event) {
		System.out.println("clicked");
	}
});
```

使用 `lambda` 表达式：

```java
button.addActionListener(event -> System.out.println("clicked"));
```

匿名类：
- 方法参数类型需要显式声明：`ActionEvent event`

lambda：
- 无需指定类型，`javac` 根据上下文推断出 `event` 的类型（`addActionListener` 方法的签名） 

注：
1. `lambda` 声明参数时也可以包括参数类型（比如：(int x, int y) -> x + y）；
2. 有时编译器不一定能根据上下文推断出参数类型，这时要显示声明。

`lambda` 表达式的不同形式：

```java
// 该 Runnable 接口只有 1 个 void run() 方法
// 使用空括号 () 表示没有参数
Runnable noArguments = () -> System.out.println("Hello");

// 只有 1 个参数，可省略括号
ActionListener oneArgument = event -> System.out.println("clicked");

// lambda 主体不仅可以是表达式，也可以是一段代码块
// 用大括号 {} 括起来的代码块
// 遵循的规则和普通方法一样
Runnable multiStatement = () -> {
	System.out.println("Hello 1");
	System.out.println("Hello 2");
};

// 显式声明参数类型
BinaryOperator<Integer> addExplicitType = (Integer x, Integer y) -> x + y;

// 这段代码是创建一个函数，用来计算出两个数字相加的结果
// add 不是两个数字的和，而是将两个数字相加的那行代码
BinaryOperator<Integer> add = (x, y) -> x + y;
System.out.println(add.apply(1, 2));
```

## 引用值，而不是变量

匿名类中使用所在方法的变量时需要 `final` 修饰：

```java
final String username = getUsername();

button.addActionListener(new ActionListener() {
	@Override
	public void actionPerformed(ActionEvent event) {
		System.out.println(username + " clicked");
	}
});
```

`lambda` 表达式中使用时虽然可以没有 `final` 修饰符，但实际上仍是 `final` 变量：

```java
String username = getUsername();

button.addActionListener(event -> System.out.println(username + " clicked"));
```

使用 `final` 变量，实际上就是使用赋给该变量的一个特定值。

## 函数接口

函数接口：只有 1 个抽象方法的接口，用作 `lambda` 表达式的类型。

比如 `ActionListener` 接口：

```java
public abstract ActionListener extends EventListener {
    public abstract void actionPerformed(ActionEvent event);
}
```

该单一抽象方法的命名并不重要，只要方法签名和 `lambda` 表达式的类型匹配即可。

一些最重要的函数接口：

接口               | 参数 | 返回类型 | 示例
:----------------:|:----:|:--------|:----:
Predicate<T>      |  T   | boolean | 这张唱片发行了吗
Consumer<T>       |  T   |  void   | 输出一个值
Function<T, R>    |  T   |   R     | 获得 A 对象的名字
Supplier<T>       | None |   T     | 工厂方法
UnaryOperator<T>  |  T    |  T     | 逻辑非(!)
BinaryOperator<T> | (T,T) |  T     | 求两个数的和(+)

# 流

## 从外部迭代到内部迭代

使用 `for` 循环统计来自美国的艺术家：

```java
int count = 0;

for(Artist artist: allArtists) {
	if(artist.isFrom("US")) {
		count++;
	}
}
```

`for` 循环本质是封装了迭代的语法糖，外部迭代：

```java
int count = 0;

Iterator<Artist> iterator = allArtists.iterator();
while(iterator.hasNext()) {
	Artist artist = (Artist) iterator.next();
	if(artist.isFrom("US")) {
		count++;
	}
}
```

外部迭代本质上是一种串行化操作。

使用内部迭代改写：

```java
// stream() 方法和上面的 iterator() 作用一样
// 但该方法返回的是内部迭代中的相应接口：Stream
int count = allArtists.stream()
                      .filter(artist -> artist.isFrom("US"))
                      .count();
```

注：`Stream` 是用函数式编程方式在集合类上进行复杂操作的工具

## 内部迭代的实现机制

只过滤，不计数：

```java
allArtists.stream()
          .filter(artist -> artist.isFrom("London"));
```

`filter` 只是刻画出了 `Stream`，并没有产生新的集合。
- 这些不产生新集合方法叫：惰性求值方法；
- 像 `count` 这样最终会从 `Stream` 产生值的方法叫：及早求值方法。

即使在 `filter` 过滤器中加上 `println`，也不会输出任何信息：

```java
allArtists.stream()
          .filter(artist -> {
              System.out.println(artist.getName);
              return artist.isFrom("London");
          });
```

但只要加入一个拥有终止操作的流，艺术家的名字就会被输出：

```java
allArtists.stream()
          .filter(artist -> {
              System.out.print(artist.getName);
              return artist.isFrom("London");
          })
          .count();
```

如何判断一个操作是惰性求值还是及早求值？

看它的返回值：
- 返回值是 `Stream`：惰性求值；
- 返回值是另一个值或 `null`：及早求值。

## 常用的流操作

### collect()

由 `Stream` 里的值生成一个 `List`、`Set`、`Map` 或其他。

比如，生成 `List`：

```java
// 使用 Stream 的 of 方法：
// 由一组初始值生成新的 Stream
List<String> collected = Stream.of("a", "b", "c")
                               .collect(Collectors.toList());

assert Arrays.asList("a", "b", "c").equals(collected);
```

### map

将一个流中的值转换为一个新的流。

该 `lambda` 表达式的函数接口是 `Function`。

比如，将一组字符串都转为大小形式：

```java
List<String> collected = Stream.of("a", "b", "abc")
                               .map(string -> string.toUpperCase())
                               .collect(Collectors.toList());

assert Arrays.asList("A", "B", "ABC").equals(collected);
```

### filter

保留 `Stream` 中符合条件的元素，而过滤掉其他的。

该 `lambda` 表达式的函数接口是 `Predicate`。

比如，找出一组字符串中以数字开头的字符串：

```java
List<String> startWithDigits = Stream.of("1a", "b", "abc")
                                     .filter(string -> isDigit(string.charAt(0)))
                                     .collect(Collectors.toList());

assert Arrays.asList("1a").equals(startWithDigits);
```

### flatMap

将多个 `Stream` 连接成一个 Stream。

该 `lambda` 表达式的函数接口是 `Function`，返回值是 `Stream`。

比如，一个包含多个列表的 `Stream` 连接成只有一个列表的 `Stream`：

```java
List<Integer> together = Stream.of(Arrays.asList(1, 2), Arrays.asList(3, 4))
		                       .flatMap(numbers -> numbers.stream())
                               .collect(Collectors.toList());

assert Arrays.asList(1, 2, 3, 4).equals(together);
```

### max 和 min

找出 `Stream` 中的最大最小值。

比如，找出播放长度最短的曲目：

```java
List<Track> tracks = Arrays.asList(
		new Track("BaKai", 524),
		new Track("Violets", 378),
		new Track("Time Was", 451));
		
Track shortestTrack = tracks.stream()
		                    .min(Comparator.comparing(track -> track.getLength()))
                            .get();

assert tracks.get(1).equals(shortestTrack);
```

### reduce

从一组值中生成一个值，上面用到的 `count`、`min` 和 `max` 方法都属于 `reduce` 操作。因为常用而被纳入标准库。

比如，求和：

```java
// 0 是初始值，acc 是累加器
int count = Stream.of(1, 2, 3)
                  .reduce(0, (acc, element) -> acc + element);

assert 6 == count;
```

阶乘：

```java
BigInteger k = Stream.iterate(BigInteger.ONE, x -> x.add(BigInteger.ONE))
                      .limit(n)
                      .reduce(BigInteger.ONE, (m, current) -> m.multiply(current));
```

## 整合操作

举例说明如何把问题分解成简单的 `Stream` 操作：

如何找出某张专辑上乐队所有成员的国籍？

将问题分解：
1. 找出专辑上的所有表演者
2. 分辨出哪些表演者是乐队
3. 找出乐队每个中每个成员的国籍
4. 将找出的国籍放在一个集合里

找出对应的 `Stream API`：
1. 专辑 `Album` 类有 `getMusicians` 方法，该方法返回一个 `Stream` 对象，包含整张专辑中所有的表演者
2. 使用 `filter` 方法对表演者进行过滤，只保留乐队
3. 使用 `flatMap` 方法将乐队成员加入流中
4. 使用 `map` 方法将成员映射为其所属国家
5. 使用 `collect` 方法将找出的国籍放到集合里

```java
Set<String> origins = album.getMusicians()
                           .filter(artist -> artist.getName().startsWith("The"))
                           .flatMap(artist -> artist.getMembers())
                           .map(member -> member.getNationality())
                           .collect(Collectors.toSet());
```

# 类库

## 默认方法

`Collection` 接口中新增了 `stream` 方法，如果继承它的子类没有实现 `stream` 方法，就使用它的 `stream` 方法，这样的方法叫默认方法。

`Iterable` 接口中也新增了一个默认方法：`forEach`，允许用户使用 `lambda` 表达式作为循环体。

`JDK` 中 `forEach` 的实现方法：

```java
default void forEach(Consumer<? super T> action) {
	for (T t : this) {
		action.accept(t);
	}
}
```

**默认方法和子类**

`Parent` 接口定义了默认方法 `welcome`，而 `ParentImpl` 类没有实现 `welcome` 方法，因此它自然继承了默认方法。

```java
public class Main {
	public static void main(String[] args) {
		Parent parent = new ParentImpl();
		parent.welcome();
		assert "Parent: Hi!".equals(parent.getLastMessage());
	}
}

// 实现接口时没有实现 welcome
class ParentImpl implements Parent {
	String body;

	@Override
	public void message(String body) {
		this.body = body;
	}

	@Override
	public String getLastMessage() {
		return this.body;
	}
}

interface Parent {
	void message(String body);

	// 默认方法
	default void welcome() {
		message("Parent: Hi!");
	}

	String getLastMessage();
}
```

新增一个 `Child` 接口，该类继承 `Parent` 接口，并且重写 `Parent` 的默认方法：

```java
public class Main {
	public static void main(String[] args) {
		Child child = new ChildImpl();
		child.welcome();
		assert "Child: Hi!".equals(child.getLastMessage());
	}
}

class ChildImpl implements Child {
	String body;

	@Override
	public void message(String body) {
		this.body = body;
	}

	@Override
	public String getLastMessage() {
		return this.body;
	}
}

interface Child extends Parent {
	@Override
	default void welcome() {
		message("Child: Hi!");
	}
}

interface Parent {
	void message(String body);

	default void welcome() {
		message("Parent: Hi!");
	}

	String getLastMessage();
}
```

现在，默认方法成了虚方法。
任何时候，一旦子类定义的方法和父类的产生冲突，都会优先选择子类定义的方法：

```java
public class Main {
	public static void main(String[] args) {
		Parent parent = new OverridingParent();
		// 调用的是类的具体方法，而不是默认方法
		parent.welcome();
		assert "Override Parent".equals(parent.getLastMessage());
	}
}

class OverridingParent extends ParentImpl {
	// 重写 welcome 默认实现的父类
	@Override
	public void welcome() {
		message("Override Parent");
	}
}

class ParentImpl implements Parent {
	String body;

	@Override
	public void message(String body) {
		this.body = body;
	}

	@Override
	public String getLastMessage() {
		return this.body;
	}
}

interface Parent {
	void message(String body);

	default void welcome() {
		message("Parent: Hi!");
	}

	String getLastMessage();
}
```

新增 `OverridingChild` 类，该类本身并没有任何操作，只是继承 `Child` 接口和 `OverridingParent` 类。
但调用的 `welcome` 方法来自 `OverridingParent` 类。

原因：与 `Child` 接口定义的默认方法相比，`OverridingParent` 类中重写后的 `welcome` 方法更具体。

```java
public class Main {
	public static void main(String[] args) {
		Child child = new OverridingChild();
		child.welcome();
		assert "Override Parent".equals(child.getLastMessage());
	}
}

class OverridingChild extends OverridingParent implements Child {

}

class OverridingParent extends ParentImpl {
	@Override
	public void welcome() {
		message("Override Parent");
	}
}

interface Child extends Parent {
	@Override
	default void welcome() {
		message("Child: Hi!");
	}
}

class ParentImpl implements Parent {
	String body;

	@Override
	public void message(String body) {
		this.body = body;
	}

	@Override
	public String getLastMessage() {
		return this.body;
	}
}

interface Parent {
	void message(String body);

	default void welcome() {
		message("Parent: Hi!");
	}

	String getLastMessage();
}
```

## 多重继承

接口允许多重继承，因此有可能遇到 2 个接口包含签名相同的默认方法的情况：

```java
// 编译器会报错
// 因为 javac 不明确继承了哪个接口的 rock 方法
class MusicalCarriage implements Carriage, Jukebox {

}

interface Jukebox {
	default String rock() {
		return "...all over the world";
	}
}

interface Carriage {
	default String rock() {
		return "...from side to side";
	}
}
```

解决：可以使用增强的 `super` 语法，指定使用某个接口的默认方法。

```java
class MusicalCarriage implements Carriage, Jukebox {
	@Override
	public String rock() {
		return Carriage.super.rock();
	}
}
```

**三定律**

如果对多重继承下的默认方法工作原理没有把握，可以参考以下3条：

1. 类 > 接口。如果继承链中有方法体或抽象的方法声明，那就可以忽略接口中定义的方法。
2. 子类 > 父类。如果一个接口继承了另一个接口，且两个接口都定义了一个默认方法，则子类优先。
3. 没有3。如果以上2条不适用，子类要么实现该方法，要么将该方法声明为抽象方法。

## Optional

`Optional` 是核心类库新设计的数据类型，用来替换 `null` 值。

`Optional` 对象相当于值的容器，可以使用 `get()` 获得该值。

创建某个值的 `Optional` 对象：

```java
Optional<String> a = Optional.of("a");
assert "a".equals(a.get());
```

`Optional` 对象可以为空：

```java
// 创建空 Optional 对象
Optional<String> emptyOptional = Optional.empty();

// 将空值转换为空 Optional 对象
Optional<String> alsoEmpty = Optional.ofNullable(null);

// isPresent() 检查 Optional 对象是否有值
assert emptyOptional.isPresent() == false;

assert alsoEmpty.isPresent() == false;
```

但对象为空时，如果希望使用备选值，可以使用 `orElse`。
如果备选值计算太繁琐，可以使用 `orElseGet`，该方法接受 `Supplier` 对象。

```java
Optional<String> emptyOptional = Optional.empty();

Optional<Integer> alsoEmpty = Optional.ofNullable(null);

assert "b".equals(emptyOptional.orElse("b"));

assert 3 == alsoEmpty.orElseGet(() -> 1 + 2);
```

# 高级集合类和收集器

## 方法引用

标准语法：`Classname::methodName`

比如想得到艺术家的名字：

```
lambda：artist -> artist.getName()

方法引用：Artist::getName

Arrays.stream(artist).map(Artist::getName).forEach(System.out::println)
```

构造方法同样可以缩写：

```
lambda：(name, nationality) -> new Artist(name, nationality)

方法引用：Artist::new
```

## 元素顺序

本身是有序集合，比如 `List`，创建流时，流中的元素就有顺序：

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4);

List<Integer> sameOrder = numbers.stream()
                                 .collect(Collectors.toList());

assert sameOrder.equals(numbers);
```

本身是无序集合，比如 `HashSet`，由此生成的流也是无序的：

```java
Set<Integer> numbers = new HashSet<>(Arrays.asList(4, 3, 2, 1));

List<Integer> sameOrder = numbers.stream()
                                 .collect(Collectors.toList());
// 断言有时会失败
assert Arrays.asList(4, 3, 2, 1).equals(sameOrder);
```

可以使用 `sorted()`，让流里的元素有序：

```java
Set<Integer> numbers = new HashSet<>(Arrays.asList(4, 3, 2, 1));

List<Integer> sameOrder = numbers.stream()
                                 .sorted()
                                 .collect(Collectors.toList());

assert Arrays.asList(1, 2, 3, 4).equals(sameOrder);
```

或者使用 `unordered()`，变无序：

```java
Set<Integer> numbers = new HashSet<>(Arrays.asList(4, 3, 2, 1));

List<Integer> sameOrder = numbers.stream()
                                 .unordered()
                                 .collect(Collectors.toList());

assert Arrays.asList(4, 3, 2, 1).equals(sameOrder);
```

## 使用收集器

`collect(Collectors.toList())`，在流中生成列表。
类似的还有 `Map`、`Set` 等。

### 转换为其他集合

比如转换为 `TreeSet`，而不是框架背后为你指定的一种类型的 `Set`：

```java
List<Integer> numbers = Arrays.asList(4, 3, 2, 1);
Set<Integer> treeSet = numbers.stream()
                              .collect(Collectors.toCollection(TreeSet::new));
```

### 转换为值

`maxBy` 和 `minBy`

找出成员最多的乐队：

```java
public Optional<Artist> biggestGroup(Stream<Artist> artists) {
	Function<Artist, Long> getCount = artist -> artist.getMembers().count();
	return artists.collect(maxBy(comparing(getCount)));
}
```

找出一组专辑上单曲的平均数：

```java
public double averageNumberOfTracks(List<Album> albums) {
	return albums.stream().collect(averagingInt(album -> album.getTrackList().size()));
}
```

### 数据分块

假设有一个艺术家组成的流，一部分是独唱歌手，另一部分是乐队。
如果你希望将其分成两部分，可以使用收集器 `partitioningBy`，它接受一个流， 并将其分成两部分：

```java
public Map<Boolean, List<Artist>> soloAndBands(Stream<Artist> artists) {
    return artists.collect(partitioningBy(Artist::isSolo));
}
```

### 数据分组

与将数据分成 `true` 和 `false` 两块不同，数据分组是一种更自然的分割数据操作，可以使用任意值对数据分组。

比如，现在有一个专辑组成的流，可以按专辑当中的乐队主唱对专辑分组：

```java
public Map<Artist, List<Album>> albumsByArtist(Stream<Album> albums) {
    return albums.collect(groupingBy(Album::getMainMusician));
}
```

### 字符串

比如要得到 “[{A, B, C}]” 这样的字符串：

```java
public String getString() {
    List<String> strings = Arrays.asList("A", "B", "C");
    return strings.stream()
            .collect(Collectors.joining(", ", "[{", "}]"));
}
```

`Collectors.joining(分隔符, 前缀, 后缀)`

### 组合收集器

如何计算一个艺术家的发行的专辑数量？

最简单的就是使用前面的方法：对专辑先按艺术家分组，然后计数：

```java
Map<Artist, List<Album>> albumsByArtist = albums.collect(groupingBy(Album::getMainMusician));

Map<Artist, Integer> numberOfAlbums = new HashMap<>();
for (Entry<Artist, List<Album>> entry : albumsByArtist.entrySet()) {
    numberOfAlbums.put(entry.getKey(), entry.getValue().size());
}
```

这段代码固然简单，但有点杂乱，命令式的代码，也无法自动适应并行化的操作。

使用 `counting` 重写：

```java
Map<Artist, Long> numberOfAlbums = albums.collect(
        groupingBy(Album::getMainMusician,
                counting())
);
```

`groupingBy` 先将元素分块，每块都与 `getMainMusician` 提供的键相关联，然后使用下游的另一个收集器收集每块中的元素，最后将结果映射为 `Map`。

另一个例子：如何获得每个艺术家的每张专辑名，而不是每张专辑？

```java
Map<Artist, List<Album>> albumsByArtist = albums.collect(groupingBy(Album::getMainMusician));

Map<Artist, List<String>> nameOfAlbums = new HashMap<>();
for (Entry<Artist, List<Album>> entry : albumsByArtist.entrySet()) {
    nameOfAlbums.put(entry.getKey(), entry.getValue()
            .stream()
            .map(Album::getName)
            .collect(toList()));
}
```

`groupingBy` 将专辑按主唱分组，输出了 `Map<Artist, List<Album>>`，它将每个艺术家和他的专辑列表关联起来。

但我们需要的是 `Map<Artist, List<String>>`，将每个艺术家和他的专辑名列表关联起来。

`mapping` 可以像 `map` 一样将 `groupingBy` 的值做映射，生成我们想要的结果：

```java
albums.collect(
        groupingBy(Album::getMainMusician,
                mapping(Album::getName,
                        toList()))
);
```

## Map 类的变化

用 `Map` 实现缓存，传统方法：先试着取值，如果值为空，创建一个新值并返回。

```java
public Artist getArtist(String name) {
    Artist artist = artistCache.get(name);
    if (artist == null) {
        artist = readArtistFromDB(name);
        artistCache.put(name, artist);
    }
    return artist;
}
```

`computeIfAbsent` 方法会在值不存在时，使用 `lambda` 表达式计算新值：

```java
public Artist getArtistUsingComputeIfAbsent(String name) {
    return artistCache.computeIfAbsent(name, this::readArtistFromDB);
}
```

你可能试过在 `Map` 上迭代，比如：

```java
Map<Artist, List<Album>> albumsByArtist = albums.collect(groupingBy(Album::getMainMusician));

Map<Artist, Integer> numberOfAlbums = new HashMap<>();

for (Entry<Artist, List<Album>> entry : albumsByArtist.entrySet()) {
    Artist artist = entry.getKey();
	List<Album> albums = entry.getValue();
	numberOfAlbums.put(artist, albums.size());
}
```

虽然工作正常，但是看起来挺丑的。

使用 `forEach` 内部迭代 `Map` 里的值：

```java
Map<Artist, List<Album>> albumsByArtist = albums.collect(groupingBy(Album::getMainMusician));

Map<Artist, Integer> numberOfAlbums = new HashMap<>();

albumsByArtist.forEach(
        (artist, albumList) -> numberOfAlbums.put(artist, albumList.size())
);
```

# 数据并行化

## 并行和并发

并行：两个任务在同一时间发生，比如在多核 CPU 上，A 任务在三核，B 任务在四核。
并发：两个任务共享时间段，比如在 1s 内 A 任务和 B 任务交替运行 0.5s。

## 并行化流操作

在一个 `Stream` 对象上调用 `parallel` 方法即可拥有并行操作的能力。
如果想从一个集合类创建一个流，调用 `parallelStream` 即可获得拥有并行能力的流。

串行化计算所有专辑曲目长度：

```java
public int serialArraySum(List<Album> albums) {
    return albums.stream()
            .flatMap(Album::getTracks)
            .mapToInt(Track::getLength)
            .sum();
}
```

改成调用 `parallelStream` 方法并行处理：

```java
public int parallelArraySum(List<Album> albums) {
    return albums.parallelStream()
            .flatMap(Album::getTracks)
            .mapToInt(Track::getLength)
            .sum();
}
```

并行并不一定比串行快，要视情况选用，后面的`性能`小节会详细说明。

## 模拟系统

暂略

## 限制

虽然只需一点改动就能让已有代码使用并行流工作，但前提是代码写得符合约定，所以写代码是必须遵守一些规则和限制。

比如，`reduce` 方法的初始值可以是任意值。但为了让其在并行化时能工作正常，初值必须为组合函数的恒等值。
举个栗子：使用 `reduce` 操作求和时，组合函数为 `(acc, element) -> acc + element`，则其初值必须为 0。因为任何数字加 0，值不变。

`reduce` 操作的另一个限制是组合操作必须符合结合律。（只要序列值不变，组合操作的顺序就不重要）
举个栗子： (4 + 2) + 1 = 4 + (2 + 1) = 7、(4 x 2) x 1 = 4 x (2 x 1) = 8。

避免持有锁。流框架会在需要时自己处理同步操作。

`parallel` 并行和 `sequential` 串行不能同时使用在流上，要么并行，要么串行。
如果同时使用，只有最后调用的那个方法生效。

## 性能

影响并行流性能的主要 5 个因素：

**数据大小**
将问题分解之后并行化处理，再将结果合并会带来额外的开销。
因此只有在数据足够大时，每个数据处理管道花费的时间足够多时，并行化处理才有意义。

**源数据结构**
每个管道的操作都基于一些初始数据源，通常是集合。
将不同的数据源分割相对容易，这里的开销影响了在管道中并行处理数据是到底能带来多少性能上的提升。

**装箱**
处理基本类型比处理装箱类型要快。

**核的数量**
极端情况下，只有一个核，因此完全没必要并行化。
核的数量不单指你的机器上有多少核，更是指运行时你的机器能使用多少核。这也就是说同时运行的其他进程，或者线程关联性（强制线程在某些核或 CPU 上运行）会影响性能。

**单元处理开销**
比如数据大小，这是一场并行执行花费时间和分解合并操作开销之间的战争。
花在流中每个元素身上的时间越长，并行操作带来的性能提升越明显。

根据性能的好坏，将核心类库提供的通用数据结构分成以下 3 组：

**性能好**
`ArrayList`、数组或 `IntStream.range`，这些数据结构支持随机读取，也就是它们能轻而易举地被任意分解。

**性能一般**
`HashSet`、`TreeSet`，这些数据结构不易公平地被分解，但是大多数时候分解是可能的。

**性能差**
有些数据结构难于分解，比如，可能要花 O(N) 的时间复杂度来分解问题。
其中包括 `LinkedList`，对半分解太难了。还有 `Streams.iterate` 和 `BufferedReader.lines`，它们长度未知，因此很难预测该在哪里分解。

选用无状态操作，而不是有状态，就能获得更好的并行性能。
无状态操作： `map`、`filter`、`flatMap`。
有状态操作：`sorted`、`distinct`、`limit`。

## 并行化数组操作

未完待续...