<script>
export default {
    name: 'Canvas'
}
</script>

<script setup>
import FigAppWrapper from '../../src/components/appWrapper/AppWrapper.vue';
</script>

<template>
    <fig-app-wrapper>
        <slot />
    </fig-app-wrapper>
</template>
