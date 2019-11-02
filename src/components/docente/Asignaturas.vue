<template>
    <div>
        <span v-if="hasCodigo">
            <Perfil />
        </span>
        <span v-else>
            <b-container class="py-5">
                <b-row>
                    <b-col md="12">
                        <h1>Asignaturas</h1><br>
                    </b-col>
                    <b-col v-for="asignatura in asignaturas" :key="asignatura.codigo"
                    md="4">
                        <router-link :to="{name: 'asignaturas', params: {
                            codigo: asignatura.codigo
                        }}"
                        class="btn btn-outline-info btn-block btn-lg my-2">
                            <div class="text-left">
                                <h4 class="text-white-50">{{ asignatura.nombre }}</h4>
                                <small>{{ asignatura.valoracion }}</small>
                                <fa class="float-right" icon="arrow-right" />
                            </div>
                            <div>
                            </div>
                        </router-link>
                    </b-col>
                </b-row>
            </b-container>
        </span>
    </div>
</template>
<script>
import Perfil from './Perfil'
export default {
    data() {
        return {
            asignaturas: []
        }
    },
    computed: {
        hasCodigo: function() {
            return this.$route.params.codigo != undefined;
        }
    },
    created() {
        // TODO
        let res = [
            {codigo: 300, nombre:'Fundamentos de programación I', valoracion: 4.4},
            {codigo: 301, nombre:'Estructuras de datos I', valoracion: 3.8},
            {codigo: 305, nombre:'Diseño web', valoracion: 4.6},
            {codigo: 306, nombre:'Diseño web moderno', valoracion: 4.2}
        ]
        this.asignaturas = res;
        // TODO
    },
    components: {
        Perfil
    }
}
</script>