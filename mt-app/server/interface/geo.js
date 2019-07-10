import Router from 'koa-router'
import axios from 'axios'
import sign from './util/sign'

let router = new Router({prefix:'/geo'});

router.get('/getPosition',async (ctx)=>{
    const {status,data:{province,city}} = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)
    if(status === 200){
        ctx.body = {
            province,city
        }
    }else{
        ctx.body = {
            province:'',city:''
        }
    }
})

export default router;