<template>
    <div class="vh-100">
        <div class="h-25" cols="12">
            <b-container class="puntaje py-2">
                <b-row>
                    <b-col cols="12">
                        <div class="media" v-if="perfil">
                            <img :src="perfil.img" class="mr-2 bg-verde">
                            <div class="media-body">
                                <h5 class="text-white mb-0">{{ perfil.nombreCompleto }}</h5>
                                <small class="text-white-5">{{ perfil.asignatura }}</small>
                            </div>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </div>
        <!-- Preguntas -->
        <div class="h-25" cols="12" v-if="pregunta_actual != preguntas.length">
            <div style="height: 100%" class="d-flex justify-content-center align-items-center">
                <b-container>
                    <h4 class="text-center font-weight-normal text-white-5">{{ preguntas[pregunta_actual].nombreHabilidad }}</h4>
                    <h4 class="text-center font-weight-normal">
                    {{ preguntas[pregunta_actual].cuerpoPregunta }}
                    </h4>
                </b-container>
            </div>
        </div>
        
        <div class="h-25" cols="12" v-if="pregunta_actual != preguntas.length">
            <div style="height: 100%" class="d-flex justify-content-center align-items-center">
               <b-container class="d-flex justify-content-center">
                   <fa v-for="(star, index) in 5" :key="index" @mouseover="star_efect = index + 1" @mouseleave="star_efect = puntuacion != 0 ? puntuacion : 0" @click="puntuar(index + 1)"
                   class="text-info f" :icon="[ star_efect < index + 1 ? 'far' : 'fas', 'star']" />
               </b-container>
            </div>
        </div>

        <div class="h-25" cols="12" v-if="pregunta_actual != preguntas.length">
            <div style="height: 100%" class="d-flex justify-content-center align-items-center">
               <b-container class="d-flex justify-content-center">
                    <b-button @click="siguientePregunta(preguntas[pregunta_actual].id_habilidad)" 
                    class="btn-lg" :variant="puntuacion != 0 ? 'info' : 'outline-info'" :disabled="puntuacion == 0">Continuar</b-button>
               </b-container>
            </div>
        </div>
        <!-- Comentario -->
        <div class="h-50" cols="12" v-if="pregunta_actual == preguntas.length && !enviado">
            <div style="height: 100%" class="d-flex align-items-center">
                <b-container>
                    <b-form @submit.prevent="enviarComentario">
                        <b-form-group>
                            <b-form-textarea
                                v-model="resultado.comentario"
                                id="textarea-no-resize"
                                placeholder="Deja un comentario"
                                rows="6"
                                no-resize
                                class="border-0 bg-black-1 text-white"
                            ></b-form-textarea>
                        </b-form-group>
                        <span class="float-right text-info">{{ `${resultado.comentario.trim().length} / 255` }}</span>
                    </b-form>
               </b-container>
            </div>
        </div>

        <div class="h-25" cols="12" v-if="pregunta_actual == preguntas.length && !enviado">
            <div style="height: 100%" class="d-flex justify-content-center align-items-center">
               <b-container class="d-flex justify-content-center">
                    <b-button @click="enviarEvaluacion"
                    class="btn-lg" :variant="resultado.comentario.trim().length < 10 ?'outline-info' : 'info'" :disabled="resultado.comentario.trim().length < 10">Finalizar y enviar</b-button>
               </b-container>
            </div>
        </div>
        <!-- Finalizar -->
        <div class="h-50" cols="12" v-if="enviado">
            <div style="height: 100%" class="d-flex justify-content-center align-items-center">
               <b-container class="d-flex justify-content-center">
                   <h1 class="display-4 text-center">
                       Gracias por realizar la evaluación!
                   </h1>
               </b-container>
            </div>
        </div>

        <div class="h-25" cols="12" v-if="enviado">
            <div style="height: 100%" class="d-flex justify-content-center align-items-center">
               <b-container class="d-flex justify-content-center">
                    <a href="#" class="text-info" @click.prevent="salir"> Salir <fa icon="sign-out-alt" size="lg" class="ml-1" /> </a>
               </b-container>
            </div>
        </div>
        
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    data() {
        return {
            preguntas: [],
            pregunta_actual: 0,
            star_efect: 0,
            puntuacion: 0,
            resultado: {
                id_perfil: 0,
                id_estudiante: 0,
                documento: "",
                habilidades: [],
                comentario: ''
            },
            enviado: false
        }
    },
    props: ['perfil'],
    computed: {
        ...mapState(['usuario'])
    },
    methods: {
        getPreguntas() {
            this.$http.get('http://localhost:8080/srd/EstudianteEvaluacion', {
                params: {
                    evaluacion: true
                }
            })
            .then((res) => {
                this.preguntas = res.data;
            })
            .catch((error) => {
                console.log(error);
            })
        },
        puntuar(puntuacion) {
            this.puntuacion = puntuacion;
        },
        siguientePregunta(id_habilidad) {
            this.pregunta_actual++;
            if(this.resultado.habilidades.length == 0) {
                this.resultado.habilidades.push({
                    id_habilidad: id_habilidad,
                    valoracion: this.puntuacion
                })
            } else {
                let i = this.resultado.habilidades.length - 1;
                if(this.resultado.habilidades[i].id_habilidad == id_habilidad) {
                    this.resultado.habilidades[i].valoracion = (this.resultado.habilidades[i].valoracion + this.puntuacion) / 2;
                } else {
                    this.resultado.habilidades.push({
                        id_habilidad: id_habilidad,
                        valoracion: this.puntuacion
                    })
                }
            }
            this.star_efect = 0;
            this.puntuacion = 0;
        },
        enviarEvaluacion() {
            // https://stackoverflow.com/questions/49673010/how-to-receive-form-parameters-values-in-server
            this.enviado = true;
            this.resultado.id_perfil = this.perfil.id_perfil;
            this.resultado.id_estudiante = this.usuario.persona.id_estudiante;
            this.resultado.documento = this.usuario.persona.documento;

            let data = this.resultado
            console.log(data)

            this.$http.post('http://localhost:8080/srd/EstudianteEvaluacion', data)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error)
            })

            console.log(this.resultado);
        },
        salir() {
            this.$router.push({name: 'Evaluaciones'});
        }
    },
    created() {
        if(!this.perfil) {
            this.$router.push({name: 'Evaluaciones'});
        }
        this.getPreguntas();
    }
}
</script>
<style>
.fa-star {
    padding: 0 10px;
}
@media (max-width: 576px) { 
    .fa-star {
        font-size: 3em;
    }
}
@media (min-width: 577px) { 
    .fa-star {
        font-size: 5em;
    }
}
.fa-star:hover {
    cursor: pointer;
}
.puntaje h1{
        font-size: 6em;
        position: relative;
}
.puntaje h1 small {
    font-size: .5em;
    position: relative;
    right: 20px;
}
.puntaje .media {
    -webkit-align-items: center;
    align-items: center;
}
.puntaje .media img {
    width: 60px;
    border-radius: 50%;
    border: 3px solid transparent;
}
textarea:focus {
    background: rgba(255, 255, 255, .1) !important;
    color: #fff;
}
</style>