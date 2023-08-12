<script>
export default {
    name: 'FigAppWrapper'
}
</script>

<script setup>
import { ref, provide } from 'vue';
import ClientOnly from '@duannx/vue-client-only';
import '../../assets/css/tailwind.css';
import FigIconSprite from '../icon/SvgSprite.vue';
import FigToaster from '../toaster/Toaster.vue';
import FigConfirm from '../confirm/Confirm.vue';

const confirm = ref(null);
const toaster = ref(null);

provide('figAddToast', (config) => {
    return toaster.value?.addToast(config);
});

provide('figClearToasts', () => {
    return toaster.value?.clearToasts();
});

provide('figShowConfirm', (message, config) => {
    return confirm.value?.show(message, config);
});
</script>

<template>
    <fig-icon-sprite />
    <fig-confirm ref="confirm" />

    <!-- 
        Nuxt has it's own client-only component, 
        but using another client-only component so we dont have a dependency on Nuxt.
    -->
    <client-only>
        <fig-toaster ref="toaster" />
    </client-only>  
    <slot />
</template>