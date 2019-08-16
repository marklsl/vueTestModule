import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/mapComponent/tool/secondLev/thematic/test'
// import HelloWorld from '@/components/HelloWorld'
import testRoute from '@/components/routeMain/testRoute'
import leafletMap from '@/components/mapComponent/leafletMapMain'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/testRoute',
      name: 'testRoute',
      component: testRoute
    },
    {
      path: '/hello',
      name: 'hello',
      component: () => import('../components/HelloWorld.vue'),
      children:[
          {
            path: 'testBegin',
            name: 'testBegin',
            component: () => import('../components/vuex-test/testBegin.vue')
          },
          {
            path: 'vuex-test',
            name: 'vuex-test',
            component: () => import('../components/vuex-test/vuex-test.vue')
          }
        ]
    },
    {
      path: '/leafletMap',
      name: 'leafletMap',
      component: () => import('@/components/mapComponent/leafletMapMain')
    },
    {
      path: '/olMap',
      name: 'olMap',
      component: () => import('@/components/mapComponent/olMap')
    },
  ]
})
