---
title: 前端面试收集
date: 2018-04-02 14:42:08
tags: javascript
categories: 学习
---

本部分内容大致分为以下几个方面： HTML, CSS, JavaScript, Node 和 HTTP。

<!--more-->
## CSS

#### 1. 什么是盒子模型？

**答**：在网页中，一个元素占有空间的大小由几个部分构成，其中包括元素的内容（content），元素的内边距（padding），元素的边框（border），元素的外边距（margin）四个部分。这四个部分占有的空间中，有的部分可以显示相应的内容，而有的部分只用来分隔相邻的区域或区域。4个部分一起构成了css中元素的盒模型。

#### 2. 在一些场景中文本内容不受控制过长超出，有哪些处理超长文本的方法？

**答**：使用 CSS `word-break` 属性（CSS 属性 word-break 指定了怎样在单词内断行的规则）或者 CSS `text-overflow` 属性（text-overflow CSS 属性确定如何向用户发出未显示的溢出内容信号。它可以被剪切，显示一个省略号或显示一个自定义字符串）。

#### 3. 什么是 Data URI？

**答**：Data URI 是一种提供让外置资源的直接内嵌在页面中的方案。这种技术允许我们只需单次 HTTP 请求即可获取所有需要引用的图片与样式资源，并因无需多次请求资源而变的高效。

#### 4. Data URI 的好处和缺点都有哪些？

**答**：在 img 方式引用图片时，img标记的src属性指定了一个远程服务器上的资源。当网页加载到浏览器中时，浏览器会针对每个外部资源都向服务器发送一次拉取资源请求，占用网络资源。大多数的浏览器都有一个并发请求数不能超过4个的限制。这意味着，如果一个网页里嵌入了过多的外部资源，这些请求会导致整个页面的加载延迟。而使用Data URL技术，图片数据以base64字符串格式嵌入到了页面中，其中好处包括：

* 当访问外部资源很麻烦或受限时。
* 当图片是在服务器端用程序动态生成，每个访问用户显示的都不同时。
* 当图片的体积太小，占用一个HTTP会话不是很值得时。

Data URL也有一些不适用的场合：

* Base64编码的数据体积通常是原数据的体积4/3，也就是Data URL形式的图片会比二进制格式的图片体积大1/3。
* Data URL形式的图片不会被浏览器缓存，这意味着每次访问这样页面时都被下载一次。这是一个使用效率方面的问题——尤其当这个图片被整个网站大量使用的时候。

#### 5. 内联元素和块级元素的区别？

**答**：块级元素和内联元素对于CSS调用的不同效果 - 块级元素默认独占一行，默认宽度为父元素的100%，可以设置宽度、高度，外边距、内边距；内联元素默认不独占一行，宽度随着内容自动撑，无法设置宽度、高度、外边距。可以设置内边距。内联元素要设置宽高必须用css设置块显示。

#### 6. CSS Transform / Transition / Animation 属性的区别？

**答**：

* transform属性是静态属性，一旦写到style里面，将会直接显示作用，无任何变化过程。transform的主要用途是用来做元素的特殊变形；
* transition关注的是CSS property的变化，property值和时间的关系是一个三次贝塞尔曲线；
* animation作用于元素本身而不是样式属性，可以使用关键帧的概念，应该说可以实现更自由的动画效果；

#### 7. position 布局方式都有哪些？

**答**：

