function compose(middleware){
    if(!Array.isArray(middleware)){
        throw new Error('must be array')
    }

    for(let fn of middleware){
        if(!(fn instanceof Function)){
        throw new Error('must be a function')

        }
    }
    return function(context, next){
        let index = -1;

        return dispatch(0);
        function dispatch(i){
            if(i <= index) return Promise.reject(new Error('next just call once'));
            index = i;
            let fn = middleware[i]
            if(i === middleware.length) fn = next;
            return Promise.resolve(fn(context, dispatch.bind(null, i+1)))
        }
    }
}

function compose(middlewares){

    return function(ctx, next){
        let index = -1;
        return dispatch(0);
        function dispatch(i){
            if(i<=index) return Promise.reject('just call once')
            let fn  = middlewares[i];
            index = i;
            if(i===middlewares.length) fn = next;
            try{
                Promise.resolve(fn(ctx, dispatch.bind(null, i+1)));
            }catch(e){
                Promise.reject(e);
            }

        }
    }
}