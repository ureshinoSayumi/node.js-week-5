const sucessHandle = require('../service/sucessHandle')
const addError = require('../service/addError')
const handleErrorAsync = require('../service/handleErrorAsync')
const User = require('../models/user')

const userController = {
	getAllUser: async function(req, res, next) {
		const newUser = await User.find()
	  sucessHandle(res, newUser, '取得成功')
	},
	createUser: handleErrorAsync(async function(req, res, next) {
		const createUser = req.body;
		console.log(req.body, 'asd')
		if (!createUser.name || !createUser.email) {
			return addError(400, '單筆建立失敗，名稱必填', next)
		}
		const newUser = await User.create(req.body)
		sucessHandle(res, newUser, '建立成功')
	})
}

module.exports = userController;