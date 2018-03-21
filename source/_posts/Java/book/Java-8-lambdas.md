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

数组上的并行化操作：

方法名          |            操作             |
:--------------:|:---------------------------:
parallelPrefix  | 任意给定一个函数，计算数组的和
parallelSetAll  | 使用 lambda 表达式更新数组元素
parallelSort    | 并行化对数组元素排序

`for` 循环初始化数组：

```java
public double[] imperativeInitialize(int size) {
    double[] values = new double[size];
    for (int i = 0; i < values.length; i++) {
        values[i] = i;
    }
    return values;
}
```

使用 `parallelSetAll` 并行化以上过程：

```java
public double[] imperativeInitializeParallelSetAll(int size) {
    double[] values = new double[size];
    Arrays.parallelSetAll(values, i -> i);
    return values;
}
```

# 测试、调试和重构

## 孤独的覆盖

`ThreadLocal` 能创建一个工厂，为每个线程最多只产生一个值。这是确保非线程安全的类在并发环境下安全使用的一种简单方式。

假设要在数据库查询一个艺术家，但希望每个线程值做一次这种查询：

```java
ThreadLocal<Album> thisAlbum = new ThreadLocal<Album>() {
    @Override
    protected Album initialValue() {
        return database.findCurrentAlbum();
    }
};
```

为工厂方法 `withInitial` 传入一个 `Supplier` 对象实例来创建对象：

```java
ThreadLocal<Album> thisAlbum = ThreadLocal.withInitial(
        () -> database.findCurrentAlbum()
);
```

## 同样的东西写两遍

DRY：Don't Repeat Yourself
WET：Write Everything Twice

不是所有的 `WET` 都适合 `lambdas` 化。有时重复是唯一可以避免系统过紧耦合的方式。

什么时候该将 `WET` 的代码 `lambda` 化？
如果有一个整体上大概相似的模式，只是行为上有所不同，就可以试着加入一个 `lambda` 表达式。

举个栗子：

用户想要了解购买的专辑的一些信息，比如音乐家的人数、曲目和专辑时长等。

使用命令式 `Java` 编写的 `Order` 类：

```java
public long countMusicians() {
    long count = 0;
    for (Album album : albums) {
        count += album.getMusicianList().size();
    }
    return count;
}

public long countTracks() {
    long count = 0;
    for (Album album : albums) {
        count += album.getTrackList().size();
    }
    return count;
}

public long countRunningTime() {
    long count = 0;
    for (Album album : albums) {
        for (Track track : album.getTrackList()) {
            count += track.getLength();
        }
    }
    return count;
}
```

每个方法里，都有样板代码将将每个专辑里的属性和总数相加。
没有重用共有的概念，写出了更多需要测试和维护的代码。

新增 `OrderStream` 类，使用 `Stream` 来抽象 `Order` 类：

```java
public long countMusicians() {
    return albums.stream()
            .mapToLong(album -> album.getMusicians().count())
            .sum();
}

public long countTracks() {
    return albums.stream()
            .mapToLong(album -> album.getTracks().count())
            .sum();
}

public long countRunningTime() {
    return albums.stream()
            .mapToLong(album -> album.getTracks()
                    .mapToLong(Track::getLength)
                    .sum())
            .sum();
}
```

然而这段代码仍然有重用可读性的问题，因为有一些抽象和共性只能使用领域内的知识来表达。
流不会提供一个方法统计每张专辑上的信息——这是程序猿自己要编写的领域知识。

新增 `OrderStreamDSL` 类，用领域方法重构 `OrderStream` 类：

```java
private long countFeature(ToLongFunction<Album> function) {
    return albums.stream()
            .mapToLong(function)
            .sum();
}

public long countMusicians() {
    return countFeature(album -> album.getMusicians().count());
}

public long countTracks() {
    return countFeature(album -> album.getTracks().count());
}

public long countRunningTime() {
    return countFeature(album -> album.getTracks()
            .mapToLong(Track::getLength)
            .sum());
}
```

# 设计和架构的原则

## 命令者模式

