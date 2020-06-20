import ajax from './ajax'
export const reqAddress = (geohash) => ajax(`/position/${geohash}`)
export const reqFoodCategorys = () => ajax('/index_category')
export const reqShops = (longitude, latitude) => ajax('/shops', {longitude, latitude})

/* mock模拟数据 */
export const reqShopInfo = () => ajax('/info')
export const reqShopFoods = () => ajax('/goods')
export const reqShopRatings = () => ajax('/ratings')

/* 用户名和密码登录 */
export const reqPwdLogin = ({ username, password, captcha }) => ajax('/login_pwd', { username, password, captcha }, 'POST')
/* 登出接口 */
export const reqLogout = () => ajax('/logout')
/* 发送短信验证码 */
export const reqSendCode = (phone) => ajax('/sendcode',{phone})
/* 短信登录 */
export const reqSmsLogin = (phone, code) => ajax('/login_sms', {phone, code}, 'POST')
/* 请求用户信息，用于免登陆 */
export const reqUserInfo = () => ajax('/userinfo')