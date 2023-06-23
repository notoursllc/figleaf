<script>
export default {
    name: 'CompareAddressModal',
    inheritAttrs: false
}
</script>

<script setup>
import { ref, computed, watch } from 'vue';
import FigModal from '../modal/Modal.vue';
import FigAddress from '../address/Address.vue';
import FigButton from '../button/Button.vue';
import FigFormRadio from '../form/radio/FormRadio.vue';

const props = defineProps({
    originalLine1: {
        type: String
    },

    originalLine2: {
        type: String
    },

    originalCity: {
        type: String
    },

    originalState: {
        type: String
    },

    originalZip: {
        type: String
    },

    originalCountry: {
        type: String
    },

    suggestedLine1: {
        type: String
    },

    suggestedLine2: {
        type: String
    },

    suggestedCity: {
        type: String
    },

    suggestedState: {
        type: String
    },

    suggestedZip: {
        type: String
    },

    suggestedCountry: {
        type: String
    },

    showSuggestedAddress: {
        type: Boolean,
        default: true
    }
});

const emit = defineEmits([
    'save'
]);

defineExpose({
    show,
    hide
});

const compare_address_modal = ref(null);
const selectedAddress = ref('suggested');

const selectedIsSuggested = computed(() => {
    return selectedAddress.value === 'suggested';
});

const selectedIsOriginal = computed(() => {
    return selectedAddress.value === 'original';
});

const selectedIsEdit = computed(() => {
    return selectedAddress.value === 'edit';
});

function show() {
    compare_address_modal.value.show();
}

function hide() {
    compare_address_modal.value.hide();
    selectedAddress.value = 'suggested';
}

function onClickSave() {
    let payload = null;

    if(selectedIsSuggested || selectedIsOriginal) {
        payload = {
            addressLine1: selectedIsSuggested.value ? props.suggestedLine1 : props.originalLine1,
            addressLine2: selectedIsSuggested.value ? props.suggestedLine2 : props.originalLine2,
            city: selectedIsSuggested.value ? props.suggestedCity : props.originalCity,
            state: selectedIsSuggested.value ? props.suggestedState : props.originalState,
            zip: selectedIsSuggested.value ? props.suggestedZip : props.originalZip,
            country: selectedIsSuggested.value ? props.suggestedCountry : props.originalCountry,
        }
    }

    emit('save', payload);
    hide();
}

watch(
    () => props.showSuggestedAddress,
    (newVal) => {
        selectedAddress.value = newVal ? 'suggested' : 'edit';
    },
    { immediate: true }
);
</script>


<template>
    <fig-modal
        ref="compare_address_modal"
        size="md"
        :close-button="false"
        :escape-to-close="false">
        <template v-slot:header>
            {{ $t("Confirm your address") }}:
        </template>

        <div class="mb-8 text-gray-700">
            {{ $t(props.showSuggestedAddress ? 'confirm_your_address_desc1' : 'confirm_your_address_desc2') }}
            <div class="text-red-800">{{ $t('Please make sure your mailing address is correct to ensure accurate delivery.')}}</div>
        </div>

        <!-- Suggested address -->
        <div v-if="props.showSuggestedAddress" class="mb-4">
            <div class="mb-1"
                :class="{'fig-compare-radio-label-selected': selectedIsSuggested}">{{ $t('Suggested address') }}:</div>
            <div class="fig-compare-radio"
                :class="{'fig-compare-radio-selected': selectedIsSuggested}">
                <fig-form-radio
                    block
                    name="selectedAction"
                    checked-value="suggested"
                    v-model="selectedAddress">
                    <div class="pl-4">
                        <fig-address
                            :street-address="props.suggestedLine1"
                            :extended-address="props.suggestedLine2"
                            :city="props.suggestedCity"
                            :state="props.suggestedState"
                            :zip="props.suggestedZip"
                            :country-code="props.suggestedCountry" />
                    </div>
                </fig-form-radio>
            </div>
        </div>

        <!-- Original address -->
        <div class="mb-1"
            :class="{'fig-compare-radio-label-selected': selectedIsOriginal}">{{ $t('The address you entered') }}:</div>
        <div class="fig-compare-radio"
            :class="{'fig-compare-radio-selected': selectedIsOriginal}">
            <fig-form-radio
                block
                name="selectedAction"
                checked-value="original"
                v-model="selectedAddress">
                <div class="pl-4">
                    <fig-address
                        :street-address="props.originalLine1"
                        :extended-address="props.originalLine2"
                        :city="props.originalCity"
                        :state="props.originalState"
                        :zip="props.originalZip"
                        :country-code="props.originalCountry" />
                </div>
            </fig-form-radio>
        </div>

        <!-- Edit address -->
        <div
            class="fig-compare-radio mt-6"
            :class="{'fig-compare-radio-selected': selectedIsEdit}">
            <fig-form-radio
                block
                name="selectedAction"
                checked-value="edit"
                v-model="selectedAddress">
                <div class="pl-4"
                    :class="{'fig-compare-radio-label-selected': selectedIsEdit}">
                    {{ $t('Edit the address') }}
                </div>
            </fig-form-radio>
        </div>

        <div class="text-center mt-6">
            <fig-button
                variant="primary"
                @click="onClickSave">{{ $t('Continue') }}</fig-button>
        </div>
    </fig-modal>
</template>


<style scoped>
.fig-compare-radio {
    @apply rounded p-2 pl-4 border border-gray-300
}
.fig-compare-radio-selected {
    @apply border-2 border-blue-600 bg-blue-50
}

.fig-compare-radio-label-selected {
    @apply text-blue-700;
}
</style>
