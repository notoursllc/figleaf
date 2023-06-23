<script>
export default {
    name: 'Canvas'
}
</script>

<script setup>
import '../../src/assets/css/tailwind.css';
import FigIconSprite from '../../src/components/icon/SvgSprite.vue';
import FigConfirm from '../../src/components/confirm/Confirm.vue';
</script>

<template>
    <div>
        <fig-icon-sprite />
        <fig-confirm />
        <slot />
    </div>
</template>
