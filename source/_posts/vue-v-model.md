---
title: Vue学习笔记之v-model指令
date: 2018-01-08 12:05:36
tags: vue
categories: 学习
---


&emsp;&emsp;在Vue.js中，经常使用v-model实现表单的双向绑定，，最近阅读的vue.js实战里有一章节专门讲的v-model。

<!--more-->

### 表单控件绑定
----------------

#### 基础语法

+ v-model指令在表单元素控件上创建双向数据绑定。他会根据控件类型
自动选取正确的方法来更新元素。
+ v-model并不关心表单控件初始化所生成的值。因为他会选择Vue实例数据来作为具体的值。

##### 简单示例

```bash
<!--单行-->
<!--直接绑定变量,这个变量需要在vue实例里面的-->
<div id="aa">
    <input v-model="message" placeholder="edit me">
    <p>Message is: {{ message }}</p>
</div>
```

```Bash
<script src="js/vue.js"></script> //引用vue
<script>
    new Vue({
        el: '#aa', //挂载vue实例
        data: {
            message: '' //需要有一个做双向绑定的变量
        }
    })
</script>
```

##### textarea

```bash
<!--多行textarea,其实类似单行-->
<span>Multiline message is:</span>
<p style="white-space: pre">{{ message }}</p>
<br>
<textarea v-model="message" placeholder="add multiple lines"></textarea>
```
##### radio

```bash
<!--单选,类似单行,不过需要注意的是他们使用同一个v-model-->
<input type="radio" id="one" value="One" v-model="picked">
<label for="one">One</label>
<br>
<input type="radio" id="two" value="Two" v-model="picked">
<label for="two">Two</label>
<br>
<span>Picked: {{ picked }}</span>
```
```bash
<script>
    new Vue({
        el: '#app',
        data: {
            picked:'One'
        }
    })
</script>
```
&emsp;&emsp;如果是像上面这种组合模式实现单选状态，就需要v-model配合value来实现互斥效果。数据picked的值与单选按钮的值一致时，就选中该项，所以当前选中的是One。通过点击radio会改变picked的值，同时通过动态的改变picked的值，视图也会重新渲染。
#### checkbox
&emsp;&emsp;复选框也分单独和组合模式，单独情况比较简单，就是用v-model绑定一个布尔值，就不说了。
组合使用时，也是v-model和value一起，多个勾选框都绑定到同一个数组类型的数据，value的值再输组当中，就会选中这一项。这个过程也是双向的，在勾选时，value也会push到数组里，代码如下：
```bash
<div id="app">
    <input type="text" v-model="text">
    {{text}}
    <input type="radio" :checked="picked"><br>
    <input type="checkbox" v-model="checked" value="html" id="checked">
    <label for="html">HTML</label>
    <br>
    <input type="checkbox" v-model="checked" value="js" id="js">
    <label for="js">JS</label>
    <br>
    <input type="checkbox" v-model="checked" value="css" id="css">
    <label for="css">CSS</label>
    <br>
    <p>选择的是{{checked}}</p>
</div>
```
```Bash
<script>
    var app = new Vue({
        el:"#app",
        data:{
            text:'',
            picked:true,
            checked:['html','css']
        }
    })
</script>
```
##### select

```bash
<!--选择列表,类似单行-->
<select v-model="selected">
  <option>A</option>
  <option value='b'>B</option>
  <option>C</option>
</select>
<span>Selected: {{ selected }}</span>
```
```bash
<script>
    var app = new Vue({
        el:"#app",
        data:{
            selected:'A'
        }
    })
</script>
```
&emsp;&emsp;<option>是备选项，如果含有value属性，v-model就回优先匹配value的值；如果没有，就会直接匹配option的text，比如选中的是第二项，selected的值是b，而不是B。
<em>&emsp;&emsp;PS:给selected添加属性multiple就可以多选了，此时selected绑定的是一个数组。</em>

### v-model的背后
-----------------

&emsp;&emsp;使用v-model指令，常与表单组件联系起来，而它本身其实是一个语法糖，背后做了两个操作：
   1. v-bind绑定一个value值
   2. v-on指令绑定一个input事件或者说是change事件
&emsp;&emsp;举个栗子：
#### 在原生表单中
```Bash
<input v-model='message'>
```

相当于

```bash
<input v-bind:value='message' @input='message = $event.target.value'>
```
 &emsp;&emsp;当input接收到新的输入就会触发input事件，将事件目标value值赋值给新的元素

#### 在自定义组件中

```Bash
<my-component v-model='message' ></my-component>
```
相当于
```Bash
<my-component :value='message' @input='message = arguments[0]' ></my-component>
```
&emsp;&emsp;在自定义组件中，message接受的值就是input事件接受的第一个参数(此时的input时间需要去自定义)，在自定义组件中，还需要用$emit事件去定义一个事件，并触发。
```Bash
this.$emit('input',value);
```

### 修饰符
---------

与事件的修饰符类似，v-model也是有修饰符的，用于控制数据同步的时机。

#### .lazy

&emsp;&emsp;在输入框中，v-model默认是在input事件同步输入框的数据，使用修饰符.lazy会转变为在change事件中同步。

```bash
<div id="app">
    <input type='text' v-model.lazy='message' >
    <p>{{message}}</p>
</div>
```
```bash
<script>
    var app = new Vue({
        el:"#app",
        data:{
            selected:'A'
        }
    })
</script>
```
这时，message并不是实时更新的，而是在在失焦或按回车时才更新。

#### .number
&emsp;&emsp; 使用.number可以将输入类型转化为Number类型，否则虽然输入的时数字，但它的类型是String，在数字输入框下会比较有用，代码如下：

```bash
<div id="app" >
    <input type="number" v-model.number='message' value="">
    <p>{{typeof message}}</p>

</div>
<script src="vue.js"></script>
<script>
    var app = new Vue({
        el:'#app',
        data:{
            message:0
        }
    })
</script>
```

#### .trim
修饰符.trim会自动过滤输入的首尾空格，代码如下：

```bash
<div id="app" >
    <input type="text" v-model.trim='message' value="">
    <p>{{message}}</p>

</div>
<script src="vue.js"></script>
<script>
    var app = new Vue({
        el:'#app',
        data:{
            message:0
        }
    })
</script>
```
