import Vue from 'vue'
import Router from 'vue-router'
import store from 'vuex'

import Principal from '@/components/principal/Principal'
import Inicio from '@/components/principal/Inicio'
import Login from '@/components/principal/Login'

import Docente from '@/components/docente/Docente'
import DAsignaturas from '@/components/docente/Asignaturas'
import Ayuda from '@/components/docente/Ayuda'

import Admin from '@/components/admin/Admin'

import Estudiante from '@/components/estudiante/Estudiante'
import EAsignaturas from '@/components/estudiante/Asignaturas'
import EDocentes from '@/components/estudiante/Docentes'
import Evaluaciones from '@/components/estudiante/Evaluacion'
import Evaluar from '@/components/estudiante/Evaluar'

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
          path: 'asignaturas/:id_perfil?',
          name: 'DAsignaturas',
          component: DAsignaturas
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
    },
    {
      path: '/admin',
      component: Admin,
      // children: [
      //   {
      //     path: '/',
      //     name: 'Ainicio',
      //     component: Inicio
      //   }
      // ],
      // meta: {
      //   requiresAuth: true
      // }
    },
    {
      path: '/estudiante',
      component: Estudiante,
      children: [
        {
          path: '/',
          name: 'Einicio',
          component: Inicio
        },
        {
          path: 'asignaturas/:codigo?',
          name: 'EAsignaturas',
          component: EAsignaturas,
          children: [
            {
              path: '/estudiante/asignaturas/:codigo/perfil/:documento?',
              name: 'EDocentes',
              component: EDocentes
            }
          ]
        },
        {
          path: 'evaluaciones',
          name: 'Evaluaciones',
          component: Evaluaciones
        }
      ],
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/estudiante/evaluaciones/:id_perfil',
      name: 'Evaluar',
      component: Evaluar,
      props: true,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  
  // console.log(to);

  // console.log(JSON.parse(localStorage.getItem('usuario')));
  
  // if(!usuario) {
    
    // }
  let usuario = JSON.parse(localStorage.getItem('usuario'));

  if(to.matched.some(ruta => ruta.meta.requiresAuth)) {
    if(usuario) {
      next();
    } else {
      next('/');
    }
      // next('/');
  }
  next();
})

export default router;