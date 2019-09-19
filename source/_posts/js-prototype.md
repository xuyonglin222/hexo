---
title: prototype
date: 2018-01-18 11:35:52
tags: javascript
categories: 学习
---

>原型和原型链一直是JavaScript的重中之重，一直学的很模糊，今天做一下总结。
> 就当是重新学一遍。

<!--more-->

### 原型和原型链
>javascript常被描述为一种基于原型的语言即每个对象都拥有一个原型对象，
>对象以其原型对象为模板，从原型“继承”方法和属性，一层一层，以此递推。这种关系成为原型链，当我们通过点操作符去调用对象的方法和属性时，如果实例化的对象本身没有该方法或属性，js解释器就会沿着原型链网上查找，直到Object.prototype，如果Object.prototype也没有，就会报错。因为Object.prototype.\_\_proto\_\_ ===null，这便是原型链的顶端。

举个例子：
首先定义一个构造器函数
```bash
function Person(name, age, gender){
  this.name = name;
  this.age = age;
  this.gender = gender;
}

```
然后通过此方法创建实例

```bash
var person = new Person('xyl', 18, '男');
```
然后将这两行代码复制到浏览器的console环境下，输入person按回车可以看到下面的情况

<img src="https://xuyonglinblog.oss-cn-beijing.aliyuncs.com/prototype1.png" width="800">
这张图片里name，age，gender是定义在构造器Person里的，但是isPrototypeOf等方法，确是在\_\_proto\_\_里，我们依然可以调用这些方法，就是因为原型链的存在。
举个栗子：
当我们调用那些原型上的的方法比如valueOf()时，发生了如下过程(z这个方法会返回调用该方法的对象的本身，但不会检索原型，也没有必要)：
+ js解释器首先在person这个对象上查找valueOf()这个方法。如果没有，进行下一步。
+ 解释器检查person的构造函数的原型对象即(Person.prototype)是否有该方法，如果也没有进行下一步。
+ 解释器会在Person.prototype.\_\_proto\_\_也就是Object.prototype上是否有可用的方法，如果有，会被调用，如果没有，报错，前面提到Object.prototype.\_\_proto\_\_ ===null，因此没有再往上查找的必要。


### “继承”
原型是用来做什么用的呢？那当然就是“继承”啊，其实“继承”也有点不准确，“继承”意味着复制，js确是创建一个关联或者说是引用，浏览器就可以通过上面的方法去检索属性和函数了，举个例子：
```bash
//声明两个构造函数
function A(){}
function B(){}
//改变原型链的指向
B.prototype = new A();//原型“继承”
let b = new B();
```
这就是“继承”的方式，通过改变\_\_proto\_\_的指向来实现，为什么说是改变呢，去掉原型“继承”那行代码，在浏览器可以看到 b的\_\_proto\_\_是Object，现在是A。原来通过new B()实例化的对象在调用方法和属性时，浏览器是从对象本身-> B.prototype ->Object.prototype，现在确是 对象本身-> B.prototype ->A.prototype ->Object.prototype。
<br>

另外，值得一提的是，<font color="blue">原型“继承”时，原型上的对象和方法，并没有复制给实例对象，而是给了它一个引用，</font>就是\_\_proto\_\_（大多数浏览器可以看到这个东东，但是官方文档给的是[[prototype]]），这个引用指向的是拥有那些方法和函数的对象，这个对象是作为一个属性存在的，因此，个人觉得，prototype这个对象并没有特殊的，就是一个普通对象。



### prototype和\_\_proto\_\_

原型分两种，隐式原型(\_\_proto\_\_)和显式原型(prototype)。所有的对像都会有隐式原型，但是只有构造函数才会有显式原型。
<br>当然二者存在一定的关系，一个对象的隐式原型是该对象的的构造函数的显式原型，如果该对象本身是一个构造函数，那么它的隐式原型就是Function.prototype,因为构造函数 的构造函数就是Function，另外 Function和Object的构造函数也是Function。
咳咳，这个时候，就要放出珍藏已久的图喽。
![](https://xuyonglinblog.oss-cn-beijing.aliyuncs.com/prototype.jpg)
来两到测试题
```bash
# 测试题1
function A(){}
A.prototype.n=1;
var b= new A();

A.prototype ={
  n:2,
  m:3
}
var c = new A();

console.log(b.n,b.m,c.n,c.m);

```
答案是1 undefined 2 3。
其实现在倒觉得一个对象的__proto__指向它的构造函数的prototype有点不准确，他们俩的关系其实就是
```bash
var a={};

var b = a;


```
如果a改变了，指向一个新对象，然而b指向的依然是原来的内存
### constructor

```bash
   function Foo(){}
   Foo.prototype.constructor === Foo; //true
   let foo = new Foo();
   foo.constructor === Foo; //true
```
一开始，我觉得constructor指向的是该对象的构造函数，看起来foo.constructor===Foo 为真意味着a确实有一个指向Foo的.constructor属性，其实并不是这样的，.constructor引用只是被委托给了Foo和Foo.prototype，而Foo.prototype.constructor默认指向Foo，foo.constructor默认指向Foo。这种默认属性当你创建一个新对象并替换prototype对象时，新对象便不会自动获得.constructor属性。
举个例子：

```bash
function Foo(){}
function Bar(){}
Foo.prototype = new Bar();
let f = new Foo();
f.constructor === Foo; //false
f.constructor === Object; //true

```

将上述代码复制到浏览器环境下，可以看到f.constructor === Foo;返回false。<br>
f并没有constructor属性，所以它会委托原型链的Foo.prototype。但是这个对象也没有这个属性，直到原型链顶端Object.prototype。这个对象有，便指向 Object这个函数。一般会手动修改这个属性的值。
```bash
Object.defineProperty(Foo.prototype, "constructor", {
  enumerable :false,
  writable:true,
  configurable:true,
  value:Foo  //让constructor指向Foo
})

```
