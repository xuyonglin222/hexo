---
title: sort
date: 2018-07-25 11:33:49
tags: 算法
categories: 学习
---
先来张图片
<img  src="http://pdqpny9og.bkt.clouddn.com/paixu.png" />
<!--more-->
### 冒泡排序
#### 算法描述

+ <1>.比较相邻的元素。如果第一个比第二个大，就交换它们两个；
+ <2>.对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数；
+ <3>.针对所有的元素重复以上的步骤，除了最后一个；
+ <4>.重复步骤1~3，直到排序完成。

#### 代码实现
设置一标志性变量pos,用于记录每趟排序中最后一次进行交换的位置。由于pos位置之后的记录均已交换到位,故在进行下一趟排序时只要扫描到pos位置即可。
```bash
function bubbleSort(arr) {
    var i = arr.length-1;  //初始时,最后位置保持不变
    while ( i> 0) {
        var pos= 0; //每趟开始时,无记录交换
        for (var j= 0; j< i; j++)
            if (arr[j]> arr[j+1]) {
                pos= j; //记录交换的位置
                var tmp = arr[j]; arr[j]=arr[j+1];arr[j+1]=tmp;
            }
        i= pos; //为下一趟排序作准备
     }
     console.timeEnd('改进后冒泡排序耗时');
     return arr;
}
```

### 选择排序
#### 算法描述

