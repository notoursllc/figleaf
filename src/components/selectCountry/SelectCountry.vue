<script>
export default {
    name: 'SelectCountry'
}
</script>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import isObject from 'lodash.isobject';
import FormMultiSelect from '../form/multiselect/FormMultiSelect.vue';
import useCountry from '../country/useCountry.js';

const { getCountries } = useCountry();

const props = defineProps({
    modelValue: {
        type: String
    }
});

const emit = defineEmits([
    'update:modelValue'
]);

const { t } = useI18n();
const selectedCountry = ref(null);
const selectOptions = ref([]);

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

onMounted(() => {
    const countries = getCountries();

    selectOptions.value = Object.keys(countries).map((countryCode) => {
        return {
            label: t(countries[countryCode]),
            value: countryCode
        }
    });
});
</script>


<template>
    <form-multi-select
        v-model="selectedCountry"
        @update:modelValue="onChange"
        :searchable="true"
        :options="selectOptions"
        mode="single" />
</template>
