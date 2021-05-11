import store from 'src/store'

const routes = [
  {
    path: '/',
    component: () => import('layouts/Main.vue'),
    children: [
      { 
        path: '',
        name: 'home', 
        component: () => import('pages/Home.vue'),
      }, 
    ],
    beforeEnter: (to, from, next) => {
      const publicPages = ['/login', '/pre-cadastro', '/esqueceu-senha', '/welcome'];
      const authRequired = !publicPages.includes(to.path);
      const loggedIn = localStorage.getItem('isAuthenticated');

      if (authRequired && !loggedIn) {
          return next('/login');
      }

      next();
    }
  },

  {
    path: '/login',
    component: () => import('layouts/Auth.vue'),
    children: [
      { 
        path: '',
        name: 'login', 
        component: () => import('pages/auth/Login.vue') 
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
