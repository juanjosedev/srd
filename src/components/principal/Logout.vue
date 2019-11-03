<template>
    <b-nav-item-dropdown class="text-white" right>
        <b-dropdown-item href="#" @click.prevent="cerrar_sesion">Cerrar sesión</b-dropdown-item>
    </b-nav-item-dropdown>
</template>
<script>
import {mapActions} from 'vuex'
export default {
    methods: {
        ...mapActions(['removeUsuario']),
        cerrar_sesion() {
            this.removeUsuario();
            this.$router.push('/');
        }
    }
}
</script>