<template>
    <div>
        <div v-if="!hasCedula">
            <b-container class="py-5">
                <b-row>
                    <b-col md="12"> 
                        <h1>Docentes {{ hasCedula }} que imparten {{ codigo }}</h1>
                    </b-col>
                    <b-col class="py-2" md="12">
                        <b-card-group columns>
                            <b-card v-for="item in docentes" :key="item.cedula"
                                :img-src="item.url"
                                img-alt="Image"
                                img-top
                                tag="article"
                                class="mb-2">
                                <b-card-text>
                                    <h3 class="text-dark">{{ item.nombre }}</h3>
                                    <h6 class="text-black-5">{{item.asignatura}}</h6>
                                    <h6 class="text-info">Valoración {{ item.valoracion }}</h6>
                                </b-card-text>
                                <router-link :to="{name: 'EDocentes', params: {cedula: item.cedula}}" class="btn btn-outline-info btn-block">Ver perfil</router-link>
                            </b-card>
                        </b-card-group>
                    </b-col>
                </b-row>
            </b-container>
        </div>
        <div v-else>
            Cargar perfil
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            docentes: [
                {
                    cedula: 38,
                    nombre: 'Leidy Nuñez',
                    valoracion: 4.2,
                    url: 'https://6.viki.io/image/fc365e1f50b44330a5f90e98d2597581.jpeg?s=900x600&e=t'
                },
                {
                    cedula: 30,
                    nombre: 'Margarita Londoño',
                    valoracion: 3.8,
                    url: 'https://www.elespectador.com/sites/default/files/styles/medium/public/margarita-londo%C3%B1o-v..jpg?itok=JSqqbIVm'
                },
                {
                    cedula: 36,
                    nombre: 'José Zapata',
                    valoracion: 4.1,
                    url: 'https://pbs.twimg.com/profile_images/707174093238439938/PbTxJ4vR_400x400.jpg'
                },
                {
                    cedula: 40,
                    nombre: 'Lidia Álvarez',
                    valoracion: 3.7,
                    url: 'https://i.redd.it/21hqsj4w0og21.png'
                }
            ]
        }
    },
    computed: {
        hasCedula: function() {
            return this.$route.params.cedula != undefined;
        }
    },
    props: ['codigo'],
    created() {
        // cargar docentes
    }
}
</script>