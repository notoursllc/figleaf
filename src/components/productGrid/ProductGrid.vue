<script>
export default {
    name: 'ProductGrid'
}
</script>

<script setup>
const props = defineProps({
    products: {
        type: Array,
        default: () => {
            return [];
        }
    }
});
</script>

<template>
    <div class="flex flex-wrap -mx-2 overflow-hidden xl:-mx-3">
        <div
            v-for="(product, idx) in products"
            :key="idx"
            class="my-2 px-2 w-1/2 md:w-1/3 xl:my-3 xl:px-3">
            <slot v-bind:data="{ product: product, index: idx }" />
        </div>
    </div>
</template>

