setTimeout(()=>{
    console.log(1);
     new Promise((resolve)=>{
    console.log(9);
    resolve()
}).then(()=>{
        console.log(6)
    })
})

new Promise((resolve)=>{
    console.log(7);
    resolve()
}).then(()=>{
    console.log(2)
})
new Promise((resolve)=>{
    console.log(8);
    resolve()
}).then(()=>{
    console.log(3)
}).then(()=>{
    console.log(4)
})
setTimeout(()=>{
    console.log(5)
})
var SyncLane =

1;
var InputContinuousHydrationLane =
   
2;
var InputContinuousLane =
            
4;
var DefaultHydrationLane =
           
8;
var DefaultLane =

16;
var TransitionHydrationLane =
               
32;
var TransitionLanes =

4194240;
var TransitionLane1 =

64;
var TransitionLane2 =

128;
var TransitionLane3 =

256;
var TransitionLane4 =

512;
var TransitionLane5 =

1024;
var TransitionLane6 =

2048;
var TransitionLane7 =

4096;
var TransitionLane8 =

8192;
var TransitionLane9 =

16384;
var TransitionLane10 =

32768;
var TransitionLane11 =

65536;
var TransitionLane12 =

131072;
var TransitionLane13 =

262144;
var TransitionLane14 =

524288;
var TransitionLane15 =

1048576;
var TransitionLane16 =

2097152;
var RetryLanes =
                           
130023424;
var RetryLane1 =
                            
4194304;
var RetryLane2 =
                            
8388608;
var RetryLane3 =
                            
16777216;
var RetryLane4 =
                            
33554432;
var RetryLane5 =
                            
67108864;
var SomeRetryLane = RetryLane1;
var SelectiveHydrationLane =
         
134217728;
var NonIdleLanes =
                         
268435455;
var IdleHydrationLane =
              
268435456;
var IdleLane =

536870912;
var OffscreenLane =

1073741824;
