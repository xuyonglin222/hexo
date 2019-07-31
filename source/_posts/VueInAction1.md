---
title: Vue学习笔记之啦啦啦
date: 2018-01-05 23:54:06
tags: vue
categories: 学习
---



>之前在慕课网上学过Vue，花了100多买了实站视频，照着敲了一遍，后来又学习node就把Vue
>搁置了一段时间，后来静下心来决定平平稳稳地学，就买了本Vue.js实战，决定照着书把代码
>再敲一遍，特此记录。

  <strong>本文借鉴了梁灏先生的《Vue.js实战》的内容，特此声名。</strong><br>

<!--more-->




## 生命周期

每个Vue实例创建时，都会经历一系列的初始化过程，同时也会调用相应的生命周期钩子，我们可以利用这些钩子，在合适的时机执行我们的业务逻辑。<br>
Vue的生命周期钩子与jQuery的ready()方法类似，比较常用的有:
  > + created实例创建完成后调用，此阶段完成了数据的观测,但尚未挂载，$el还不可用，需要初始化处理一些数据时会比较有用。
  > + mounted el挂载到实例上之后调用，一般用于开始我们的第一个业务。
  > + beforeDestory 实例销毁之前调用，主要解绑一些使用addEventListener坚挺的事件等。

<em>PS:Vue中输出位置只支持单个表达式，比如三元表达式，不支持语句和流控制。表达式中，不能使用用户自定义的全局变量，只能使用Vue白名单内的全局变量，例如Math和Date。<em>

## 计算属性
计算属性可以完成各种复杂的计算，只要最终return返回值就可以，计算属性还可以依赖于多个Vue实例的数据，<strong>只要其中任一数据发生变化，计算属性就会重新执行，视图也会更新</strong>这正是Vue的双向绑定效果，业务逻辑与View层完全解耦，啧啧。

## 一些新学到的指令
+ v-cloak


>该指令不需要表达式，他会在Vue实力结束编译时从绑定的HTML元素上移除，经常和CSS的display：none配合使用。


```bash
<div id="app" v-cloak>
  {{message}}
</div>
<script>
  var app = new Vue({
  el:'#app',
  data:{
  message:'这是一段文本'
}
})
</script>
```

当网速较慢时，Vue.js还没加载完，页面上会出现{{message}}的字样，知道Vue创建实例,编译模板时，DOM才会被替换，所以屏幕会闪动，这时加一句CSS就OK。

```bash
[v-cloak]{
  display:none;
}
```

就是说在浏览器加载完DOM，镶嵌CSS之后加载js之前，让他消失，当Vue实例编译过后，v-cloak会移除，这时display:none便不起作用了。

+ v-once

>该指令也不需要表达式，作用是定义它的元素或组件，至渲染一次，后面数据改变时，也不会重新渲染。一般在优化性能时，才用得到。

+ v-if,v-else-if,v-else


>关于这几个指令，这一次学到的是该指令会根据表达式的值在DOM中渲染或销毁元素或组件，销毁指的是从DOM树中移除，另外还有<strong>元素复用</strong>的问题。

```bash
<div id="app">
    <template v-if="type === 'name'">
        <label>用户名</label>
        <input  placeholder="输入用户名" key="name-input">
    </template>
    <template v-else>
        <label>邮箱：</label>
        <input  placeholder="输入邮箱" key="mail-input">
    </template>
    <button @click="handleToggleClick">输入切换类型</button>
    <p v-show="status===1">当status为1时显示</p>
</div>
<script>
    var app = new Vue({
        el:"#app",
        data:{
            type:'name',
            status:2
        },
        methods:{
            handleToggleClick:function(){
                this.type = this.type ==='name'?'mail':'name';
            }
        }
    })
</script>
```

点击切换按钮，虽然DOM元素改变了，但是之前在输入
框输入的内容没变，只是替换了placeholder的内容，说明input被复用了。如图所示：

![](https://xuyonglinblog.oss-cn-beijing.aliyuncs.com/VueInAcion1.png)
![](https://xuyonglinblog.oss-cn-beijing.aliyuncs.com/VueInAction2.png)

如果不希望如此  可以给不想被复用的元素，加个key，key的值必须是惟一的。代码用法如下：

```bash
<div id="app">
    <template v-if="type === 'name'">
        <label>用户名</label>
        <input  placeholder="输入用户名" key="name-input">
    </template>
    <template v-else>
        <label>邮箱：</label>
        <input  placeholder="输入邮箱" key="mail-input">
    </template>
    <button @click="handleToggleClick">输入切换类型</button>
    <p v-show="status===1">当status为1时显示</p>
</div>
```

+ v-show

>v-show是通过改变元素的display为none，来隐藏元素的。
 <strong>
v-if和v-show都有类似的功能，不过v-if是真正的条件渲染，他会根据表达式适当的销毁或重建元素及绑定的事件或子组件。若表达式的初始值为false，则一开始元素/组件并不会被渲染，只有当条件第一次为真时，才开始编译。而v-show，无论条件真与否，都会被渲染。<em>相比之下，v
-if更适合不经常改变的场景，因为浏览器会引发回流，开销较大，而v-show适用于频繁切换条件。</em>
 </strong>

+ v-for


> 关于这条指令，新学到的是of可以替换in，另外在遍历对象是参数是(value,key,index) in data。另外，v-for也支持双向绑定，如果data反生变化，视图会立刻改变。<br>


PS：这篇文章昨天晚上没写完，今天才弄完，唉，我得赶紧去拿我的小台灯了，下午去看小可爱，哈哈哈。
