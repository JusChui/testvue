import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import TestChildRouter from "../views/TestChildRouter";

Vue.use(Router)

//��ȡԭ�Ͷ����ϵ�push����
const originalPush = Router.prototype.push
//�޸�ԭ�Ͷ����е�push����
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
