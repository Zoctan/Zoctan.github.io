---
title: hashcode
date: 2018-10-31
category: Java
---

# 前言

在 Java 的 Object 类中有一个方法:

```java
public native int hashCode();
```

根据这个方法的声明可知，该方法返回一个 int 类型的数值，并且是本地方法，因此在 Object 类中并没有给出具体的实现。

# hashCode 方法的作用

对于包含容器类型的程序设计语言来说，基本上都会涉及到 hashCode。在 Java 中也一样，hashCode 方法的主要作用是为了配合基于散列的集合一起正常运行，这样的散列集合包括 HashSet、HashMap 以及 HashTable。

当向集合中插入对象时，如何判断在集合中是否已经存在该对象了？（注意：集合中不允许重复的元素存在）

也许大多数人都会想到调用 equals 方法来逐个进行比较，这个方法确实可行。但是如果集合中已经存在一万条数据或者更多的数据，如果采用 equals 方法去逐一比较，效率必然是一个问题。

此时 hashCode 方法的作用就体现出来了：当集合要添加新的对象时，先调用这个对象的 hashCode 方法，得到对应的 hashcode 值，如果 table 中没有该 hashcode 值，它就可以直接存进去，不用再进行任何比较了；如果存在该 hashcode 值，就调用它的 equals 方法与新元素进行比较，相同的话就不存了，不相同就散列其它的地址。（实际上就是 HashMap 的具体实现）

所以这里存在一个冲突解决和效率的问题，说通俗一点：Java 中的 hashCode 方法就是根据一定的规则将与对象相关的信息（比如对象的存储地址，对象的字段等）映射成一个数值，这个数值称作为散列值。

下面这段代码是 java.util.HashMap 的中 put 方法的具体实现：

```java
public V put(K key, V value) {
    if (key == null)
        return putForNullKey(value);
    int hash = hash(key.hashCode());
    int i = indexFor(hash, table.length);
    for (Entry<K,V> e = table[i]; e != null; e = e.next) {
        Object k;
        if (e.hash == hash && ((k = e.key) == key || key.equals(k))) {
            V oldValue = e.value;
            e.value = value;
            e.recordAccess(this);
            return oldValue;
        }
    }

    modCount++;
    addEntry(hash, key, value, i);
    return null;
}
```

put 方法是用来向 HashMap 中添加新的元素，从 put 方法的具体实现可知，会先调用 hashCode 方法得到该元素的 hashCode 值，然后查看 table 中是否存在该 hashCode 值，如果存在则调用 equals 方法重新确定是否存在该元素，如果存在，则更新 value 值，否则将新的元素添加到 HashMap 中。从这里可以看出，hashCode 方法的存在是为了减少 equals 方法的调用次数，从而提高程序效率。

> 对 hash 表不清楚的，可以参考这几篇博文：
> http://www.cnblogs.com/jiewei915/archive/2010/08/09/1796042.html
> http://www.cnblogs.com/dolphin0520/archive/2012/09/28/2700000.html
> http://www.java3z.com/cwbwebhome/article/article8/83560.html?id=4649

有些朋友误以为默认情况下，hashCode 返回的就是对象的存储地址，事实上这种看法是不全面的，确实有些 JVM 在实现时是直接返回对象的存储地址，但是大多时候并不是这样，只能说可能存储地址有一定关联。下面是 HotSpot JVM 中生成 hash 散列值的实现：

```java
// hotspot/src/share/vm/runtime/synchronizer.cpp

static inline intptr_t get_next_hash(Thread * Self, oop obj) {
  intptr_t value = 0 ;
  if (hashCode == 0) {
     // This form uses an unguarded global Park-Miller RNG,
     // so it's possible for two threads to race and generate the same RNG.
     // On MP system we'll have lots of RW access to a global, so the
     // mechanism induces lots of coherency traffic.
     value = os::random() ;
  } else
  if (hashCode == 1) {
     // This variation has the property of being stable (idempotent)
     // between STW operations.  This can be useful in some of the 1-0
     // synchronization schemes.
     intptr_t addrBits = intptr_t(obj) >> 3 ;
     value = addrBits ^ (addrBits >> 5) ^ GVars.stwRandom ;
  } else
  if (hashCode == 2) {
     value = 1 ;            // for sensitivity testing
  } else
  if (hashCode == 3) {
     value = ++GVars.hcSequence ;
  } else
  if (hashCode == 4) {
     value = intptr_t(obj) ;
  } else {
     // Marsaglia's xor-shift scheme with thread-specific state
     // This is probably the best overall implementation -- we'll
     // likely make this the default in future releases.
     unsigned t = Self->_hashStateX ;
     t ^= (t << 11) ;
     Self->_hashStateX = Self->_hashStateY ;
     Self->_hashStateY = Self->_hashStateZ ;
     Self->_hashStateZ = Self->_hashStateW ;
     unsigned v = Self->_hashStateW ;
     v = (v ^ (v >> 19)) ^ (t ^ (t >> 8)) ;
     Self->_hashStateW = v ;
     value = v ;
  }
 
  value &= markOopDesc::hash_mask;
  if (value == 0) value = 0xBAD ;
  assert (value != markOopDesc::no_hash, "invariant") ;
  TEVENT (hashCode: GENERATE) ;
  return value;
}
```

因此有人会说，可以直接根据 hashcode 值判断两个对象是否相等吗？肯定是不可以的，因为存在以下逻辑：

