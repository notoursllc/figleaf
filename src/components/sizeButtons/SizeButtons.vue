<script>
export default {
    name: 'SizeButtons'
}
</script>

<script setup>
import { computed } from 'vue';
import isObject from 'lodash.isobject';

const props = defineProps({
    modelValue: {
        type: Object,
        default: () => {
            return {};
        }
    },

    skus: {
        type: Array,
        default: () => {
            return [];
        }
    }
});

const emit = defineEmits([
    'update:modelValue'
]);

const sizes = computed(() => {
    const visibleSkus = [];

    props.skus.forEach((sku) => {
        // TODO: shopbacUI is not setting 'published' yet.  That needs fixing so we can use this logic:
        // if(sku.label && sku.published && sku.visible_if_no_inventory) {
        if(sku.label && sku.visible_if_no_inventory) {
            visibleSkus.push({
                ...sku,
                isDisabled: sku.inventory_count <= 0,
                isSelected: isObject(props.modelValue) && (props.modelValue.id === sku.id)
            });
        }
    });

    return visibleSkus;
});

function onBtnClick(sku) {
    emit('update:modelValue', sku);
}
</script>


<template>
    <div class="size-buttons">
        <button
            v-for="(sku, index) in sizes"
            :key="index"
            :disabled="sku.isDisabled"
            :class="{ 'selected': sku.isSelected }"
            @click="onBtnClick(sku)">{{ sku.label }}</button>
    </div>
</template>


<style scoped>
.size-buttons {
    @apply flex flex-row gap-2 flex-wrap justify-start items-center;
}

.size-buttons > button {
    @apply border border-gray-300 text-black bg-white rounded-md px-2 m-0;
    height: 48px;
    min-width: 50px;
}
.size-buttons > button:disabled {
    @apply cursor-not-allowed bg-gray-100 text-gray-300;
}
.size-buttons > button.selected,
.size-buttons > button:not(:disabled):hover {
    @apply text-white bg-blue-500 border-blue-500;
}
</style>
