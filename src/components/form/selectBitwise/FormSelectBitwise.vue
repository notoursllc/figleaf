<script>
export default {
    name: 'FormSelectBitwise'
}
</script>

<script setup>
import { watch, ref } from 'vue';
import FigFormMultiselect from '../multiselect/FormMultiSelect.vue';

console.log("PROPS", FigFormMultiselect.props);

const props = defineProps({
    ...FigFormMultiselect.props,

    // modelValue: {},

    // options: {
    //     type: Array
    // }
});

const emit = defineEmits([
    'update:modelValue'
]);

const selectedValue = ref(null);

function setSelectedValue() {
    selectedValue.value = props.options.filter((obj) => obj.value & props.modelValue);

    selectedValue.value = !props.multiple
        ? props.options.find((obj) => obj.value === props.modelValue)
        : props.options.filter((obj) => obj.value & props.modelValue);
}


function selectValueChanged(valueArray) {
    let total = 0;

    if(!Array.isArray(valueArray)) {
        valueArray = [valueArray];
    }

    valueArray.forEach(function(val) {
        total += val;
    });

    emit('update:modelValue', total);
}

watch(
    () => props.modelValue,
    (newVal) => {
        setSelectedValue();
    },
    { immediate: true }
);

watch(
    () => props.options,
    (newVal) => {
        setSelectedValue();
    },
    { immediate: true }
);
</script>

<template>
    <div>
    <fig-form-multiselect
        v-model="selectedVal"
        v-bind="$attrs"
        :options="options"
        :mode='$attrs.mode || "tags"'
        @update:modelValue="selectValueChanged"
        class="fig-form-select-bitwise" />
    </div>
</template>
