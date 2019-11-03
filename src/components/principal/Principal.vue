<template>
    <div>
        <Navigation />
        <router-view></router-view>
    </div>
</template>
<script>

import Navigation from './Navigation'

export default {
    components: {
        Navigation
    },
    created() {
        let usuario = JSON.parse(localStorage.getItem('usuario'));
        if(usuario) {
            if(usuario.tipo == 'Admin') {
                this.$router.push('/admin');
            } 
            if(usuario.tipo == 'Docente') {
                this.$router.push('/docente');
            }
            if(usuario.tipo == 'Estudiante') {
                this.$router.push('/estudiante');
            }
        }   
    }
}
</script>