* **static** - static 是默认值。任意 `position: static;` 的元素不会被特殊的定位。一个 static 元素表示它不会被“positioned”，一个 position 属性被设置为其他值的元素表示它会被“positioned”。
* **relative** - relative 表现的和 static 一样，除非你添加了一些额外的属性。在一个相对定位（position属性的值为relative）的元素上设置 top 、 right 、 bottom 和 left 属性会使其偏离其正常位置。其他的元素的位置则不会受该元素的影响发生位置改变来弥补它偏离后剩下的空隙。
* **fixed** - 一个固定定位（position属性的值为fixed）元素会相对于视窗来定位，而当父元素的transform属性不为none时，会基于父元素定位，这意味着即便页面滚动，它还是会停留在相同的位置。和 relative 一样， top 、 right 、 bottom 和 left 属性都可用。
* **absolute** - absolute 与 fixed 的表现类似，它相对于最近的“positioned”祖先元素。如果绝对定位（position属性的值为absolute）的元素没有“positioned”祖先元素，那么它是相对于文档的 body 元素，并且它会随着页面滚动而移动。
* **sticky** 的生效是有一定的限制的，总结如下：
    + 须指定 top, right, bottom 或 left 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同。

    + 并且 top 和 bottom 同时设置时，top 生效的优先级高，left 和 right 同时设置时，left 的优先级高。
    设定为 position:sticky 元素的任意父节点的 overflow 属性必须是 visible，否则 position:sticky 不会生效。这里需要解释一下：

    + 如果 position:sticky 元素的任意父节点定位设置为 overflow:hidden，则父容器无法进行滚动，所以 position:sticky 元素也不会有滚动然后固定的情况。

    + 如果 position:sticky 元素的任意父节点定位设置为 position:relative | absolute | fixed，则元素相对父元素进行定位，而不会相对 viewprot 定位。

    + 达到设定的阀值。这个还算好理解，也就是设定了 position:sticky 的元素表现为 relative 还是 fixed 是根据元素是否达到设定了的阈值决定的
*记住一个“positioned”元素是指 position 值不是 static 的元素。*

#### 8. display 的属性都有哪些？

**答**：块级元素默认值为 block，而行内元素为 inline。

* **block** - div 是一个标准的块级元素。一个块级元素会新开始一行并且尽可能撑满容器。其他常用的块级元素包括 p 、 form 和HTML5中的新元素： header 、 footer 、 section 等等。
* **inline** - 一个行内元素可以在段落中包裹一些文字而不会打乱段落的布局。 a 元素是最常用的行内元素。
* **none** - 一些特殊元素的默认 display 值是它，例如 script 。 display:none 通常被 JavaScript 用来在不删除元素的情况下隐藏或显示元素。它和 visibility 属性不一样。把 display 设置成 none 元素不会占据它本来应该显示的空间，但是设置成 visibility: hidden; 还会占据空间。

其他 display 值，例如 inline-block, list-item, table 和 flex。

#### display:none/isibility: hidden/opacity: 0 
+ 结构： display:none: 会让元素完全从渲染树中消失，渲染的时候不占据任何空间, 不能点击， visibility: hidden:不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，不能点击 opacity: 0: 不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，可以点击

+ 继承： display: none和opacity: 0：是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示。 visibility: hidden：是继承属性，子孙节点消失由于继承了hidden，通过设置visibility: visible;可以让子孙节点显式。

+ 性能： displaynone : 修改元素会造成文档回流,读屏器不会读取display: none元素内容，性能消耗较大 visibility:hidden: 修改元素只会造成本元素的重绘,性能消耗较少读屏器读取visibility: hidden元素内容 opacity: 0 ： 修改元素会造成重绘，性能消耗较少

+ 联系：它们都能让元素不可见


#### bfc块级格式化上下文
BFC（块级格式化上下文）是CSS中的一个概念，用于描述一个独立的渲染区域，其中的元素按照一定的规则进行布局和渲染。BFC具有以下特性：

1. BFC中的元素垂直排列，各自占据一行，相邻元素之间竖直方向的边距会产生重叠。

2. BFC的区域不会与浮动元素发生重叠，可以避免浮动元素覆盖其内部的内容。

3. BFC可以包含浮动元素，使得包含元素的高度能够被正常计算，不会塌陷。

4. BFC内部的元素受到BFC的约束，不会影响到外部的元素。

创建BFC可以使用以下方法：

1. 将元素的float属性设置为非none值。

2. 将元素的position属性设置为absolute或fixed。

4. 将元素的display属性设置为inline-block、table-cell、table-caption等块级元素。

5. 使用CSS伪元素:after或:before，并设置其content属性为非空字符串

#### 三点隐藏文字
 overflow: hidden;
 white-sapce: no-wrap;
 text-overflow: ellipsis;
 
### css预处理器

