---
title: Array
date: 2018-01-13 14:30:15
tags: javascript
categories: 学习
---

>javascript数组和Function一样，继承自Object，是引用类型，<em>不是</em>javascript基本类型。关于数组有很多要注意的地方。

<!--more-->

### Array.length
length是数组的属性，指的是数组的长度，但是有一些要注意的地方。<br>
它会把空元素计算进去，但是通过索引不会找到该元素》代码如下：
```bash
var a=[1,,3];
console.log(a[0]);//1

console.log(a[2]);//3

console.log(a.length);//长度为3

```
如果把映射填充到数组里，length不会计算他的长度。但是通过索引key可以找的到。
代码如下：
```bash
var a=[1,2,3];
a[-1]='c';

console.log(a.length);//3
console.log(a[-1]);//c
console.log(a);//[1, 2, 3, -1: "c"]

```
<strong>故length有时并不能体现一个数组的真实长度</strong>
另外清空数组时，经常用的两种方法arr.length=0与arr=[]是有区别的。
```bash

var a1=[1,2,3];
var a2=a1;
a1.length=0;//清空数组，是对对象本身的操作
console.log(a2) //[]

var a3=[4,5,6];
var a4=a3;//a3  a4  是两个引用，指向的是同一个对象，同一个地址，
a3=[];  //清空数组，不会影响a4，是对引用的操作，是重新赋值
console.log(a4)//[4,5,6]

```
### Array.method

#### push
该方法会将参数填充到数组的最后面，参数可以是一个，也可以是多个，返回值是数组的长度。
```bash
var a=[1,2,3];
a.push(4); //a [1,2,3,4]

a.push(5,6);//a [1,2,3,4,5,6]

var b= a.push(7) ;
console.log(b); //b=7
```

#### pop
与push方法相反的是pop方法，该方法会将数组最后一位删除，数组长度减一，返回的是被删除的元素
```bash
var a=[1,2,3];
a.pop(); //a [1,2]

```
#### shift
该方法是用来删除数组的第一个元素，返回的是被删除的元素，原数组会发生改变。
与push方法常用来解决约瑟夫环的问题。代码如下：
```Bash
var a=[1,2,3,4,5,6,7,8];
function circle(arr,flag){
  var count = 0;
  while(arr.length>1){
      var e =arr.shift();
    if(++count == flag){
      count=0;
      continue;
    }
    arr.push(e);
  }
  console.log(arr);
}
circle(a,3);
//[ 7 ]

```
#### unshift
与shift相反的是unshift，往数组头部添加一个元素。


#### delete
与pop相似的方法有delete，delete像一个操作符，该方法不会影响数组长度，删除后的元素变为空,原来的位置会被后面的顶替。
```bash
var a=[1,2,3];
delete a[0];
console.log(a);//[2, 3]
console.log(a.length); //3
```
#### forEach
该方法会对数组进行遍历，参数是一个回调函数，函数的第一个参数是value，第二个参数是索引。
<em>该方法不会遍历空的元素，也不会遍历映射，似乎没有什么办法让函数停止遍历。若有需求，推荐使用every方法。</em>
```bash
var a=[1,,3];

a[-1]='c';

a.forEach(function(item,index){
  console.log(index,item);
  //输出为
  //0 1
  //2 3
})
```
#### every
语法：array.every(function(currentValue,index,arr), thisValue)
在every的回调里可以通过return  false;来终止遍历。而return true;可以终止本次遍历，这个函数在写业务代码时，用到的几率挺大的。
换个浅显的解释：
```bash
var a=[{name:'Jack',age:15},{name:'Tom',age:13}];
a.every(function(value,index){
  此时value和index是一一对应的
  当index==0时，value代表{name:'Jack',age:15}
  当index==1时，value代表{name:'Tom',age:13}
});

```
<br> 另外如果对于所有的元素，该函数均返回 true， 则该方法返回 true。
```bash
function isEven(num){
  return num%2===0;
}
var nums = [2,4,6,8];
var even = nums.every(isEven);
if(even){
  console.log('所有元素均为偶数');
}else{
  ocnsole.log('并不是所有的数字皆为偶数');
}
```


#### map
该方法也会对数组进行遍历，遍历时会跳过空元素，参数是一个回调函数，回调函数的参数是数组的单个元素,map返回的是一个新的数组，新数组的元素是原始数组的元素应用该回调函数的结果。
```Bash
var m=['a',,'c'];
var n=m.map(function(e){
    return e = e+'z';
  })
  console.log(n);
//[ 'az', <1 empty item>, 'cz' ]

```
<em>ps:关于数组遍历函数的比较有张图描述的特别好<em>
​
![](http://xuyonglinblog.oss-cn-beijing.aliyuncs.com/array.png)

#### sort
该方法会对数组进行排序，要注意的是，它并不是按大小从大往小排序的，<font color='blue'>而是按首字符（多为数字按第一位）<font>。代码如下：
```Bash
//数字
var a=[1,3,4,7,2,5,13,30];

a.sort();

console.log(a);//[ 1, 13, 2, 3, 30, 4, 5, 7 ]

```
示例只是以数字为例，如果数组里是字符串，则按首字符排序，如果含有数字和字符，则先排数字，再排字符。

#### reverse
该方法会反转数组，会改变原数组，返回的是反转后的数组。
```Bash
var a=[1,3,4,7,2,5,13,30];

console.log(a.reverse());//[ 30, 13, 5, 2, 7, 4, 3, 1 ]

console.log(a);//[ 30, 13, 5, 2, 7, 4, 3, 1 ]
```

#### splice
该方法对现有数组进行截取，返回新生出的数组，且原数组发生改变，就是生成的数组。<br>
参数一：截取的起始索引。<br>
参数二：截取的长度。<br>
参数三：删除截取后要添加进去数组的元素（可以是个数组）。
```bash

var nums = [1,2,3,7,8,9];
var newElements = [4,5,6];
nums.splice(3,0,newElements);//也可以nums.splice(3,0,4,5,6)
console.log(nums); // 1,2,3,4,5,6,7,8,9
```
#### find
该方法返回通过函数内判断的数组的第一个元素的值。
```bash
var ages = [3, 10, 18, 20];
function checkAdult(age) {
    return age >= 18;
}
function myFunction() {
    document.getElementById("demo").innerHTML = ages.find(checkAdult);
}
```
### 类数组
除了数组以外，我们还会经常碰到一些类数组(array-like),比如arguments,通过document.getElementsBy...方法得到的HTMLCollection以及通过querySelector方法得到的NodeList，包括jquery对象，其实都是类数组。<br>
类数组不是数组，最明显的区别就是，不能使用pop，push等方法，nodelist能使用forEach是因为nodelist的原型上有这个方法，但是HTMLCollection没有。
