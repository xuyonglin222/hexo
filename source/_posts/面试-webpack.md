### webpack名词
+ Entry：编译入口，webpack 编译的起点
+ Compiler：编译管理器，webpack 启动后会创建 compiler 对象，该对象一直存活知道结束退出
+ Compilation：单次编辑过程的管理器，比如 watch = true 时，运行过程中只有一个 compiler 但每次文件变更触发重新编译时，都会创建一个新的 compilation 对象
+ Dependence：依赖对象，webpack 基于该类型记录模块间依赖关系
+ Module：webpack 内部所有资源都会以“module”对象形式存在，所有关于资源的操作、转译、合并都是以 “module” 为基本单位进行的
+ Chunk：编译完成准备输出时，webpack 会将 module 按特定的规则组织成一个一个的 chunk，这些 chunk 某种程度上跟最终输出一一对应
+ Loader：资源内容转换器，其实就是实现从内容 A 转换 B 的转换器
+ Plugin：webpack构建过程中，会在特定的时机广播对应的事件，插件监听这些事件，在特定时间点介入编译过程

作者：范文杰
链接：https://juejin.cn/post/6949040393165996040
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

### webpack 构建流程简单说一下
+ 初始化阶段：

  + 初始化参数：从配置文件、 配置对象、Shell 参数中读取，与默认配置结合得出最终的参数
  + 创建编译器对象：用上一步得到的参数创建 Compiler 对象
+ 初始化编译环境：包括注入内置插件、注册各种模块工厂、初始化 RuleSet 集合、加载配置的插件等
  + 开始编译：执行 compiler 对象的 run 方法
  + 确定入口：根据配置中的 entry 找出所有的入口文件，调用 compilition.addEntry 将入口文件转换为 dependence 对象

+ 构建阶段：

  + 编译模块(make)：根据 entry 对应的 dependence 创建 module 对象，调用 loader 将模块转译为标准 JS 内容，调用 JS 解释器将内容转换为 AST 对象，从中找出该模块依赖的模块，再 递归 本步骤直到所有入口依赖的文件都经过了本步骤的处理

  + 完成模块编译：上一步递归处理所有能触达到的模块后，得到了每个模块被翻译后的内容以及它们之间的 依赖关系图


+ 生成阶段：

+ 输出资源(seal)：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
  生成chunk的规则
  + entry 及 entry 触达到的模块，组合成一个 chunk
  + 使用动态引入语句引入的模块，各自组合成一个 chunk

+ 写入文件系统(emitAssets)：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

链接：https://juejin.cn/post/6949040393165996040

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


#### 谈谈你对 webpack 的看法
webpack 是一个 模块打包工具，可以使用 webpack 管理模块依赖，并编译输出模块们所需的静态文件。它能 很好地管理、打包 Web 开发中所用到的 HTML、JS、CSS 以及各种静态文件（图片、字体等），让开发过程更加高效。对于不同类型的资源， webpack 有对应的模块加载器。 webpack 模块打包器会分析模块间的依赖关系，最后生成了优化且合并后的静态资源。
特点：

对 CommonJS、AMD、ES6 的语法做了兼容对 js、css、图片等资源文件都支持打包串联模块加载器以及插件机制，让其具有更好的灵活性和扩展性，例如对 ES6 的支持可以将代码切割成不同的 chunk，实现按需加载，降低了初始化时间支持 sourcemap，易于调试具有强大的 plugin 接口，大多是内部插件，使用起来比较灵活
#### webpack 与 grunt、gulp、rollup 的不同
优点：

专注于模块化项目plugins 能做很多事情社区活跃
缺点：

上手难度较高plugins 繁多，需要不断学习才能灵活掌握，还经常出现老文章里推荐的 plugin 已经停止维护对于初学者，调试很难定位问题构建速度较慢，这也是后起之秀主要针对的点

#### 在什么情况下选择 webpack？在什么情况下选择 rollup？

webpack 适用于大型复杂的前端站点构建rollup 适用于基础库的打包，如：vue、react
另外一个角度：
如果你需要进行代码分割，或者你有很多的静态资源，再或者你做的东西深度依赖 CommonJS，选择 Webpack。
如果你的代码基于 ES2015 模块编写，并且做的东西是准备给他人使用的，可以考虑 rollup。