命令者是一个对象，它封装了调用另一个方法的所有细节，命令者模式使用该对象，可以编写出根据运行期条件，顺序调用方法的一般化代码。

命令者模式中有四个类参与其中：

**命令接收者**
执行实际任务

**命令者**
封装了所有调用命令执行者的信息

**发起者**
控制一个或多个命令的顺序和执行

**客户端**
创建具体的命令者实例

```
[发起者]  ->  [命令者]

  ↑              ↑
  |创建          |实现

[客户端]  ->  [具体命令者]

                调用|
                    ↓

              [命令接收者]
```

举个栗子：
假设有个 `GUI Editor` 组件，可以执行 `open`、`save` 等一系列操作。
现在我们像实现宏功能——就是把一系列操作录下来，日后作为一个操作执行，这就是命令的接受者。

文本编辑器可能有的一般功能：

```java
public interface Editor {
    void save();

    void open();

    void close();
}
```

像 `open`、`save` 这样的操作称为命令，我们需要一个统一的接口来概括这些不同的操作。

通过 `Action` 接口，所有操作均可实现：

```java
public interface Action {
    void perform();
}
```

现在让每个操作都实现该接口：

```java
public class Save implements Action {
    private final Editor editor;

    Save(Editor editor) {
        this.editor = editor;
    }

    @Override
    public void perform() {
        editor.save();
    }
}
```

```java
public class Open implements Action {
    private final Editor editor;

    Open(Editor editor) {
        this.editor = editor;
    }

    @Override
    public void perform() {
        editor.open();
    }
}
```

```java
public class Close implements Action {
    private final Editor editor;

    Close(Editor editor) {
        this.editor = editor;
    }

    @Override
    public void perform() {
        editor.close();
    }
}
```

实现一个宏：

```java
public class Macro {
	// 一系列操作
    private final List<Action> actions;

    Macro() {
        actions = new ArrayList<>();
    }

	// 记录操作
    void record(Action action) {
        actions.add(action);
    }

	// 运行一系列动作
    void run() {
        actions.forEach(Action::perform);
    }
}
```

别忘了实现一个具体的文本编辑器 `EditorImpl`：

```java
public class EditorImpl implements Editor {
    @Override
    public void save() {
        System.out.println("success save");
    }

    @Override
    public void open() {
        System.out.println("success open");
    }

    @Override
    public void close() {
        System.out.println("success close");
    }
}
```

现在就可以通过录制这些操作做一个宏，来方便自己的工作了：

命令者模式构建宏：

```java
Macro macro = new Macro();
macro.record(new Open(editor));
macro.record(new Save(editor));
macro.record(new Close(editor));
macro.run();
```

`lambda` 表达式构建宏：

```java
Macro macro = new Macro();
macro.record(() -> editor.open());
macro.record(() -> editor.save());
macro.record(() -> editor.close());
macro.run();
```

方法引用构建宏：

```java
Macro macro = new Macro();
macro.record(editor::open);
macro.record(editor::save);
macro.record(editor::close);
macro.run();
```

宏只是使用使用命令者模式中的一个例子，它被大量用在实现组件化的图形界面系统、撤销功能、线程池、事务和向导中。

## 策略模式

策略模式能在运行时改变软件的算法模式。
其主要思想是定义一个通用的问题。使用不同的算法来实现，然后将这些算法都封装在统一接口的背后。

以文件压缩为例，我们为用户提供压缩各种文件的方式，可以使用 `zip` 算法，也可以使用 `gzip` 算法，我们实现一个通用的 `Compressor` 类，能用任何算法压缩文件。

首先，为策略定义 `API` `CompressionStrategy`，每种文件压缩算法都要实现该接口。
该接口有一个 `compress` 方法，接受并返回一个压缩后 `OutputStream` 对象。

```
压缩器 -调用-> 压缩策略
               ↗ ↖
          实现/     \实现
             /       \
         zip压缩    gzip压缩
```

定义压缩数据的策略接口：

```java
public interface CompressionStrategy {
    OutputStream compress(OutputStream data) throws IOException;
}

```

使用 `gzip` 算法压缩数据：

