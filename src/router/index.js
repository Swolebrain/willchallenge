import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Callback from '@/components/Callback';
import CreateChallenge from '@/components/CreateChallenge';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback
    },
    {
      path: '/create-challenge',
      name: 'CreateChallenge',
      component: CreateChallenge
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})

export default router
