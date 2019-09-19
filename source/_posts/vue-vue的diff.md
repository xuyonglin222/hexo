---
title: vue的diff
date: 2019-01-17 17:41:09
tags: vue
---

> 昨天部门做了分享，主题是react，不知道为毛扯到了vue的diff的，之前有看过diff文章和部分源码，时间太久，发现也忘记了，于是重新去瞅了一下源码，做个总结，举了3个🌰，画了12张图，所以本文更侧重于图文，而不是源码子曰：温故而知新，古人诚不我欺。

<!-- more -->
## 关键源码

### updateChildren

vue关于diff模块源码地址：https://github.com/vuejs/vue/blob/2.6/src/core/vdom/patch.js

其中最关键的就是在404行的updateChildren的函数里，顺便加点注释，PS：最好以后面的图文为主。

规则很简单，循环体内：

+ 首先判断newStart和oldEnd是不是undefind，如果是就newStart往后移，oldEnd往前移动。（源码中用的oldStartIdx，oldEndIdx，newStartIdx，oldStartVnode指得是索引，我的描述倾向于指针，指向的是该vNode节点，没啥区别）
+  oldStart和newStart判断是否值得比较，若true就patch，然后newStart++，oldStart++，否则进入下一步。
+  oldEnd和newEnd判断是否值得比较，若true就patch，然后newEnd--，oldEnd--，否则进入下一步。
+  oldStart和newEnd判断是否值得比较，若true就patch，接着将oldStart所指向的真实节点移动到的oldEnd所指向的真实节点的下一个节点的前面（就是移动到oldENd的位置），然后newEnd--，oldStart++，否则进入下一步。
+  oldEnd和newStart判断是否值得比较，若true就patch，接着将oldEnd所指向的真实节点移动到oldStart的前面,然后oldEnd--，newStart++，否则进入下一步。

+ 如果两组指针都不能判断一个newVdom是增加的还是删除，就会创建一个map，存储oldVnode的映射。

```bash
function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    let oldStartIdx = 0
    let newStartIdx = 0
    let oldEndIdx = oldCh.length - 1
    let oldStartVnode = oldCh[0]
    let oldEndVnode = oldCh[oldEndIdx]
    let newEndIdx = newCh.length - 1
    let newStartVnode = newCh[0]
    let newEndVnode = newCh[newEndIdx]
    let oldKeyToIdx, idxInOld, vnodeToMove, refElm

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    const canMove = !removeOnly

    if (process.env.NODE_ENV !== 'production') {
      checkDuplicateKeys(newCh)
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx] // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx]
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
        oldStartVnode = oldCh[++oldStartIdx]
        newStartVnode = newCh[++newStartIdx]
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
        oldEndVnode = oldCh[--oldEndIdx]
        newEndVnode = newCh[--newEndIdx]
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
        oldStartVnode = oldCh[++oldStartIdx]
        newEndVnode = newCh[--newEndIdx]
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
        oldEndVnode = oldCh[--oldEndIdx]
        newStartVnode = newCh[++newStartIdx]
      } else {
       /*
          生成一个key与旧VNode的key对应的哈希表，形如{oldKey0: 0,oldKey1: 1,oldKey2: 2,oldKey3:
          3}，map的KEY(olKeyn)为vnode的key值，map的VALUE(n)为该vnode在oldVnode序列的索引
        */
        if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
        } else {
          vnodeToMove = oldCh[idxInOld]
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
            oldCh[idxInOld] = undefined
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
          }
        }
        newStartVnode = newCh[++newStartIdx]
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
    }
  }

------------
function createKeyToOldIdx (children, beginIdx, endIdx) {
  let i, key
  const map = {}
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key
    if (isDef(key)) map[key] = i
  }
  return map
}
```

### patchVnode

代码在这：https://github.com/vuejs/vue/blob/2.6/src/core/vdom/patch.js   第501行。
其实这个函数就是在两个节点值得diff的情况下，去更新差异。
规则如下：

1.如果新旧VNode都是静态的，同时它们的key相同（代表同一节点），并且新的VNode是clone或者是标记了once（标记v-once属性，只渲染一次），那么只需要替换elm以及componentInstance即可。

