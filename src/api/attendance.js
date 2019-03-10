import request from '@/utils/request'
//====幼儿考勤查询功能===
export function searchStu() {
    return request({
      url:'/api/office/school/work/inout',
      method:'get'
    })
  }

  //幼儿考勤跳转页面
  export function pageturn({_index,_size}) {

    return request({
      url:'/api/office/school/work/inout',
      method:'get',
      params:{
        _index,
        _size
      }
    })
  }

//===幼儿请假查询功能===
export function searchva({startDate,endDate,name}) {
  return request({
    url:'/api/office/school/work/record',
    method:'get',
    params:{
      startDate,
      endDate,
      name
    }
  })
}

//幼儿请假跳转
export function pageturn_leave({_index,_size}) {

  return request({
    url:'/api/office/school/work/record',
    method:'get',
    params:{
      _index,
      _size
    }
  })
}




