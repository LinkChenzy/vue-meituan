import Router from "koa-router"
import Redis from 'koa-redis'
import Email from "../dbs/config"
import User from "../dbs/models/users"
import nodemailer from 'nodemailer'
import Passport from './util/passport'
import axios from './util/axios'
import passport from "./util/passport";

let router = new Router({prefix:'/users'});
let Store = new Redis().client;

router.post('/signup',async (ctx)=>{
    const {
        username,password,email,code
    } = ctx.request.body;
    // 判断code 
    if(code){
        // 存储redis
        const saveCode = await Store.hget(`nodemailer:${username}`,'code');
        const saveExpire = await Store.hget(`nodemailer:${username}`,'expire')
        if (code === saveCode) {
            if(new Date().getTime() - saveExpire > 0){
                ctx.body = {
                    code:-1,msg:'验证码已失效，请重新获取'
                }
                return false
            }
        }else{
            ctx.body = {
                code:-1,msg:'请输入正确的验证码'
            }
        }
    }else{
        ctx.body = {
            code:-1,msg:'验证码不能为空！'
        }
    }
    // 验证用户名是否已存在
    let user = await User.find({username});
    if(user.length){
        ctx.body = {
            code:-1,msg:'用户名已被注册'
        }
        return false;
    }
    // 用户不存在时，创建新用户
    let nuser = await User.create({username,password,email})
    if(nuser){
        let res = await axios.post('/users/signin',{username,password});
        if(res.data&&res.data.code === 0){
            ctx.body = {
                code:0,msg:'注册成功',user:res.data.user
            }
        }else{
            ctx.body = {
                code:-1,msg:'error'
            }
        }
    }else{
        ctx.body = {
            code:-1,msg:'注册失败'
        }
    }
})
// 登录
router.post('/signin',async (ctx,next)=>{
    return Passport.authenticate('local',(err,user,info,status)=>{
        if(err){
            ctx.body = {code:-1,msg:err}
        }else{
            if(user){
                ctx.body = {code:0,msg:'登录成功',user}
                return ctx.login(user)
            }else{
                ctx.body = {code:1,msg:info}
            }
        }
    })(ctx,next)
})
// 验证码
router.post('/verify',async (ctx,next)=>{
    const { username,email } = ctx.request.body;
    const saveExpire =  await Store.hget(`nodemailer:${username}`,'expire')
    if(saveExpire && new Date().getTime() - saveExpire < 0){
        ctx.body = { code:-1,msg:'验证码请求太频繁，一分钟一次'}
        return false;
    }
    // 发送工具 发送方
    let transporter = nodemailer.createTransport({
        // server:'qq',
        host:Email.smtp.host,
        port:587,
        auth:{
            user:Email.smtp.user,
            pass:Email.smtp.pass
        }
    })
    // 邮件接收方
    let ko = {
        code:Email.smtp.code(),
        expire:Email.smtp.expire(),
        email,
        user:username
    }
    // 邮件内容设置
    let mailOptions = {
        from:`"认证邮件" <${Email.smtp.user}>`,
        to:email,
        subject:'《慕课网高仿美团网全栈实战》注册码',
        html:`您在《慕课网高仿美团网全栈实战》课程中注册，您的邀请码是${ko.code}`,
    }
    // 发送
    await transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            return console.log('err',err)
        }else{
            Store.hmset(`nodemailer:${ko.user}`,'code',ko.code,'email',ko.email,'expire',ko.expire)
        }
    })
    // 接口返回值
    ctx.body = {
        code:0,msg:'发送验证码已发送，可能会有延时，有效期1分钟成功'
    }
})
// 退出
router.get('/exit',async (ctx)=>{
    await ctx.logout();
    if(!ctx.isAuthenticated()){
        ctx.body = {
            code:0,msg:'注销成功！'
        }
    }else{
        ctx.body = {
            code:-1,msg:"注销失败！"
        }
    }
})
// 获取用户列表
router.get('/getUser',async (ctx)=>{
    if (ctx.isAuthenticated()) {
        const {username, email} = ctx.session.passport.user
        ctx.body={
          user:username,
          email
        }
      }else{
        ctx.body={
          user:'',
          email:''
        }
      }
})


export default router;