---
title: 前端面试收集
date: 2018-04-02 14:42:08
tags: javascript
categories: 学习
---

本部分内容大致分为以下几个方面： HTML, CSS, JavaScript, Node 和 HTTP。

<!--more-->

## JavaScript

#### 1. ECMAScript/JavaScript 中都有那些数据类型？

**答**：ECMAScript中5种简单数据类型（基本数据类型）: Undefined、Null、Boolean、Number和String, 1种复杂数据类型: Object.

#### 2. 把非数值转化为数值的函数都有哪些？

**答**：Number()、parseInt()和parseFloat()，第一个函数，即转型函数Number()可以用于任何数据类型，而另两个函数则专门用于把字符串转换成数值。

#### 3. JavaScript 中的 new 关键词做了什么？

* **答**：他做了五件事

1. 他生成了一个新对象。这个对象的类型只是一个普通的对象；
2. 他将新对象内部、不可访问的原型属性（例如：`__proto__`）设置为构造器函数外在、可访问的 prototype 对象（每个函数对象都会自动拥有一个 `prototype` 属性）；
3. 他将 `this` 变量指向这个新生成的对象；
4. 他执行构造器函数，对于每个提及到 `this` 的地方使用新生成的对象执行；
5. 他返回这个新生成的对象，除非构造器函数返回了一个非空的对象引用。若是返回了一个非空对象，那么这个对象引用将会替代新生成的对象被返回；

```
function myNew(fn,...args) {
    const obj = Object.create(null)
    obj.__proto__ = fn.prototype
    const result = fn.apply(obj, args)
    const isObject = typeof result === 'object' && result !== null 
    const isFunction = typeof result === 'function'
    if(isObject || isFunction) return result
    return obj
}
```
#### 4. JavaScript 的六种继承类型？

* **答**：

* 简单原型链：这是实现继承最简单的方式了，核心在于用父类实例作为子类原型对象。优点是简单，缺点在于二 - 创建子类实例时，无法向父类构造函数传参；由于来自原型对象的引用属性是所有实例共享的，所以修改原型对象上的属性会在所有子类实例中体现出来；

```
function Super(){
    this.val = 1;
}
function Sub(){
    // ...
}
Sub.prototype = new Super();
let sub1 = new Sub();
```

* 借用构造函数：借父类的构造函数来增强子类实例，等于是把父类的实例属性复制了一份给子类实例装上了（完全没有用到原型）;缺点在于无法实现函数复用，每个子类实例都持有一个新的 `fun` 函数，太多了就会影响性能；

```
function Super(val){
    this.val = val;
    this.fun = function(){
        // ...
    }
}
function Sub(val){
    Super.call(this, val);   // 核心
}
let sub1 = new Sub(1);
```

* 组合继承（最常用）：把实例函数都放在原型对象上，以实现函数复用。同时还要保留借用构造函数方式的优点；子类原型上有一份多余的父类实例属性，因为父类构造函数被调用了两次，生成了两份，而子类实例上的那一份屏蔽了子类原型上的定义，属于内存浪费；

```
function Super(){
    // 只在此处声明基本属性和引用属性
    this.val = 1;
}
//  在此处声明函数
Super.prototype.fun1 = function(){};
function Sub(){
    Super.call(this);   // 核心
    // ...
}
Sub.prototype = new Super();    // 核心
let sub1 = new Sub(1);
```

* 原型式继承：从已有的对象中衍生出新对象，不需要创建自定义类型；但原型引用属性会被所有实例共享，因为用整个父类对象来充当子类原型对象；无法实现代码复用；

```
function beget(obj){   // 生孩子函数 beget
    let F = function(){};
    F.prototype = obj;
    return new F();
}
function Super(){
    this.val = 1;
    this.arr = [1];
}
// 拿到父类对象
let sup = new Super();
// 生孩子
let sub = beget(sup);
```

* 寄生式继承：寄生式继承的思路和寄生构造函数和工厂模式相似，即创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来增强对象，最后像真的是它做了所有工作一样返回对象；但是这种形式依然不能复用函数；

```
function beget(obj){   // 生孩子函数
    let F = function(){};
    F.prototype = obj;
    return new F();
}
function Super(){
    this.val = 1;
    this.arr = [1];
}
function getSubObject(obj){
    // 创建新对象
    let clone = beget(obj); // 核心
    // 增强
    clone.attr1 = 1;
    clone.attr2 = 2;
    return clone;
}
var sub = getSubObject(new Super());
```

