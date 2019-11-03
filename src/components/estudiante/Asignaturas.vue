<template>
    <div>
        <span v-if="hasCodigo">
            <Docentes :codigo="$route.params.codigo" />
        </span>
        <span v-else>
            <b-container class="py-5">
                <b-row>
                    <b-col md="12">
                        <h1>Asignaturas</h1><br>
                    </b-col>
                    <b-col v-for="asignatura in asignaturas" :key="asignatura.codigo"
                    md="4">
                        <router-link :to="{name: 'EAsignaturas', params: {
                            codigo: asignatura.codigo
                        }}"
                        class="btn btn-outline-info btn-block btn-lg my-2">
                            <div class="text-left">
                                <h4 class="text-white-50">{{ asignatura.nombre }}</h4>
                            </div>
                                <div class="text-right">
                                    <fa icon="arrow-right" />
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
import Docentes from './Docentes'
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
            {codigo: 300, nombre:'Fundamentos de programación I'},
            {codigo: 301, nombre:'Estructuras de datos I'},
            {codigo: 305, nombre:'Diseño web'},
            {codigo: 306, nombre:'Diseño web moderno'}
        ]
        this.asignaturas = res;
        // TODO
    },
    components: {
        Docentes
    }
}
</script>