---
title: ReactNativeComponent
date: 2018-06-1 11:53:02
tags: React Native
categories: 学习
---

>最近在玩React Native，话说React Native的环境真的烂啊，莫名其妙就崩了一次一次又一次。
>初学了一些东西，做个总结。
<!--more-->
### AppRegistry
AppRegistry是JS运行所有React Native应用的入口。应用的根组件应当通过AppRegistry.registerComponent方法注册自己，然后原生系统才可以加载应用的代码包并且在启动完成之后通过调用AppRegistry.runApplication来真正运行应用。
要“结束”一个应用并销毁视图的话，请调用AppRegistry.unmountApplicationComponentAtRootTag方法，参数为在runApplication中使用的标签名。它们必须严格匹配。
AppRegistry应当在require序列中尽可能早的被require到，以确保JS运行环境在其它模块之前被准备好。

### StyleSheet
StyleSheet提供了一种类似CSS样式表的抽象。
创建一个样式表：
```bash
var styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  activeTitle: {
    color: 'red',
  },
});
```
使用一个样式表：
```bash
<View style={styles.container}>
  <Text style={[styles.title, this.props.isActive && styles.activeTitle]} />
</View>
```
从代码质量角度：
从render函数中移除具体的样式内容，可以使代码更清晰易懂。
给样式命名也是对render函数中的原始组件的作用的一种标记。
从性能角度：
创建一个样式表，就可以使得我们后续更容易通过ID来引用样式，而不是每次都创建一个新的对象。
它还使得样式只会在JavaScript和原生之间传递一次，随后的过程都可以只传递一个ID（这个优化还未实现）。
注意：create() 和 hairlineWidth
这一常量定义了当前平台上的最细的宽度。可以用作边框或是两个元素间的分隔线。例如：

```bash
{
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth
 }
```

这一常量始终是一个整数的像素值（线看起来会像头发丝一样细），并会尽量符合当前平台最细的线的标准。然而，你不能把它“视为一个常量”，因为不同的平台和不同的屏幕像素密度会导致不同的结果。

###  Text
一个用于显示文本的React组件，并且它也支持嵌套、样式，以及触摸处理。
Android内建的字体有:
+ normal
+ serif
+ monospace <br>


\<Text>元素在布局上不同于其它组件：在Text内部的元素不再使用flexbox布局，而是采用文本布局。这意味着\<Text>内部的元素不再是一个个矩形，而可能会在行末进行折叠。
\<Text>元素在布局上不同于其它组件：在Text内部的元素不再使用flexbox布局，而是采用文本布局。这意味着\<Text>内部的元素不再是一个个矩形，而可能会在行末进行折叠。
你必须把你的文本节点放在\<Text>组件内。你不能直接在\<View>下放置一段文本。

### Image
#### 宽、高尺寸设置
+ Image 组件必须在样式中声明图片的宽和高。如果没有声明，则图片将不会被呈现在界面上。
+ 有时我们需要将某张图片点对点地显示在手机上，如果我们知道图片实际分辨率（比如：actrualWidth * actrualHeight），那么可以使用如下方式定义图片显示样式：
```bash
preciseImageStyle: {
  width: actrualWidth / PixelRatio.get(),
  height: actrualHeight / PixelRatio.get(),
}
```
#### Image组件的常见属性
+ onLayout(function) <br>
当Image布局发生改变的，会进行调用该方法，调用的代码为:{nativeEvent: {layout: {x, y, width, height}}}.

+ onLoad (function)  <br>
当图片加载成功之后，回调该方法

