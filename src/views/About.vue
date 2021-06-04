<template>
    <div class="about">
        <iframe class="frame" :src="`./generator/index.html`"></iframe>
    </div>
</template>

<script>
export default {
    name: 'About',
}
</script>

<style scoped>
.about {
    width: 100%;
    height: 100%;
}

.frame {
    width: 100%;
    height: 100%;
    border:none;
}
</style>
