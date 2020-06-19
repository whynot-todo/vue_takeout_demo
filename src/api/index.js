import ajax from './ajax'
export const reqAddress = (geohash) => ajax(`/position/${geohash}`)
export const reqFoodCategorys = () => ajax('/index_category')
export const reqShops = (longitude, latitude) => ajax('/shops', {longitude, latitude})

/* mock模拟数据 */
export const reqShopInfo = () => ajax('/info')
export const reqShopFoods = () => ajax('/goods')
export const reqShopRatings = () => ajax('/ratings')

/* 用户名和密码登录 */
export const reqPwdLogin = ({username, password, captcha}) => ajax('/login_pwd', {username, password, captcha}, 'POST')