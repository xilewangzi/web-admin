import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: '首页',
    hidden: true,
    children: [
      {
      path: '/home',
      component: () => import('@/views/dashboard/index')
    },
    ]
  },
  //幼儿园管理
  {
    path: '/kindergarten',
    component: Layout,
    redirect: '/kindergarten/kindergarten-school',
    name: 'kindergarten',
    meta: { title: '幼儿园管理', icon: 'example' },
    children: [
      {
        path: 'kindergarten-school',
        name: 'kindergarten-school',
        component: () => import('@/views/kindergarten/kindergarten_school'),
        meta: { title: '园所管理', icon: 'table' }
      },
      {
        path: '/kindergarten/kindergarten_add',
        name: 'kindergarten-school',
        component: () => import('@/views/kindergarten/kindergarten_add'),
        meta: { title: '添加园所', icon: 'table' }
      },
      {
        path: 'classroom/setList',
        name: 'setList',
        component: () => import('@/views/kindergarten/Classroom'),
        meta: { title: '教室管理', icon: 'table' }
      },
      {
        path: 'classroom/functionClass',
        name: 'functionClass',
        component: () => import('@/views/kindergarten/FunctionClass'),
        meta: { title: '功能室管理', icon: 'tree' }
      }
    ]
  },
  //班级信息管理
  {
    path: '/class',
    component: Layout,
    redirect: '/class/list/list',
    name: 'class',
    meta: { title: '班级信息管理', icon: 'example' },
    children: [
      {
        path: 'list/list',
        name: 'list/list',
        component: () => import('@/views/class/ClassInfo'),
        meta: { title: '班级信息', icon: 'table' }
      },
      {
        path: 'infantinfo/list',
        name: 'infantinfo/list',
        component: () => import('@/views/class/Infantinfo'),
        meta: { title: '班级幼儿信息', icon: 'table' }
      },
      {
        path: 'allocation/list',
        name: 'allocation/list',
        component: () => import('@/views/class/Allocation'),
        meta: { title: '班级教师分配', icon: 'tree' }
      },
      {
        path: 'info_circle/parentAddress',
        name: 'parentAddress',
        component: () => import('@/views/class/ParentAddress'),
        meta: { title: '家长通讯录', icon: 'tree' }
      }
    ]
  },
  //教职工信息管理
  {
    path: '/staff',
    component: Layout,
    redirect: '/staff/division/list',
    name: 'staff',
    meta: { title: '教职工信息管理', icon: 'example' },
    children: [
      {
        path: 'division/list',
        name: 'division/list',
        component: () => import('@/views/staff/Division'),
        meta: { title: '部门管理', icon: 'table' }
      },
      {
        path: 'employeenews/list',
        name: 'employeenews/list',
        component: () => import('@/views/staff/Employeenews'),
        meta: { title: '员工信息', icon: 'tree' }
      },
      {
        path: 'employee_address/list',
        name: 'employee_address/list',
        component: () => import('@/views/staff/Employee_address'),
        meta: { title: '员工通讯录', icon: 'tree' }
      }
    ]
  },
  //设备管理
  {
    path: '/equipment',
    component: Layout,
    redirect: '/equipment/list/supplier',
    name: 'equipment',
    meta: { title: '设备管理', icon: 'example' },
    children: [
      {
        path: 'list/supplier',
        name: '/equipment/list/supplier',
        component: () => import('@/views/equipment/Supplier'),
        meta: { title: '供货商信息', icon: 'table' }
      },
      {
        path: 'list/deviceType',
        name: 'list/deviceType',
        component: () => import('@/views/equipment/DeviceType'),
        meta: { title: '设备型号', icon: 'tree' }
      },
      {
        path: 'list/maintenance',
        name: 'list/maintenance',
        component: () => import('@/views/equipment/Maintenance'),
        meta: { title: '设备维护', icon: 'tree' }
      }
    ]
  },
  //系统管理
  {
    path: '/system',
    component: Layout,
    redirect: '/system/kindergarten_role',
    name: 'system',
    meta: { title: '系统管理', icon: 'example' },
    children: [
      {
        path: 'kindergarten_role',
        name: 'kindergarten_role',
        component: () => import('@/views/system/Kindergarten_role'),
        meta: { title: '幼儿园角色', icon: 'tree' }
      },
      {
        path: 'system_role',
        name: 'system_role',
        component: () => import('@/views/system/System_role'),
        meta: { title: '系统角色', icon: 'tree' }
      },
      {
        path: 'system_user',
        name: 'system_user',
        component: () => import('@/views/system/System_user'),
        meta: { title: '系统用户', icon: 'tree' }
      },
      {
        path: 'kindergarten_user',
        name: 'kindergarten_user',
        component: () => import('@/views/system/Kindergarten_user'),
        meta: { title: '幼儿园用户', icon: 'tree' }
      },
    ]
  },
  //安全监控
  {
    path: '/secure',
    component: Layout,
    redirect: '/secure/videoMonitor',
    name: 'secure',
    meta: { title: '安全监控', icon: 'example' },
    children: [
      {
        path: 'videoMonitor',
        name: 'videoMonitor',
        component: () => import('@/views/secure/VideoMonitor'),
        meta: { title: '实时审核', icon: 'table' }
      },
      {
        path: 'exception_hand',
        name: 'exception_hand',
        component: () => import('@/views/secure/Exception_hand'),
        meta: { title: '异常处理', icon: 'tree' }
      },
    ]
  },
  //考勤管理
  {
    path: '/attendance',
    component: Layout,
    redirect: '/attendance/student/list',
    name: 'attendance',
    meta: { title: '考勤管理', icon: 'example' },
    children: [
      {
        path: 'student/list',
        name: 'student/list',
        component: () => import('@/views/attendance/Student'),
        meta: { title: '幼儿考勤', icon: 'table' }
      },
      {
        path: 'student_vacate/list',
        name: 'student_vacate/list',
        component: () => import('@/views/attendance/Student_vacate'),
        meta: { title: '幼儿请假', icon: 'tree' }
      },
      {
        path: 'teacher/list',
        name: 'teacher/list',
        component: () => import('@/views/attendance/Teacher'),
        meta: { title: '员工考勤', icon: 'tree' }
      },
      {
        path: 'teacher_vacate/list',
        name: 'teacher_vacate/list',
        component: () => import('@/views/attendance/Teacher_vacate'),
        meta: { title: '员工请假', icon: 'tree' }
      },
      {
        path: 'teacher_replenish/list',
        name: 'teacher_replenish/list',
        component: () => import('@/views/attendance/Teacher_replenish'),
        meta: { title: '员工补卡', icon: 'tree' }
      },
      {
        path: 'set_classes/list',
        name: 'set_classes/list',
        component: () => import('@/views/attendance/Set_classes'),
        meta: { title: '班次设置', icon: 'tree' }
      }
    ]
  },
  //膳食营养
  {
    path: '/diet',
    component: Layout,
    redirect: '/diet/food_menu/diet_manage',
    name: 'diet',
    meta: { title: '膳食营养', icon: 'example' },
    children: [
      {
        path: 'food_menu/diet_manage',
        name: 'food_menu/diet_manage',
        component: () => import('@/views/diet/Diet_manage'),
        meta: { title: '幼儿食谱管理', icon: 'table' }
      },
      {
        path: 'food_menu/set_meal',
        name: 'food_menu/set_meal',
        component: () => import('@/views/diet/Set_meal'),
        meta: { title: '餐别设置', icon: 'tree' }
      },
      {
        path: 'food_menu/food_material',
        name: 'food_menu/food_material',
        component: () => import('@/views/diet/Food_material'),
        meta: { title: '食材管理', icon: 'tree' }
      },

    ]
  },
  //园所动态
  {
    path: '/news',
    component: Layout,
    redirect: '/news/list',
    name: 'news',
    meta: { title: '园所动态', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '/news/list',
        component: () => import('@/views//news/List'),
        meta: { title: '园所动态', icon: 'table' }
      },

    ]
  },
  //收费管理
  {
    path: '/charge',
    component: Layout,
    redirect: '/charge/rates/list',
    name: 'charge',
    meta: { title: '收费管理', icon: 'example' },
    children: [
      {
        path: 'rates/list',
        name: 'rates/list',
        component: () => import('@/views/charge/Rates'),
        meta: { title: '收费标准', icon: 'table' }
      },
      {
        path: 'financial_history/list',
        name: 'financial_history/list',
        component: () => import('@/views/charge/Financial_history'),
        meta: { title: '收费记录', icon: 'tree' }
      }
    ]
  },
  //保教工作
  {
    path: '/teachingwork',
    component: Layout,
    redirect: '/teachingwork/class_inform',
    name: 'teachingwork',
    meta: { title: '保教工作', icon: 'example' },
    children: [
      {
        path: 'class_inform',
        name: 'class_inform',
        component: () => import('@/views/teachingwork/Class_inform'),
        meta: { title: '班级通知', icon: 'table' }
      },
      {
        path: 'plan',
        name: 'plan',
        component: () => import('@/views/teachingwork/Plan'),
        meta: { title: '保教计划', icon: 'tree' }
      },
      {
        path: 'teacher_read',
        name: 'teacher_read',
        component: () => import('@/views/teachingwork/Teacher_read'),
        meta: { title: '教师必读', icon: 'table' }
      },
      {
        path:'environment_creat',
        name:'environment_creat',
        component: () => import('@/views/teachingwork/Environment_creat'),
        meta: { title: '环境创设', icon: 'table' }
      },
      {
        path: 'circle_class',
        name: 'circle_class',
        component: () => import('@/views/teachingwork/Circle_class'),
        meta: { title: '班级圈', icon: 'tree' }
      },
      {
        path: 'teachingplan',
        name: 'teachingplan',
        component: () => import('@/views/teachingwork/Teachingplan'),
        meta: { title: '教师教案', icon: 'tree' }
      },
      {
        path: 'contribute',
        name: 'contribute',
        component: () => import('@/views/teachingwork/Contribute'),
        meta: { title: '教师投稿', icon: 'tree' }
      }
    ]
  },
  //平台资源
  {
    path: '/school',
    component: Layout,
    redirect: '/school/resource',
    name: 'school',
    meta: { title: '平台资源', icon: 'example' },
    children: [
      {
        path: 'resource',
        name: 'resource',
        component: () => import('@/views/school/Resource'),
        meta: { title: '保教资源', icon: 'table' }
      },

    ]
  },
  // 前端维护
  {
    path: '/web',
    component: Layout,
    redirect: '/web/resource',
    name: 'web',
    meta: { title: '前端维护', icon: 'example' },
    children: [
      {
        path: 'front',
        name: 'web/resource',
        component: () => import('@/views/web/Resource'),
        meta: { title: 'banner图片', icon: 'table' }
      },

    ]
  },
  //校园风采
  {
    path: '/campusElegant',
    component: Layout,
    redirect: '/campusElegant/list',
    name: 'campusElegant',
    meta: { title: '校园风采', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'campusElegant/list',
        component: () => import('@/views/campusElegant/CampusElegant'),
        meta: { title: '校园风采', icon: 'table' }
      },

    ]
  },
  // 密码设置
  {
    path: '/password',
    component: Layout,
    redirect: '/pwd',
    name: '密码',
    meta: { title: '密码设置', icon: 'example' },
    hidden:true,
    children: [
      {
        path: '/pwd',
        component: () => import('@/views/person/Password'),
        meta: { title: '密码设置', icon: 'example' },
      },
    ]
  },
  //*
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
