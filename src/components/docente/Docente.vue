<template>
    <div>
        <Navigation />
        {{ usuario }}
        <!-- <router-view></router-view> -->
    </div>
</template>
<script>
import {mapState} from 'vuex'
import Navigation from '@/components/docente/Navigation'
export default {
    components: {
        Navigation
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