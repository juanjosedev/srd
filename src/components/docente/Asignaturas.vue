<template>
    <div>
        <span v-if="hasPerfil">
            <Perfil :id_perfil="this.$route.params.id_perfil" :docente="getParamDocente()" />
        </span>
        <span v-else>
            <b-container class="py-5">
                <b-row>
                    <b-col md="12">
                        <h1>
                            Asignaturas
                            <span v-if="asignaturas.length == 0" class="float-right">
                                <b-spinner variant="info" type="grow" label="Spinning"></b-spinner>
                            </span>
                        </h1><br>
                    </b-col>
                    <b-col md="12">
                        <div class="card-columns">
                            <router-link
                            v-for="asignatura in asignaturas" :key="asignatura.id_perfil"
                            :to="{name: 'DAsignaturas', params: {
                                id_perfil: asignatura.id_perfil,
                                puntaje: 'tuputamadre'
                            }}"
                            class="btn btn-outline-info btn-block btn-lg my-2">
                                <div class="text-left">
                                    <h4 class="text-white-50">{{ asignatura.nombre_materia }}</h4>
                                    <small>{{ `Valoración: ${asignatura.valoracion ? asignatura.valoracion : 'Sin nota'}` }}</small>
                                </div>
                                <div class="text-right">
                                    <fa icon="arrow-right" />
                                </div>
                            </router-link>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </span>
    </div>
</template>
<script>
import Perfil from './Perfil'
import {mapState} from 'vuex'
export default {
    data() {
        return {
            asignaturas: []
        }
    },
    computed: {
        ...mapState(['usuario']),
        hasPerfil: function() {
            return this.$route.params.id_perfil != undefined;
        }
    },
    methods: {
        getParamDocente() {
            let docente = {
                nombreCompleto: `${this.usuario.persona.nombre} ${this.usuario.persona.apellidos}`,
                img: this.usuario.persona.img
            };

            for (let i = 0; i < this.asignaturas.length; i++) {
                if(this.$route.params.id_perfil == this.asignaturas[i].id_perfil) {
                    docente.asignatura = this.asignaturas[i].nombre_materia;
                    docente.valoracion = this.asignaturas[i].valoracion;
                }
            }

            return docente;
        }
    },
    created() {
        // TODO

        this.$http
        .get(
            'http://localhost:8080/srd/DocenteMisAsignaturas',
            {
                params: {
                    documento: this.usuario.persona.documento
                }
            }
        )
        .then((res) => {
            let data = res.data;
            this.asignaturas = data;
        })
        .catch((error) => {
            alert('Error');
        });
        // TODO
    },
    components: {
        Perfil
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