```java
public class GzipCompressionStrategy implements CompressionStrategy {
    @Override
    public OutputStream compress(OutputStream data) throws IOException {
        return new GZIPOutputStream(data);
    }
}
```

使用 `zip` 算法压缩数据：

```java
public class ZipCompressionStrategy implements CompressionStrategy {
    @Override
    public OutputStream compress(OutputStream data) throws IOException {
        return new ZipOutputStream(data);
    }
}
```

压缩器 `Compressor`：

```java
public class Compressor {
    private final CompressionStrategy strategy;

	// 构造时使用用户提供的压缩策略
    public Compressor(CompressionStrategy strategy) {
        this.strategy = strategy;
    }

	// 读入文件，根据策略压缩文件
    public void compress(Path inFile, File outFile) throws IOException {
        try (OutputStream outputStream = new FileOutputStream(outFile)) {
            Files.copy(inFile, strategy.compress(outputStream));
        }
    }
}
```

到此就可以开始使用我们的压缩器来压缩文件了：

使用具体策略类初始化 `Compressor`：

```java
Compressor gzipCompressor = new Compressor(new GzipCompressionStrategy());
gzipCompressor.compress(inFile, outFile);

Compressor zipCompressor = new Compressor(new ZipCompressionStrategy());
zipCompressor.compress(inFile, outFile);
```

使用方法引用初始化 `Compressor`：

```java
Compressor gzipCompressor = new Compressor(GZIPOutputStream::new);
gzipCompressor.compress(inFile, outFile);

Compressor zipCompressor = new Compressor(ZipOutputStream::new);
zipCompressor.compress(inFile, outFile);
```

## 观察者模式

观察者模式是另一种可被 `lambda` 表达式简化和改进的行为模式。
在观察者模式中，被观察者持有一个观察者列表。当被观察者的状态发生改变，会通知观察者。

观察者模式被大量应用于基于 `MVC` 的 `GUI` 工具中，以此让模型状态发生变化时，自动刷新视图模块，达到二者之间的解耦。

举个栗子：

`NASA` 和外星人都对登陆到月球上的东西感兴趣，都希望可以记录这些信息。
`NASA` 希望确保阿波罗号上的航天员成功登月；外星人则希望在 `NASA` 注意力分散时进攻地球。

这里他们的观察对象就是登陆到月球的东西。

首先，定义观察者的 `API` `LandingObserver`，它只有 `observeLanding` 方法，当有东西登陆到月球上时会调用该方法：

```java
public interface LandingObserver {
    void observerLanding(String name);
}
```

被观察者就是月球 `Moon`，它持有一组 `LandingObserver` 实例，有东西着陆时会通知这些观察者，还可以增加新的 `LandingObserver` 实例观测 `Moon` 对象：

```java
public class Moon {
    private final List<LandingObserver> observers = new ArrayList<>();

    public void land(String name) {
        observers.forEach(observer -> observer.observerLanding(name));
    }

    public void startSpying(LandingObserver observer) {
        observers.add(observer);
    }
}
```

外星人观察到阿波罗号登陆月球，就开始发出进攻地球的信号：

```java
public class Aliens implements LandingObserver {
    @Override
    public void observerLanding(String name) {
        if (name.contains("Apollo")) {
            System.out.println("They're distracted, lets invade earth!");
        }
    }
}
```

NASA 观察到阿波罗号登陆到月球，会很兴奋：

```java
public class Nasa implements LandingObserver {
    @Override
    public void observerLanding(String name) {
        if (name.contains("Apollo")) {
            System.out.println("We made it!");
        }
    }
}
```

传统方式，就是使用以上写好的模版类 `Aliens` 和 `Nasa` 来调用：

```java
Moon moon = new Moon();
moon.startSpying(new Nasa());
moon.startSpying(new Aliens());

moon.land("An asteroid");
moon.land("Apollo 11");
```

但使用 `lambda` 表达式的话，就不用写以上的模版类了：

