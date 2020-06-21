const router = require('koa-router')()
const ajax = require('../api/ajax')
/* 引入数据库 */
const { UserModel } = require('../db/models.js')
/* 引入验证码的包 */
const svgCaptcha = require('svg-captcha')
/* md5加密 */
const md5 = require('blueimp-md5')
const session = require('koa-session')
const sms_util = require('../util/sms_util')
const user = {}


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

/* 根据经纬度获取位置 */
router.get('/position/:geohash', async (ctx, next) => {
    /* 取出携带的参数 */
    const { geohash } = ctx.params
    /* 发送请求 */
    await ajax(`http://cangdu.org:8001/v2/pois/${geohash}`)
        .then(data => {
            /* 返回数据 */
            ctx.body = {
                code: 0,
                data
            }
        })
})
/* 食品分类数据 */
router.get('/index_category', async ctx => {
    /* 使用定时器模拟发送请求数据 */
    const result = await getData()
    function getData() {
        return new Promise((resovle, reject) => {
            setTimeout(() => {
                const data = require('../data/index_category.json')
                /* 返回数据 */
                resovle(data)
            }, 300)
        })
    }
    ctx.body = { code: 0, data: result }
})
/* 根据经纬度获取商家列表 */
router.get('/shops', async ctx => {
    const query = ctx.query
    console.log(query)
    const reslut = await new Promise(resovle => {
        setTimeout(() => {
            const data = require('../data/shops.json')
            resovle(data)
        }, 300)
    })
    ctx.body = { code: 0, data: reslut }
})

/* 一次性验证码 */
router.get('/captcha', ctx => {
    console.log('haha')
    const captcha = svgCaptcha.create({
        ignoreChars: '0o1l',// 忽略长得相似的字母或数字
        noise: 2,
        color: true
    })
    let img = captcha.data // 验证码
    let text = captcha.text.toLowerCase() // 验证码字符，忽略大小写
    /* 使用session将此次的验证码保存下来，存到session中 */
    ctx.session.captcha = text
    ctx.response.type = 'image/svg+xml';
    ctx.body = img
})
/* 登录接口 */
router.post('/login_pwd', async ctx => {
    /* 取出传来的参数 */
    const username = ctx.request.body.username
    const password = md5(ctx.request.body.password)
    const captcha = ctx.request.body.captcha.toLowerCase()

    console.log(captcha, ctx.session.captcha)
    /* 对比图形验证码 */
    if (captcha !== ctx.session.captcha) {
        return ctx.body = {
            code: 1,
            msg: '验证码密码不正确'
        }
    }
    /* 删除保存的 captcha */
    delete ctx.session.captcha
    /* 操作数据库 */
    var user = await UserModel.findOne({ username })
    if (!user) {
        const user = await new UserModel({ username, password }, false).save()
        ctx.session.userid = user._id
        const data = { _id: user._id, username: user.username }
        ctx.body = { code: 0, data }
    } else {
        const userObj = user.toObject()
        if (userObj.password !== password) {
            ctx.body = { code: 1, msg: '用户名或密码不正确' }
        } else {
            /* 更新保存时间 */
            console.log('haha')
            ctx.session.userid = user._id
            ctx.body = { code: 0, data: { _id: user._id, name: userObj.username, phone: userObj.phone } }
        }
    }

})

/* 登出 */
router.get('/logout', async ctx => {
    delete ctx.session.userid
    ctx.body = { code: 0 }
})

router.get('/sendcode', async ctx => {
    /* 获取到手机号 */
    const phone = ctx.query.phone
    /* 生成验证码:随机生成6位验证码 */
    const code = sms_util.randomCode(6)
    console.log(`向${phone}发送验证码短信: ${code}`)
    /* 验证是否成功 */
    const result = await new Promise((resolve, reject) => {
        sms_util.sendCode(phone, code, function (success) {
            if (success) {
                /* 全局声明一个user对象,用来保存发送的验证码 */
                user[phone] = code
                resolve({ code: 0 })
            } else {
                reject({ code: 1, msg: '短信验证码发送失败' })
            }
        })
    })
    ctx.body = result
})

/* 短信登录 */
router.post('/login_sms', async ctx => {
    const phone = ctx.request.body.phone
    const code = ctx.request.body.code
    if (user[phone] !== code) {
        ctx.body = {
            code: 1,
            msg: '手机或验证码不正确'
        }
        return
    }
    delete user[phone]
    /* 以前是否登录过 */
    const currentUser = await UserModel.findOne({ phone })
    if (!currentUser) {
        const user = await new UserModel({ phone }).save()
        ctx.session.userid = user._id
        ctx.body = { code: 0, data: user }
    } else {
        /* 更新存储时间 */
        ctx.session.userid = currentUser._id
        ctx.body = { code: 0, data: currentUser }
    }
})
/* 查询 session 中存储的userid，用于免登陆操作 */
router.get('/userinfo', async ctx => {
    const userid = ctx.session.userid
    /* 查询数据库,过滤掉我们不需要的属性 */
    const user = await UserModel.findOne({ _id: userid }, { password: 0, __v: 0 })
    if (!user) {
        /* 清楚浏览器中保存的cookie */
        delete ctx.session.userid
        ctx.body = { code: 1, msg: '请先登录' }
    } else {
        ctx.body = { code: 0, data: user }
    }
})

/* 关键字搜索接口 */
router.get("/search_shops", async ctx => {
    const { geohash, keyword } = ctx.query
    const data = await ajax('http://cangdu.org:8001/v4/restaurants', {
        'extras[]': 'restaurant_activity',
        geohash,
        keyword,
        type: 'search'
    })
    ctx.body = { code: 0, data }
})


module.exports = router
