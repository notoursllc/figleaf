<script>
import Vue from 'vue';

export default Vue.extend({
    name: 'FormInputEndcapper',

    data: () => ({
        endCapBaseClasses: 'flex items-center leading-normal bg-gray-100 border-t border-b border-gray-350 px-2 whitespace-no-wrap text-grey-dark text-sm'
    })
});
</script>


<template>
    <div class="flex flex-no-wrap items-stretch relative">
        <!-- prefix -->
        <div
            v-if="$slots.prefix"
            class="flex -mr-px">
            <span
                class="rounded-l-md rounded-r-none border-l"
                :class="endCapBaseClasses"><slot name="prefix"></slot></span>
        </div>

        <!-- input -->
        <slot></slot>

        <!-- suffix -->
        <div
            v-if="$slots.suffix"
            class="flex -mr-px">
            <span
                class="rounded-r-md rounded-l-none border-r"
                :class="endCapBaseClasses"><slot name="suffix"></slot></span>
        </div>

    </div>
</template>
