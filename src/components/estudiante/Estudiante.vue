<template>
    <div>
        <Navigation />
        <InfoSesion />
        <router-view></router-view>
        <!-- <Evaluacion /> -->
    </div>
</template>
<script>
import Navigation from './Navigation'
import Evaluacion from './Evaluacion'
import InfoSesion from '../principal/InfoSesion'
import {mapState} from 'vuex'
export default {
    computed: {
        ...mapState(['usuario'])
    }
    ,
    created() {
        if(this.usuario.tipoUsuario.nombre != 'Estudiante') {
            this.$router.push('/');
        }
    },
    components: {
        Navigation,
        Evaluacion,
        InfoSesion
    }

}
</script>