2.新老节点均有children子节点，则对子节点进行diff操作，调用updateChildren，这个updateChildren也是diff的核心。

3.如果老节点没有子节点而新节点存在子节点，先清空老节点DOM的文本内容，然后为当前DOM节点加入子节点。

4.当新节点没有子节点而老节点有子节点的时候，则移除该DOM节点的所有子节点。

5.当新老节点都无子节点的时候，只是文本的替换。

### sameVnode

代码量很少就贴一下代码，其实功能就是判断两个虚拟dom节点是不是值得patch。

```bash
function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}
```



## 开始BB

首先diff是对新的和老的vNode节点进行比对，比对依赖于两个东西：

+ 两组指针，newStart，newEnd以及oldStart，oldEnd，通过对比移动，最后比较两组值的大小，来确定删除增加移动，但并不是所有的情况都能覆盖。

+ 一个map，是一个用来建立oldVnode的key和索引的映射关系，形如

``` bash
{
    oldKey0: 0,
    oldKey1: 1,
    oldKey2: 2,
    oldKey3: 3,
}
```

### 举个🌰

原来dom节点是这样的，ABCD对应节点的key分别为A，B，C，D，后来在B和C插入了一个元素X，那么在diff的时候，指针的指向如下列图所示。

![1](https://xuyonglinblog.oss-cn-beijing.aliyuncs.com/1.jpg)

#### 第1步

在满足oldStart<= oldEnd && newStart <= newEnd时，oldStart和newStart进行对比，sameVnode函数返回true，也就是说值得比较，于是就patchVnode就是讲新产生的变化更新到真实的dom节点上，之后改变指针指向进入下一步，如图所示。

![2](https://xuyonglinblog.oss-cn-beijing.aliyuncs.com/2.jpg)

#### 第2步

接着发现newB和oldB也是值得比较的就重复上述的步骤

![2](https://xuyonglinblog.oss-cn-beijing.aliyuncs.com/3.jpg)

#### 第3步


C和X不一样，也就是说sameVnode返回的是false，那么就会比较oldEnd和newEnd，发现是值得比较的，没话说，上去就是一顿patch，然后指针都往前移，👇

![2](https://xuyonglinblog.oss-cn-beijing.aliyuncs.com/4.jpg)

#### 第4步

这个时候还是满足while的循环条件的嘛，故一顿patch之后，指针前移，👇

![2](https://xuyonglinblog.oss-cn-beijing.aliyuncs.com/5.jpg)

#### 第5步

这个时候oldEnd>oldStart不满足oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx，这个时候

![](https://xuyonglinblog.oss-cn-beijing.aliyuncs.com/fenxi.jpeg)

oldStart > oldEnd，那么newStart和newEnd所指向的节点就是新增的，反过来

newStart > newEnd，那么oldStart和oldEnd所指向的节点就是被删掉的。判断出该节点的状态之后，就直接在真实的dom上去更新了，就是用的addVnodes或者removeVnodes，看着是穿进去了很多参数，其实最后，就是insert(parentEle, X, C)，其实最终变换形态就是parentEle.insertBefore(X, C)，在C前插入X，我之前一直以为会用队列进行缓存这个插入的状态，然后在Dom引擎一次更新（想到啥，写点啥），顺便说一下，所谓直接操作dom性能差的原因：

> 1. js是单线程的，但是Dom操作和js执行是在不同的引擎上的，dom进行操作时，JS引擎就得被挂起，反之亦然。
> 2. JS 代码调用 DOM API 必须经过 *挂起 JS 引擎、转换传入参数数据、激活 DOM 引擎*，DOM 重绘后再转换可能有的返回值，最后激活 JS 引擎并继续执行，再挂起Dom引擎。
> 3. 若有频繁的 DOM API 调用，且浏览器厂商不做“批量处理”优化，引擎间切换的单位代价将迅速积累。
> 4. 若其中有强制重绘的 DOM API 调用，不但厂商费尽心机做的“批量处理”优化被中断，**重新计算布局**、**重新绘制图像**会引起更大的性能消耗。

所以，我觉得频繁的更新Dom，频繁的切换引擎，引擎的不断挂起和激活，无疑是在消耗巨大的性能，故用个队列存一下，一次更新，避免开销，然而看源码之后，发现vue并没有做，其实很显然。。。。。。。。。。。。。。。。。。。拿队列去存储更新的dom的状态，然后循环遍历读取状态并更新也是要切换引擎的。。。。。。（竟然把一个错误的理解了这么久）。现在其实只用了头和头尾跟尾的比较，还有头跟尾，尾和头的呢？那就再举个🌰

### 再举个🌰

#### 第1步
原来的节点是这样的：A B C D，后来的是这样的：D C B A，ok，继续看图作文。


![](https://xuyonglinblog.oss-cn-beijing.aliyuncs.com/6.jpg)
#### 第2步
目前真实的dom和oldNodeList是一样，以后***移动节点是在真实的dom上移动的***。oldStart和newStart以及newEnd和oldEnd都不是值得比较，因此会进行到oldStart和newEnd的比较，patch之后开始移动，
根据文章一开始介绍的规则，将oldStart移动到***oldEnd***所指向的真实节点的下一个，也就是将A移动到D的下一个节点（及文本节点）的前面，那么真实的dom就变成了B C D A，然后移动指针

move的代码如下

```bash

canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))



```
nodeOps是vue对weex和web的ui变化进行封装了一些方法，比如insertBefore，removeChild，appendChild等等，在[这个位置](https://github.com/vuejs/vue/tree/2.6/src/platforms) 会看到两个文件夹，web和weex，各有一个runtime/node-ops.js。

如图
![](https://xuyonglinblog.oss-cn-beijing.aliyuncs.com/7.jpg)
#### 第3步

ok，接下来就是下一次循环，还是进入oldStart与newEnd的比较，和上一步的比较规则一样，这次是把真实domB移动到D的下一个节点（即真实DomA）的前面就变成了C D B A，然后移动指针。
![](https://xuyonglinblog.oss-cn-beijing.aliyuncs.com/12.jpg)

#### 第4步

最后一步，巧了，还是比较oldStart和newEnd，不同的是这次是domC，按照规则，是把C移动到D的下一个节点（即真实DomB）的前面，就变成了D C B A，是不是就和newVnode的顺序是一样的了。

![](https://xuyonglinblog.oss-cn-beijing.aliyuncs.com/8.jpg)


### 再再举个例子
#### 第1步

原来的dom节点是A B C D，新的是C D A B，每个节点的key对应的是自己的名称，如下图所示，这时，两组指针相互对比发现，并不能得出某个dom节点的状态，这就是两组指针不能涵盖的情况。

![](https://xuyonglinblog.oss-cn-beijing.aliyuncs.com/9.jpg)

#### 第2步

于是key就起到了作用，创建一个map{A: 0,B: 1, C: 2, D: 3}，这是一个oldVnode和key抽出来的映射，然后通过map[newStart.key]就能找到newVnode在原来老节点的位置，在这个🌰中，就是map[C]，然后对比oldVnodeC和newVnodeC，然后将差异更新到真实的dom上，然后***将newStart对应的真实dom移动到oldStart的前面***，也就是将真实domC放在A的前面，其实用的也是parentEle.insertBefore(C, A)然后newStart往后挪动一位，再把oldVnode中的C置为undefined，如下图所示

![](https://xuyonglinblog.oss-cn-beijing.aliyuncs.com/10.jpg)
#### 第3步
至此，本次循环就结束了，进入下一轮循环，然后会进入到oldEnd和newStart，就是oldVnode的D和newVnode的D的对比，更新差异之后，***将oldEnd对应的真实dom移动到oldStart的前面***，也就是把D放在A的前面，然后将oldEnd前移，newStart后移，变成下面的样子（注：当指针指向undefined时，end会前移，start会后移，所以我把箭头直接指向了B）。
![](https://xuyonglinblog.oss-cn-beijing.aliyuncs.com/11.jpg)

#### 第4步
接下来的情况就好说了，dom和期望的顺序已经是一致的了，接下来就是运用diff的start之间的比较更新下差异就行了。
