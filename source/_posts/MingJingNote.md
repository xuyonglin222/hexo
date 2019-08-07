---
title: 由明镜项目引起的学习记录
date: 2019-07-25 23:54:06
tags: About
---

>将项目里遇到的坑，或者说一些优秀的想法记下来

<!--more-->

### import

import('/src/nav.js')是import的动态用法，返回值是一个promise，resolve的形如{ default: nav, __esModule: true }

### asyncComponent

对于加载页面时，并未立即显示的组件，可以采用异步组件的模式按需加载。

```bash

function loadComponent(getComponent){
    return class AsyncComponent extend PureComponent{
        static AsyComponent = null;
        state = {
            AsyComponent : AsyncComponent.AsyComponent
        };
        componentDidMount(){
            if(!this.state.AsyComponent){
                getComponent().then(({ default: Component }) => {
                    this.setState({
                        AsyComponent: Component
                    })
                })
            }
        }
        render(){
            const { AsyComponent } = this.state;
            return (
                if(AsyComponent){
                    <AsyComponent/>
                }

                return <Spin title='加载中....'/>
            )
        }
    }
}


```


### mapDispatchToProps

+ mapDispatchToProps用于建立组件跟store.dispatch的映射关系
+ 可以是一个object，也可以传入函数
+ 如果mapDispatchToProps是一个函数，它可以传入dispatch,ownProps, 定义UI组件如何发出action，实际上就是要调用dispatch这个方法

```bash
/* 假设actions是一个import进来的值为actionCreator的object */
action.increase = function (info) {
  return {
     {
        type:'INCREASE'，
        info
     }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    increase: (...args) => dispatch(actions.increase(...args)),
    decrease: (...args) => dispatch(actions.decrease(...args))
  }
}
```

调用actions.increase()只能得到一个 action对象{type:'INCREASE'} ，要触发这个 action必须在store 上调用 dispatch 方法。 diapatch正是 mapDispatchToProps的第一个参数。但是，为了不让 组件感知到 dispatch 的存在，需要将increase 和 decrease 两个函数包装一下，使之成为直接可被调用的函数（即，调用该方法就会触发 dispatch ）。

#### bindActionCreator
bindActionCreator可以将action包装成可以被调用的函数。
```bash
import {bindActionCreators} from 'redux';

const mapDispatchToProps = {
} = (dispatch, ownProps) => {
  return bindActionCreators({
    increase: action.increase,
    decrease: action.decrease
  }, dispatch);
}

/* 返回跟上面一样的object */
{
   increase: (...args) => dispatch(action.increase(...args)),
   decrease: (...args) => dispatch(action.decrease(...args)),
}
```

+ 如果mapDispatchToProps是一个函数, 并且传入ownProps, 当组件获取新的props的时候，mapDispatchToProps也会被调用.
+ 传入一个object，其中这个object所对应的value必须是actionCreator，这样redux里面会自动帮我们调用bindActionCreator，所以上面又可以变成

```bash
const mapDispatchToProps = {
    ...action
}
```

##### 参考地址
[https://imweb.io/topic/5a426d32a192c3b460fce354](https://imweb.io/topic/5a426d32a192c3b460fce354)

### antd 
#### CheckBox 
+ 描述： form.resetFields时，不能重置checkbox
+ 解决办法：在getFieldDecorator(key, options)的options里添加{valuePropName: 'checked'}

#### rangePicker
+ 默认时间不显示
+ 解决办法：用initialValue而不是defaultValue更不是defaultPickerValue

#### 小常识
被form.create()包裹的组件，当form控件的的值方式变化的时候，会触发自定义组件的rerender。