<script>
export default {
    name: 'FigAppWrapper'
}
</script>

<script setup>
import { ref, provide } from 'vue';
import '../../assets/css/tailwind.css';
import FigIconSprite from '../icon/SvgSprite.vue';
import FigToaster from '../toaster/Toaster.vue';
import FigConfirm from '../confirm/Confirm.vue';

const toaster = ref(null);

provide('figAddToast', (config) => {
    return toaster.value?.addToast(config);
});

provide('figClearToasts', () => {
    return toaster.value?.clearToasts();
});
</script>

<template>
    <fig-icon-sprite />
    <fig-confirm />
    <fig-toaster ref="toaster" />
    <slot />
</template>