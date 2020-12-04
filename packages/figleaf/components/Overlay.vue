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
            default: 0.75,
            validator(val) {
                return val >= 0 && val <= 1;
            }
        },

        blur: {
            type: Number,
            default: 2
        },

        size: {
            type: String,
            default: 'md',
            validator(size) {
                return ['xs', 'sm', 'md', 'lg', 'xl'].indexOf(size) > -1;
            }
        },

        variant: {
            type: String,
            default: 'primary',
            validator(val) {
                return ['primary', 'secondary', 'success', 'error'].indexOf(val) > -1;
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
                case 'xs':
                    return 14;

                case 'sm':
                    return 26;

                case 'lg':
                    return 60;

                case 'xl':
                    return 90;

                default:
                    return 40;
            }
        },

        spinnerColor() {
            switch(this.variant) {
                case 'success':
                    return '#16a34a';

                case 'error':
                    return '#ef4444';

                case 'secondary':
                    return '#a8a29e';

                default:
                    return '#60a5fa';
            }
        },

        strokeWidth() {
            switch(this.size) {
                case 'xs':
                    return 4;

                case 'sm':
                    return 3;

                default:
                    return 2;
            }
        },

        backdropStyle() {
            const style = {
                opacity: this.opacity,
                backgroundColor: this.dark ? '#CBD5E0' : '#e7e5e4'
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
        <slot></slot>
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
                    :stroke-width="strokeWidth" />
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
