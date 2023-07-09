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

function addToast(config) {
    return toaster.value?.addToast(config);
}

provide('figAddToast', addToast);

provide('figClearToasts', () => {
    if (toaster.value?.clearToasts) {
        toaster.value.clearToasts();
    }
});
</script>

<template>
    <fig-icon-sprite />
    <fig-confirm />
    <fig-toaster ref="toaster" />
    <slot />
</template>