<script>
export default {
    name: 'DropdownButton',
    inheritAttrs: false
}
</script>

<script setup>
const props = defineProps({
    centered: {
        type: Boolean,
        default: false
    }
});
</script>


<template>
    <div class="hover:bg-gray-100">
        <button
            type="button"
            class="fig-dropdown-button focus:outline-none"
            :class="{'text-center': centered, 'text-left': !centered}"
            role="menuitem"
            v-bind="$attrs">
            <slot></slot>
        </button>
    </div>
</template>


<style scoped>
.fig-dropdown-button {
    @apply border-0 py-2 px-4 text-sm font-normal block w-full whitespace-nowrap bg-transparent text-gray-600;
}
</style>