### webpack 有什么优劣势
grunt 和 gulp 是基于任务和流（Task、Stream）的，找到一个（或一类）文件，对齐做一些列链式操作，更新流上的数据，整条链式操作构成了一个任务，多个任务就构成了整个 web 的构建流程
rollup 与 webpack 类似，但专注于 ES6 的模块打包。它最大的亮点是利用 ES6 模块设计，生成更简洁、更简单的代码。
webpack 是模块化管理工具和打包工具，它是基于入口的。 webpack 会自动递归解析入口所需要加载的所有资源文件，然后用不同 Loader 来处理不同的文件，用 Plugin 来扩展 webpack 功能。
虽然现在 webpack 相对比较主流，但一些轻量化的任务还是会用 gulp 来处理，比如单独打包 CSS 文件；另外一些类库的代码使用 rollup 打包。

### webpack 有哪些常见的 Loader？你用过哪些 Loader？
我经常使用的有：
文件：
raw-loader： 加载文件原始内容
file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件（处理图片和字体）
url-loader：与 file-loader 类似，区别是用户可以设置一个阈值，大于阈值会交给 file-loader 处理，小于时返回文件的 base64 形式编码（处理图片和字体）
转换编译：
babel-loader： 把 ES6 转换成 ES5
ts-loader： 将 ts 转换成 js
awesome-typescript-loader： 将 ts 转换成 js ，性能比 ts-loader 好点
样式：
css-loader： 加载 CSS， 支持模块化、压缩、文件导入等特性
less-loader：将 less 代码转换成 css
postcss-loader：扩展 CSS 语法，使用下一代 CSS，可以配合 autoprefixer 插件自动补齐 CSS3 前缀
style-loader：把 CSS 代码注入到 JS 中，通过 DOM 操作去加载 CSS
其他：
image-loader：加载并压缩图片文件
eslint-loader： 通过 ESLint 检查 js 代码
tslint-loader： 通过 TSLint 检查 ts 代码
cache-loader：可以在一些性能开销较大的 Loader 前添加，目的是将结果缓存到磁盘中
thread-loader：开启多线程打包

### webpack 有哪些常见的 Plugin？你用过哪些 Plugin？
ignore-plugin： 从 bundle 中排出某些模块
html-webpack-plugin：简单创建 HTML 文件
terser-webpack-plugin：js 代码压缩，支持压缩 ES6
extract-text-webpack-plugin：分离样式文件，从 bundle 中提取 css 到单独的文件
clean-webpack-plugin： 目录清理
webpack-bundle-analyzer： 可视化 Webpack 输出文件的体积 (业务组件、依赖第三方模块)
compression-webpack-plugin：开启 gzip 压缩
hard-source-webpack-plugin：开发阶段使用，为模块提供中间缓存步骤，加快二次编译速度
progress-bar-webpack-plugin： 项目启动或者打包进度条插件
friendly-errors-webpack-plugin：开发友好的错误提示插件

### 那你再说一说 Loader 和 Plugin 的区别？
从功能角度区分：
Loader 用于加载待打包的资源，Plugin 用于扩展 webpack 功能。
Loader 本质就是一个函数，在该函数中对接收到的内容进行转换，返回转换后的结果，主要用于加载某些资源文件。因为 webpack 只认识 js，这就需要对应的 loader 将资源转化，加载进来。
Plugin 用于扩展 webpack 的功能（loader 也是扩展功能，但只专注于转化文件这一领域），在 webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 webpack 提供的 API 改变输出结果。

从运行时机角度区分：
Loader 运行在打包文件之前（loader 为在模块加载时的预处理文件）
Plugin 在整个编译周期都起作用。

从使用角度区分：
Loader 在 rules 中配置，类型为数组。每一项都是一个 Object ， 内部包含了 test（类型文件）、loader、options（参数）等属性。
Plugin 在 plugins 中单独配置，类型为数组，每一项是一个 Plugin 的实例，参数都通过构造函数传入。


### webpack 如何解析代码路径的
webpack 依赖 enhanced-resolve 来解析代码模块的路径，这个模块像 Node.js 那一套模块路径解析的增强版本，有很多可以自定义的解析配置。
模块解析规则分三种：

