<template>
    <div class="bg-black-4">
        <b-container class="py-2">
            <img :src="usuario.persona.img" width="45" alt="img-not-found">
            <span class="ml-2 text-white-8">{{ `${usuario.persona.nombre} ${usuario.persona.apellidos} | ${usuario.tipoUsuario.nombre}` }}</span>
        </b-container>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    computed: {
        ...mapState(['usuario'])
    }
}
</script>
<style scoped>
img {
    border-radius: 3px;
}
</style>