<script>
import { RowBuilderProps } from '../rowBuilder/useRowBuilder.js';

export default {
    name: 'FigMetaDataBuilder'
}
export const builderProps = RowBuilderProps;
</script>

<script setup>
import { ref, watch } from 'vue';
import cloneDeep from 'lodash-es/cloneDeep.js';
import FigRowBuilder from '../rowBuilder/RowBuilder.vue';
import FigFormInput from '../form/text/FormText.vue';

const props = defineProps({
    ...builderProps,

    propertyPlaceholder: {
        type: String,
        default: null
    },

    valuePlaceholder: {
        type: String
    }
});

const emit = defineEmits([
    'update:modelValue'
]);

const rowData = ref([]);

function onAddRow() {
    rowData.value.push({
        property: null,
        value: null
    });
}

function onRemoveRow(index) {
    rowData.value.splice(index, 1);
}

function sanitize() {
    const data = cloneDeep(rowData.value);
    let i = data.length;
    while (i--) {
        if(!data[i].property && !data[i].value) {
            data.splice(i, 1);
        }
    }
    return data;
}

function emitInput() {
    emit('update:modelValue', sanitize());
}

watch(
    () => props.modelValue,
    (newValue) => {
        if(Array.isArray(newValue)) {
            rowData.value = cloneDeep(newValue);
        }
    },
    { immediate: true, deep: true }
);
</script>


<template>
    <fig-row-builder
        class="inline-block"
        v-model="rowData"
        @add="onAddRow"
        @remove="onRemoveRow"
        @update:modelValue="emitInput"
        :sortable="props.sortable"
        :remove-confirm="props.removeConfirm"
        :max-rows="props.maxRows"
        :density="props.density">
        <template v-slot:default="slotScope">
            <div class="grid grid-cols-2 gap-3">
                <fig-form-input
                    v-model="slotScope.rowBuilder.property"
                    @update:modelValue="emitInput"
                    :placeholder="propertyPlaceholder || $t('Property')" />

                <fig-form-input
                    v-model="slotScope.rowBuilder.value"
                    @update:modelValue="emitInput"
                    :placeholder="valuePlaceholder || $t('Value')" />
            </div>
        </template>
        <template v-slot:buttonLabel>{{ $t('Add') }}</template>
    </fig-row-builder>
</template>