```
if obj1 equals obj2
    then obj1.hashcode == obj2.hashcode

if obj1 不 equals obj2
    then obj1.hashcode 不一定 == obj2.hashcode

if obj1.hashcode 不 == obj2.hashcode
    then obj1 不 equals obj2

if obj1.hashcode == obj2.hashcode
    then obj1 不一定 equals obj2
```

# equals 和 hashCode

在有些情况下，程序员在设计一个类的时候需要重写 equals 方法，比如 String 类，但是千万要注意，在重写 equals 方法的同时，必须重写 hashCode 方法。为什么这么说呢？

下面看一个例子：

```java
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

class People {
    private String name;
    private int age;

    public People(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public boolean equals(Object obj) {
        // 重写 equals 方法
        // 如果两个 People 对象的姓名和年龄相等，则认为是同一个人
        return this.name.equals(((People) obj).name) && this.age == ((People) obj).age;
    }
}

public class Main {

    public static void main(String[] args) {

        People p1 = new People("Jack", 12);
        System.out.println(p1.hashCode());

        HashMap<People, Integer> hashMap = new HashMap<People, Integer>();
        hashMap.put(p1, 1);

        // null
        System.out.println(hashMap.get(new People("Jack", 12)));
    }
}
```

这段代码本来的意愿是想这段代码输出结果为 1，但事实上它输出的是 null，为什么？因为没有重写 hashCode 方法。

虽然通过重写 equals 方法使得逻辑上姓名和年龄相同的两个对象被判定为相等的对象（跟 String 类类似），但在默认情况下，hashCode 方法是将对象的存储地址进行映射，`p1` 指向的对象和 `System.out.println(hashMap.get(new People("Jack", 12)));` 这句中的 new People("Jack", 12) 生成的是两个对象，它们的存储地址不同，所以就输出 null。

下面是 HashMap 的 get 方法的具体实现：

```java
public V get(Object key) {
    if (key == null)
        return getForNullKey();
    int hash = hash(key.hashCode());
    for (Entry<K,V> e = table[indexFor(hash, table.length)];
            e != null;
            e = e.next) {
        Object k;
        if (e.hash == hash && ((k = e.key) == key || key.equals(k)))
            return e.value;
    }
    return null;
}
```

所以在 hashmap 进行 get 操作时，因为得到的 hashcdoe 值不同（注意，上述代码也许在某些情况下会得到相同的 hashcode 值，不过这种概率比较小），所以导致在 get 方法中 for 循环不会执行，直接返回 null。

因此如果想上述代码输出为 1，很简单，只需要重写 hashCode 方法，让 equals 方法和 hashCode 方法始终在逻辑上保持一致性：

```java
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

class People {
    private String name;
    private int age;

    public People(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public int hashCode() {
        return name.hashCode() * 37 + age;
    }

    @Override
    public boolean equals(Object obj) {
        return this.name.equals(((People) obj).name) && this.age == ((People) obj).age;
    }
}

public class Main {

    public static void main(String[] args) {

        People p1 = new People("Jack", 12);
        System.out.println(p1.hashCode());

        HashMap<People, Integer> hashMap = new HashMap<People, Integer>();
        hashMap.put(p1, 1);

        System.out.println(hashMap.get(new People("Jack", 12)));
    }
}
```

这样一来的话，输出结果就为 1 了。

下面这段话摘自《Effective Java》：
1. 在程序执行期间，只要 equals 方法的比较操作用到的信息没有被修改，那么对这同一个对象调用多次，hashCode 方法必须始终如一地返回同一个整数。
2. 如果两个对象根据 equals 方法比较是相等的，那么调用两个对象的 hashCode 方法必须返回相同的整数结果。
3. 如果两个对象根据 equals 方法比较是不等的，则 hashCode 方法不一定得返回不同的整数。

第一条在很多时候会被忽略。在《Java编程思想》一书中的P495页也有类似的一段话：
设计 hashCode() 时最重要的因素就是：无论何时，对同一个对象调用 hashCode() 都应该产生同样的值。如果在讲一个对象用 put() 添加进 HashMap 时产生一个 hashCdoe 值，而用 get() 取出时却产生了另一个 hashCode 值，那么就无法获取该对象了。所以如果你的 hashCode 方法依赖于对象中易变的数据，用户就要当心了，因为此数据发生变化时，hashCode() 方法就会生成一个不同的散列码。

下面举个例子：

```java
import java.util.HashMap;
        import java.util.HashSet;
        import java.util.Set;

class People {
    private String name;
    private int age;

    public People(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public int hashCode() {
        // TODO Auto-generated method stub
        return name.hashCode() * 37 + age;
    }

    @Override
    public boolean equals(Object obj) {
        // TODO Auto-generated method stub
        return this.name.equals(((People) obj).name) && this.age == ((People) obj).age;
    }
}

public class Main {

    public static void main(String[] args) {

        People p1 = new People("Jack", 12);
        System.out.println(p1.hashCode());

        HashMap<People, Integer> hashMap = new HashMap<People, Integer>();
        hashMap.put(p1, 1);

        p1.setAge(13);

        // null
        System.out.println(hashMap.get(p1));
    }
}
```

这段代码输出的结果为 null，想必其中的原因大家应该都清楚了。

因此，在设计 hashCode 方法和 equals 方法的时候，如果对象中的数据易变，则最好在 equals 方法和 hashCode 方法中不要依赖于该字段。
