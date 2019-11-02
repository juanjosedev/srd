import Vue from 'vue'
import Router from 'vue-router'

import Principal from '@/components/principal/Principal'
import Inicio from '@/components/principal/Inicio'
import Login from '@/components/principal/Login'

import Docente from '@/components/docente/Docente'
import Asignaturas from '@/components/docente/Asignaturas'
import Ayuda from '@/components/docente/Ayuda'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: Principal,
      children: [
        {
          path: '/',
          name: 'inicio',
          component: Inicio
        },
        {
          path: 'login',
          name: 'login',
          component: Login
        }
      ]
    },
    {
      path: '/docente',
      component: Docente,
      children: [
        {
          path: '/',
          name: 'Dinicio',
          component: Inicio
        },
        {
          path: 'asignaturas/:codigo?',
          name: 'asignaturas',
          component: Asignaturas
        },
        {
          path: 'ayuda',
          name: 'ayuda',
          component: Ayuda
        }
      ],
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(ruta => ruta.meta.requiresAuth)) {
    const user = localStorage.getItem('user');
    if (user) {
      next();
    } else {
      next({
        name: 'login'
      });
    }
  } else {
    next();
  }
})

export default router;