```java
Moon moon = new Moon();
moon.startSpying(name -> {
    if (name.contains("Apollo")) {
        System.out.println("We made it!");
    }
});
moon.startSpying(name -> {
    if (name.contains("Apollo")) {
        System.out.println("They're distracted, lets invade earth!");
    }
});

moon.land("An asteroid");
moon.land("Apollo 11");
```

注意：
无论是使用观察者还是策略模式，实现时采用 `lambda` 表达式，还是传统的类，取决于观察者和策略代码的复杂度。
这里举的例子很简单，所以更能展示新的语言特性。

## 使用 lambda 表达式的 SOLID 原则

`SOLID` 原则是涉及面向对象程序是的一些基本原则。
分别是 `Single responsibility`、`Open/closed`、`Liskov substitution`、`Interface segregation`、`Dependency inversion`。

这里主要关注如何 `lambda` 表达式的环境下应用其中的三条原则。

### 单一功能原则

程序中的类或方法只能有一个改变的理由。

当软件的需求发生变化，实现这些功能的类和方法也需要变化。
如果你的类有多个功能，一个功能引起的代码变化会影响该类其他功能。这可能会引入缺陷，还会影响代码演进的能力。

举个栗子：
有一个程序，可以由资产列表生成 `BalanceSheet` 表格，然后输出一份 `PDF` 格式的报告。
如果实现时将制表和输出功能都放进同一个类，那么该类就有两个变化的理由。
你可能想改变输出功能，输出不同的格式，比如 `HTML`，可能还想改变 `BalanceSheet` 的细节。
这将问题分解成两个类提供了很好的理由：一个负责将 `BalanceSheet` 生成表格，一个负责输出。

单一功能原则不止于此：一个类不仅要功能单一，而且还需要将功能封装好。
以上面的例子就是：如果我想改变输出格式，那么只需要改变负责输出的类，而不必关心负责制表的类。

这是强内聚性设计的一部分。说一个类是内聚的，是指它的方法和属性需要统一对待，因为它们紧密相关。
如果你试着将一个内聚的类拆分，可能会得到刚才创建的那两个类。

那么问题来了，这和 `lambda` 表达式有什么关系？

`lambda` 表达式在方法级别能更容易实现单一功能原则。

举个栗子：

计算质数个数：

```java
public long countPrimes(int upTo) {
    long total = 0;
    for (int i = 1; i < upTo; i++) {
        boolean isPrime = true;
        for (int j = 2; j < i; j++) {
            if (i % j == 0) {
                isPrime = false;
            }
        }
        if (isPrime) {
            total++;
        }
    }
    return total;
}
```

显然，上面的方法塞了两个职责：判断一个数是否是质数、计数。

拆分这两个功能：

```java
public long countPrimes(int upTo) {
    long total = 0;
    for (int i = 1; i < upTo; i++) {
        if (isPrime(i)) {
            total++;
        }
    }
    return total;
}

public boolean isPrime(int num) {
    for (int i = 2; i < num; i++) {
        if (num % i == 0) {
            return false;
        }
    }
    return true;
}
```

既然遵守单一功能原则，那么我们可以对迭代过程封装：

```java
public long countPrimes(int upTo) {
    return IntStream.range(1, upTo)
            .filter(this::isPrime)
            .count();
}

public boolean isPrime(int num) {
    return IntStream.range(2, num)
            .allMatch(x -> (num % x) != 0);
}
```

如果我们想利用多核加速计数，可以使用 `parallel` 方法，而不用修改任何其他代码：

```java
public long countPrimes(int upTo) {
    return IntStream.range(1, upTo)
            .parallel()
            .filter(this::isPrime)
            .count();
}
```

### 开闭原则

软件应该对扩展开放，对修改闭合。

开闭原则的首要目标和单一功能原则类似：让软件易于修改。

一个新增功能或一处改动，会影响整个代码，容易引入新的缺陷。

开闭原则保证已有的类在不修改内部实现的基础上可扩展，这样就努力避免了上述问题。

举个栗子：

现在我们有个描述计算机花在用户空间、内核空间和输入输出上的时间散点图 `MetricDataGraph` 接口：

```java
public interface MetricDataGraph {
    void updateUserTime(int value);

    void updateSystemTime(int value);

    void updateIOTime(int value);
}
```

