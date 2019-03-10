import request from '@/utils/request'

export function login(mobile, password,token,captcha) {
  return request({
    url: '/api/ucenter/login/web/pass',
    method: 'post',
    data: {
      mobile,
      password,
      token,
      captcha
    }
  })
}
export function getTokenss() {
  return request({
    url:'/api/ucenter/login/web/token',
    method:'get'
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/api/ucenter/user/mine/logout',
    method: 'post'
  })
}
