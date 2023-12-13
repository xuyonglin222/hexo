## Node 软件包管理

#### 简述同步和异步之间的区别？

**答**：同步是阻塞模式，异步是非阻塞模式。 同步就是指一个进程在执行某个请求的时候，若该请求需要一段时间才能返回信息，那么这个进程将会一直等待下去，直到收到返回信息才继续执行下去； 异步是指进程不需要一直等下去，而是继续执行下面的操作，不管其他进程的状态。当有消息返回时系统会通知进程进行处理，这样可以提高执行的效率

####  在每个 package.json 的 dependency 中都会有很多软件名以及随之跟上的版本号，例如 `"d3": "^3.9.0"` 或者 `"d3": "~3.9.0"`，请问 "^" 和 "~" 的含义分别是什么？

**答**：根据 ["npm install --save" No Longer Using Tildes](http://fredkschott.com/post/2014/02/npm-no-longer-defaults-to-tildes/) 一文可知，形如波浪号的编号（例如：~1.2.3）会匹配对应软件所有的 1.2.x 版本，并最终使用最新的符合要求的版本；相比之下倒 V 型编号（例如：^1.2.3）有更松弛的规则，所有 1.x.x 版本均在匹配列表中，但匹配过程会在 2.0.0 停止并返回最新的符合要求的版本。

#### import和require的区别
+ require/exports 是运行时动态加载，import/export 是静态编译

    CommonJS 加载的是一个对象（即 module.exports 属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成

+  require/exports 输出的是一个值的拷贝，一旦输出一个值，模块内部的变化就影响不到这个值，import/export 模块输出的是值的引用，若文件引用的模块值改变，require 引入的模块值不会改变，而 import 引入的模块值会改变。

+ 用法不同

    exports 是对 module.exports 的引用，相当exports = module.exports = {};
    
    在不改变 exports 指向的情况下，使用 exports 和 module.exports 没有区别；如果将 exports 指向了其他对象，exports 改变不会改变模块输出值。
    ````
    //utils.js
    let a = 100;

    exports.a = 200;
    console.log(module.exports) //{a : 200}
    exports = {a:300}; //exports 指向其他内存区

    //test.js

    var a = require('./utils');
    console.log(a) // 打印为 {a : 200}
    ````

#### 解决循环引用

