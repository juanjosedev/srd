<template>
    <div>
        <b-navbar variant="info" type="dark" toggleable="lg">
            <b-container>
                <b-navbar-toggle class="text-primary" target="nav-collapse"></b-navbar-toggle>
                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <b-link :to="{name: 'Dinicio'}" class="text-white p-2"><fa icon="home" /> Inicio</b-link>
                    </b-navbar-nav>
                    <b-navbar-nav class="ml-auto">
                        <b-link :to="{name: 'DAsignaturas'}" class="text-white p-2"><fa icon="book" /> Mis Asignaturas</b-link>
                        <b-link :to="{name: 'ayuda'}" class="text-white p-2"><fa icon="question-circle"/> Ayuda</b-link>
                        <Logout />
                    </b-navbar-nav>
                </b-collapse>
            </b-container>
        </b-navbar>
    </div>
</template>
<script>
import Logout from '@/components/principal/Logout'
export default {
    components: {
        Logout
    }
}
</script>