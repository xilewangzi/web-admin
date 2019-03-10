import { searchStu,searchva,pageturn,pageturn_leave } from '@/api/attendance'

const attendance = {

    state:{

    },
    // namespaced: true,
    actions:{
        //===幼儿考勤查询===
        SearCh({ commit }){

            return new Promise((resolve, reject) => {
              searchStu({

                }).then(response => {

                const data = response.data

                // setToken(data.token)
                // commit('SET_TOKEN', '66666666')
                resolve(response.data)
              }).catch(error => {
                reject(error)
              })
            })
          },
        //幼儿请假跳转页面
        PageTurn({ commit },formSearch){

        return new Promise((resolve, reject) => {

          pageturn(
            { 
              _index:formSearch.page,
              _size:formSearch.size
            }).then(response => {

            const data = response.data

            // setToken(data.token)
            // commit('SET_TOKEN', '66666666')

            resolve(response.data)

          }).catch(error => {
            reject(error)
          })
        })
      },

      //===幼儿请假查询===
      SearChVacate({ commit },formSearch){

        return new Promise((resolve, reject) => {
          searchva(
            {
              startDate:formSearch.startDate,
              endDate:formSearch.endDate,
              name:formSearch.name
            }
          ).then(response => {

            const data = response.data
            // setToken(data.token)
            // commit('SET_TOKEN', '66666666')
            resolve(response.data)
          }).catch(error => {
            reject(error)
          })
        })

      },
      //幼儿请假跳转
      PageTurn_leave({ commit },formSearch){
        return new Promise((resolve, reject) => {
          pageturn_leave(
            { 
              _index:formSearch.page,
              _size:formSearch.size
            }).then(response => {

            const data = response.data

          //   let {
          //     data
          // } = response.data

            // setToken(data.token)
            // commit('SET_TOKEN', '66666666')

            resolve(response.data)

          }).catch(error => {
            reject(error)
          })
        })
      }
    }

}

export default attendance