* 寄生组合继承（最佳方式）：用 beget(Super.prototype) 切掉了原型对象上多余的那份父类实例属性；

```
function beget(obj){   // 生孩子函数 beget
    let F = function(){};
    F.prototype = obj;
    return new F();
}
function Super(){
    // 只在此处声明基本属性和引用属性
    this.val = 1;
    this.arr = [1];
}
//  在此处声明函数
Super.prototype.fun1 = function(){};
Super.prototype.fun2 = function(){};
function Sub(){
    Super.call(this);   // 核心
    // ...
}
let proto = beget(Super.prototype); // 核心
proto.constructor = Sub;            // 核心
Sub.prototype = proto;              // 核心
let sub = new Sub();
```

#### 5. 箭头函数的适用规则？

* **答**：

* 如果你有一个简短的，单语句内联函数表达式，它唯一的语句是某个计算后的值的return语句，并且 这个函数没有在它内部制造一个this引用，并且没有自引用（递归，事件绑定/解除），并且 你合理地预期这个函数绝不会变得需要this引用或自引用，那么你就可能安全地将它重构为一个=>箭头函数。
* 如果你有一个内部函数表达式，它依赖于外围函数的 var self = this 黑科技或者.bind(this)调用来确保正确的this绑定，那么这个内部函数表达式就可能安全地变为一个=>箭头函数。
* 如果你有一个内部函数表达式，它依赖于外围函数的类似于 var args = Array.prototype.slice.call(arguments) 这样的东西来制造一个arguments的词法拷贝，那么这个内部函数就可能安全地变为一个=>箭头函数。
* 对于其他的所有东西 —— 普通函数声明，较长的多语句函数表达式，需要词法名称标识符进行自引用（递归等）的函数，和任何其他不符合前述性质的函数 —— 你就可能应当避免=>函数语法。

#### 6. 为什么我们区别 LHS 和 RHS 那么重要？

**答**：因为在变量还没有被声明（在所有被查询的 作用域 中都没找到）的情况下，这两种类型的查询的行为不同。如果 RHS 查询在嵌套的作用域的任何地方都找不到一个值，这会导致引擎抛出一个 ReferenceError。相比之下，如果引擎在进行一个 LHS 查询，但到达了顶层（全局 作用域）都没有找到它，而且如果程序没有运行在“Strict模式”下，那么这个全局作用域将会在全局作用域中创建一个同名的新变量，并把它交还给引擎。而如果一个 RHS 查询的变量被找到了，但是你试着去做一些这个值不可能做到的事，比如将一个非函数的值作为函数运行，或者引用 null 或者 undefined 值的属性，那么引擎就会抛出一个不同种类的错误，称为 TypeError。

#### 7. 如何区分声明和表达式？

**答**：区分声明与表达式的最简单的方法是，这个语句中（不仅仅是一行，而是一个独立的语句）“function”一词的位置。如果“function”是这个语句中的第一个东西，那么它就是一个函数声明。否则，它就是一个函数表达式。

#### 8. IIFE 方式与变种？

**答**：

```javascript
// 1
(function foo(){ .. })()
// 2
(function(){ .. }())
// 3，用于 UMD 项目
(function IIFE( def ){
	def( window );
})(function def( global ){
	let a = 3;
	console.log( a ); // 3
	console.log( global.a ); // 2
});
```

#### 9. 请解释如下代码执行的结果？

```
[] + {}; // "[object Object]"
{} + []; // 0
```

**答**：在第一行中，{}出现在+操作符的表达式中，因此被翻译为一个实际的值（一个空object）。而[]被强制转换为""因此{}也会被强制转换为一个string："[object Object]"。但在第二行中，{}被翻译为一个独立的{}空代码块儿（它什么也不做）。块儿不需要分号来终结它们，所以这里缺少分号不是一个问题。最终，+ []是一个将[]明确强制转换 为number的表达式，而它的值是0。

#### 10. 什么是事件委托？