解析相对路径

查找相对当前模块的路径下是否有对应文件或文件夹，是文件则直接加载如果是文件夹则找到对应文件夹下是否有 package.json 文件有的话就按照文件中的 main 字段的文件名来查找文件没有 package.json 或 main，则查找 index.js 文件
解析绝对路径
直接查找对应路径的文件，不建议使用，因为不同的机器用绝对路径会找不到
解析模块名
查找当前文件目录，父级直至根目录下的 node_modules 文件夹，看是否有对应名称的模块

另外：通过设置 resolve.alias 、 resolve.extensions 、 resolve.modules 、 resolve.mainFields 、 resolve.resolveLoader 等选项来优化路径查找速度。

### 使用 webpack 开发时，你用过哪些可以提高效率的插件？

webpack-merge：提取公共配置，减少重复配置代码
HotModuleReplacementPlugin：模块热替换
thread-loader: 并行打包，加快启动速度
babel-plugin-transform-remove-console: 自动删除 console.log

### source map 是什么？生产环境怎么用？
source map 是将编译、打包、压缩后的代码映射回源码的过程。打包压缩后的代码不具备良好的可读性，想要调试源码就需要 source map，出错的时候，浏览器控制台将直接显示原始代码出错的位置。
map 文件只要不打开开发者工具，浏览器是不会加载的。
线上环境一般有三种处理方案：

source-map：map 文件包含完整的原始代码，但是打包会很慢。打包后的 js 最后一行是 map 文件地址的注释。通过 nginx 设置将 .map 文件只对白名单开放（公司内网）
hideen-source-map：与 sourceMap 相同，也生成 map 文件，但是打包后的 js 最后没有 map 文件地址的引用。浏览器不会主动去请求 map 文件，一般用于网站错误分析，需要让错误分析工具按名称匹配到 map 文件。 或者借助第三方错误监控平台 Sentry 使用
nosources-source-map：只会显示具体行数以及查看源码的错误栈。安全性比 sourcemap 高

注意：避免在生产中使用 inline- 和 eval-，因为它们会增加 bundle 体积大小，并降低整体性能

### 模块打包原理知道吗？
webpack 根据 webpack.config.js 中的入口文件，在入口文件里识别模块依赖，不管这里的模块依赖是用 CommonJS 写的，还是 ES6 Module 规范写的，webpack 会自动进行分析，并通过转换、编译代码，打包成最终的文件。最终文件中的模块实现是基于 webpack 自己实现的 webpack_require（es5 代码），所以打包后的文件可以跑在浏览器上。
同时以上意味着在 webapck 环境下，你可以只使用 ES6 模块语法书写代码（通常我们都是这么做的），也可以使用 CommonJS 模块语法，甚至可以两者混合使用。因为从 webpack2 开始，内置了对 ES6、CommonJS、AMD 模块化语句的支持，webpack 会对各种模块进行语法分析，并做转换编译。
另外，针对异步模块：webpack 实现模块的异步加载有点像 jsonp 的流程。
遇到异步模块时，使用__webpack_require__.e函数去把异步代码加载进来。该函数会在 html 的 head 中动态增加 script 标签，src 指向指定的异步模块存放的文件。
加载的异步模块文件会执行webpackJsonpCallback函数，把异步模块加载到主文件中。
所以后续可以像同步模块一样,直接使用__webpack_require__("./src/async.js")加载异步模块。

### 文件监听原理呢？
在发现源码发生变化时，自动重新构建出新的输出文件。
缺点：每次需要手动刷新浏览器

原理：轮询判断文件的最后编辑时间是否变化，初次构建时把文件的修改时间储存起来，下次有修改时会和上次修改时间比对，发现不一致的时候，并不会立刻告诉监听者，而是先缓存起来，等 aggregateTimeout 后，把变化列表一起构建，并生成到 bundle 文件夹。
module.export = {
  // 默认 false，也就是不开启
  watch: true,
  watchOptions: {
    // 默认为空，不监听的文件夹或者文件，支持正则匹配
    ignore: /node_modules/,
    // 监听到变化发生后会等 300ms 再去执行，默认 300ms
    aggregateTimeout: 300,
    // 判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的，默认每秒询问 1000 次
    poll: 1000,
  },
};

