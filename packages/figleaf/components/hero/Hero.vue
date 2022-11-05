<script>
import resizeObserver from '../../directives/resizeObserver/resizeObserver.js';

export default {
    name: 'FigHero',

    directives: {
        resizeObserver
    },

    props: {
        url: {
            type: String
        },

        shadows: {
            type: Boolean,
            default: false
        }
    },

    data: function() {
        return {
            imageClass: 'w375'
        }
    },

    methods: {
        onResize(e) {
            this.$emit('resize', e)
        }
    }
}
</script>


<template>
    <div class="fig-hero-container">
        <div class="fig-hero" v-resize-observer="onResize">
            <img
                format="webp"
                :src="url"
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