**答**：：事件委托，通俗地来讲，就是把一个元素响应事件（click、keydown……）的函数委托到另一个元素；一般来讲，会把一个或者一组元素的事件委托到它的父层或者更外层元素上，真正绑定事件的是外层元素，当事件响应到需要绑定的元素上时，会通过事件冒泡机制从而触发它的外层元素的绑定事件上，然后在外层元素上去执行函数。
事件委托的好处包括：动态绑定事件与减少内存消耗。

#### 11. JavaScript 与 HTML 之间交互的事件模型分为几个阶段？

**答**：

1. 捕获阶段：在事件冒泡的模型中，捕获阶段不会响应任何事件；
2. 目标阶段：目标阶段就是指事件响应到触发事件的最底层元素上；
3. 冒泡阶段：冒泡阶段就是事件的触发响应会从最底层目标一层层地向外到最外层（根节点），事件代理即是利用事件冒泡的机制把里层所需要响应的事件绑定到外层；

#### 12. 触摸事件都有哪些？

**答**：三种在规范中列出并获得跨移动设备广泛实现的基本触摸事件

1. touchstart事件：当手指触摸屏幕时候触发，即使已经有一个手指放在屏幕上也会触发。
2. touchmove事件：当手指在屏幕上滑动的时候连续地触发。在这个事件发生期间，调用preventDefault()事件可以阻止滚动。
3. touchend事件：当手指从屏幕上离开的时候触发。

#### 13. 事件对象的 clientX, offsetX, screenX, pageX 有什么区别？

**答**：

1. event.clientX、event.clientY: 鼠标相对于浏览器窗口可视区域的X, Y坐标（窗口坐标），可视区域不包括工具栏和滚动条。
2. event.pageX、event.pageY: 鼠标相对于整个页面的X/Y坐标。注意，整个页面的意思就是你整个网页的全部，比如说网页很宽很长，宽2000px，高3000px，那pageX, pageY的最大值就是它们了。**特别说明：IE不支持！**
3. screenX、screenY: 鼠标相对于用户显示器屏幕左上角的X, Y坐标。
4. event.offsetX、event.offsetY: 鼠标相对于事件父容器（srcElement）的X, Y坐标。**特别说明：只有IE支持！**

#### 什么是虚拟DOM（Virtual DOM），以及它与真实DOM的区别和优势。
虚拟DOM（Virtual DOM）是一种用于优化前端性能的概念和技术。它是一种在内存中以JavaScript对象的形式表示的轻量级的DOM树结构。

与真实DOM相比，虚拟DOM有以下区别和优势：

+ 结构轻量：虚拟DOM是基于JavaScript对象构建的，相对于真实DOM的复杂结构来说，它是一种轻量级的表示方式。这意味着在进行DOM操作时，虚拟DOM的创建和更新速度更快。

+ 批量更新：在使用虚拟DOM时，当应用程序状态发生变化时，虚拟DOM会将变化记录下来，并在适当的时机将这些变化批量更新到真实DOM中。这样可以减少对真实DOM的直接操作，从而提高性能。

+ 减少重绘和回流：虚拟DOM通过比较前后两个虚拟DOM树的差异，找到需要更新的部分，并只更新这些部分，而不是全局重新渲染整个DOM树。这样可以减少不必要的页面重绘和回流操作，提高渲染性能。

+ 跨平台支持：虚拟DOM是基于JavaScript对象的，因此可以在不同平台上使用，例如浏览器、服务器和移动应用程序等。这种跨平台的支持使得虚拟DOM成为一种通用的前端开发技术。

虽然虚拟DOM能够提高前端性能，但它也存在一些额外的开销，例如内存占用和运算消耗。因此，在某些情况下，使用虚拟DOM可能并不是最优选择。但总体来说，虚拟DOM作为一种优化手段，可以有效地提高前端应用程序的渲染性能和用户体验。



#### async和defer
script 是会阻碍 HTML 解析的，只有下载好并执行完脚本才会继续解析 HTML
defer 和 async有一个共同点：下载此类脚本都不会阻止页面呈现（异步加载），区别在于：

async 执行与文档顺序无关，先加载哪个就先执行哪个；defer会按照文档中的顺序执行
async 脚本加载完成后立即执行，可以在DOM尚未完全下载完成就加载和执行；而defer脚本需要等到文档所有元素解析完成之后才执行

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ea091aed8364b88a653a13c4845a824~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)