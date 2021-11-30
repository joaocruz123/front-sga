import store from 'src/store'

const routes = [
  {
    path: '/',
    component: () => import('layouts/Home.vue'),
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
    path: '/',
    component: () => import('layouts/Main.vue'),
    children: [
      { 
        path: 'membros',
        name: 'membros', 
        component: () => import('pages/membros/Membros.vue'),
      },
      { 
        path: 'membros/:id',
        name: 'membro', 
        component: () => import('pages/membros/Membro.vue'),
      },
      { 
        path: 'cargos',
        name: 'cargos', 
        component: () => import('pages/cargos/Cargos.vue'),
      },
      { 
        path: 'cargos/:id',
        name: 'cargo', 
        component: () => import('pages/cargos/Cargo.vue'),
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
