---
title: instanceof
date: 2018-01-16 11:35:29
tags: javascript
categories: 学习
---

>instanceof 运算符与 typeof 运算符相似，用于识别正在处理的对象的类型。与 typeof 方法不同的是，instanceof 方法要求开发者明确地确认对象为某特定类型。尽管它的用法不如typeof灵活，但是当typeof返回值是Object时，instanceof还是挺有用的，常用来判断继承关系。


<!--more-->

#### 说明


是一个二元运算符，返回的是一个Boolean值，指出对象是否是特定类的一个实例。

<weight>expression instanceof class</weight><br>expression和class都是必选项。


#### 注意
关于function的arguments，一开始以为它是一个数组，因为它可以通过索引arguments[i],来访问参数列表，后来在使用push等方法时发现报错，
>VM1621:3 Uncaught TypeError: arguments.push is not a function

arguments instanceof Array，返回值是false
这时得知arguments是一个Array-like对象，并不是真的数组。

另外<br>

class应该是js语法层面的bject，不应该是Dom对象，然而亲自尝试得

```bash
console.log(typeof window); //Object
console.log(window instanceof Object); //true
```
网上很多文章都说window instanceof Object返回是false，不知为啥。

#### 常规用法

通常用来判断一个实例是否属于某种类型。

```bash
function Foo(){}
var foo = new Foo();
console.log(foo instanceof Foo)//true
```
更重要的是用来判断继承关系。

```bash

function A() {}
function B() {}

B.prototype = new A(); //原型继承
var b = new B();

console.log(b instanceof B); //true
console.log(b instanceof A); //true

```
多层继承关系依然适用。

#### 复杂用法
```bash

console.log(Object instanceof Object);//true
console.log(Function instanceof Function);//true
console.log(Number instanceof Number);//false
console.log(String instanceof String);//false

console.log(Function instanceof Object);//true

console.log(Foo instanceof Function);//true
console.log(Foo instanceof Foo);//false

```
参考网上的文章，就是[这一篇](https://www.ibm.com/developerworks/cn/web/1306_jiangjj_jsinstanceof/)，得知要从两个方面着手：
 + 语言规范是怎么定义instanceof的。
 + Javascript原型继承机制。

 #### ECMAScript-262 edition 3 中 instanceof 运算符的定义

 定义如下：
 ```bash
 11.8.6 The instanceof operator
 The production RelationalExpression:
     RelationalExpression instanceof ShiftExpression is evaluated as follows:

 1. Evaluate RelationalExpression.
 2. Call GetValue(Result(1)).// 调用 GetValue 方法得到 Result(1) 的值，设为 Result(2)
 3. Evaluate ShiftExpression.
 4. Call GetValue(Result(3)).// 同理，这里设为 Result(4)
 5. If Result(4) is not an object, throw a TypeError exception.// 如果 Result(4) 不是 object，
                                                                //抛出异常
 /* 如果 Result(4) 没有 [[HasInstance]] 方法，抛出异常。规范中的所有 [[...]] 方法或者属性都是内部的，
在 JavaScript 中不能直接使用。并且规范中说明，只有 Function 对象实现了 [[HasInstance]] 方法。
所以这里可以简单的理解为：如果 Result(4) 不是 Function 对象，抛出异常 */
 6. If Result(4) does not have a [[HasInstance]] method,
   throw a TypeError exception.
 // 相当于这样调用：Result(4).[[HasInstance]](Result(2))
 7. Call the [[HasInstance]] method of Result(4) with parameter Result(2).
 8. Return Result(7).

 // 相关的 HasInstance 方法定义
 15.3.5.3 [[HasInstance]] (V)
 Assume F is a Function object.// 这里 F 就是上面的 Result(4)，V 是 Result(2)
 When the [[HasInstance]] method of F is called with value V,
     the following steps are taken:
 1. If V is not an object, return false.// 如果 V 不是 object，直接返回 false
 2. Call the [[Get]] method of F with property name "prototype".// 用 [[Get]] 方法取
                                                                // F 的 prototype 属性
 3. Let O be Result(2).//O = F.[[Get]]("prototype")
 4. If O is not an object, throw a TypeError exception.
 5. Let V be the value of the [[Prototype]] property of V.//V = V.[[Prototype]]
 6. If V is null, return false.
 // 这里是关键，如果 O 和 V 引用的是同一个对象，则返回 true；否则，到 Step 8 返回 Step 5 继续循环
 7. If O and V refer to the same object or if they refer to objects
   joined to each other (section 13.1.2), return true.
 8. Go to step 5.

 ```
上面的规范定义很晦涩，而且看起来比较复杂，涉及到很多概念，但把这段规范翻译成 JavaScript 代码却很简单，如下：
```bash

function instance_of(L, R) {//L 表示左表达式，R 表示右表达式
 var O = R.prototype;// 取 R 的显示原型
 L = L.__proto__;// 取 L 的隐式原型
 while (true) {
   if (L === null)
     return false;
   if (O === L)// 这里重点：当 O 严格等于 L 时，返回 true
     return true;
   L = L.__proto__;
 }
}
```
当当当当，BB一大片，这才是精华。其实判断继承关系，搞懂下面这张图就ok。
![](https://xuyonglinblog.oss-cn-beijing.aliyuncs.com/prototype.jpg)
