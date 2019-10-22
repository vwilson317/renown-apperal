import Vue from 'vue';
import Router, { Route } from 'vue-router';
import Landing from './views/Landing.vue';
import Mens from './views/Mens.vue';
import Womens from './views/Womens.vue';
import Detail from './views/Detail.vue';
import Cart from './views/Cart.vue';
import Checkout from './views/Checkout.vue';
import About from './views/About.vue';
import { GetListing } from './business-logic/getListings';
import store from './store';

Vue.use(Router);

const beforeEnterFunc = (keyword: string) => async (to: Route, from: Route, next: Function) => {
  store.commit('setKeywords', keyword);
  store.commit('setLoading', true);
  store.commit('resetPageNum');
  const result = await GetListing(1, keyword);
  store.commit('replaceListings', result);
  store.commit('setLoading', false);

  next();
};

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: Landing,
    },
    {
      path: '/admin',
      name: 'admin',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/Admin.vue'),
    },
    {
      path: '/mens',
      name: 'mens',
      component: Landing,
      beforeEnter: beforeEnterFunc('mens'),
      // props: { keyword: 'men' },
    },
    {
      path: '/womens',
      name: 'womens',
      component: Landing,
      beforeEnter: beforeEnterFunc('womens'),
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/all',
      name: 'all',
      component: Landing,
      beforeEnter: beforeEnterFunc(''),
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail,
      props: true,
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout,
    },
  ],
});
