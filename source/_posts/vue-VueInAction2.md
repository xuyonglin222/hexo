---
title: VueComponent（一）
date: 2018-01-12 10:50:15
tags: vue
categories: 学习
---

>组件 (Component) 是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重
>用的代码。在较高层面上，组件是自定义元素，Vue.js 的编译器为它添加特殊功能。在有
>些情况下，组件也可以表现为用 is 特性进行了扩展的原生 HTML 元素。

<!--more-->
### 组件注册的方式

#### 全局注册

用法如下：
```Bash
// 要注册一个全局组件，你可以使用 Vue.component(tagName, options)
// var MyComponent = Vue.extend({
// 　template : '<p>我是全局注册组件</p>',
//     data () {
//          return {
//               message: 'hello world'
//             }
// })
// vue.componnet('my-component', MyComponnet)

Vue.component('my-component', {
  template: '<div>A custom component!</div>'
})

new Vue({
  el: '#app'
})
```

&emsp;&emsp;全局注册后，任何Vue实例都可以使用。
#### 局部注册

```Bash
var Child = {
  template: '<div>A custom component!</div>'
}
new Vue({
  el: '#app',
  componnets: {
    child: 'child'
  }
})
```

&emsp;&emsp;使用components注册，注册后的组件只有在该实例作用域下有效。组件中也可以使用components选项来注册组件。使组件可以嵌套。

### 要求

#### 关于模板
template的DOM结构必须被一个元素包含。下面的情况是不允许的。
```bash
template: `<div>这是一个局部的自定义组件，只能在当前Vue实例中使用</div>
            <button>hello</button>`,
```
#### 组件中的data

可以看出，注册组件时传入的配置和创建Vue实例时差不多，但也有不同，其中一个就是<strong>data</strong>属性必须是一个函数。然后将数据return出去。<br>
JS对象是引用类型，所以如果return出的对象引用了外部的一个对象，那这个对象就是共享的，任何一方都可以修改它。代码如下：<br>
```bash
<div id="app">
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
</div>
<script>
var data = { counter: 0 };
Vue.component('simple-counter', {
  template: '<button v-on:click="counter += 1">{{ counter }}</button>',
  data: function () {
    return data;
  }
});
new Vue({
  el: '#app'
});
</script>
```


由于这三个组件实例共享了同一个 data 对象，因此递增一个counter 会影响所有组件！这就错了。我们可以通过为每个组件返回全新的数据对象来修复这个问题：

```bash
data: function () {
  return {
    counter: 0
  }
}
```

#### html限制

Vue组件的模板在某些情况下，会受到HTML的限制，比如在table内规定只允许td,th等这些表格元素，所以直接在table里直接使用组件是无效的。这种情况下， 特殊的属性来挂载组件，

```bash
<div id="app">
  <table>
      <tbody is = "my-component"></tbody>
  </table>

</div>
```
```bash
Vue.component('simple-counter', {
  template: '<div>这里是组件的内容</div>'
})

new Vue({
  el: '#app'
})

```
t-body在渲染时，会被替代成组件的内容。常见的限制元素还有ul,ol,select。<br>
应当注意，如果您使用来自以下来源之一的字符串模板，这些限制将不适用：

  + JavaScript 内联模版字符串
  + .vue 组件
  + x-template


其中，前两个模板都不是Vue官方推荐的，所以一般情况下，只有单文件组件.vue可以忽略这种情况。

### Props

在组件中，使用选项props来声明需要从父级接收的数据，props的值可以是以下两种：
 + 字符串数组
 + 对象

代码如下：
```bash
Vue.component('mycomponent',{
    template: '<div>这是一个自定义组件,父组件传给我的内容是：{{myMessage}}</div>',
    props: ['myMessage'],
    data () {
      return {
        message: 'hello world'
      }
    }
  })
```
然后调用该组件

```bash
<div id="app">
    <mycomponent my-message="hello"></mycomponent>
</div>
```
由于HTML特性是不区分大小写的，所以传递属性值时，myMessage应该转换成 kebab-case (短横线隔开式)my-message="hello"。
<br>
有时候，传递的数据并不是直接写死的，而是来自父级的动态数据，这是可以使用指令v-bind来动态绑定props的值，当父组件的数据变化时，也会传递给子组件。代码如下：
```bash
<div id="app">
  <input type="text" v-moddel="parentMessage">
  <my-component :message="parentMessage"></my-componnet>
</div>
<script>
Vue.component('my-componentr', {
  template: '<div>{{message}}</div>',
  props:['message']
});
new Vue({
  el: '#app',
  data:{
    parentMessage:''
  }
});
</script>
```
这里的v-model绑定了父级数据parentMessage，当输入框任意输入是，子组件接受的数据会实时响应。
<br>
要注意的是：如果要直接传递数字，布尔值，数组，对象，而且不用v-bind，传递的仅仅是字符串。
