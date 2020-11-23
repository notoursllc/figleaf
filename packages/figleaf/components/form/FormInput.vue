<script>
import Vue from 'vue';
import FigIcon from '../icon/FigIcon';


export default Vue.extend({
    name: 'FormInput',

    components: {
        FigIcon
    },

    props: {
        value: {
            type: String
        },

        clearable: {
            type: Boolean,
            default: false
        }
    },

    data: () => ({
        selectedValue: null
    }),

    watch: {
        value: {
            handler: function(newVal) {
                this.selectedValue = newVal;
            },
            immediate: true
        }
    },

    methods: {
        emitInput() {
            this.$emit('input', this.selectedValue);
        },

        onClear() {
            this.selectedValue = null;
            this.emitInput();
        }
    }
});
</script>


<template>
    <div class="relative w-full">
        <input
            type="text"
            v-model="selectedValue"
            @input="emitInput"
            class="form-input w-full border-gray-400"
            :class="{'pr-8': this.clearable}">
        <button
            v-if="clearable"
            type="button"
            @click="onClear"
            class="absolute top-0 right-0 background-transparent p-1 pr-2 flex items-center min-h-full text-center border-0">
            <fig-icon
                icon="x"
                :stroke-width="1"
                stroke="#000"
                :width="16"
                :height="16" />
        </button>
    </div>
</template>
