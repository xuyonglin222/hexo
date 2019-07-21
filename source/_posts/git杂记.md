---
title: git杂记
date: 2018-12-07 16:33:09
tags: 杂记
---

不会git的程序员啥也不是。ps:作为杂记篇，持续更新，对工作上遇到的问题做个积累。
<!--more-->

### git的三个区域

+ 工作区，就是在编辑器里看到的那些代码
+ 缓存区，通过git add将指定文件添加到此区域
+ 版本库，通过git commit可以将文件存缓存区提交到此区域，其实就是提交记录的集合，可以通过commitId进行回滚，也可以将此次提交push到远程仓库。

### commitID
形如 1953***6c4ed4的这个东东，就是文件进行改动后，通过git commit命令生成的，可以当做一次提交的唯一标识，之后可以通过git reset/revert/checkout回滚。查看提交记录，可以使用  git log 或者git log  --oneline

### 一些常用的命令
#### git status (gst)
当你处于我是谁我在哪我要干嘛的状态时，你可以通过这个命令查看你之前改动了什么，你的工作目录处于一个什么样的工作状态。
#### git branch  
查看本地分支已经存在的分支，当前分支带*。
+ -r 查看远程分支
+ dev 加分支名，创建分支dev
+ -d dev 删除分支dev

#### git checkout
+ dev 切换到dev分支上，然后更新工作目录。

+ -b dev 创建dev分支，并切换， <strong>创建分支时，会复制当前分支的代码，多方协作时，最好先切换到master，并且git pull之后在创建并切换分支</strong>。

+ commitID file
  查看文件之前的版本。它将工作目录中的 file 文件变成 commitID 中那个文件的拷贝，并将它加入缓存区。

+ commitID
  更新工作目录中的所有文件，使得和某个特定提交中的文件一致。你可以将提交的哈希字串，或是标签作为 commitID参数。这会使指针处于分离HEAD的状态，然后你git log发现，woc，这之后的提交记录都没了，GG了。其实这个时候git checkout加你的分支名，就又回来了，这就是所谓的分支HEAD的意思，他就像一个虚拟的分支，你也可以再次状态下在复制一份创建分支。

+ -b dev origin/dev
	将上游dev分支拉取到本地，而且他的commit记录是完全复制自上游dev的，和之前所在的分支没有半毛钱关系。

#### git stash
如果你在现在的分支做了一半的工作，想切回其他的分支，直接checkout，往往会报错，add+commit的话，自己的提交记录又是一团糟，就可以使用这个命令将更改暂时存储到git的一个堆栈，然后就可以放心地切换到其他分支工作，最后切回来时，使用git  stash pop就可以恢复你的修改继续工作。PS:git stash是将修改提交到本地，并不会随着push推到远程。

### git pull
将上游更改拉下来与本地合并，相当于git fetch和git  merge，如果该分支尚未与上游关联则要加origin dev。（dev为分支名）

### git  revert

Revert 撤销一个提交的同时会创建一个新的提交。这是一个安全的方法，因为它不会重写提交历史。比如，下面的命令会找出倒数第二个提交，然后创建一个新的提交来撤销这些更改，然后把这个提交加入项目中。

### git  reset
这个命令可以消除提交记录，比如git reset HEAD~2，你的最后的两次提交记录就没了，但是你的工作区，并没有改变，可以通过这个命令让你的提交记录整洁起来。<br>
如果你加上--hard，那么你的工作区就会和你回到reset的那个状态，但是新增的文件依旧存在。

|命令      |作用域 |               常用场景           |
|------|--|----|
|git reset|提交层面|	在私有分支上舍弃一些没有提交的更改|
|git reset|	|文件层面|	将文件从缓存区中移除|
|git checkout|	提交层面|	切换分支或查看旧版本|
|git checkout|	文件层面|	舍弃工作目录中的更改|
|git revert     |	提交层面|	在公共分支上回滚更改|


+ [git好文](https://github.com/xuyonglin222/git-recipes/blob/master/sources/1-%E6%9E%9C%E5%A3%B3%E4%B8%AD%E7%9A%84Git.md)

+ [一个有意思的学习git的网站](https://learngitbranching.js.org)

