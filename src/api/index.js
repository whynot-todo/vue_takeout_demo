import ajax from './ajax'
export const reqAddress = (geohash) => ajax(`/position/${geohash}`)
