<template>
    <div>
        <Navigation />
        <router-view></router-view>
        <!-- <Evaluacion /> -->
    </div>
</template>
<script>
import Navigation from './Navigation'
import Evaluacion from './Evaluacion'
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
        Evaluacion
    }

}
</script>