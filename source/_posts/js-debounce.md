---
title: debounce
date: 2018-03-25 12:59:53
tags: javascript
categories: 学习
---

>逛掘金的时候，偶尔看到防抖和节流的文章，之前也用过，现在做一下总结。


<!--more-->

### 防抖

在开发过程中，经常会考虑这种情况，用户网不好（对，所有的用户网都不好），登陆时，用户像抽风一样狂点提交按钮。
在远古时代，逻辑处理都是放在后台，这种情况下，需要在前端设置一个隐藏的input，当用户提交登陆信息时，会把这个隐藏的input的值传到后台，作为token，而这个token会在页面刷新的时候更改，后台的同学，拿到这个token保存一下，当用户发送 请求带有一样的token时，后台就丢掉这个请求，但是这样无疑也是增加了成本。所以我们有必要在前端去拦截这个请求，当用户不再点击的 n ms后再去向后台发送请求。这就是防抖，是闭包的一个运用。


```bash
//最简单的防抖函数

function  debounce(fun , delay){
  var timer = null;

  return function(){

    if(!timer) clearTimeout(timer);
    timer = setTimeout(fun,delay);
  }
}

function handleClick(){
  //一个http请求的骚操作
}
//比如当我们点击登陆按钮时，
btn.addEventListener('click',debounce(handleClick,500));

```
上述代码实现的效果就是当用户多次点击提交时，handleClick并不会执行，因为delay ms后事件还没来的及添入事件队列，就被clear了。


### 节流

对于mousemove，scroll，我们想要的效果大概是均匀地触发某些操作，这个时候使用debounce就有点鸡肋了，可以想象一下，用debounce去触发拖拽效果，会是什么样的场景，当你拖动目标元素时，目标不会移动，当你停下鼠标时，它才会移动。<br>

这时，throttle会更适合一点，它的实现效果是短时间内触发多次，只会在固定的时间间隔内执行回调。<br>
来一个简单的节流函数。
```bash
function throttle(fun,timeCell){

  var last =new Date().getTime();

  return function(){
     var now =new Date().getTime();
    if(last - now >= timeCell){
      fun();
      last = now;
    }
  }
}

```

以上就是最简单的防抖和节流，如果要考虑函数调用的执行上下文，可以手动设置this，并显示绑定函数。
