---
title: JSX
date: 2018-04-05 12:25:14
tags: react
categories: 学习
---

>学了React有差不多俩星期了，做个总结。

### 什么是JSX

JSX=JavaScriptXml<br>
JSX可以理解为在JS中编写与XML语言类似的语言，他并不能被浏览器识别，他的目的是通过编译器将这些标记变异成标准的JS语言。换句话说他是js语法的拓展。

<!--more-->

### javascript表达式

要使用Javascript表达式作为属性值，只需要把这个表达式用一对大括号（{}）包起来，不要用引号（""）。求职表达式本身和JSX没啥关系，是JS中的特性。他是会返回值的表达式，与语句本质的不同，在编写JSX时，在 { } 中不能使用语句（if语句、for语句等等）。我们不能直接使用语句，但可以把语句包裹在函数求值表达式中运用。建议把函数表达式独立出来，在 { } 调用。

### 关于用法和注意事项

官网有一篇深入JSX[点击这里](https://doc.react-china.org/docs/jsx-in-depth.html)

###  组件是啥
```bash
console.log(<App/>)
```
如图所示：
![](https://xuyonglinblog.oss-cn-beijing.aliyuncs.com/cosole.log%28APP%29.png)

as  we  can see，组件并不是我们之前传统开发模式下的可复用的HTML+CSS，而是单纯的js对象，或者说虚拟DOM。
接下来
```bash
console.log(<ToDoList name={'todo'} onClick={()=>{console.log('ss')}}/>)<br>
```

在组件里添加属性和方法，(ToDoList是之前写的一个小组件)，在控制台上可以看到。
![](https://xuyonglinblog.oss-cn-beijing.aliyuncs.com/JSX.png);
可以看到props里多了name和事件onClick，这也就是React声明组件属性和方法的方式，从这一点来看Vue还要去props里注册要省事一点。
可以看到组件对象里还有一些其他的属性，这些是用来干嘛的呢？O98k，打开[在线Babel编译器](https://babeljs.io/repl)，输入
```bash
function hello(){
  return (<div>hello</div>)
}
```
可以看到![](https://xuyonglinblog.oss-cn-beijing.aliyuncs.com/babelHello.png)
babel调用了React的createElement方法，这也就是为什么，我们在webpack环境下，声明一个组件，明明没有用到React，也要去引入的原因。
那么这个函数是干嘛使得呢？o98k，接下来好好看看。

### createElemnt
首先把React源码的地址贴上，[REACT源码](https://xuyonglinblog.oss-cn-beijing.aliyuncs.com/react.development.js)，有兴趣的小伙伴可以复制下来看看。
在React0.15版本中用到的是createClass方法，但是这个方法貌似已经过时了，16版本用的就是createElement。

在源码的481行，可以找到这个函数，他有三个参数：
+ type 标签名
+ config 配置信息className，事件啥的，没有则为null
+ children 标签里面的元素如：上述hello组件中调用createElelment时，children值就是'hello'，有意思的时当里面的元素是嵌套了一层的话，比如
```bash
return (<div><p>sss</p></div>)
```
那么children对应的值就是React.createElement的返回结果。
这在babel网站上会看的很清楚，比如声明一个组件和渲染一个组件


```bash
function TodoItem(){
  reutn (<div className="foo"  onClick={()=>{cconsole.log('sss')}} >
           <p>sss</p>
        </div>)
}


<TodoItem />
```
在右边可以看到如下代码
```bash
"use strict";

function TodoItem() {
  reutn(React.createElement(
    "div",
    { className: "foo", onClick: function onClick() {
        cconsole.log('sss');
      } },
    React.createElement(
      "p",
      null,
      "sss"
    )
  ));
}

React.createElement(TodoItem, null);

```

可以看到无论是原生标签还是自定义组件标签，React都会调用createElement进行处理，而处理的结果我们可以从接下来的源码里寻找。

createElement源码：

```bash

/**
 * Create and return a new ReactElement of the given type.
 * See https://reactjs.org/docs/react-api.html#createelement
 */
function createElement(type, config, children) {
  var propName;

  // 内置静态变量，作为参数传递给ReactElement方法

  //属性承载的容器，子组件内部就是通过这个对象访问对应的属性
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }
    //todo self 和 source 都是通过 props 传入的
    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
        // 检验是不是 OwnProperty，且不能是保留的名称。属性名不能是 key, ref, __self 和 __source
        if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }


  //todo createElement 可以接受不止三个参数，在 children 后面传入更多的参数，表示有更多的 child，因此这里要把它们收集起来。
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    {
      //Object.freeze使对象不可扩展，对象的属性不可删除，不可修改
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  //todo 把组件的默认属性值赋予组件的实例上
  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  {
    if (key || ref) {
      if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }
        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
}

```

看到这里，其实还有点模糊，这个方法是干嘛的，在整个生命周期起到了一个什么作用。
但是可以在最后看到createElement的返回值其实就是ReactElement方法的返回值，那么接下来就看看ReactElelment，是干啥的。

### ReactElement
先看参数
+ type: 使用 React.createElement创建的 React 组件
+ key: 使用 React 组件创建的 ReactElement 的 key，DOM结构标识，提升update性能
+ ref: 这个 ReactElement 的 ref，真实DOM的引用
+ props：子结构相关信息(有则增加children字段/没有为空)和组件属性(如style)
+ self: 用来记录当前元素所在的环境，因为创建组件的时候是一个递归的过程，就像之前，提到的hello嵌套组件，所以有必要对于每一层的组件保存this。
+ source: 中包含了一些文件名称，行号等信息。
+ owner: 用来记录该元素所属的组件。值为创建当前组件的对象，默认值为null。
ReactElement 这个函数只是将以上参数放入一个对象，并返回。
源码如下：
```bash

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    //作为ReactElement的标识，运用ES6的Symbol
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  {

    element._store = {};


    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    });
    // self and source are DEV only properties.
    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    });
    // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.
    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};
```
该方法在其他方法中也经常被调用，结果被return。

### React.Component

我们在最开始声明的组件App，其实是继承React.Component类的子类，它的原型具有setState等方法。这样组件App已经有了最基本的雏形。
```bash
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}
Component.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};
Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
};
```
贴张图
![](https://xuyonglinblog.oss-cn-beijing.aliyuncs.com/ReactComponent.png)
