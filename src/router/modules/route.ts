const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/test.vue'), //路由懒加载
  },
];

export default routes;
