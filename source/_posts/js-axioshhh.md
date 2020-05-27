---
title: axioshhh
date: 2018-04-10 00:51:31
tags: javascript
categories: 学习
---

> 这几天在用Vue写销售系统，想着后台用node写几个接口，给前端用，之前登陆信息，暂时存在localStorage里，真是脸红。

<!--more-->

这个项目是很早之前写过的，没有网络请求，也没有Vuex，所以想着重写一遍，顺便捋捋node和http通信这一块。<br>

说实话，我觉得我后台很渣，但是也没想到这么渣，之前用原生js去封装ajax，啥事没有。<br>

今天用axios，各种Content-type不适配，好不容易好不容易传过来，打印出来是这样的
![](https://xuyonglinblog.oss-cn-beijing.aliyuncs.com/axioshhh.png)
exm????为啥传来的值在key上，
是我的body-parser用的不对吗？之前也是这么用的啊
```bash
let bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
```
好吧，先不管了，先用keys方法取出来，之后再研究，发现自己对前后端通信，一无所知。

### axios简介

axios是一个基于Promise用于浏览器和node的http客户端，是对ajax的封装，如同angular的httpclient。
通过npm install axios安装后，import引入，然后可以通过Vue.prototype.$http=axios，赋值在Vue的原型上，这样就可以在任何单页面组件里，使用axios。
值得一体的是axios不是个插件，之前我是通过Vue.use(axios)使用的，发现了各式各样的bug。

### axios配置
般一个项目中的根host和Content-Type都是统一的，这里对axios进行统一的配置（如果这个后端需要formData格式的表单即content-type='application/x-www-form-urlencoded;charset=utf-8'数据，需要对请求数据进行表单序列化，比较快的方式就是引入qs库qs.stringify进行处理后传输）

```bash
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.baseURL = _apiHost
```

### axios使用方法

基本使用方法
GET请求
```bash
// Make a request for a user with a given ID
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// Optionally the request above could also be done as
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

```


POST请求
```bash
 axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

```
同时执行多个
```bash
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // Both requests are now complete
  }));

```

可以直接通过config来完成请求
axios(config)
```bash
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
```
详情请点击[这里](https://www.kancloud.cn/yunye/axios/234845)
### 请求配置
```bash

{
  // `url` 是用于请求的服务器 URL
  url: '/user',

  // `method` 是创建请求时使用的方法
  method: 'get', // 默认是 get

  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: 'https://some-domain.com/api/',

  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function (data) {
    // 对 data 进行任意转换处理

    return data;
  }],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理

    return data;
  }],

  // `headers` 是即将被发送的自定义请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` 是即将与请求一起发送的 URL 参数
  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params: {
    ID: 12345
  },

  // `paramsSerializer` 是一个负责 `params` 序列化的函数
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // `data` 是作为请求主体被发送的数据
  // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  // 在没有设置 `transformRequest` 时，必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  data: {
    firstName: 'Fred'
  },

  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 1000,

  // `withCredentials` 表示跨域请求时是否需要携带cookie
  withCredentials: false, // 默认的

  // `adapter` 允许自定义处理请求，以使测试更轻松
  // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
  adapter: function (config) {
    /* ... */
  },

  // `auth` 表示应该使用 HTTP 基础验证，并提供凭据
  // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

  // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // 默认的

  // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` 是承载 xsrf token 的值的 HTTP 头的名称
  xsrfHeaderName: 'X-XSRF-TOKEN', // 默认的

  // `onUploadProgress` 允许为上传处理进度事件
  onUploadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },

  // `onDownloadProgress` 允许为下载处理进度事件
  onDownloadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },

  // `maxContentLength` 定义允许的响应内容的最大尺寸
  maxContentLength: 2000,

  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
  validateStatus: function (status) {
    return status >= 200 && status < 300; // 默认的
  },

  // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
  // 如果设置为0，将不会 follow 任何重定向
  maxRedirects: 5, // 默认的

  // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
  // `keepAlive` 默认没有启用
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // 'proxy' 定义代理服务器的主机名称和端口
  // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
  // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: : {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // `cancelToken` 指定用于取消请求的 cancel token
  // （查看后面的 Cancellation 这节了解更多）
  cancelToken: new CancelToken(function (cancel) {
  })
}
```

### 响应结构
```bash
{
  // `data` 由服务器提供的响应
  data: {},

  // `status` 来自服务器响应的 HTTP 状态码
  status: 200,

  // `statusText` 来自服务器响应的 HTTP 状态信息
  statusText: 'OK',

  // `headers` 服务器响应的头
  headers: {},

  // `config` 是为请求提供的配置信息
  config: {}
}
```

### 请求

后来做项目时，用axios遇到了一个问题，发送delete请求时，总是报405，询问后端之后了解到后台是允许delete method的，那为啥还会报405呢？
原来浏览器在发送delete请求时，会先发送一个options请求询问服务器是否允许浏览器以此方法、接口访问服务器，如果允许，浏览器会发送真实的delete请求。
之所以报405，是因为后台的Acess-Control-Allow-Methods里没有OPTIONS，所以就报了个405。

### 封装

```bash
import axios from 'axios';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { notification, Modal } from 'antd';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.interceptors.request.use(
    config => {
        config.headers.common.TaskId = +new Date() + '-' + String(Math.random()).slice(2);
       
        return {
            timeout: 100,
            ...config
        };
    },
    error => {
        NProgress.done();
        console.log('request', error);
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    res => {
        const { url } = res.config;

        NProgress.done();
        const { data } = res;

        if (data && `${data.errno}` !== '0') {
            switch (data.errno) {
                case 301: {
                    data.data.logoutURL &&
                        (window.location.href = data.data.logoutURL.replace(
                            '${jumpto}',
                            encodeURIComponent(window.location.href)
                        ));
                    return Promise.reject(res);
                }
                case 5000: {
                    // 5000 ： 业务接口正常，需要告警提示
                    notification.warning({
                        message: '警告',
                        description: data.errmsg || '未知警告',
                        duration: 10
                    });
                    // 正常数据逻辑
                    res.data.errno = 0;
                    break;
                }
                case 1066: {
                    // 系统上线提示
                    const { errmsg } = data;
                    const { title, content } = data.data;
                    Modal.warning({
                        centered: true,
                        title,
                        content: <p>{content || errmsg}</p>
                    });
                    break;
                }
                default: {
                    notification.error({
                        message: data.errtitle || '接口异常',
                        description: (
                            <Fragment>
                                <div>接口地址：{url}</div>
                                <div>错误信息：{data.errmsg || '未知异常'}</div>
                            </Fragment>
                        )
                    });
                    return Promise.reject(res);
                }
            }
        }
        return res;
    },
    function(error) {
        if (error.cancel !== true) {
            NProgress.done();
        }
        console.log('response', error);
        notification.error({
            message: `${error.config.url}：请求发生错误`,
            description: `${error.message}\n ${error.stack} `
        });
        return Promise.reject(error);
    }
);

export function get(url, data = {}, options = {}) {
    return axios
        .get(url, {
            params: data,
            ...options
        })
        .then(res => res.data);
}

export function post(url, data = {}, options = {}) {
    return axios.post(url, data, options).then(res => res.data);
}

```