但这个接口有点问题：对扩展不友好。因为要想添加新的时间点，比如 `XXTime`，就要修改这个接口，添加对应的 `updateXXTime` 方法。

如何解决扩展问题呢？一般是通过引入抽象解决。

使用新的类 `TimeSeries` 来表示各种时间点，这样 `MetricDataGraph` 接口也得以简化，不必依赖某项具体指标。

```java
public interface MetricDataGraph {
    void updateTimeSeries(TimeSeries time);
}
```

```java
public interface TimeSeries {
    int getValue();
}
```

每项具体指标都实现 `TimeSeries` 接口，在需要时能直接插入：

```java
public class UserTime implements TimeSeries {
    private int value;

    @Override
    public int getValue() {
        return this.value;
    }
}
```

现在，要添加新的时间点，比如，“被浪费的CPU时间”：

```java
public class WasteTime implements TimeSeries {
    private int value;

    @Override
    public int getValue() {
        return this.value;
    }
}
```

高阶函数也展示了同样的特性：对扩展开放，对修改闭合。

`ThreadLocal` 类有一个特殊变量，每个线程都有一个该变量的副本与之交互。该类的静态方法 `withInitial` 是一个高阶函数，传入一个负责生成初始值的 `lambda` 表达式。即不用修改 `ThreadLocal` 类就能获得新的行为，所以符合开闭原则。

给 `withInitial` 方法传入不同的工厂方法，就能得到有着不同行为的 `ThreadLocal` 实例。

比如，使用 `ThreadLocal` 生成一个 `DateFormatter` 实例，该实例是线程安全的：

```java
// 实现
ThreadLocal<DateFormat> localFormatter = 
		ThreadLocal.withInitial(() -> new SimpleDateFormat());

// 使用
DateFormat formatter = localFormatter.get();
```

或者为每个 `Java` 线程创建唯一，有序的标识符：

```java
AtomicInteger threadId = new AtomicInteger();

ThreadLocal<Integer> localId =
		ThreadLocal.withInitial(() -> threadId.getAndIncrement());

int idForeThisThread = localId.get();
```

### 依赖反转原则

抽象不应依赖细节，细节应该依赖抽象。

该原则的目的：让程序猿脱离底层粘合代码，编写上层业务逻辑代码。这就让上层代码依赖于底层细节的抽象，从而可以重用上层代码。
这种模块化和重用方式是双向的：既可以替换不同的细节重用上层代码，也可以替换不同的业务逻辑重用细节的实现。

以下代码是从一种标记语言中提取标题，其中标题以冒号（：）结尾。

```java
public List<String> findHeadings(Reader input) {
	// 读取文件
    try (BufferedReader reader = new BufferedReader(input)) {
		// 逐行检查
        return reader.lines()
				// 滤出标题
                .filter(line -> line.endsWith(":"))
                .map(line -> line.substring(0, line.length() - 1))
                .collect(toList());
    } catch (IOException e) {
		// 将和读写文件有关的异常封装成待解决的异常
        throw new HeadingLookupException(e);
    }
}
```

这段代码，将提取标题，资源管理，文件处理都混在了一起。我们真正想要的是编写提取标题的代码，而将操作文件相关细节交给另一个方法。

剥离文件处理功能后的业务逻辑：

```java
public List<String> findHeadings2(Reader input) {
    return withLinesOf(input,
            lines -> lines.filter(line -> line.endsWith(":"))
                    .map(line -> line.substring(0, line.length() - 1))
                    .collect(toList()),
            HeadingLookupException::new);
}

// Stream 对象更安全，而且不容易被滥用
// 使用 Stream<String> 做抽象，让代码依赖它，而不是文件
private <T> T withLinesOf(Reader input,
                          Function<Stream<String>, T> handler,
                          Function<IOException, RuntimeException> error) {
    try (BufferedReader reader = new BufferedReader(input)) {
        return handler.apply(reader.lines());
    } catch (IOException e) {
        throw error.apply(e);
    }
}
```

# 使用 lambda 表达式编写并发程序

暂略

未完待续...