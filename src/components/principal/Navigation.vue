<template>
    <div>
        <b-navbar toggleable="lg">
            <b-container>
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <b-link :to="{name: 'inicio'}" class="p-2 text-info">Inicio</b-link>
                    </b-navbar-nav>
                    <b-navbar-nav class="ml-auto">
                        <b-link :to="{name: 'login'}" class="p-2 text-info">Iniciar sesión</b-link>
                    </b-navbar-nav>
                </b-collapse>
            </b-container>
        </b-navbar>
    </div>
</template>
<script>
export default {
    
}
</script>