<script>
export default {
    name: 'Canvas'
}
</script>

<script setup>
import '../../src/assets/css/tailwind.css';
import FigIconSprite from '../../src/components/icon/SvgSprite.vue';
import FigConfirm from '../../src/components/confirm/Confirm.vue';
import FigToaster from '../../src/components/toaster/Toaster.vue';
</script>

<template>
    <div>
        <fig-icon-sprite />
        <fig-confirm />
        <fig-toaster />
        <slot />
    </div>
</template>
