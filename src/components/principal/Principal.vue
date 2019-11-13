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
            if(usuario.tipoUsuario.nombre == 'Admin') {
                this.$router.push('/admin');
            } 
            if(usuario.tipoUsuario.nombre == 'Docente') {
                this.$router.push('/docente');
            }
            if(usuario.tipoUsuario.nombre == 'Estudiante') {
                this.$router.push('/estudiante');
            }
        }   
    }
}
</script>