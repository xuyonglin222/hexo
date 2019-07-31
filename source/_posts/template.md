---
title: template
date: 2018-04-18 11:38:08
tags: vue
categories: 学习
---

>之前学习React了解了一下JSX的编译，那么对于Vue中的template，是怎么编译的呢？
<!--more-->

compile编译主要分为parse、optimize与generate三个阶段，最终得到render function。

### parse

parse会用正则表达式将template字符串进行解析，得到指令、class、style啥的，形成一个叫AST的东西。
形如：
```bash
<div :class="c" class="demo" v-if="isShow">
    <span v-for="item in sz">{{item}}</span>
</div>




{
    /* 标签属性的map，记录了标签上属性 */
    'attrsMap': {
        ':class': 'c',
        'class': 'demo',
        'v-if': 'isShow'
    },
    /* 解析得到的:class */
    'classBinding': 'c',
    /* 标签属性v-if */
    'if': 'isShow',
    /* v-if的条件 */
    'ifConditions': [
        'exp': 'isShow'
    ],
    /* 标签属性class */
    'staticClass': 'demo',
    /* 标签的tag */
    'tag': 'div',
    /* 子标签数组 */
    'children': [
        {
            'attrsMap': {
                'v-for': "item in sz"
            },
            /* for循环的参数 */
            'alias': "item",
            /* for循环的对象 */
            'for': 'sz',
            /* for循环是否已经被处理的标记位 */
            'forProcessed': true,
            'tag': 'span',
            'children': [
                {
                    /* 表达式，_s是一个转字符串的函数 */
                    'expression': '_s(item)',
                    'text': '{{item}}'
                }
            ]
        }
    ]
}
```
### optimize
optimize主要作用是优化，虚拟Dom在在比对时，对于一些修饰性节点和没有发生改变的节点，是没有必要比对的，这个阶段就是
来标记静态节点的。
经过 optimize 这层的处理，每个节点会加上 static 属性，用来标记是否是静态的。


### generate

generate 会将 AST 转化成 render funtion 字符串，最终得到 render 的字符串以及 staticRenderFns 字符串。

### VNode

render function 会被转化成 VNode 节点，它是用对象属性来描述节点的一种方式，实际上它只是一层对真实 DOM 的抽象。
浏览器引擎可分为两部分，渲染引擎和js解释器，当我们获取Dom元素、操纵Dom时是在解释器这边，然后更新时，就跑到了渲染引擎那边，

这样跨线程是很浪费成本的，尤其是一行一行的执行时，一般开发时，会先创建documentFragment，然后把元素装进去，最后放到文档里，

Vue在渲染前将新产生的 VNode 节点与老 VNode 进行一个 patch 的过程，比对得出「差异」，最终将这些「差异」更新到视图上。

Vue基于Object.defineProperty方法构建了一个响应式系统，可以实现貌似立即渲染的功能，但是频繁渲染不也很浪费性能吗？还是说他有像React
那样有利用setState合并状态的过程。

### nextTick

其实当页面在触发更新的时候会有一个依赖收集的过程，通过Dep订阅者和Watcher监听者来实现的，之前有写过简陋的代码。

```bash
//订阅者
class Dep{
    constructor(){
        //用来存放watcher对象的数组
        this.subs = [];
    }

    //在subs中添加一个watcher对象
    addSub(sub){
        this.subs.push(sub);
    }
    //通知watcher对象更新视图
    notify(){
        this.subs.forEach((sub)=>{
            sub.update();
        })
    }
}
//观察者

class watcher{
    constructor(){
        //在new一个watcher对象时将该对象赋值给Dep.target,在get时会用到。
        Dep.target  =this;
        console.log(this)
    }
    //更新视图的方法
    update(){
        console.log('view change')
    }
}

```
好吧！  把Vue和之前提到的双向绑定的也贴上吧

```bash

function cb() {
//    简陋的视图更新函数
    console.log('视图更新了')
}

function defineReactive(obj, key, val) {
    const dep = new Dep();
    Object.defineProperty(obj,key,{
        enumerable:true,   //属性可枚举
        configurable:true, //属性可被删除或修改
        get:function reactiveGetter(){

            dep.addSub(Dep.target);
            return val;
        },
        set:function reactiveSetter(newVal){
            if(newVal===val) return;
            //通知watcher对象更新视图
            val = newVal
            dep.notify();
        }
    })
}

function observer(value){
    if(!value||(typeof value !== 'object')){
        return;
    }

    Object.keys(value).forEach((key)=>{
        defineReactive(value,key,value[key]);
    })
}

class Vue {
    constructor(options){
        this._data = options.data;
        observer(this._data);
        //new一个观察者对象，这时候Dep.target会指向这个watcher
        new watcher();
        //模拟render过程，为了触发test属性的get函数
        console.log('render',this._data.test);
    }
}

```

依赖收集其实接受的就是Watcher的实例化对象，它的主要作用是在数据被触发setter后，通过update方法来更新试图，但是这个Watcher对象其实会
被push到一个队列里，在下一次tick时，把队列里的全部拿出来执行，这让我想到了node的执行机制。Vue貌似是通过Promise，seTimeout等方法在微任务队列
（microtask queue）里创建一个事件，当主线程（调用栈）清空时，在一定条件下执行这个事件。这之间当然有一个状态合并的 过程，因为把所有的事件都执行也不是很好，。在Vue被实例化时，watcher被记录下来，然后通过内部变量id标记Watcher，推入队列的时候，相同的会被剔除。
