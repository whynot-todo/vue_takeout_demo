const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/takeout',{ useNewUrlParser: true,useUnifiedTopology: true})//xxxx为数据库的名称
const connection= mongoose.connection
connection.on('connected', () => {
  console.log('db connect success!')
})

const userSchema = mongoose.Schema({
    'name': {type: String},
    'pwd': {type: String},
    'phone': {'type': String}
})
//新建集合
const UserModel = mongoose.model('users', userSchema) 

/* 这里我们选择把暴露出一个函数，拖过函数来得到对应的Model */
exports.UserModel = UserModel
