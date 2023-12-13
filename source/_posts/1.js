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
