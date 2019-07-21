---
title: choppingHand2
date: 2018-06-15 13:07:12
tags: React Native
categories: 学习
---

这段时间把剩下的界面写完了，界面如下：
<!--more-->
<br>
商品详情界面
<br>
![](https://xuyonglinblog.oss-cn-beijing.aliyuncs.com/good.png)
<br>
购物车
<br>
![](https://xuyonglinblog.oss-cn-beijing.aliyuncs.com/cart.png)
<br>
收藏
<br>

![](https://xuyonglinblog.oss-cn-beijing.aliyuncs.com/like.png)
<br>
个人详情界面
<br>
![](https://xuyonglinblog.oss-cn-beijing.aliyuncs.com/mine.png)
<br>
订单界面
<br>
![](https://xuyonglinblog.oss-cn-beijing.aliyuncs.com/order.png)

期间完善了一下首页轮播图以及tab组件图片偶尔不能显示的问题，查了一下资料，原来
react-native-swiper还有react-native-scrollable-tab-view，这两个东西需要手动重新渲染界面,

```bash
    constructor(props) {
        super(props);
        this.state = {
            swipeShow: false,
            store:[]
        };
        this.txt = null
    }

    componentWillMount() {
        setTimeout(() => {
            this.setState({
                swipeShow: true,
            })
        })
    }

    renderSwiper() {
        return (
            <Swiper style={styles.swiper} autoplay={true} showsButtons>
                <View style={styles.slideShow}>
                    <Image style={styles.banner} source={require('../../images/slide1.jpg')}/>
                </View>
                <View style={styles.slideShow}>
                    <Image style={styles.banner} source={require('../../images/slide2.jpg')}/>
                </View>
                <View style={styles.slideShow}>
                    <Image style={styles.banner} source={require('../../images/slide3.jpg')}/>
                </View>
            </Swiper>
        )
    }
//...
              <View style={{width: width, height: 150,}}>
                  {this.state.swipeShow && this.renderSwiper()}
                </View>

```
同理react-native-scrollable-tab-view也是同样的解决方案。
