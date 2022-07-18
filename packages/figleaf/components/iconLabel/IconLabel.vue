<script>
import Vue from 'vue';

export default Vue.extend({
    name: 'IconLabel',

    props: {
        classes: {}
    },

    computed: {
        defaultSlotClasses() {
            if(this.classes) {
                return this.classes;
            }

            const classNames = [];

            if(this.$slots.left) {
                classNames.push('pl-1');
            }
            if(this.$slots.right) {
                classNames.push('pr-1');
            }

            return classNames;
        }
    }
});
</script>


<template>
    <div class="flex items-center break-normal">
        <div class="flex-shrink-0" v-if="$slots.left"><slot name="left"></slot></div>
        <div :class="defaultSlotClasses"><slot></slot></div>
        <div class="flex-shrink-0" v-if="$slots.right"><slot name="right"></slot></div>
    </div>
</template>
