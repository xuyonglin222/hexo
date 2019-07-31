---
title: hexo 第一篇博文
date: 2018-01-05 12:05:36
tags: Hexo
---
这是生成hexo网站的第一篇文章，写一点关于hexo的东西吧。

### 初始

``` bash
npm install hexo -g #安装
npm update hexo -g #升级
hexo init #初始化
```
More info: [Writing](https://hexo.io/docs/writing.html)
<!--more-->

### 简写

``` bash
hexo n “name” == hexo new "name" #新建文章
hexo p == hexo publish #
hexo g == hexo generate #生成静态文件
hexo s == hexo server #启动服务
hexo d ==hexo deploy #部署到服务器
```

More info: [指令](https://hexo.io/zh-cn/docs/commands.html)
### 服务器

``` bash
hexo server #Hexo 会监视文件变动并自动更新，您无须重启服务器。
hexo server -s #静态模式
hexo server -p 5000 #更改端口
hexo server -i 192.168.1.1 #自定义 IP
```

### 完成后部署

``` bash
两个命令的作用是相同的
hexo generate --deploy
hexo deploy --generate
```

### 模版（Scaffold）
```bash
hexo new "postName" #新建文章
hexo new page "pageName" #新建页面
hexo generate #生成静态页面至public目录
hexo server #开启预览访问端口（默认端口4000，'ctrl + c'关闭server）
hexo deploy #将.deploy目录部署到GitHub

hexo new [layout] <title>
hexo new photo "My Gallery"
hexo new "Hello World" --lang tw

```
### 写作

#### 执行命令创建一篇新文章
```bash
hexo new page <title>
hexo new post <title>
```
**布局**（Layout）有三种默认布局：post, page, draft，可以自定义布局，自定义布局和post存储位置相同,都在scaffolds文件夹里。

**文件名称**
默认以主题为文章名称，可以在配置文件中设置new_post_name 参数，改变默认的文件名称。
:title 标题，类似的内容还有 :year :month : i_month(月份无前导0) :day :i_day


| 变量    |   描述    |
|---------:-----------
| :title  |   标题    |
| :year   | 建立的年份|
| :month  |建立的月份  |



```bash
hexo new [layout] <title>
```


#### 添加文章抬头信息
>&emsp;&emsp;hexo默认新建的文章抬头已有title、date、tags等属性，可能缺乏categories和meta标签，想要指定目录就需要添加categories属性，而meta标签则是为了便于搜索引擎的收录。想要修改的话，可以打开D:\Hexo\scaffolds\post.md文件在里面添加。

 ```bash
 title:  #文章标题
 date:  #时间，一般不用改
 categories:  #目录分类
 tags:  #标签，格式可以是[Hexo,总结]，中间用英文逗号分开
 keywords:  #文章关键词，多个关键词用英文逗号隔开
 ```
#### 文章图片的存放

>&emsp;&emsp;想要在文章中插入图片的话，可以按照Markdown语法来插入，格式为 ![图片名称](图片地址)。图片的存放有两种方式：在本地D:\Hexo\source\目录下新建一个存放图片的文件夹，比如images，然后把想要插入的图片放在里面，插入图片的路径；第二种方法是把图片上传到网络，然后插入图片路径。推荐使用第二种。<br>
　　推荐两个比较好用的:

+ [图床](http://tuchuang.org/);无需注册
+ [七牛云存储](https://portal.qiniu.com/signup?code=3lglas6pgi2qa)

### 主题
>&emsp;&emsp;使用Hexo更换主题还算方便，先使用克隆命令安装好主题，然后更改一下博客的配置文件D:\hexo\_config.yml里面的主题名称就好了。点击[这里](https://link.jianshu.com/?t=https://hexo.io/themes/)查看更多官方主题

#### 安装主题
&emsp;&emsp;在博客目录下右键点击Git Bash或使用终端进入文件夹，输入以下命令,以jacman主题为例

```Bash
git clone https://github.com/wuchong/jacman.git themes/jacman
```
#### 启用主题
&emsp;&emsp;修改博客目录下的_config.yml中的theme属性，将其设置为jacman。

```bash
theme:  jacman
```
#### 更新主题
&emsp;&emsp;在主题更新之前，一定要备份好主题目录下的_config.yml文件，尤其是到后面修改了很多配置之后。

```Bash
cd themes/jacman
git pull origin master
```
&emsp;&emsp;更多markdown语法点击[这里](https://www.jianshu.com/p/1e402922ee32/)
