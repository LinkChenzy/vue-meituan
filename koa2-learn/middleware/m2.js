function m2(ctx){
    global.console.log('m2',ctx)
}

module.exports = function(){
    return async function(ctx,next){
        global.console.log('m2 start!')
        m2(ctx);
        await next();
        global.console.log('m2 end!')
    }
}