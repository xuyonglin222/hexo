---
title: 这个this啊
date: 2018-03-07 11:56:13
tags: javascript
categories: 学习
---
>当一个函数被调用时，会创建一个活动记录(也称为执行上下文)。这个记录会包含调用栈，函数的调用方法，传入的参数等信息。this就是记录的其中一个属性，会在函数调用时用到。因此this是在运行时进行绑定的，并不在编写时绑定，他的上下文取决于函数调用时的各种条件。

<!--more-->
### 默认绑定
```bash
var a = 2;
function A(){
  console.log(this.a)
}
A();  //2
```
上述代码中foo()不带任何修饰函数引用进行调用的，因此只能使用默认绑定，无法应用其他规则。
像这种独立函数调用是最常见的方式。值得一提的是在严格模式下，全局对象无法使用默认绑定，this绑定的是undefined。
### 隐式绑定
话不多说，先上代码
```bash
var a = 2;
function A(){
  console.log(this.a);
}

var obj = {
  a:3,
  A:A
}
obj.A();  //3
```
在本例中，函数A被作为obj的A属性的值，严格来说，obj并不包含A函数，但是它保有对A函数的引用，当obj调用A方法时，_隐式绑定规则_将this绑定到了obj上，所以this.a就是obj.a。
接下来稍微改一下代码：
```bash
var a = 2;

function A(){
  console.log(this.a);
}

function B(fn){
  fn()
}
var obj = {
  a:3,
  A:A
}
B(obj.A);   //2
```
在本例中，obj.A作为参数传递给了函数B，其实函数A最终被调用的位置是在_fn()_，此时的fn是没有函数修饰的，上述代码相当于
```bash
var a = 2;

function A(){
  console.log(this.a);
}

var obj = {
  a:3,
  A:A
}
var C=obj.A;  //敲重点
C();    //2

```
其实参数传递相当于_隐式赋值_，C保存的是对函数A的引用，这其实跟obj没什么关系。这种情况常被称作为_隐式丢失_。
最近在刷题时，有看到这么几段代码：
```bash
var a = 1;
setTimeout(function(){
  var a = 2;
  console.log(this.a);
},1000);
//otherthing
```
当时看到这段代码，立即想到了eventLoop，当执行到setTimeout时，先将回调函数注册，1000ms后将函数推入事件队列，然后检查主线程即调用栈是否为空，如果为空，将队列里的函数按照先入先出原则push到调用栈，想了这么多呢，我发现我确实想多了，this在回调里，ojbk，输出1。
由此想到开发时遇到的情况，在使用第三方库的时候偶尔会用到此类函数，
```bash
//Action为第三方封装的函数
Action(function(){
  //....
  console.log(this);//这一行是自己意淫的
},selector);

```
这种情况下，this又绑定的是谁呢？我不禁这样问自己。/吐口水 /吐口水，其实前面说回调里的this绑定的全局对象，有点武断，文章刚开始，就说了，这取决于函数调用时的各种条件。如果Action是这么封装的：
```bash
function Action(callback , arg){
    //...
    callback()
}
```
无可厚非，this绑定的是全局对象，但是如果：

```bash
function Action(callback , selector){
    //...
    var dom  = document.queryselector(selector);
    dom.callback();
}
```
那么此时的this无疑就是dom。
后来逛掘金时，又看到这段代码：
```bash
var a = 1;

var obj = {
  a: 2,
  B: function(){
    var a = 3;
    (function(){
      var a = 4；
      console.log(this.a);
    }
    )();
  }
}

obj.B();

```
在这段代码里，其实匿名自执行函数和回调函数this绑定的都是全局对象(非严格模式)，因为它们都是不加修饰的函数调用，应用的时_默认绑定规则_(我好像该写在上一个篇幅，嘤嘤嘤（'qAq'）)，想当初我还沿着作用域链去查找this绑定的是谁呢，不得不说《你不知道的javascript》，真不愧是神书。

### 显式绑定

#### 硬绑定
在js中，可以通过一些方法来改变this的指向，在《你不知道的js》里被称为硬绑定，这些方法有apply，call，bind。
+ apply

此方法会执行函数。apply方法只能接受两个参数，一个是this指向的上下文对象，另一个是传递给函数的参数列表(可选)，这个参数列表是以数组的形式。
```bash
var n = 2;
var obj = {
  n:1
}
function getN(){
  console.log(this.n);
}
getN.apply(obj);
```
+ call


此方法会执行函数。call方法和apply方法的使用唯一的差别就是参数的差别，call第一个参数和apply
一样是this指向的上下文对象，但是要传给函数的参数，是单个传过去的，形如
fun.call(obj,arg1,arg2,arg3...)

+ bind


此方法不会执行函数，而是返回一个新的函数，这个新的函数被指定了 this 的上下文，后面的参数是执行函数需要传入的参数。
方法比较简单就不再举例。
#### new

如果函数或者方法调用之前带有关键字new，它就构成构造函数调用，也就是new绑定。
构造函数通常不使用return关键字，它们通常初始化新对象，当构造函数的函数体执行完毕时，它会显式返回。在这种情况下，构造函数调用表达式的计算结果就是这个新对象的值
```bash
function A(){
    this.a = 2;
}
var test = new A();
console.log(test);//{a:2}
```

如果构造函数使用return语句但没有指定返回值，或者返回一个原始类型的值，那么这时将忽略返回值，同时使用这个新对象作为调用结果

```bash
function A(){
    this.a = 2;
    return;
}
var test = new A();
console.log(test);//{a:2}
```
如果构造函数显式地使用return语句返回一个对象，那么调用表达式的值就是这个对象


```bash
var obj = {a:1};
function A(){
    this.a = 2;
    return obj;
}
var test = new A();
console.log(test);//{a:1}

```
尽管有时候构造函数看起来像一个方法调用，它依然会使用这个新对象作为this。也就是说，在表达式new o.m()中，this并不是o


```bash
var obj = {
    a: function(){
        return this;
    }
}
var o = new obj.a();
console.log(o === obj) //false
console.log(o.constructor === obj.a)  //true

```

### 优先级
