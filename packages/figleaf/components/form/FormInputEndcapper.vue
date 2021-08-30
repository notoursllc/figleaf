<script>
import Vue from 'vue';

export default Vue.extend({
    name: 'FormInputEndcapper',

    props: {
        prefixAs: {
            type: String,
            default: 'span'
        },

        suffixAs: {
            type: String,
            default: 'span'
        }
    },

    data: () => ({
        endCapBaseClasses: 'flex items-center leading-normal border-t border-b bg-gray-200 border-gray-300 px-1 whitespace-nowrap text-grey-dark text-sm'
    }),

    methods: {
        onPrefixClick() {
            this.$emit('prefixClick');
        },

        onSuffixClick() {
            this.$emit('suffixClick');
        }
    }
});
</script>


<template>
    <div class="flex flex-no-wrap items-stretch relative">
        <!-- prefix -->
        <component
            v-if="$slots.prefix"
            :is="prefixAs"
            class="-mr-px rounded-l-md rounded-r-none border-l"
            :class="endCapBaseClasses"
            @click="onPrefixClick"><slot name="prefix"></slot></component>

        <!-- input -->
        <slot></slot>

        <!-- suffix -->
        <component
            v-if="$slots.suffix"
            :is="suffixAs"
            class="-mr-px rounded-r-md rounded-l-none border-r"
            :class="endCapBaseClasses"
            @click="onSuffixClick"><slot name="suffix"></slot></component>
    </div>
</template>
