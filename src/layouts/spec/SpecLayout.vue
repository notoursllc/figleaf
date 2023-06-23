<script>
export default {
    name: 'FigSpecLayout'
}
</script>

<script setup>
const props = defineProps({
    zebra: {
        type: Boolean,
        default: true
    }
});
</script>

<template>
    <div class="fig-spec-layout" :class="{'no-zebra': !zebra}">
        <slot></slot>
    </div>
</template>


<style>
.fig-spec-layout {
    @apply block;
}

.fig-spec-layout.no-zebra .fig-spec {
    background-color: inherit !important;
}

@screen sm {
    .fig-spec-layout {
        @apply table w-full;
    }
}
</style>
