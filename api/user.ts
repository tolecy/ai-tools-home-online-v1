import httpRequest from "../common/request";

/** 获取用户信息 */
const getUserInfo = () => {
  try {
    return httpRequest.get('/api/v1/users/me')
  } catch (error) {
    console.error(error)
    throw error
  }
}

/** Google登录认证 */
const googleSignIn = (token: string) => {
  try {
    return httpRequest.post('/api/v1/auth/google-login', { token })
  } catch (error) {
    console.error(error)
    throw error
  }
}

/** 用户注册 */
const register = (params: any) => {
  try {
    return httpRequest.post('/api/v1/auth/register', params)
  } catch (error) {
    console.error(error)
    throw error
  }
}

/** 用户登录 */
const login = (params: any) => {
  try {
    return httpRequest.post('/api/v1/auth/login-with-password', params)
  } catch (error) {
    console.error(error)
    throw error
  }
}

/** 退出登录 */
const logout = () => {
  try {
    return httpRequest.post('/api/v1/auth/logout', {})
  } catch (error) {
    console.error(error)
    throw error
  }
}

/** 更新用户信息 */
const updateUserInfo = (params: any) => {
  try {
    return httpRequest.Put('/api/v1/users/me', params)
  } catch (error) {
    console.error(error)
    throw error
  }
}

export {
  getUserInfo,
  googleSignIn,
  register,
  login,
  logout,
  updateUserInfo
}