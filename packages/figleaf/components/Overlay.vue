

<script>
import Vue from 'vue';
import Spinner from './Spinner';

export default Vue.extend({
    name: 'Overlay',

    props: {
        show: {
            type: Boolean,
            default: false
        },

        dark: {
            type: Boolean,
            default: false
        },

        opacity: {
            type: Number,
            default: 0.85,
            validator(val) {
                return val >= 0 && val <= 1;
            }
        },

        blur: {
            type: Number,
            default: 2
        },

        size: {
            type: Number,
            default: 0.85,
            validator(size) {
                return ['sm', 'md', 'lg'].indexOf(size) > -1;
            }
        },

        variant: {
            type: Number,
            default: 0.85,
            validator(val) {
                return ['primary', 'success', 'error'].indexOf(val) > -1;
            }
        },

        zIndex: {
            type: Number,
            default: 10
        }
    },

    components: {
        Spinner
    },

    computed: {
        spinnerWidth() {
            switch(this.size) {
                case 'sm':
                    return 40;

                case 'lg':
                    return 80;

                default:
                    return 60;
            }
        },

        spinnerColor() {
            switch(this.variant) {
                case 'success':
                    return '#22c55e';

                case 'error':
                    return '#ef4444';

                default:
                    return '#60a5fa';
            }
        },

        spinnerThicknes() {
            switch(this.size) {
                case 'sm':
                    return 2;

                case 'lg':
                    return 4;

                default:
                    return 3;
            }
        },

        backdropStyle() {
            const style = {
                opacity: this.opacity,
                backgroundColor: this.dark ? '#CBD5E0' : '#fff'
            };

            if(this.blur) {
                style.backdropFilter = `blur(${this.blur}px`;
            }

            return style;
        }
    }
});
</script>


<template>
    <div class="fig-overlay relative">
        <div
            v-if="show"
            class="absolute inset-0"
            :style="{'zIndex': this.zIndex}">

            <!-- backdrop  -->
            <div
                class="absolute inset-0"
                :style="backdropStyle"></div>

            <!-- spinner -->
            <div class="spinner-container">
                <Spinner
                    :width="spinnerWidth"
                    :color="spinnerColor"
                    :stroke-width="spinnerThicknes" />
            </div>
        </div>
    </div>
</template>


<style lang="postcss">
.spinner-container {
    @apply absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
}
</style>
