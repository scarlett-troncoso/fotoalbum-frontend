<script>
export default {
    name: 'LoadingIcon.vue'
}
</script>

<template>
    <div class="loader">
        <i class="fa-solid fa-spinner fa-spin"></i>
        <div>loading</div>
    </div>
</template>



<style scoped>
.loader {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>