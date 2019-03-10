//处理接口
import axios from 'axios'
//处理query
import qs from 'qs'
//axios配置

import { Message, MessageBox } from 'element-ui'
import store from "../store";

const instance = axios.create({
  baseURL: 'http://dev.dbqp.com.cn/api/',
  headers: {
    'device': 'web',
    'Accept': 'application/json;charset=utf-8',
    "Content-Type": "application/x-www-form-urlencoded"
  },
  transformRequest: [function (data) {
    return qs.stringify({
      ...data,
      // token:'9142fa7e9b0bdcf0c212f2d657155e27'
    })
  }]
})

instance.interceptors.response.use(
  response => {
    // console.log(response)
    let {status, data} = response
    if (data.code === 0) {
      return data
    } else  if(data.code == 1){
//       // Notification({
//       //   title: '错误',
//       //   message: data.msg,
//       //   type: 'warning'
//       // })s
    }
    else  if(data.code == 101){
      MessageBox.confirm(
        '你已被登出，可以取消继续留在该页面，或者重新登录',
        '确定登出',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    }
    // if (response.data.code === 0) {
    //
    //   return response.data
    // } else {
    //   // alert(response.data.msg)
    //   return response.data
    //   console.log(data.msg)
    // }
  },
  error => {
    console.log(error)
  }
)
// axios.interceptors.response.use((response) => {
//
//   let {status, data} = response
//   if (status === 200 || status === 201) {
//     if (data.code == 0) {
//       return response
//     } else  if(data.code == 1){
//       // Notification({
//       //   title: '错误',
//       //   message: data.msg,
//       //   type: 'warning'
//       // })s
//     }else  if(data.code == 101){
//       // window.location.href ='http://test.dbqp.com.cn/login';
//     }
//   } else if (status === 302) {
//     return response
//   } else {
//     Notification({
//       title: '302',
//       message: data.message,
//       type: 'warning'
//     })
//     return Promise.reject(response)
//   }
// }, (error) => {
//   if (error.response) {
//     let {status} = error.response
//     if (status === 401) {
//       // window.location.href ='http://test.dbqp.com.cn/login';
//     }else{
//       // TODO: jhipster's format
//       if (error.response.data) {
//         let {title, message, detail} = error.response.data
//         let {status, statusText} = error.response // for nodejs.proxy
//         MessageBox({
//           title: title || status,
//           message: detail || message || statusText,
//           type: 'error'
//         })
//       } else {
//         Message.error(error.message)
//       }
//     }
//   } else {
//     if (error.message) {
//       Message.error(error.message)
//     } else {
//       Message.error('服务器错误')
//     }
//   }
//   return Promise.reject(error)
// })


//发送短信
export const sendSms = params => {
  return instance.post('/admin/sms/send', params)
}


//   --  用户模块  --
//获取临时token
export const getToken = params => {
  return instance.get('/ucenter/login/web/token', {params})
}

//登录
export const login = params => {
  return instance.post('/ucenter/login/web/pass', params)
}
//短信登录
export const smslogin = params => {
  return instance.post('/admin/ucenter/websms/login', params)
}
//administration
/* 系统管理 */
//权限列表
export const role = params => {
  return instance.get('/admin/system/role', {params})
}
//添加角色
export const addRole = params => {
  return instance.post('/admin/system/role', params)
}
//删除角色
export const delRole = params => {
  return instance.delete('/admin/system/role', {params})
}
//修改角色
export const ediRole = params => {
  return instance.put('/admin/system/role', params)
}
//获取用户权限
export const getRole = params =>{
  return instance.get('/admin/school/system/role/perm',{ params })
}

//===幼儿园管理===
//---园所管理---
//获取园所列表、信息列表查询
export const getKinder = params =>{
  return instance.get('/admin/school/school',{ params })
}
export const AddKinder = params =>{
  console.log(params)
  return instance.post('/admin/school/school',params)
}

//===考勤管理===
//---员工考勤---
//获取员工考勤信息、员工考勤查询
export const getTatten = params =>{
  return instance.get('/office/school/work/teacher',{ params })
}
//---员工请假---
//获取员工请假信息、员工请假查询
export const getLeave = params =>{
  return instance.get('/office/school/work/teacher_live',{ params })
}
//员工请假详情页面
export const getDetail = params =>{
  return instance.get("/office/school/work/teacher_live/"+params.id+"")
}
//员工请假审批意见
export const ensureformEdit = params => {
  return instance.post('/office/school/work/teacher_live/audit', params)
}


//===班次设置===

//班次列表
export const shift = params =>{
  return instance.get('/admin/school/work/shift',{ params })
}
//班次类型列表
export const shiftType = params =>{
  return instance.get('/admin/school/work/shift/type', { params })
}
//班次详情
export const shiftDetail = params =>{
  return instance.get('admin/school/work/shift', { params } )
}
//班次修改
export const fixShift = params =>{
  return instance.put('/admin/school/work/shift',params)
}
//班次删除
export const delShift = params =>{
  console.log(params.id)
  return instance.delete("/admin/school/work/shift/"+params.id)
}
//班次添加
export const addShift = params =>{
  return instance.post('/admin/school/work/shift', params )
}

const remove = (path, config) => {
  try {
    NProgress.start()
    let result = axios.delete(path, config)
    return result
  } finally {
    NProgress.done()
  }
}


export {instance,remove as delete}
