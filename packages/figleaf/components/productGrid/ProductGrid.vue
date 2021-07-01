<script>
export default {
    props: {
        products: {
            type: Array,
            default: () => {
                return [];
            }
        }
    }
};
</script>


<template>
    <div class="flex flex-wrap -mx-2 overflow-hidden xl:-mx-3">
        <div
            v-for="(product, idx) in products"
            :key="idx"
            class="my-2 px-2 w-full sm:w-1/2 lg:w-1/3 xl:my-3 xl:px-3">
            <slot v-bind:product="product" />
        </div>
    </div>
</template>

