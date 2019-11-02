<template>
    <div>
        Perfil: {{ codigo }}
    </div>
</template>
<script>
export default {
    data() {
        return {
            codigo: 0
        }
    },
    created() {
        this.codigo = this.$route.params.codigo;
    }
}
</script>