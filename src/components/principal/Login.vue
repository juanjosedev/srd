<template>
    <div>
        <b-container class="py-5">
            <b-row class="justify-content-center">
                <b-col md="4">
                    <b-form @submit.prevent="login">
                        <b-form-group label="Cédula: " label-for="cedula">
                            <b-form-input v-model="cedula"
                            type="number" id="cedula" placeholder="Cédula"></b-form-input>
                        </b-form-group>
                        <b-form>
                            <b-form-group label="Contraseña: " label-for="pass">
                                <b-form-input v-model="password" 
                                type="password" id="pass" placeholder="Contraseña"></b-form-input>
                            </b-form-group>
                        </b-form>
                        <b-form-group>
                            <b-button type="submit" variant="info">Iniciar sesión</b-button>
                        </b-form-group>
                        <b-alert show v-if="error" variant="danger">{{ error }}</b-alert>
                    </b-form>
                </b-col>
            </b-row>
            {{ usuario }}
        </b-container>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import {mapActions} from 'vuex'
export default {
    data() {
        return {
            cedula: '',
            password: '',
            error: ''
        }
    },
    computed: {
        ...mapState(['usuario'])
    },
    methods: {
        ...mapActions(['addUsuario']),
        login() {
            if(this.cedula && this.password) {
                // ?documento=1011&clave=1011
                this.$http.get('http://localhost:8080/srd/Sesion', { 
                    params: { 
                        documento: this.cedula,
                        clave: this.password
                    } 
                })
                .then((res) => {
                    let data = res.data;
                    if(data.auth) {
                        localStorage.setItem('usuario', JSON.stringify(data.usuario));
                        this.addUsuario();
                        if(data.usuario.tipo == 'Admin') {
                            this.$router.push('/admin');
                        }
                        if (data.usuario.tipo == 'Docente') {
                            this.$router.push('/docente');
                        }
                        if(data.usuario.tipo == 'Estudiante') {
                            this.$router.push('/estudiante');
                        }
                    } else {
                        this.error = 'Documento o contraseña incorrectos';
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
                

            } else {
                this.error = "Todos los campos son obligatorios";
            }

            
            // let res = {auth: true, user: {cedula: this.cedula, nombre: 'Zapata', type: 'docente'}};
            // this.$router.push('docente');




        }
    }
}
</script>