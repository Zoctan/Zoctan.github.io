---
title: 仿Vue极简双向绑定
date: 2018-11-15
category: 学习
---

原文来自：https://segmentfault.com/a/1190000015375217

# Object.defineProperty()

这个API是实现双向绑定的核心，最主要的作用是重写数据的get、set方法：

```js
let obj = {
    singer: "周杰伦"
};
let value = "青花瓷";
Object.defineProperty(obj, "music", {
    // 设置属性的值 下面设置了get set函数 所以这里不能设置
    // value: '七里香',
    // 是否可以修改对象 下面设置了get set函数 所以这里不能设置
    // writable: true,

    // 是否可以删除属性 默认不能删除
    configurable: false,
    // music是否可以被枚举 默认是不能被枚举(遍历)
    enumerable: true,
    // ☆ get、set 设置时不能设置 writable 和 value，要一对一对设置，交叉设置/同时存在 就会报错
    get() {
        // 获取obj.music的时候就会调用get方法
        // 打开注释 读取属性永远都是‘强行设置get的返回值’
        // let value = "强行设置get的返回值";
        return value;
    },
    set(val) {
        // 将修改的值重新赋给song
        value = val;
    }
});
// 青花瓷
console.log(obj.music);
// configurable设为 false 删除无效
delete obj.music;
// 青花瓷
console.log(obj.music);
obj.music = "听妈妈的话";
// 听妈妈的话 
console.log(obj.music);
for (let key in obj) {
    // 默认情况下通过defineProperty定义的属性是不能被枚举(遍历)的
    // 需要设置enumerable为true才可以 否则只能拿到singer 属性
    // singer, music
    console.log(key);
}
```

重点：
- get、set 设置时不能设置 writable 和 value，交叉设置或同时存在，会报错
- 通过 defineProperty 设置的属性，默认不能删除，不能遍历，当然你可以通过设置更改他们
- get、set 是函数，可以做的事情很多。

兼容性：IE 9,Firefox 4, Chorme 5,Opera 11.6,Safari 5.1