+ <1>.初始状态：无序区为R[1..n]，有序区为空；
+ <2>.第i趟排序(i=1,2,3...n-1)开始时，当前有序区和无序区分别为R[1..i-1]和R(i..n）。该趟排序从当前无序区中-选出关键字最小的记录 R[k]，将它与无序区的第1个记录R交换，使R[1..i]和R[i+1..n)分别变为记录个数增加1个的新有序区和记录个数减少1个的新无序区；
+ <3>.n-1趟结束，数组有序化了。

#### 代码实现

```bash
function selectionSort(arr) {
    var len = arr.length;
    var minIndex, temp;
    for (var i = 0; i < len - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {     //寻找最小的数
                minIndex = j;                 //将最小数的索引保存
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}
```
### 插入排序
#### 算法描述

+ <1>.从第一个元素开始，该元素可以认为已经被排序；
+ <2>.取出下一个元素，在已经排序的元素序列中从后向前扫描；
+ <3>.如果该元素（已排序）大于新元素，将该元素移到下一位置；
+ <4>.重复步骤3，直到找到已排序的元素小于或者等于新元素的位置；
+ <5>.将新元素插入到该位置后；
+ <6>.重复步骤2~5。

#### 代码描述
```bash
function insertionSort(array) {
    for (var i = 1; i < array.length; i++) {
            var key = array[i];
            var j = i - 1;
            while (j >= 0 && array[j] > key) {
                array[j + 1] = array[j];
                j--;
            }
            array[j + 1] = key;
        }
        return array;
}
```
#### 算法分析
+ 最佳情况：输入数组按升序排列。T(n) = O(n)
+ 最坏情况：输入数组按降序排列。T(n) = O(n2)
+ 平均情况：T(n) = O(n2)

### 希尔排序
#### 算法描述

+ <1>. 选择一个增量序列t1，t2，…，tk，其中ti>tj，tk=1；
+ <2>.按增量序列个数k，对序列进行k 趟排序；
+ <3>.每趟排序，根据对应的增量ti，将待排序列分割成若干长度为m 的子序列，分别对各子表进行直接插入排序。仅增量因子为1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。

#### 代码实现
```bash
function shellSort(arr) {
    var len = arr.length,
        temp,
        gap = 1;
    console.time('希尔排序耗时:');
    while(gap < len/5) {          //动态定义间隔序列
        gap =gap*5+1;
    }
    for (gap; gap > 0; gap = Math.floor(gap/5)) {
        for (var i = gap; i < len; i++) {
            temp = arr[i];
            for (var j = i-gap; j >= 0 && arr[j] > temp; j-=gap) {
                arr[j+gap] = arr[j];
            }
            arr[j+gap] = temp;
        }
    }
    console.timeEnd('希尔排序耗时:');
    return arr;
}
```
#### 算法分析
+ 最佳情况：T(n) = O(nlog2 n)
+ 最坏情况：T(n) = O(nlog2 n)
+ 平均情况：T(n) =O(nlog n)

### 归并排序
#### 算法描述

+ <1>把长度为n的输入序列分成两个长度为n/2的子序列；
+ <2>对这两个子序列分别采用归并排序；
+ <3>将两个排序好的子序列合并成一个最终的排序序列。

#### 代码实现
```bash
function mergeSort(arr) {  //采用自上而下的递归方法
    var len = arr.length;
    if(len < 2) {
        return arr;
    }
    var middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right)
{
    var result = [];
    console.time('归并排序耗时');
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length)
        result.push(left.shift());

    while (right.length)
        result.push(right.shift());
    console.timeEnd('归并排序耗时');
    return result;
}
```
#### 算法分析
+ 最佳情况：T(n) = O(n)
+ 最坏情况：T(n) = O(nlog n)
+ 平均情况：T(n) =O(nlog n)


### 快速排序
#### 算法描述

+ <1>从数列中挑出一个元素，称为 "基准"（pivot）；
+ <2>重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
+ <3>递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。

#### 代码实现
```bash
var arr = [12,3,23,5,17,9,15,46];

function quickSort(arr,left, right){
  var i,j,t,temp;
  if(left>right){
    return;
  }
  i = left;
  j = right;
  temp = arr[left];

  while(i!==j){
    while(temp<=arr[j]&&i<j){
      j--;
    }
    while(temp>=arr[i]&&i<j){
      i++
    }
    if(i<j){
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
  }
  arr[left] = arr[i];
  arr[i] = temp;
  quickSort(arr,left,i-1);
  quickSort(arr,i+1,right);
}
quickSort(arr,0, arr.length-1);
console.log(arr);
```
#### 算法分析
+ 最佳情况：T(n) = O(nlogn)
+ 最坏情况：T(n) = O(n2)
+ 平均情况：T(n) =O(nlog n)


### 堆排序
#### 算法描述

+ <1>将初始待排序关键字序列(R1,R2....Rn)构建成大顶堆，此堆为初始的无序区；
+ <2>将堆顶元素R[1]与最后一个元素R[n]交换，此时得到新的无序区(R1,R2,......Rn-1)和新的有序区(Rn),且满足R[1,2...n-1]<=R[n]；
+ <3>由于交换后新的堆顶R[1]可能违反堆的性质，因此需要对当前无序区(R1,R2,......Rn-1)调整为新堆，然后再次将R[1]与无序区最后一个元素交换，得到新的无序区(R1,R2....Rn-2)和新的有序区(Rn-1,Rn)。不断重复此过程直到有序区的元素个数为n-1，则整个排序过程完成。
#### 代码实现
```bash
function heapify(arr, x, len) {
    if (Object.prototype.toString.call(arr).slice(8, -1) === 'Array' && typeof x === 'number') {
        var l = 2 * x + 1, r = 2 * x + 2, largest = x, temp;
        if (l < len && arr[l] > arr[largest]) {
            largest = l;
        }
        if (r < len && arr[r] > arr[largest]) {
            largest = r;
        }
        if (largest != x) {
            temp = arr[x];
            arr[x] = arr[largest];
            arr[largest] = temp;
            heapify(arr, largest, len);
        }
    } else {
        return 'arr is not an Array or x is not a number!';
    }
}
/*方法说明：维护堆的性质
@param  arr 数组
@param  x   数组下标
@param  len 堆大小*/
function heapify(arr, x, len) {
    if (Object.prototype.toString.call(arr).slice(8, -1) === 'Array' && typeof x === 'number') {
        var l = 2 * x + 1, r = 2 * x + 2, largest = x, temp;
        if (l < len && arr[l] > arr[largest]) {
            largest = l;
        }
        if (r < len && arr[r] > arr[largest]) {
            largest = r;
        }
        if (largest != x) {
            temp = arr[x];
            arr[x] = arr[largest];
            arr[largest] = temp;
            heapify(arr, largest, len);
        }
    } else {
        return 'arr is not an Array or x is not a number!';
    }
}
```
#### 算法分析
+ 最佳情况：T(n) = O(nlogn)
+ 最坏情况：T(n) = O(nlogn)
+ 平均情况：T(n) =O(nlogn)
