<template>
    <div>
        <div v-if="!hasDocumento">
            <b-container class="py-5" v-if="asignatura">
                <b-row>
                    <b-col md="12">
                        <h1>Docentes de <span class="text-info">{{ asignatura.nombre }}</span></h1>
                    </b-col>
                    <b-col class="py-3" md="12">
                        <b-card-group columns>
                            <b-card v-for="item in docentes" :key="item.id"
                                :img-src="item.img"
                                img-alt="Image"
                                img-top
                                tag="article"
                                class="mb-2">
                                <b-card-text>
                                    <h3 class="text-dark">{{ item.nombreCompleto }}</h3>
                                    <h6 class="text-black-5">{{ asignatura.nombre }}</h6>
                                    <h6 class="text-info">Valoración {{ item.valoracion }}</h6>
                                </b-card-text>
                                <router-link :to="{name: 'EDocentes', params: {documento: item.id}}" class="btn btn-outline-info btn-block">Ver perfil</router-link>
                            </b-card>
                        </b-card-group>
                    </b-col>
                </b-row>
            </b-container>
        </div>
        <div v-else>
            <Perfil :docente="getParamDocente()" :asignatura="asignatura" />
        </div>
    </div>
</template>
<script>

import Perfil from './Perfil'

export default {
    data() {
        return {
            docentes: []
        }
    },
    computed: {
        hasDocumento: function() {
            return this.$route.params.documento != undefined;
        }
    },
    props: ['asignatura'],
    methods: {
        getParamDocente() {
            for (let i = 0; i < this.docentes.length; i++) { 
                if(this.$route.params.documento == this.docentes[i].id) {
                    return this.docentes[i];
                }
            }
            return null;
        },
        getPerfiles() {
            this.$http.get('http://localhost:8080/srd/EstudianteAsignaturaPerfil', {
            params: {
                id_materia: this.asignatura.id
            }
            })
            .then((res) => {
                let data = res.data;
                this.docentes = data;
            })
            .catch((error) => {
                this.error = 'Ahora mismo no podemos atenderte :(';
            });
        }
    },
    created() {
        if(this.asignatura) {
            this.getPerfiles();
        }
    },
    watch: {
        asignatura: function() {
            this.getPerfiles();
        }
    },
    components: {
        Perfil
    }
}
</script>