<script>
export default {
    name: 'NuxtImgBunny',

    inheritAttrs: false
};
</script>


<template>
    <nuxt-img
        provider="bunny"
        v-bind="$attrs" />
</template>
