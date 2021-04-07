import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import TestChildRouter from "../views/TestChildRouter";

Vue.use(Router)

//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [{
        path: 'test',
        name: "TestChildRouter",
        component: () => import("../views/TestChildRouter")
      }]
    },
    /*{
      path: '/home',
      name: 'HelloWorld',
      component: HelloWorld
    },*/
    {
      path: '/login',
      name: "Test",
      component: () => import("../views/Test")
    }, {
      path: "/register",
      name: "Register",
      component: () => import("../views/Register")
    }
  ]
})
