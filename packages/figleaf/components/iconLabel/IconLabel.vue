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
        <slot name="left"></slot>
        <div :class="defaultSlotClasses"><slot></slot></div>
        <slot name="right"></slot>
    </div>
</template>
