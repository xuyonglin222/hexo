---
title: selfPromise
date: 2018-12-31 00:34:38
tags: 学习

---

> 把之前手写过的promise在梳理一遍

<!--more-->

###  代码

```bash 
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;

function myPromise(fn) {
    var state = PENDING;
    var value = null;
    var handlers = [];
    var e =null;

    function resolve(val) {
        if (val instanceof myPromise) {
            try{
                val.then(resolve);
            }catch(e){
                reject(e)
            }
            return;
        }
        state = FULFILLED;
        value = val;
        setTimeout(function () {
            handlers.map(function (handler) {
                handle(handler)
            })
        }, 0)
    }

    function reject(err) {
        state = REJECTED;
        e = err
    }

    function handle(handler) {
        if (state === PENDING) {
            handlers.push(handler);
            return;
        }
        try{
            if (state === FULFILLED && typeof handler.onFulfilled === 'function') {
                let ret = handler.onFulfilled(value);
                handler.resolve(ret);
            }
        }catch(e){
            reject(e)
        }
    }

	//onFulfilled, onRejected是可选参数，如果不是函数可以忽略
    this.then = function (onFulfilled, onRejected) {
        return new myPromise(function (resolve, reject) {
            handle({
                onFulfilled,
                resolve,
            })
        })
    }

    fn(resolve, reject);
}

```

PS：状态切换就不说了，很显然。

then函数将回调注册到promise内部的队列里，在resolve里遍历调用，要注意的是，resolve执行时，得是异步，要在then注册完之后调用。

```bash  
new myPromise(function(resolve){
    GET(url, function(data1){
        resolve(data1)
    })
}).then(function(data1){
	const toChainPoromise = new myPromise(function(resolve){
    	POST(url, function(data2){
             resolve(data1+data2)
    	})
    });
    return toChainPoromise;
}).then(function(data){
    console.log(data)
})
```

为了链式调用，then函数的返回值一定是个promise，但是在第二个then里回调函数接受的数据data应该依赖于toChainPoromise，而不是then函数本身返回的promise，所以then函数既要把toChainPoromise和后面的then衔接起来。



