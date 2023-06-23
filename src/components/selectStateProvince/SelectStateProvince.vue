<script>
export default {
    name: 'SelectStateProvince'
}
</script>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import isObject from 'lodash.isobject';
import FormMultiSelect from '../form/multiselect/FormMultiSelect.vue';
import FigFormText from '../form/text/FormText.vue';
import useCountry from '../country/useCountry.js';
import { formInputSizes } from '../form/inputConstants.js';

const props = defineProps({
    modelValue: {
        type: String
    },

    country: {
        type: String
    },

    size: {
        type: String,
        default: formInputSizes.md,
        validator: (value) => Object.keys(formInputSizes).includes(value)
    },

    disabled: {
        type: Boolean,
        default: false
    },

    placeholder: {
        type: String,
    }
});

const emit = defineEmits([
    'update:modelValue'
]);

const { getCountryStatesMap } = useCountry();
const countryStatesMap = getCountryStatesMap();

const selectedState = ref(null);

const stateOptions = computed(() => {
    let options = [];

    if(props.country && countryStatesMap[props.country]) {
        const states = countryStatesMap[props.country];

        options = Object.keys(states).map((key) => {
            return {
                label: states[key],
                value: key
            }
        });
    }

    return options;
});

function emitInput() {
    emit('update:modelValue', selectedState.value);
}

watch(
    () => props.modelValue,
    (newVal) => {
        selectedState.value = newVal;
    },
    { immediate: true }
);

watch(
    () => props.country,
    (newVal) => {
        if(selectedState.value && newVal && countryStatesMap[newVal]) {
            // if the current selected state does not exist in the map of
            // states for this country then set it to null
            if(!countryStatesMap[newVal][selectedState.value]) {
                selectedState.value = null;
            }
        }
        else {
            selectedState.value = null;
        }

        emitInput();
    },
    { immediate: true }
);
</script>


<template>
    <div>
        <form-multi-select
            v-if="stateOptions.length"
            v-model="selectedState"
            v-bind="$props"
            :options="stateOptions"
            @update:modelValue="emitInput" />
        <fig-form-text
            v-else
            v-model="selectedState"
            @update:modelValue="emitInput"
            :placeholder="placeholder"
            :disabled="disabled"
            :size="size"
            class="w-full" />
    </div>
</template>
