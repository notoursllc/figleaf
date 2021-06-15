<script>
import Vue from 'vue';
import isObject from 'lodash.isobject';

export default Vue.extend({
    name: 'SizeButtons',

    props: {
        value: {
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
    },

    data() {
        return {

        };
    },

    computed: {
        sizes() {
            const visibleSkus = [];

            this.skus.forEach((sku) => {
                // TODO: shopbacUI is not setting 'published' yet.  That needs fixing so we can use this logic:
                // if(sku.label && sku.published && sku.visible_if_no_inventory) {
                if(sku.label && sku.visible_if_no_inventory) {
                    visibleSkus.push({
                        ...sku,
                        isDisabled: sku.inventory_count <= 0,
                        isSelected: isObject(this.value) && (this.value.id === sku.id)
                    });
                }
            });

            return visibleSkus;
        }
    },

    methods: {
        onBtnClick(sku) {
            this.$emit('input', sku);
        }
    }
});
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


<style  scoped>
.size-buttons {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 7px;
}

.size-buttons > button {
    @apply border border-gray-300 text-black bg-white flex flex-grow items-center justify-center rounded-md;
    height: 48px;
}
.size-buttons > button:disabled {
    @apply cursor-not-allowed bg-gray-100 text-gray-300;
}
.size-buttons > button.selected,
.size-buttons > button:not(:disabled):hover {
    @apply text-white bg-blue-500 border-blue-500;
}
</style>
