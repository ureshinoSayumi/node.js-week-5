const sucessHandle = require('../service/sucessHandle')
const handleErrorAsync = require('../service/handleErrorAsync')
const Post = require('../models/post')
const User = require('../models/user')
const addError = require('../service/addError')

const postController = {
	getAllPosts: async function(req, res, next) {
		console.log(req.query, 'req.query')
		const timeSort = req.query.timeSort == "asc" ? "createdAt":"-createdAt"
		const q = req.query.q !== undefined ? {"content": new RegExp(req.query.q)} : {}
		const newPost = await Post.find(q).populate({
			path: 'user',
			select: 'name photo '
		}).sort(timeSort)
		sucessHandle(res, newPost, '取得成功')
	},
	getPost: handleErrorAsync(async (req, res, next) => {
		const id = req.params.id
		const newPost = await Post.findById(id).populate({
			path: 'user',
			select: 'name photo'
		})
		if (newPost === null) {
			return addError(400, '無此資料', next)
		}
		sucessHandle(res, newPost, '取得成功')    
  }),
	
	createPost: handleErrorAsync(async function(req, res, next) {
		const createData = req.body
		if (!createData.content) {
			return addError(400, '單筆建立失敗，貼文內容必填', next)
		}
		if (!createData.user) {
			return addError(400, '單筆建立失敗，使用者ID必填', next)
		}
		const checkUser = await User.findById(createData.user).catch((err) => null)
		if (checkUser === null) {
			return addError(400, '單筆建立失敗，無此使用者ID', next)
		}

		const newPost = await Post.create(createData)
		sucessHandle(res, newPost, '建立成功')
	}),
	updatePost: handleErrorAsync(async (req, res, next) => {
		const id = req.params.id
		const updateData = req.body
		if (!updateData.content) {
			return addError(400, '單筆編輯失敗，貼文內容必填', next)
		}
		if (!updateData.user) {
			return addError(400, '單筆編輯失敗，使用者ID必填', next)
		}
		const checkUser = await User.findById(updateData.user).catch((err) => null)
		if (checkUser === null) {
			return addError(400, '單筆編輯失敗，無此使用者ID', next)
		}
		
		const newPost = await Post.findByIdAndUpdate(id, updateData, { returnDocument: 'after' })
		sucessHandle(res, newPost, '編輯成功')
  }),
	deleteAllPost: async (req, res) => {
    const newPost  = await Post.deleteMany({})
    sucessHandle(res, newPost, '成功刪除全部貼文')
  },
}

module.exports = postController;