<script>
export default {
    name: 'NuxtImgBunny',

    props: {
        src: {
            type: String
        },

        sizes: {
            type: String
        },

        loading: {
            type: Boolean
        }
    }
};
</script>


<template>
    <nuxt-img
        :src="src"
        provider="bunny"
        :loading="loading"
        :sizes="sizes" />
</template>
