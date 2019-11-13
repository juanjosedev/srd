<template>
    <div>
        <Navigation />
        <!-- <router-view></router-view> -->
    </div>
</template>
<script>
import Navigation from './Navigation'
import {mapState} from 'vuex'
export default {
    
    computed: {
        ...mapState(['usuario'])
    }
    ,
    created() {
        if(this.usuario.tipoUsuario.nombre != 'Admin') {
            this.$router.push('/');
        }
    },
    components: {
        Navigation
    }
}
</script>