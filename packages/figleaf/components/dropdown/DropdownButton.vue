<script>
import Vue from 'vue';

export default Vue.extend({
    name: 'DropdownButton',

    props: {
        centered: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        onClick(e) {
            e.preventDefault();
            this.$parent.$emit('fig::dropdown::close');
            this.$emit('click', e);
        }
    }
});
</script>


<template>
    <div class="hover:bg-gray-100">
        <button
            type="button"
            class="border-0 py-2 px-4 text-sm font-normal block w-full whitespace-nowrap bg-transparent text-gray-600"
            :class="{'text-center': centered, 'text-left': !centered}"
            role="menuitem"
            v-on="$listeners"
            @click="onClick">
            <slot></slot>
        </button>
    </div>
</template>
