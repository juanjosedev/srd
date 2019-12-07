<template>
    <div>
        <b-container class="py-5">
            <b-row>
                <b-col md="12">
                    <h1>
                        Evaluación docente
                        <span v-if="perfiles.length == 0" class="float-right">
                            <b-spinner variant="info" type="grow" label="Spinning"></b-spinner>
                        </span>    
                    </h1>
                </b-col>
                <b-col class="py-3" md="12">
                    <b-card-group columns>
                        <b-card v-for="item in perfiles" :key="item.id_perfil"
                            :img-src="item.img == 'http://localhost:8080/srd/img/user.jpg' ? '' : item.img"
                            img-alt="Image"
                            img-top
                            tag="article"
                            class="mb-2">
                            <b-card-text>
                                <h3 class="text-dark">{{ item.asignatura }}</h3>
                                <h6 class="text-black-5">{{ item.nombreCompleto }}</h6>
                            </b-card-text>
                            <router-link v-if="!item.evaluado" :to="{
                                name: 'Evaluar', 
                                params: {
                                    id_perfil: item.id_perfil,
                                    perfil: item
                                }
                                }" class="btn btn-outline-info btn-block">Evaluar</router-link>
                            <span v-else>
                                <h6 class="text-success">Evaluado <fa icon="check" class="float-right" /></h6>
                            </span>
                        </b-card>
                    </b-card-group>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    data() {
        return {
            perfiles: []

        }
    },
    computed: {
        ...mapState(['usuario'])
    },
    methods: {
        getPerfiles() {
            this.$http.get('http://localhost:8080/srd/EstudianteEvaluacion', {
                params: {
                    documento: this.usuario.persona.documento
                }
            })
            .then((res) => {
                this.perfiles = res.data;
            })
            .catch((error) => {
                console.log(error);
            });
        }
    },
    created() {
        this.getPerfiles();
    }
}
</script>