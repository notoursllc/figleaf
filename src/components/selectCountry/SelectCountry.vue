<script>
export default {
    name: 'SelectCountry'
}
</script>

<script setup>
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import FormMultiSelect from '../form/multiselect/FormMultiSelect.vue';
import useCountry from '../country/useCountry.js';

const props = defineProps({
    modelValue: {
        type: String
    }
});

const emit = defineEmits([
    'update:modelValue'
]);

const { t } = useI18n();
const { getCountries } = useCountry();

const selectedCountry = ref(props.modelValue);

const countries = getCountries();
const selectOptions = Object.keys(countries).map((countryCode) => {
    return {
        label: t(countries[countryCode]),
        value: countryCode
    }
});

function onChange() {
    emit('update:modelValue', selectedCountry.value);
}

watch(
    () => props.modelValue,
    (newVal) => {
        selectedCountry.value = newVal;
    },
    { immediate: true }
);
</script>


<template>
    <form-multi-select
        v-model="selectedCountry"
        @update:modelValue="onChange"
        :searchable="true"
        :options="selectOptions"
        mode="single" />
</template>
