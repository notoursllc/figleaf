<script>
import Slider from '../slider/Slider.vue';
import HeroSliderItem from './HeroSliderItem.vue';

export default {
    components: {
        Slider,
        HeroSliderItem
    },

    props: {
        heros: {
            type: Array,
            default: () => {
                return []
            }
        },

        options: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },

    computed: {
        sliderConfig() {
            return Object.assign(
                {},
                {
                    dots: true,
                    autoplay: true,
                    navButtons: false,
                    slidesToShow: 1,
                    autoplaySpeed: 5000,
                    speed: 300,
                    timing: 'ease-in-out'
                },
                this.options
            );
        }
    }
};
</script>


<template>
    <slider :options="sliderConfig">
        <div
            v-for="(hero, index) in heros"
            :key="index"
            :class="`slide--${index}`">
            <hero-slider-item :hero="hero" />
        </div>
    </slider>
</template>
