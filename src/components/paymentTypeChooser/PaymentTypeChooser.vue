<script>
export default {
    name: 'PaymentTypeChooser'
}
</script>

<script setup>
import { ref, watch } from 'vue';
import FigIcon from '../icon/FigIcon.vue';
import FigIconLabel from '../iconLabel/IconLabel.vue';
import { paymentTypes } from './constants.js';

const props = defineProps({
    modelValue: {
        type: String,
        default: paymentTypes.cc,
        validator: (value) => Object.keys(paymentTypes).includes(value)
    }
});

const emit = defineEmits([
    'update:modelValue'
]);

const selectedType = ref(null);

function onClickType(type) {
    selectedType.value = type;
    emit('update:modelValue', selectedType.value);
}

watch(
    () => props.modelValue,
    (newVal) => {
        selectedType.value = newVal;
    },
    { immediate: true }
);
</script>


<template>
    <div class="flex flex-wrap -mx-2">

        <!-- credit card -->
        <div class="my-2 px-2 w-full sm:w-1/2">
            <div
                class="payment-chooser-button"
                :class="{'selected': selectedType === 'cc'}"
                @click="onClickType('cc')">
                <div class="grow whitespace-nowrap">
                    <fig-icon-label>
                        <template v-slot:left>
                            <fig-icon
                                icon="credit-card"
                                :stroke-width="1.5"
                                :width="24"
                                :height="24" />
                        </template>
                        {{ $t('Credit card') }}
                    </fig-icon-label>
                </div>
                <fig-icon
                    icon="check-circle"
                    :stroke-width="1.5"
                    :width="24"
                    :height="24" />
            </div>
        </div>

        <!-- paypal -->
        <div class="my-2 px-2 w-full sm:w-1/2">
            <div
                class="payment-chooser-button"
                :class="{'selected': selectedType === 'paypal'}"
                @click="onClickType('paypal')">
                <div class="grow whitespace-nowrap">
                    <fig-icon-label>
                        <template v-slot:left>
                            <fig-icon
                                icon="brand-paypal"
                                :stroke-width="1.5"
                                :width="24"
                                :height="24" />
                        </template>
                        {{ $t('PayPal') }}
                    </fig-icon-label>
                </div>
                <fig-icon
                    icon="check-circle"
                    :stroke-width="1.5"
                    :width="24"
                    :height="24" />
            </div>
        </div>

    </div>
</template>


<style scoped>
.payment-chooser-button {
    @apply flex items-center border border-gray-300 rounded py-3 px-4 w-full cursor-pointer;
}
.payment-chooser-button:hover {
    @apply bg-blue-100;
}
.payment-chooser-button .fig-icon-check-circle {
    visibility: hidden;
}

.payment-chooser-button.selected {
    @apply border-blue-500 bg-blue-100;
}
.payment-chooser-button.selected .fig-icon {
    stroke: #256bdb !important;
}
.payment-chooser-button.selected .fig-icon-check-circle {
    visibility: visible;
}
</style>
