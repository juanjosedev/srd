<template>
    <div>
        <span v-if="hasCodigo">
            <Docentes :asignatura="getParamAsignatura()" />
        </span>
        <span v-else>
            <b-container class="py-5">
                <b-row>
                    <b-col md="12">
                        <h1>Asignaturas pendientes
                            <span v-if="spinner" class="float-right">
                                <b-spinner variant="info" type="grow" label="Spinning"></b-spinner>
                            </span>
                        </h1>
                        <br>
                    </b-col>
                    <b-col
                    md="12">
                        <div class="card-columns">
                            <router-link v-for="asignatura in asignaturas" :key="asignatura.id" :to="{name: 'EAsignaturas', params: {
                                codigo: asignatura.id
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
                        </div>
                    </b-col>
                    <b-col v-if="error">
                        <b-alert show variant="danger">{{ error }}</b-alert>
                    </b-col>
                </b-row>
            </b-container>
        </span>
    </div>
</template>
<script>
import Docentes from './Docentes'
import {mapState} from 'vuex'
export default {
    data() {
        return {
            asignaturas: [],
            error: ''
        }
    },
    computed: {
        ...mapState(['usuario']),
        hasCodigo: function() {
            return this.$route.params.codigo != undefined;
        },
        spinner: function() {
            return this.asignaturas.length == 0;
        }
    },
    methods: {
        getParamAsignatura() {
            for (let i = 0; i < this.asignaturas.length; i++) {   
                if(this.$route.params.codigo == this.asignaturas[i].id) {
                    return this.asignaturas[i];
                }
            }
            return null;
        }
    },
    created() {
        // TODO
        this.$http.get('http://localhost:8080/srd/EstudianteAsignatura', {
            params: {
                documento: this.usuario.persona.documento
            }
        })
        .then((res) => {
            let data = res.data;
            this.asignaturas = data;
        })
        .catch((error) => {
            this.error = 'Ahora mismo no podemos atenderte :(';
        });
        // TODO
    },
    components: {
        Docentes
    }
}
</script>
<style scoped>
    @media (min-width: 576px){
        .card-columns a {
            display: inline-block;
            width: 100%;
        }
    }
</style>