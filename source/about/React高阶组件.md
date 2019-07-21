---
title: React高阶组件
date: 2019-01-14 19:24:50
tags: react
---

> 早在一开始学习react的时候，就知其大名，最近实习用ant design的form自定义组件时，对ant design的高阶组件产生了兴趣，想着看看他的源码，然后做一些总结。

### 啥是高阶组件

高阶组件其实就是一个函数，这个函数将一个组件作为输入，然后输出一个组件，这样我们就可以在函数内部做一些公共的逻辑封装，稍微复杂一点的一般会写成二阶函数的形式，形如react-redux的connect函数，ant design的getFieldDecorator（后面稍微讲一下）。
----
loading