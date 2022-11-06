<script>
import FigNuxtImgBunny from '../nuxtImgBunny/NuxtImgBunny.vue';

export default {
    name: 'FigHero',

    components: {
        FigNuxtImgBunny
    },

    props: {
        url: {
            type: String
        },

        altText: {
            type: String
        },

        imageSizes: {
            type: String
        },

        imageLoading: {
            type: String,
            default: 'lazy'
        },

        shadows: {
            type: Boolean,
            default: false
        }
    }
}
</script>


<template>
    <div class="fig-hero-container">
        <div class="fig-hero">
            <fig-nuxt-img-bunny
                :src="url"
                format="webp"
                :sizes="imageSizes"
                :alt="altText"
                :loading="imageLoading"
                class="h-full w-full object-cover" />
            <div class="absolute top-0 right-0 left-0 bottom-0 flex justify-center">
                <div v-if="shadows" class="fig-hero-fade fig-hero-fade-top" />
                    <slot />
                <div v-if="shadows" class="fig-hero-fade fig-hero-fade-bottom" />
            </div>
        </div>
    </div>
</template>


<style scoped>
.fig-hero-container {
    aspect-ratio: 1/1;
}

@screen md {
    .fig-hero-container {
        aspect-ratio: 25/9;
    }
}

.fig-hero {
    @apply w-full h-full text-white bg-no-repeat bg-cover bg-center relative;
}

.fig-hero-fade {
    @apply absolute w-full pointer-events-none;
    height: 8px;
}

.fig-hero-fade-top {
    @apply top-0;
    background-image: linear-gradient(0deg, transparent, rgba(37, 37, 37, .1), 99%, #000);
}

.fig-hero-fade-bottom {
    @apply bottom-0;
    background-image: linear-gradient(180deg, transparent, rgba(37, 37, 37, .1), 99%, #000);
}
</style>
