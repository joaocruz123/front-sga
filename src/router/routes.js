
const routes = [
  {
    path: '/',
    component: () => import('layouts/Main.vue'),
    children: [
      { path: '', component: () => import('pages/Welcome.vue') }
    ],

    // beforeEnter: (to, from, next) => {
    //   const publicPages = ['/login', '/pre-cadastro', '/esqueceu-senha', '/welcome'];
    //   const authRequired = !publicPages.includes(to.path);
    //   const loggedIn = localStorage.getItem('user');

    //   if (authRequired && !loggedIn) {
    //       return next('/login');
    //   }

    //   next();
    // }
    beforeEnter: (to, from, next) => {
      const publicPages = ['/login', '/pre-cadastro', '/esqueceu-senha', '/welcome'];
      const authRequired = !publicPages.includes(to.path);
      const isAuthenticated = store.getters["auth/isAuthenticated"]
			
      if (authRequired && !isAuthenticated) next({name: 'login'})
			else next()
		}
  },

  {
    path: '/login',
    component: () => import('layouts/Auth.vue'),
    children: [
      { path: '', component: () => import('pages/auth/Login.vue') }
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
