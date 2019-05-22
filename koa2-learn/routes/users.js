const router = require('koa-router')()
const Person = require('../db/models/person')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

// creat 创建
router.post('/creatperson',async (ctx)=>{
  const person = new Person({
    name:ctx.request.body.name,
    age:ctx.request.body.age
  })
  let code;
  try {
    await person.save();
    code = 0;
  } catch (error) {
    code = -1
  }
  ctx.body = {
    code:code
  }
})
// get 读取数据
router.post('/getperson',async (ctx)=>{
  const result = await Person.findOne({name:ctx.request.body.name});
  const results = await Person.find({name:ctx.request.body.name});
  ctx.body = {
    code:0,
    result,results
  }
})
// update 修改
router.post('/updateperson',async(ctx)=>{
  const result = await Person.where({
    name:ctx.request.body.name
  }).update({
    age:ctx.request.body.age
  })
  ctx.body = {
    code:0,result
  }
})
// remove 删除
router.post('/removeperson',async (ctx)=>{
  const result = await Person.where({
    name:ctx.request.body.name
  }).remove()
  ctx.body = {
    code:0,result
  }
})

module.exports = router