更详细的可以看一下[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

# Demo

```html
<!DOCTYPE HTML>
<html lang="zh-CN">

<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <title>仿Vue极简双向绑定</title>
    <style>
        #app {
                margin-top: 3vh;
                text-align: center;
            }
    </style>
</head>

<body>
    <div id="app">
        <div>
            <input type="text" v-model="name">
            <div>v-bind 形式：<p v-bind="name">DOM 深度遍历</p>
            </div>
            <div>{{ }} 形式： <p>{{ name }}</p>
            </div>
        </div>
        <div>
            <input type="text" v-model="testData1">
            <p>{{ testData1 }}</p>
        </div>
        <div>
            <input type="text" v-model="testData2">
            <p>{{ testData2 }}</p>
        </div>
    </div>

    <script>
        window.onload = () => {
            // 构造函数
            var app = new myVue({
                // DOM
                el: '#app',
                data: {
                    testData1: '仿Vue',
                    testData2: '极简双向绑定',
                    name: 'xx'
                }
            })
        }

        // MVVM 入口函数
        // 用于整合 数据监听器 _observer、 指令解析器 _compile、连接 Observer 和 Compile 的 _watcherTpl
        function myVue(options = {}) {
            // 获取 DOM
            this.$el = document.querySelector(options.el)
            // 数据挂载
            this._data = options.data
            // watcher 池
            this._watcherTpl = {}
            // 传入数据，执行函数，重写数据的 get、set
            this._observer(this._data)
            // 传入 DOM，执行函数，编译模板 发布订阅
            this._compile(this.$el)
        }

        // 重写 data 的 get、set  更改数据的时候，触发 watch 更新视图
        myVue.prototype._observer = function (obj) {
            var _this = this
            // 遍历数据
            Object.keys(obj).forEach(key => {
                // 每个数据的订阅池()
                _this._watcherTpl[key] = {
                    _directives: []
                }
                // 获取属性值
                var value = obj[key]
                // 数据的订阅池
                var watcherTpl = _this._watcherTpl[key]
                // 双向绑定最重要的部分 重写数据的 set、get
                Object.defineProperty(_this._data, key, {
                    // 可以删除
                    configurable: true,
                    // 可以遍历
                    enumerable: true,
                    get() {
                        console.log(`${key}获取值：${value}`)
                        // 获取值的时候 直接返回
                        return value
                    },
                    // 改变值的时候 触发 set
                    set(newVal) {
                        console.log(`${key}更新：${newVal}`)
                        if (value !== newVal) {
                            value = newVal
                            // 遍历订阅池 
                            watcherTpl._directives.forEach((item) => {
                                // 遍历所有订阅的地方（v-model + v-bind + {{}}）
                                // 触发 this._compile() 中发布的订阅 Watcher 更新视图  
                                item.update()
                            })
                        }
                    }
                })
            })
        }

        // 模板编译
        myVue.prototype._compile = function (el) {
            var _this = this
            // 获取 app 的 DOM
            var nodes = el.children
            // 遍历 DOM 节点
            for (var i = 0, len = nodes.length; i < len; i++) {
                var node = nodes[i]
                if (node.children.length) {
                    // 递归深度遍历 DOM 树
                    _this._compile(node)
                }

                // 如果有 v-model 属性，并且元素是 INPUT 或者 TEXTAREA，我们监听它的 INPUT 事件    
                if (node.hasAttribute('v-model') && (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA')) {
                    node.addEventListener('input', (key => {
                        // 获取 v-model 绑定的值
                        var attVal = node.getAttribute('v-model')
                        // 将 DOM 替换成属性的数据并发布订阅 在 set 的时候更新数据
                        _this._watcherTpl[attVal]._directives.push(new Watcher(
                            node,
                            _this,
                            attVal,
                            'value'
                        ))
                        return () => {
                            // input 值改变的时候 将新值赋给数据 触发 set=>set 触发 watch 更新视图
                            _this._data[attVal] = nodes[key].value;
                        }
                    })(i))
                }

                // v-bind 指令 
                if (node.hasAttribute('v-bind')) {
                    // 绑定的 data
                    var attrVal = node.getAttribute('v-bind');
                    // 将 DOM 替换成属性的数据并发布订阅 在 set 的时候更新数据
                    _this._watcherTpl[attrVal]._directives.push(new Watcher(
                        node,
                        _this,
                        attrVal,
                        'innerHTML'
                    ))
                }

                // 正则匹配 {{}}
                const reg = /\{\{\s*([^}]+\S)\s*\}\}/g
                var txt = node.textContent
                if (reg.test(txt)) {
                    // matched 匹配的文本节点包括 {{}}, placeholder 是 {{}} 中间的属性名
                    node.textContent = txt.replace(reg, (matched, placeholder) => {
                        // 所有绑定 watch 的数据
                        var getName = _this._watcherTpl
                        // 获取对应 watch 数据的值
                        getName = getName[placeholder]
                        // 没有事件池 创建事件池
                        if (!getName._directives) {
                            getName._directives = []
                        }
                        // 将 DOM 替换成属性的数据并发布订阅 在 set 的时候更新数据
                        getName._directives.push(new Watcher(
                            node,
                            _this,
                            placeholder,
                            'innerHTML'
                        ))

                        // 获取数据的值 触发 get 返回当前值
                        return placeholder.split('.').reduce((val, key) => {
                            return _this._data[key]
                        }, _this.$el)
                    })
                }
            }
        }

        // new Watcher() 为 this._compile() 发布订阅 + 在 this._observer() 中 set (赋值)的时候更新视图
        function Watcher(el, vm, val, attr) {
            // 指令对应的 DOM 元素
            this.el = el
            // myVue 实例
            this.vm = vm
            // 指令对应的值
            this.val = val
            // DOM 获取值，如 value 获取 input 的值 或 innerHTML 获取 DOM 的值
            this.attr = attr
            // 更新视图
            this.update()
        }
        Watcher.prototype.update = function () {
            // 获取 data 的最新值 赋值给 DOM 更新视图
            this.el[this.attr] = this.vm._data[this.val]
        }
    </script>
</body>

</html>
```

# 实现思路

mvvm系列的双向绑定，关键步骤：

1. 实现数据监听器 Observer，用 Object.defineProperty() 重写数据的 get、set，值更新就在 set 中通知订阅者更新数据。
2. 实现模板编译 Compile，深度遍历 dom 树，对每个元素节点的指令模板进行替换数据以及订阅数据。
3. 实现 Watch 用于连接 Observer 和 Compile，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图。
4. mvvm 入口函数，整合以上三者。

![mvvm双向绑定](mvvm双向绑定.png)

# 具体代码实现

```html
<div id="app">
    <input type="text" v-model="name">
    <h3 v-bind="name"></h3>
    <input type="text" v-model="testData1">
    <h3>{{ testData1 }}</h3>
    <input type="text" v-model="testData2">
    <h3>{{ testData2 }}</h3>
</div>
```

类Vue方式进行双向绑定：

```js
window.onload = () => {
    // 构造函数
    var app = new myVue({
        // DOM
        el: '#app',
        data: {
            testData1: '仿Vue',
            testData2: '极简双向绑定',
            name: 'xx'
        }
    })
}
```

## myVue

实际上这里是我们实现思路中的第四步：整合数据监听器 this._observer()、指令解析器 this._compile() 以及连接 Observer 和 Compile 的 _watcherTpl 的 watch 池。

```js
// MVVM 入口函数
// 用于整合 数据监听器 _observer、 指令解析器 _compile、连接 Observer 和 Compile 的 _watcherTpl
function myVue(options = {}) {
    // 获取 DOM
    this.$el = document.querySelector(options.el)
    // 数据挂载
    this._data = options.data
    // watcher 池
    this._watcherTpl = {}
    // 传入数据，执行函数，重写数据的 get、set
    this._observer(this._data)
    // 传入 DOM，执行函数，编译模板 发布订阅
    this._compile(this.$el)
}
```

## Watcher

这是实现思路中的第三步，因为下方数据监听器 _observer() 需要用到 Watcher 函数，所以这里就先讲了。

像实现思路中所说的，这里起到了连接 Observer 和 Compile 的作用：
1. 在模板编译 _compile() 阶段发布订阅
2. 在赋值操作的时候，更新视图

```js
// new Watcher() 为 this._compile() 发布订阅 + 在 this._observer() 中 set (赋值)的时候更新视图
function Watcher(el, vm, val, attr) {
    // 指令对应的 DOM 元素
    this.el = el
    // myVue 实例
    this.vm = vm
    // 指令对应的值
    this.val = val
    // DOM 获取值，如 value 获取 input 的值 或 innerHTML 获取 DOM 的值
    this.attr = attr
    // 更新视图
    this.update()
}
```

## _observer

实现思路中的第一步，用 Object.defineProperty() 遍历 data 重写所有属性的 get、set。

然后在给对象的某个属性赋值的时候，就会触发 set。

在 set 中我们可以监听到数据的变化，然后就可以触发 watch 更新视图。

```js
// 重写 data 的 get、set  更改数据的时候，触发 watch 更新视图
myVue.prototype._observer = function (obj) {
    var _this = this
    // 遍历数据
    Object.keys(obj).forEach(key => {
        // 每个数据的订阅池()
        _this._watcherTpl[key] = {
            _directives: []
        }
        // 获取属性值
        var value = obj[key]
        // 数据的订阅池
        var watcherTpl = _this._watcherTpl[key]
        // 双向绑定最重要的部分 重写数据的 set、get
        Object.defineProperty(_this._data, key, {
            // 可以删除
            configurable: true,
            // 可以遍历
            enumerable: true,
            get() {
                console.log(`${key}获取值：${value}`)
                // 获取值的时候 直接返回
                return value
            },
            // 改变值的时候 触发 set
            set(newVal) {
                console.log(`${key}更新：${newVal}`)
                if (value !== newVal) {
                    value = newVal
                    // 遍历订阅池 
                    watcherTpl._directives.forEach((item) => {
                        // 遍历所有订阅的地方（v-model + v-bind + {{}}）
                        // 触发 this._compile() 中发布的订阅 Watcher 更新视图  
                        item.update()
                    })
                }
            }
        })
    })
}
```

## Compile

这里是实现思路中的第三步：

1. 首先是深度遍历dom树，遍历每个节点以及子节点
2. 将模板中的变量替换成数据，初始化渲染页面视图
3. 把指令绑定的属性添加到对应的订阅池中
4. 一旦数据有变动，收到通知，更新视图

```js
myVue.prototype._compile = function (el) {
    var _this = this
    // 获取 app 的 DOM
    var nodes = el.children
    // 遍历 DOM 节点
    for (var i = 0, len = nodes.length; i < len; i++) {
        var node = nodes[i]
        if (node.children.length) {
            // 递归深度遍历 DOM 树
            _this._compile(node)
        }

        // 如果有 v-model 属性，并且元素是 INPUT 或者 TEXTAREA，我们监听它的 INPUT 事件    
        if (node.hasAttribute('v-model') && (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA')) {
            node.addEventListener('input', (key => {
                // 获取 v-model 绑定的值
                var attVal = node.getAttribute('v-model')
                // 将 DOM 替换成属性的数据并发布订阅 在 set 的时候更新数据
                _this._watcherTpl[attVal]._directives.push(new Watcher(
                    node,
                    _this,
                    attVal,
                    'value'
                ))
                return () => {
                    // input 值改变的时候 将新值赋给数据 触发 set=>set 触发 watch 更新视图
                    _this._data[attVal] = nodes[key].value;
                }
            })(i))
        }

        // v-bind 指令 
        if (node.hasAttribute('v-bind')) {
            // 绑定的 data
            var attrVal = node.getAttribute('v-bind');
            // 将 DOM 替换成属性的数据并发布订阅 在 set 的时候更新数据
            _this._watcherTpl[attrVal]._directives.push(new Watcher(
                node,
                _this,
                attrVal,
                'innerHTML'
            ))
        }

        // 正则匹配 {{}}
        const reg = /\{\{\s*([^}]+\S)\s*\}\}/g
        var txt = node.textContent
        if (reg.test(txt)) {
            // matched 匹配的文本节点包括 {{}}, placeholder 是 {{}} 中间的属性名
            node.textContent = txt.replace(reg, (matched, placeholder) => {
                // 所有绑定 watch 的数据
                var getName = _this._watcherTpl
                // 获取对应 watch 数据的值
                getName = getName[placeholder]
                // 没有事件池 创建事件池
                if (!getName._directives) {
                    getName._directives = []
                }
                // 将 DOM 替换成属性的数据并发布订阅 在 set 的时候更新数据
                getName._directives.push(new Watcher(
                    node,
                    _this,
                    placeholder,
                    'innerHTML'
                ))

                // 获取数据的值 触发 get 返回当前值
                return placeholder.split('.').reduce((val, key) => {
                    return _this._data[key]
                }, _this.$el)
            })
        }
    }
}
```
