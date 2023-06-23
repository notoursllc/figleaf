<script>
export default {
    name: 'Content'
}
</script>

<script setup>
import { computed } from 'vue';
import { contentSizes } from './constants';

const props = defineProps({
    size: {
        type: String,
        default: contentSizes.xl,
        validator: (value) => Object.keys(contentSizes).includes(value)
    },

    nopad: {
        type: Boolean
    },

    fullHeight: {
        type: Boolean
    }
});

const classNames = computed(() => {
    return {
        'fig-content': true,
        [`fig-content-${props.size}`]: true,
        'px-2': !props.nopad,
        'h-full': props.fullHeight
    };
});
</script>

<template>
    <div :class="classNames"><slot /></div>
</template>


<style scoped>
.fig-content {
    @apply relative;
    max-width: 1586px;
    margin: 0 auto;
}
.fig-content-sm {
    max-width: 640px;
}
.fig-content-md {
    max-width: 768px;
}
.fig-content-lg {
    max-width: 1025px;
}
.fig-content-xl {
    max-width: 1586px;
}
</style>
