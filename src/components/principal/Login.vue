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
        </b-container>
    </div>
</template>
<script>
export default {
    data() {
        return {
            cedula: '',
            password: '',
            error: ''
        }
    },
    methods: {
        login() {
            if(this.cedula && this.password) {
                // TODO
                let res = {auth: true, user: {cedula: this.cedula, nombre: 'Zapata', type: 'docente'}};

                if(res.auth) {
                    if(res.user.type === 'admin') {
                        console.log('mandar a admin');
                    } 
                    if(res.user.type === 'docente') {
                        localStorage.setItem('user', JSON.stringify(res.user));
                        this.$router.push({name: 'docente'});
                    } 
                    if (res.user.type === 'estudiante') {
                        console.log('mandar a estudiante');
                    }
                } else {
                    this.error = "Usuario o contraseña incorrectos";
                }

                // TODO
            } else {
                this.error = "Todos los campos son obligatorios";
            }
        }
    }
}
</script>