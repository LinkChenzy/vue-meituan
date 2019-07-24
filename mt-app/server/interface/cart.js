import Router       from 'koa-router'
import Cart         from '../dbs/models/cart'
import md5           from 'crypto-js/md5'

let router = new Router({prefix:'/cart'});

// 创建新的购物车
router.post('/create',async ctx=>{
    // 判断是否是登录状态
    if(!ctx.isAuthenticated()){
        ctx.body = {
            code:-1,msg:'请登录'
        }
    }else{
        let time = Date()
        let cartNo = md5(Math.random() * 1000 + time).toString()
        const { params:{id,detail} } = ctx.request.body;
        const cart = new Cart({ id,cartNo,time,detail,user:ctx.session.passport.user})
        const result = cart.save();
        if(result){
            ctx.body = {
                code:0,
                id:cartNo
            }
        }else{
            ctx.body = {
                code:-1,msg:'购物车创建失败'
            }
        }
    }
})

// 获取购物车的订单
router.post('/getCart',async ctx=>{
    // 得到购物车的ID
    const { id } = ctx.request.body;
    let result = await Cart.findOne({cartNo:id})
    if(result){
        ctx.body = {
            code:0,
            data:result
            ? result.detail[0]
            : {}
        }
    }else{
        ctx.body = {
            code:-1,
            data:{}
        }
    }
})

export default router;