import Router from 'koa-router'
const router = new Router({
    prefix: '/city'
})
router.get('/list',async (ctx)=>{
    ctx.body = {
        list: ['上海','北京']
    }
})

export default router