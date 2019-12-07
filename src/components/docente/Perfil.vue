<template>
    <div>
        <div class="puntaje py-5">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h1 class="text-center text-verde">
                        {{ docente.valoracion ? docente.valoracion.substring(0, 3) : '0.0' }}
                        <small>{{ docente.valoracion ? docente.valoracion.substring(3, 5) : '00' }}</small>
                        </h1>
                    </div>
                    <div class="col-12 d-flex justify-content-center">
                        <div class="media">
                            <img :src="docente.img" class="mr-2 bg-verde">
                            <div class="media-body">
                                <h5 class="text-white mb-0">{{ docente.nombreCompleto }}</h5>
                                <small class="text-white-5">{{ docente.asignatura }}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-blanco py-5">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h1 class="text-oscuro">
                            Mi Descripción
                            <a href="#" v-b-modal.modal-descripcion class="float-right text-info" title="Editar descripción">
                                <fa icon="pen" size="xs" />
                            </a>
                            <b-modal id="modal-descripcion" header-text-variant="light" header-bg-variant="info" body-text-variant="dark" size="lg" centered hide-footer :title="`Descripción ${descripcion_response}`">
                                <!-- <b-alert show variant="info">Se admite sintaxis <b>HTML</b></b-alert> -->
                                <b-form-group>
                                    <!-- <b-button size="sm" variant="info" @click="copiarDescripcionActual">
                                        Copiar descripción actual 
                                        <fa icon="link" />
                                    </b-button>
                                    <b-button size="sm" variant="info" @click="descripcion_nueva=''" :disabled="descripcion_nueva == 0">
                                        Limpiar
                                        <fa :icon="['far', 'trash-alt']" />    
                                    </b-button> -->
                                </b-form-group>
                                <b-form-group>
                                    <Descripcion v-on:actualizarDescripcion="cambiarDescripcion" :descripcion="descripcion.cuerpo" />
                                </b-form-group>
                            </b-modal>
                        </h1>
                        <hr>
                        <p class="text-black-8" v-html="descripcion.cuerpo"></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="py-5">
            <b-container>
                <b-row>
                    <b-col cols="12">
                        <h1>Habilidades</h1>
                        <div>
                            <div v-for="(habilidad, index) in habilidades" :key="index"
                        class="py-2">
                                <p class="text-white-5 mb-2">{{ habilidad.nombre }} <span class="float-right">{{ habilidad.valoracion }}</span></p>
                                <div class="progress" :title="habilidad.valoracion">
                                    <div class="progress-bar bg-info" role="progressbar" :style="{width: `${porcentaje(habilidad.valoracion)}%`}" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </div>
        <div class="comentarios bg-blanco py-5">
            <b-container>
                <b-row class="row">
                    <div class="col-12">
                        <h1 class="text-oscuro">Comentarios</h1>
                        <div v-for="comentario in comentarios" :key="comentario.id" 
                        class="comentario media py-2">
                            <img :src="comentario.img" width="60" class="mr-3">
                            <div class="media-body">
                                <h5 class="mb-0">{{ comentario.nombreCompleto }} <span class="float-right text-black-50 small">{{ comentario.fecha }}</span></h5>
                                <div class="text-black-8">
                                    {{ comentario.cuerpo }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <b-col cols="12">
                        <hr>
                        <b-form @submit.prevent="enviarComentario">
                            <b-form-group>
                                <b-form-textarea
                                    id="textarea-no-resize"
                                    placeholder="Deja un comentario"
                                    rows="3"
                                    no-resize
                                    v-model="comentario_nuevo"
                                ></b-form-textarea>
                            </b-form-group>
                            <b-button type="submit" variant="info" :disabled="comentario_nuevo.trim().length < 8">Comentar</b-button>
                            <span class="float-right text-info">{{ `${comentario_nuevo.trim().length } / 255` }}</span>
                        </b-form>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import Descripcion from './Descripcion'
export default {
    data() {
        return {
            descripcion: '',
            habilidades: [],
            comentarios: [],
            comentario_nuevo: '',
            descripcion_nueva: '',
            descripcion_response: ''
        }
    },
    computed: {
        ...mapState(['usuario'])
    },
    props: [
        'id_perfil',
        'docente'
    ],
    methods: {
        getDescripcion() {
            this.$http.get('http://localhost:8080/srd/EstudianteAsignaturaPerfil', {
            params: {
                id_perfil: this.id_perfil,
                descripcion: true
            }
            })
            .then((res) => {
                let data = res.data;
                this.descripcion = data;
            })
            .catch((error) => {
                this.error = 'Ahora mismo no podemos atenderte :(';
            });
        },
        getHabilidades() {
            this.$http.get('http://localhost:8080/srd/EstudianteAsignaturaPerfil', {
            params: {
                id_perfil: this.id_perfil,
                habilidades: true
            }
            })
            .then((res) => {
                let data = res.data;
                this.habilidades = data;
            })
            .catch((error) => {
                this.error = 'Ahora mismo no podemos atenderte :(';
            });
        },
        getComentarios() {
            this.$http.get('http://localhost:8080/srd/EstudianteAsignaturaPerfil',{
                params:{
                    id_perfil: this.id_perfil,
                    comentarios: true
                }
            })
            .then((res)=>{
                let data = res.data;
                this.comentarios = data;
            })
            .catch((error)=>{
                this.error = 'No se han podido cargar los comentarios'
            });
        },
        enviarComentario() {
            let data = {
                id_perfil: this.id_perfil,
                id_persona: this.usuario.persona.documento,
                comentario: this.comentario_nuevo
            }
            this.$http.post('http://localhost:8080/srd/EstudianteAsignaturaPerfil',{},{
                params: data
            })
            .then((res) => {
                this.getComentarios();
            })
            .catch((error) => {
                console.log(error);
            });
            this.comentario_nuevo = '';
        },
        cambiarDescripcion(value) {

            let data = {
                id_perfil: this.id_perfil,
                descripcion: value
            };

            console.log(data);

            this.$http
            .post('http://localhost:8080/srd/DocentePerfil', {}, {
                params: data
            })
            .then((res) => {
                this.getDescripcion();
                if(res.data) {
                    this.descripcion_response = 'Se ha actualizado la descripción con éxito';
                } else {
                    this.descripcion_response = 'Algo ha fallao'
                }
            })
            .catch((error) => {
                console.log(error);
            });
        },
        copiarDescripcionActual() {
            this.descripcion_nueva = this.descripcion.cuerpo;
            console.log('what happen');
        },
        porcentaje(nota) {
            let porcentaje = (Number.parseFloat(nota) * 100) / 5.0;
            return porcentaje;
        }
    },
    components: {
        Descripcion
    },
    created() {
        if(this.id_perfil) {
            this.getDescripcion();
            this.getHabilidades();
            this.getComentarios();
        }
    },
    watch: {
        descripcion() {
            this.descripcion_nueva = this.descripcion.cuerpo;
        }
    }
}
</script>
<style>
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
    .comentarios .comentario img{
        width: 60px;
        border-radius: 50%;
        border: 3px solid transparent;
    }
</style>