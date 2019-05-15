const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/testAsync', async (ctx, next) => {
  const a = await new Promise((resolve,reject)=>{
    resolve('111')
  })
  const b = await new Promise((resolve,reject)=>{
    resolve('b')
  })
  ctx.body = {
    title: a,
    b:b
  }
})

module.exports = router
