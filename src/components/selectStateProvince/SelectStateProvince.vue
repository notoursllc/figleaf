<script>
export default {
    name: 'SelectStateProvince'
}
</script>

<script setup>
import { ref, computed, watch } from 'vue';
import FormMultiSelect from '../form/multiselect/FormMultiSelect.vue';
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

const isDisabled = computed(() => {
    return props.disabled || !stateOptions.value.length;
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
        if(newVal
            && props.modelValue
            && countryStatesMap[newVal]?.[props.modelValue]) {
            selectedState.value = props.modelValue;
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
    <form-multi-select
        v-model="selectedState"
        :options="stateOptions"
        :disabled="isDisabled"
        @update:modelValue="emitInput"
        class="fig-select-region" />
    <div v-if="!country" class="text-gray-400">{{ $t('Please choose a country first') }}</div>
</template>

<style scoped>
.fig-select-region.is-disabled {
    @apply bg-gray-100 cursor-auto;
}
</style>
