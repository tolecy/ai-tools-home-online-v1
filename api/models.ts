import httpRequest from "../common/request";

/** 获取可用模型列表 */
const getModels = (): any => {
  try {
    return httpRequest.get('/api/v1/models/list')
  } catch (error) {
    console.error(error)
    throw error
  }
}

/** 与AI聊天 */
const chat = (params: any): any => {
  try {
    return httpRequest.post('/api/v1/models/chat', params)
  } catch (error) {
    console.error(error)
    throw error
  }
}

export {
  getModels,
  chat
}
