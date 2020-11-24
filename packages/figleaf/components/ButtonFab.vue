<script>
import Vue from 'vue';
import FigIcon from './icon/FigIcon';

export default Vue.extend({
    name: 'ButtonFab',

    components: {
        FigIcon
    },

    props: {
        icon: {
            type: String,
            required: false,
            default: 'plus'
        },

        column: {
            type: Number,
            required: false,
            default: 1
        }
    },

    computed: {
        isDisabled() {
            return ['true', true].indexOf(this.$attrs.disabled) > -1;
        },

        buttonClasses() {
            const classes = [];

            if(this.column === 2) {
                classes.push('fab2');
            }

            switch(this.icon) {
                case 'edit':
                    classes.push(
                        this.isDisabled ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                    );
                    break;

                case 'trash':
                    classes.push(
                        this.isDisabled ? 'bg-red-300' : 'bg-red-600 hover:bg-red-700'
                    );
                    break;

                case 'x':
                    classes.push(
                        this.isDisabled ? 'bg-gray-100' : 'bg-white hover:bg-gray-100'
                    );
                    break;

                default:
                    classes.push(
                        this.isDisabled ? 'bg-green-400' : 'bg-green-500 hover:bg-green-600'
                    );
            }

            return classes;
        }
    }
});
</script>

<template>
    <button
        type="button"
        tabindex="0"
        class="fig-button-fab fixed rounded-full p-14px z-1"
        :class="buttonClasses"
        v-on="$listeners">
        <fig-icon
            :icon="icon"
            :height="28"
            :width="28"
            stroke="#fff" />
    </button>
</template>


<style lang="scss" scoped>
.fig-button-fab {
    bottom: 20px;
    right: 20px;
}

.fab2 {
    right: 100px;
}
</style>