### 说一下 webpack 的热更新原理吧

Webpack 的热更新又称为热替换（Hot Module Replacement），缩写为 HMR。这个机制可以做到不用刷新浏览器而将变更的模块替换掉旧的模块。
相对于手动刷新页面，HMR 的优点在于可以保存应用的状态，提高开发效率。

webpack 构建的项目，分为 server 端和 client 端（也就是浏览器），项目启动时，双方会保持一个 socket 连接，用于通话。
当本地资源发生变化时，server 向浏览器发送新资源的 hash 值，浏览器调用 reloadApp 方法，检查是否有变化，有差异是会向 server 发起 Ajax获取更改内容（文件列表、hash），这样浏览器继续借助这些信息向 server 端发起请求，通过 jsonp 的方式获取 chunk 的增量更新。

后续的部分（拿到增量更新之后如何处理？哪些状态该保留？哪些又需要更新？）由 HotModulePlugin 来完成，提供了相关 API 以供开发者针对自身场景进行处理，像 react-hot-loader 和 vue-loader 都是借助这些 API 实现 HMR。
十五、如何对 bundle 体积进行监控和分析？

VSCode 中有一个插件 Import Cost 可以帮助我们对引入模块的大小进行实时监测
webpack-bundle-analyzer 生成 bundle 的模块组成图，显示所占体积
bundlesize 工具包可以进行自动化资源体积监控，集成到 CI 中，就可以在应用过大的时候收到提醒。

### 文件指纹是什么？怎么用？
文件指纹是打包后输出的文件名的后缀。

Hash：和整个项目的构建相关，只要项目文件有修改，整个项目构建的 hash 值就会更改
Chunkhash： 和 Webpack 打包的 chunk 有关，不同的 entry 会生成不同的 chunkhash
Contenthash：根据文件内容来定义 hash，文件内容不变，则 contenthash 不变。

js 的文件指纹设置：设置 output 的 filename，用 chunkhash
````
module.exports = {
  entry: {
    app: './src/app.js',
    search: './src/search.js',
  },
  output: {
    filename: '[name][chunkhash:8].js',
    path: __dirname + '/dist',
  },
};
````
css 的文件指纹设置：

设置 MiniCssExtractPlugin 的 filename，使用 contenthash设置 ExtractTextPlugin 的 filename
````
module.exports = {
  // ...
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name][contenthash:8].css',
    })
    new ExtractTextPlugin('[name][contenthash].css'),
  ]
}
``````

图片的文件指纹设置

设置 file-loader 或 url-loader 的 name， 使用 hash。

#### 在实际工程中，配置文件上百行乃是常事，如何保证各个 loader 按照预想方式工作？

webpack 配置中，通过 module.rules 中的 enforce 字段，将 loader 分为 preLoader 、 postLoader 和 loader 三种，执行顺序为 pre -> loader -> inline -> post
pre 代表在所有正常 loader 之前执行， post 是所有 loader 之后执行。（inline 官方不推荐使用）

#### 代码分割的本质是什么？有什么意义？你是如何拆分的？

代码分割的本质其实是在 源代码直接上线 和 打包成唯一脚本 main.bundle.js 这两种极端方案之间的一种更适合实际场景的中间状态。
用可接受的服务器性能压力增加来换取更好的用户体验。
源代码直接上线：虽然过程可控，但是 http 请求多，性能开销大。
打包成唯一脚本：

服务器压力小，但是页面空白期长，用户体验不好大体积文件会增加编译时间，影响开发效率多页应用，独立访问单个页面时，需要下载大量不相干的资源
代码分割（splitChunk）的意义：

复用的代码抽离到公共模块中，解决代码冗余公共模块再按照使用的页面多少（或其他思虑）进一步拆分，用来减小文件体积，顺便优化首屏加载速度
拆分原则：
如何拆分因项目而异，普遍适应的拆分原则：

业务代码和第三方库分离打包，实现代码分割业务代码中的公共业务模块提取打包到一个模块首屏相关模块单独打包

#### vite原理

+ 浏览器支持esm规范，vite利用浏览器对esm的支持，当import模块时，
+ 
