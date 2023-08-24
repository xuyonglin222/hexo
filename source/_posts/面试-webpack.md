
### webpack 构建流程简单说一下
+ Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

+ 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数
+ 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译
+ 确定入口：根据配置中的 entry 找出所有的入口文件
+ 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出改模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
+ 完成模块编译：在经过第 4 步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk， 再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
+ 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

### Loader 和 Plugin 的区别？

+ 从功能角度区分：
    Loader 用于加载待打包的资源，Plugin 用于扩展 webpack 功能。  Loader 本质就是一个函数，在该函数中对接收到的内容进行转换，返回转换后的结果，主要用于加载某些资源文件。因为 webpack 只认识 js，这就需要对应的 loader 将资源转化，加载进来。
    Plugin 用于扩展 webpack 的功能（loader 也是扩展功能，但只专注于转化文件这一领域），在 webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 webpack 提供的 API 改变输出结果。
+ 从运行时机角度区分：
Loader 运行在打包文件之前（loader 为在模块加载时的预处理文件）
Plugin 在整个编译周期都起作用。
+ 从使用角度区分：
Loader 在 rules 中配置，类型为数组。每一项都是一个 Object ， 内部包含了 test（类型文件）、loader、options（参数）等属性。
Plugin 在 plugins 中单独配置，类型为数组，每一项是一个 Plugin 的实例，参数都通过构造函数传入。

### webpack5有啥新特性
+ 模块联邦（Module Federation）：这是Webpack 5最引人注目的特性之一。模块联邦允许将多个独立的Webpack构建的应用程序（微前端）组合成一个整体，实现模块共享和动态加载，从而实现更高级的代码拆分和资源共享。

+ 改进的构建性能：Webpack 5通过引入持久缓存（Persistent Caching）和改进的构建算法，提高了构建性能。持久缓存可以减少重复构建的时间，而改进的构建算法可以更好地利用缓存和增量构建的优势。

+ Tree Shaking 改进：Webpack 5改进了Tree Shaking算法，使其更加智能和高效。现在，Webpack可以通过ES模块语法的静态分析来识别和删除未使用的代码，从而进一步优化构建大小。

+ 支持 WebAssembly：Webpack 5对WebAssembly提供了更好的支持，包括对导入和导出WebAssembly模块的原生支持，以及对WebAssembly模块更好的代码分割和异步加载的支持。

其他增强功能：Webpack 5还引入了许多其他增强功能，如更好的持久缓存策略、更好的管理资源模块、对大型项目的优化等。

### less-loader style-loader css-loader的区别
less-loader、style-loader和css-loader是在Webpack中常用的加载器（loader），用于处理样式文件。它们之间有一些区别和不同的功能。

+ less-loader：less-loader是一个Webpack加载器，用于将Less文件编译为CSS文件。Less是一种CSS预处理器，它提供了更多的功能和扩展，如变量、嵌套规则、混合等。通过less-loader，可以在Webpack构建过程中将Less文件转换为浏览器可识别的CSS文件。

+ css-loader：css-loader是一个Webpack加载器，用于处理CSS文件。它允许在JavaScript文件中导入CSS文件，并将其转换为Webpack可以处理的模块。css-loader执行将CSS文件转换为字符串，并解决了CSS中的依赖关系，如导入其他CSS文件或图像。

+ style-loader：style-loader是一个Webpack加载器，用于将CSS代码注入到HTML页面中的\<style\>标签中。它接收由css-loader生成的CSS模块，并将其动态地插入到页面中。这样，样式将直接应用于文档，而无需单独的CSS文件。

综合来说，less-loader用于将Less文件编译为CSS文件，css-loader用于处理CSS文件并解决依赖关系，而style-loader用于将CSS代码注入到HTML页面中。通常，在Webpack配置中，可以将less-loader用于处理Less文件，然后使用css-loader和style-loader来处理生成的CSS模块，并将其应用于页面。