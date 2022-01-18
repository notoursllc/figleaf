<script>
import {
    removeLeadingSlash,
    bunnyBaseUrl
} from '../../utils/common.js';

export default {
    name: 'HeroSliderItem',

    props: {
        hero: {
            title: String,
            caption: String,
            url: String,
        },
    },

    methods: {
        getBackgroundImageUrl(url) {
            return `url(${bunnyBaseUrl}/${removeLeadingSlash(url)})`;
        }
    }
}
</script>


<template>
    <div class="fig-hero bg-[red]">
        <div class="fig-hero-fade fig-hero-fade-top" />

        <div class="w-full p-4 md:p-8">
            <h1 class="fig-hero-mark mb-4 text-3xl sm:text-4xl inline-block text-yellow-500 font-normal m-0">
                {{ hero.title }}
            </h1>

            <div class="w-full md:w-1/2 lg:w-2/5 xl:1/3 text-lg sm:text-xl text-white">
                <div class="fig-hero-mark inline-block">{{ hero.caption }}</div>
            </div>
        </div>

        <div class="fig-hero-fade fig-hero-fade-bottom" />
    </div>
</template>


<style>
.fig-hero {
    @apply w-full flex items-center text-white bg-no-repeat bg-cover bg-center min-h-screen;
}

@screen sm {
    .fig-hero {
        min-height: 80vh;
    }
}

.fig-hero-fade {
    @apply absolute w-full pointer-events-none;
    height: 30%;
}

.fig-hero-fade-top {
    @apply top-0;
    background-image: linear-gradient(0deg, transparent, rgba(37, 37, 37, .3), #000);
}

.fig-hero-fade-bottom {
    @apply bottom-0;
    background-image: linear-gradient(180deg, transparent, rgba(37, 37, 37, .3), #000);
}

.fig-hero-mark {
    @apply bg-black bg-opacity-50;
    padding: 1px 4px;
}
</style>
