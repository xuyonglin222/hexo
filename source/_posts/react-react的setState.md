---
title: react的setState
date: 2019-01-04 18:04:57
tags: react
---

> 记得当时初学的时候，看的是《深入浅出react与redux》，学到了react与redux的基本用法，异步action的与原理，以及react-redux的原理，收获颇丰，但是对于react本身的原理倒是没有很多的阐述，最近很多人推荐《深入react技术栈》，其实这本书有点老了，但是不算过时，就去瞅了瞅。

<!--more-->

### 目的

看书时，抱着疑问去看的，主要是为了解决这两个问题，一直以来都是一知半解，setState是异步的还是同步的？

### setState关键点

+ setState不会立刻改变React组件中state的值
+ 多次setState函数调用产生的效果会合并。
+ setState通过引发一次组件的更新过程来引发重新绘制，重绘指的就是引起React的更新生命周期函数4个函数：
    - shouldComponentUpdate（被调用时this.state没有更新；如果返回了false，生命周期被中断，虽然不调用之后的函数了，但是state仍然会被更新）
    - componentWillUpdate（被调用时this.state没有更新）
    - render（被调用时this.state得到更新）
    - componentDidUpdate

首先举个🌰，修改了《深入react技术栈》中的代码：

```bash  
class App extends Component {
  state = {
    num:0
  };
  componentDidMount(){
    this.setState({ 
      num: this.state.num+1
     });
     console.log(this.state.num);
     this.setState({ 
      num: this.state.num+1
     });
     console.log(this.state.num);

     setTimeout(() => {
      this.setState({ 
        num:this.state.num+1
       })
       console.log('timeout', this.state.num);
        this.setState({ 
          num:this.state.num+1
         })
         console.log('timeout', this.state.num);
        })
  }

  componentDidUpdate(){
    // console.log('update',this.state.num);

  }
  render() {
    console.log('rendering', this.state.num)
    return (
      <div className="App">
        <p>{this.state.num}</p>
      </div>
    );
  }
}
```

输出是这样的

```bash  
rendering 0
0
0
rendering 1
rendering 2
timeout 2
rendering 3
timeout 3
```

看起来setState好像是异步的，state的值并没有立刻发生变化，但是setTimeout里setState却立刻更新了，瞅了一眼源码发现了这样一串代码。

```function enqueueUpdate(component) {  // ...  if (!batchingStrategy.isBatchingUpdates) {    batchingStrategy.batchedUpdates(enqueueUpdate, component);    return;  }  dirtyComponents.push(component);}
function enqueueUpdate(component) {
  ensureInjected();

  // Various parts of our code (such as ReactCompositeComponent's
  // _renderValidatedComponent) assume that calls to render aren't nested;
  // verify that that's the case. (This is called by each top-level update
  // function, like setProps, setState, forceUpdate, etc.; creation and
  // destruction of top-level components is guarded in ReactMount.)

  if (!batchingStrategy.isBatchingUpdates) {
    batchingStrategy.batchedUpdates(enqueueUpdate, component);
    return;
  }

  dirtyComponents.push(component);
}
```

react在数据更新时，并不会立刻触发render，而是通过一个队列去缓存，然后通过isBatchingUpdates这个变量判断当前是否立刻更新。isBatchingUpdates默认是false，也就表示setState会同步更新this.state，当React在调用事件处理函数之前就会调用batchedUpdates，这个函数会把isBatchingUpdates修改为true，在componentDidMount时，这个值已经被置为true，所以两次setState并没有立刻改变state的值，而是缓存了起来，而setTimeout的回调函数在执行时，isBatchingUpdates这个值又被重置为false，所以settimeout离得setState是立刻更新state并触发render的，addEventListener也是和setTimeout一样的效果。

<strong>所以，究其根本，setState本身就是同步的，它的实现内部没有用到eventLoop，全都是同步代码，所以在setTimeout里是上述情形</strong>，我们写的每一个组价都是函数，都是跑在react里的，他屏蔽了很多细节，包括setState改变state的机制。

### setState另一个用法

setState(nextState, callback)，指明callback，nextState会立即与当前state进行合并。

### 渲染

seState会引发视图重新渲染，无论state有没有改变，就算传一个空对象进去，也会引发重绘，所以往往需要shouldComponentUpdate来进行优化，它的参数是nextProps和nextState，可以通过和当前的state，props进行比较，如果一致，就return false，阻止render函数调用。





