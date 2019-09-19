---
title: choppingHand1
date: 2018-06-8 12:38:50
tags: React Native
categories: 学习
---

>每次新学一种框架，实战要么todoList，要么购物应用，哈哈哈哈。

<!--more-->

今天

写了几个界面，登录注册啥的。界面如下：
<br>
注册界面
<br>
![](https://xuyonglinblog.oss-cn-beijing.aliyuncs.com/register.png)
<br>
登录界面
<br>
![](https://xuyonglinblog.oss-cn-beijing.aliyuncs.com/login.png)
<br>
首页
<br>
![](https://xuyonglinblog.oss-cn-beijing.aliyuncs.com/home.png)

顺手把页面逻辑跳转写了

```bash
const Tab = TabNavigator({
        Home: {
            screen: HomeView,
            navigationOptions: {
                tabBarLabel: '首页',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        selectedImage={require('./images/homeSelect.png')}
                        normalImage={require('./images/home.png')}
                    />
                )
            }
        },
        Cart: {
            screen: CartView,
            navigationOptions: {
                tabBarLabel: '购物车',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        selectedImage={require('./images/cartSelect.png')}
                        normalImage={require('./images/cart.png')}
                    />
                )
            }
        },
        Mine: {
            screen: MineView,
            navigationOptions: {
                tabBarLabel: '我',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        selectedImage={require('./images/mineSelect.png')}
                        normalImage={require('./images/mine.png')}
                    />
                )
            }
        }
    },
    // tabScreen配置
    {
        tabBarComponent: TabBarBottom, // 自定义
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: true,
        lazy: true,
        tabBarOptions: {
            activeTintColor: '#e5779c',
            inactiveTintColor: '#71777c',
            labelStyle: {
                fontSize: 12, // 文字大小
            }
        }

    }
);

const Stack =StackNavigator(
    {
        Login: {
            screen: LoginView,
            navigationOptions: {
                header: null
            }
        },
        Tab: {
            screen: Tab,
        },
        GoodPage:{
            screen: GoodPageView,
        },
        Register: {
            screen: RegisterView,
            navigationOptions: {
                header: null
            }
        },


    }, {
        navigationOptions: {
            // 开启动画
            animationEnabled: true,
            // 开启边缘触摸返回
            gesturesEnabled: true
        },
        mode: 'card'
    })

```
刚起了个头，发现用React Native写Android用的还是网站那一套，也不是那么的好玩。
