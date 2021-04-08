<script>
import '../../packages/figleaf/assets/css/tailwind.css';
import FigIconSprite from '../../packages/figleaf/components/icon/FigIconSprite.vue';

export default {
    components: {
        FigIconSprite
    }
};
</script>

<template>
    <div>
        <fig-icon-sprite />
        <slot />
    </div>
</template>



