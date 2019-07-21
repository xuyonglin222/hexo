---
title: 从源码看vue的lifecycle
date: 2018-04-29 13:47:53
tags: vue
categories: 学习
---


>又到了写文章的deadline，其实已经拖了有段时间了，聊聊Vue的生命周期。

<!--more-->

话不多说，先来张图。
![](https://xuyonglinblog.oss-cn-beijing.aliyuncs.com/lifecycle.png)
熟悉吧！ 没错，这张图来自官网。我记得一开始学习Vue的时候，看到这张图，就晕，啥意思啊，不懂。
知道最近，再看Vue的源码的时候（看了有一段时间了，分模块进行的），产生了强烈的共鸣。

### 阅读技巧

这是题外话，关于阅读源码，也算有点经验了，记得之前看Jquery的源码时，我擦嘞9000+行（得嘞，我还是歇着吧），买了本书，《Jquery技术内幕》，看了目录才知道，其实框架都是按模块开发的，而jquery先从架构开始
```bash
(function(window, undefined) {
    var  jQuery = function(selector, context) {

        return new jQuery.fn.init(selector, context, rootjQuery);
    }


    jQuery.fn = jQuery.prototype = {

        init: function(selector, context, rootjQuery) {
            // ...
        }
    }

    jQuery.fn.init.prototype = jQuery.fn;

})(window);

```

然后结合书籍，或者直接看源码（头晕），可以借助Webstorm编辑器的ctrl+鼠标左键，进行函数跳转，一定要先把某些函数缩进起来，便于阅读，个人认为，可以先适当了解它的私有函数，比如pushStack，makeArray，merage等方法，因为jquery暴露出的api，其实用到了很多这样的方法。

而Vue和react这类框架，建议去阅读它的真正源码而不是压缩后的，可以再node_modules里找到，Vue的结构是这样的。
![](https://xuyonglinblog.oss-cn-beijing.aliyuncs.com/VueYM.png)
而入口文件是 core/index.js

### 正文开始

core/index.js源码如下

```bash
//Vue的核心方法
import Vue from './instance/index'
//初始化全局API
import { initGlobalAPI } from './global-api/index'
//获取布尔值变量判断是不是SSR
import { isServerRendering } from 'core/util/env'
// 初始化全局变量
initGlobalAPI(Vue)
// 为Vue原型定义属性$isServer
Object.defineProperty(Vue.prototype, '$isServer', {
    get: isServerRendering
})
// 为Vue原型定义属性$ssrContext
Object.defineProperty(Vue.prototype, '$ssrContext', {
    get () {
        /* istanbul ignore next */
        return this.$vnode && this.$vnode.ssrContext
    }
})

Vue.version = '__VERSION__'

export default Vue

```

emmmm，感觉被欺骗了，好像啥都没有的样子。于是Ctrl+鼠标左键点击  './instance/index',(凭直觉，这里应该有东西)
<br>
./instance/index
```bash

import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

//为Vue的原型扩展_init方法
initMixin(Vue)

//初始化$data $props $set $delete等
stateMixin(Vue)

//初始化$on $once $off $emit等函数
eventsMixin(Vue)

//初始化_update $forceUpdate $destroy函数
lifecycleMixin(Vue)

//初始化 $nextTick _render函数
renderMixin(Vue)

export default Vue

```
当Vue被实例化时好像只执行了_init方法，并为Vue的原型扩展了一些方法，OK进_init去看看

点击去之后发现他是在instance的目录下，而函数_init是在 initMixin里

```bash
export function initMixin (Vue: Class<Component>) {
  Vue.prototype._init = function (options?: Object) {
```

initMixin就是再前文提到的./instance/index里被调用的。
其实接下来才开始和那张图有关系。

```bash
Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    // a uid
    vm._uid = uid++

    let startTag, endTag
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }

        // 如果是Vue的实例，则不需要被observe
    vm._isVue = true
        // 第一步： options参数的处理
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
        // 第二步： renderProxy
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm
        // 第三步： vm的生命周期相关变量初始化
    initLifecycle(vm)
        // 第四步： vm的事件监听（v-on）初始化
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
        // 第五步： vm的状态初始化，prop/data/computed/method/watch都在这里完成初始化，因此也是Vue实例create的关键。
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`vue ${vm._name} init`, startTag, endTag)
    }
        // 第六步：render & mount
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
```

代码中做了注释，
+ 第一步对option的merge处理是为了把业务逻辑以及组件的一些特性全都放到了vm.$options中，再里面复杂的逻辑先不看（容易头晕）。
+ 第二步renderProxy，这是为后期render做准备的，作用是在render中将this指向vm._renderProxy。
+ 第三步： vm的生命周期相关变量初始化，主要是建立组建的父子关系还有初始化组件的相关属性。这个时候已经可以开始看那张图了。
+ 第四步  vm的事件监听（v-on）初始化以及将$attrs,$listeners进行响应式处理，然后调用出发beforeCreated钩子里的函数
+ 第五步 将prop/data/computed/method/watch都在这里完成初始化以及响应式处理。

因此，至少在created时才能拿到data等里面的值。<br>

当数据都响应化，触发created之后，判断vm.$options.el是否存在，然后选择编译方式。

编译方式有两种：
+ 编译器:借助脚手架，将template的内容，通过parse，optimize，generate，编译成AST进而编译成render function字符串。

然而，完整的编译还有一下过程：render function字符串通过调用render方法来一步步解析成VNode，最后通过patch函数转换成真实的DOM节点。
+ 运行时：去掉编译器的过程：render函数 → vnode → 真实dom节点。
（打把王者，回头再写，有点头疼）
loading......................................................................................
王者打完了，接着写

## beforeMount
解释一下图中在created和beforeMount之间的部分。
第一个分支：
如果我们在开发过程中，没有指定el挂载点，那么生命周期会暂时停止，只执行到created阶段，当然可以手动执行vm.$mount(el)，使暂停的生命周期进行下去。
<br>

第二个分支：
1.如果Vue实例对象中有template参数选项，则将其作为模板编译成render函数
2.如果没有template参数选项，则将外部的HTML作为模板编译（template），也就是说，template参数选项的优先级要比外部的HTML高
3.如果1,2条件都不具备，则报错

接着就调用beforeMount生命周期钩子
<br>
core/instance/lifecycle.js
```bash
export function mountComponent (
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  vm.$el = el
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        )
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        )
      }
    }
  }
  callHook(vm, 'beforeMount')

  let updateComponent
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = () => {
      const name = vm._name
      const id = vm._uid
      const startTag = `vue-perf-start:${id}`
      const endTag = `vue-perf-end:${id}`

      mark(startTag)
      const vnode = vm._render()
      mark(endTag)
      measure(`vue ${name} render`, startTag, endTag)

      mark(startTag)
      vm._update(vnode, hydrating)
      mark(endTag)
      measure(`vue ${name} patch`, startTag, endTag)
    }
  } else {
    updateComponent = () => {
      vm._update(vm._render(), hydrating)
    }
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */)
  hydrating = false

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true
    callHook(vm, 'mounted')
  }
  return vm
}

```
