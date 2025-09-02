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

/** 正则表达式翻译（从需求生成正则） */
const translateRegex = (params: any): any => {
  try {
    return httpRequest.post('/api/v1/models/translate_regex', params)
  } catch (error) {
    console.error(error)
    throw error
  }
}

/** 单图生图 */
const generateImageBy1p = (params: any): any => {
  try {
    return httpRequest.post('/api/v1/models/generate_image_by_1p', params, {
      responseType: 'blob',
      headers: {
        Accept: 'image/*'
      }
    })
  } catch (error) {
    console.error(error)
    throw error
  }
}

export {
  getModels,
  chat,
  translateRegex,
  generateImageBy1p
}
