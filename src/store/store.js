import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        usuario: JSON.parse(localStorage.getItem('usuario')) || null
    },
    mutations: {
        setUsuario(state, usuario) {
            state.usuario = usuario;
        },
        delUsuario(state) {
            state.usuario = null;
        }
    },
    actions: {
        addUsuario: function({commit}) {
            if(localStorage.getItem('usuario')) {
                let usuario = JSON.parse(localStorage.getItem('usuario'));
                commit('setUsuario', usuario);
            }
        },
        removeUsuario: function({commit}) {
            localStorage.removeItem('usuario');
            commit('delUsuario');
        }
    }
})