+ onLoadEnd (function)  <br>
当图片加载失败回调该方法，该不会管图片加载成功还是失败
+ onLoadStart (fcuntion)  <br>
当图片开始加载的时候调用该方法
+ resizeMode  <br>
缩放比例,可选参数(‘cover’, ‘contain’, ‘stretch’) 该当图片的尺寸超过布局的尺寸的时候，会根据设置Mode进行缩放或者裁剪图片
+ source{uri:string}  <br>
进行标记图片的引用，该参数可以为一个网络url地址或者一个本地的路径
它可以接收一个数组作为参数，这样可根据组件的宽和高自动加载与之匹配的宽和高的图片。使用方式如下:
```bash
 <Image
                style={{flex: 1}}
                source={[
                   {uri:'https://facebook.github.io/react/img/logo_small.png', width: 38, height: 38},
                  {uri: 'https://facebook.github.io/react/img/logo_small_2x.png', width: 76, height: 76},
                  {uri: 'https://facebook.github.io/react/img/logo_og.png', width: 400, height: 400}
                        ]}
                    />

```
###  View
作为创建UI时最基础的组件，View是一个支持Flexbox布局、样式、一些触摸处理、和一些无障碍功能的容器，并且它可以放到其它的视图里，也可以有任意多个任意类型的子视图。不论在什么平台上，View都会直接对应一个平台的原生视图，无论它是UIView、\<div>还是android.view.View。
View的设计初衷是和StyleSheet搭配使用，这样可以使代码更清晰并且获得更高的性能。尽管内联样式也同样可以使用。

#### accessible bool
当此属性为true时，表示此视图时一个启用了无障碍功能的元素。默认情况下，所有可触摸操作的元素都是无障碍功能元素。

如果要为View添加普通点击事件，请直接使用Touchable系列组件替代View，然后添加onPress函数。
#### onResponderMove function
当用户正在屏幕上移动手指时调用这个函数

### Button
一个简单的跨平台的按钮组件。可以进行一些简单的定制。
disabled bool
设置为true时此按钮将不可点击

 title: PropTypes.string.isRequired,
Platform.OS === 'android' ? title.toUpperCase() : title;

### FlatList
FlatList组件用于显示一个垂直的滚动列表，其中的元素之间结构近似而仅数据不同。
FlatList组件必须的两个属性是data和renderItem。data是列表的数据源，而renderItem则从数据源中逐个解析数据，然后返回一个设定好格式的组件来渲染。
FlatList更适于长列表数据，且元素个数可以增删。和ScrollView不同的是，FlatList并不立即渲染所有元素，而是优先渲染屏幕上可见的元素。

### SectionList
如果要渲染的是一组需要分组的数据，也许还带有分组标签的，那么SectionList将是个不错的选择。

### TouchableOpacity
本组件用于封装视图，使其可以正确响应触摸操作。当按下的时候，封装的视图的不透明度会降低。这个过程并不会真正改变视图层级，大部分情况下很容易添加到应用中而不会带来一些奇怪的副作用。
此组件与TouchableHighlight的区别在于并没有额外的颜色变化，更适于一般场景
### TouchableHighlight
<em>注意：TouchableHighlight只支持一个子节点
如果你希望包含多个子组件，用一个View来包装它们。</em>
### ScrollView
一个包装了平台的ScrollView（滚动视图）的组件，同时还集成了触摸锁定的“响应者”系统。
ScrollView和ListView/FlatList应该如何选择？
ScrollView会简单粗暴地把所有子元素一次性全部渲染出来。ListView会惰性渲染子元素，只在它们将要出现在屏幕中时开始渲染。FlatList是0.43版本开始新出的改进版的ListView，性能更优。
#### horizontal bool
当此属性为true的时候，所有的子视图会在水平方向上排成一行，而不是默认的在垂直方向上排成一列。默认值为false。
#### pagingEnabled bool
当值为true时，滚动条会停在滚动视图的尺寸的整数倍位置。这个可以用在水平分页上。默认值为false。
#### showsHorizontalScrollIndicator bool #
当此属性为true的时候，显示一个水平方向的滚动条。
### Dimensions
本模块用于获取设备屏幕的宽高
例子：var {height, width} = Dimensions.get('window');
