// 记录后台http://地址
const address = `http://localhost:4000`//本地地址
// const address = `http://121.43.104.131:4000`// 线上地址

// 封装GET请求
const get = async (url, data={} )=> {
	return new Promise((resolve,reject)=>{
		 //网络请求
		 uni.request({
		 	url: address+url ,
			data: data,
			method: 'GET',
			success(res) {
				//把后台的数据带到页面上
				resolve(res.data)
			},
			fail(err){
				//请求失败
				reject(err)
			}
		 })
	})
}

// 封装POST请求
const post = async (url, data={} )=> {
	return new Promise((resolve,reject)=>{
		 //网络请求
		 uni.request({
		 	url: address+url ,
			data: data,
			method: 'POST',
			header: {
				// application/x-www-form-urlencoded
				"Content-Type": "application/x-www-form-urlencoded"
			},
			success(res) {
				//把后台的数据带到页面上
				resolve(res.data)
			},
			fail(err){
				//请求失败
				reject(err)
			}
		 })
	})
}

// 暴露网络地址
export const url = address;

// 接口1：注册
export const register = (data={}) => {
	return post('/api/user/register',data)
}

// 接口2：登录
export const login = (data={}) => {
	return post('/api/user/login',data)
}

// 接口3：发送邮箱验证码
export const sendEmail = (data={}) => {
	return get('/api/email/send',data)
}
// 接口4：校验邮箱验证码
export const verifyEamil = (data={}) => {
	return get('/api/email/verify',data)
}
// 接口5：设置密码
export const setpwd = (data={})=> {
	return post('/api/user/pwd',data)
}

//接口6：获取用户信息
export const getUserInfo = (data={})=> {
	return post('/api/user/info',data)
}
// 接口7：判断用户是否在线
export const isLogin = (data={})=>{
	return post('/api/user/logged',data)
}

// 接口8：获取轮播图列表
export const getBannerList = (data={})=> {
	return get('/api/banner/list',data)
}

// 接口9： 获取考试分类列表
export const getCategory = (data={})=> {
	return get('/api/exam/category_list',data)
}

// 接口10：主页试卷列表
export const getIndexList = (data={})=> {
	return get('/api/exam/exam_items',data)
}

// 接口11： 主页的搜索
export const indexSearch = (data={})=> {
	return get('/api/exam/exam_search',data)
}

// 接口12：获取试卷的详情信息
export const getExamDetail = (data={})=> {
	// 
	return get('/api/exam/exam_detail',data)
}

// 接口13：根据id获取试卷列表
export const getEaxmList = (data={})=>{
	return get('/api/exam/exam_list',data)
}

// 接口14： 根据试卷eid获取题目
export const getTopicList = (data={}) => {
	return get('/api/exam/topic_list',data)
}

// 接口15：添加考试成绩记录
export const addExamScore = (data={})=> {
	return post('/api/exam/exam_score_add', data)
}

// 接口16：获取个人考试成绩列表
export const getScoreList = (data={})=> {
	return get('/api/exam/exam_score_list',data)
}
// ... 