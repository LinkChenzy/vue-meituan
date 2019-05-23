function m1(ctx){
    ctx.session.count ++ ;
    global.console.log('m1')
}

module.exports = function(){
    return async function(ctx,next){
        global.console.log('m1 start!')
        m1(ctx);
        await next();
        global.console.log('m1 end!')
    }
}