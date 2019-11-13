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
                  <b-button @click="continuar(preguntas[pregunta_actual].id_pregunta)" 
                  class="btn-lg" :variant="puntuacion != 0 ? 'info' : 'outline-info'" :disabled="puntuacion == 0">Continuar</b-button>
               </b-container>
            </div>
        </div>

        <div class="h-50" cols="12" v-if="pregunta_actual == preguntas.length">
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
                        <span class="float-right text-info">{{ `0 / 255` }}</span>
                    </b-form>
               </b-container>
            </div>
        </div>

        <div class="h-25" cols="12" v-if="pregunta_actual == preguntas.length">
            <div style="height: 100%" class="d-flex justify-content-center align-items-center">
               <b-container class="d-flex justify-content-center">
                  <b-button
                  class="btn-lg" variant="info" :disabled="puntuacion == 0">Continuar</b-button>
               </b-container>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            preguntas: [
                {
                    id_habilidad: 1,
                    id_pregunta: 1,
                    nombreHabilidad: 'Gestión',
                    cuerpoPregunta: 'Error molestiae esse possimus molestias dicta animi non excepturi incidunt accusamus delectus quibusdam vero quasi enim quo, quis sunt ratione! Hic, quo.'
                },
                {
                    id_habilidad: 1,
                    id_pregunta: 2,
                    nombreHabilidad: 'Gestión',
                    cuerpoPregunta: 'Nihil, expedita obcaecati eveniet iusto delectus nam quidem quod dolores neque dolorem qui!'
                },
                {
                    id_habilidad: 1,
                    id_pregunta: 3,
                    nombreHabilidad: 'Gestión',
                    cuerpoPregunta: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
                },
                {
                    id_habilidad: 2,
                    id_pregunta: 4,
                    nombreHabilidad: 'Aprendizaje',
                    cuerpoPregunta: 'Lorem ipsum dolor sit amet expedita obcaecati eveniet iusto delectus nam quidem quod dolores neque dolorem consectetur adipisicing elit.'
                }
            ],
            pregunta_actual: 0,
            star_efect: 0,
            puntuacion: 0,
            resultado: {
                respuestas: [],
                comentario: '',
                promedio: 0
            }
        }
    },
    props: ['perfil'],
    methods: {
        puntuar(puntuacion) {
            this.puntuacion = puntuacion;
        },
        continuar(id_pregunta) {
            this.pregunta_actual++;
    
            this.resultado.respuestas.push({id_pregunta: id_pregunta, nota: this.puntuacion});
            this.resultado.promedio = this.resultado.promedio + this.puntuacion;
            this.star_efect = 0;
            this.puntuacion = 0;
        }
    },
    created() {
        if(!this.perfil) {
            this.$router.push('/');
        }   
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