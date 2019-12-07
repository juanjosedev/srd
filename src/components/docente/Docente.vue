<template>
    <div>
        <Navigation />
        <InfoSesion />
        <router-view></router-view>
    </div>
</template>
<script>
import InfoSesion from '../principal/InfoSesion'
import {mapState} from 'vuex'
import Navigation from '@/components/docente/Navigation'
export default {
    components: {
        Navigation,
        InfoSesion
    },
    computed: {
        ...mapState(['usuario'])
    }
    ,
    created() {
        if(this.usuario.tipoUsuario.nombre != 'Docente') {
            this.$router.push('/');
        }
    }
}
</script>