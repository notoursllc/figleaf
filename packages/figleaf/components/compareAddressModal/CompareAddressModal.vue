<script>
import FigModal from '../modal/Modal.vue';
import FigAddress from '../address/Address.vue';
import FigButton from '../button/Button.vue';
import FigFormRadio from '../form/radio/FormRadio.vue';

export default {
    name: 'CompareAddressModal',

    inheritAttrs: false,

    components: {
        FigModal,
        FigAddress,
        FigButton,
        FigFormRadio
    },

    props: {
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
        }
    },

    data() {
        return {
            selectedAddress: 'suggested'
        }
    },

    computed: {
        selectedIsSuggested() {
            return this.selectedAddress === 'suggested';
        },

        selectedIsOriginal() {
            return this.selectedAddress === 'original';
        },

        selectedIsEdit() {
            return this.selectedAddress === 'edit';
        }
    },

    methods: {
        show() {
            this.$refs.compare_address_modal.show();
        },

        hide() {
            this.$refs.compare_address_modal.hide();
            this.selectedAddress = 'suggested';
        },

        onClickSave() {
            let payload = null;

            if(this.selectedIsSuggested || this.selectedIsOriginal) {
                payload = {
                    addressLine1: this.selectedIsSuggested ? this.suggestedLine1 : this.originalLine1,
                    addressLine2: this.selectedIsSuggested ? this.suggestedLine2 : this.originalLine2,
                    city: this.selectedIsSuggested ? this.suggestedCity : this.originalCity,
                    state: this.selectedIsSuggested ? this.suggestedState : this.originalState,
                    zip: this.selectedIsSuggested ? this.suggestedZip : this.originalZip,
                    country: this.selectedIsSuggested ? this.suggestedCountry : this.originalCountry,
                }
            }

            this.$emit(this.selectedAddress, payload);
            this.hide();
        }
    }
}
</script>


<template>
    <fig-modal
        ref="compare_address_modal"
        v-bind="$attrs"
        size="md"
        :close-button="false"
        :escape-to-close="false">
        <template slot="header">
            {{ $t("Hmm… something's not quite right with your address") }}:
        </template>

        <div class="mb-8 text-gray-700">
            {{ $t('confirm_your_address_desc') }}
        </div>

        <div class="mb-1"
            :class="{'fig-compare-radio-label-selected': selectedIsSuggested}">{{ $t('Suggested address') }}:</div>
        <div class="fig-compare-radio"
            :class="{'fig-compare-radio-selected': selectedIsSuggested}">
            <fig-form-radio
                block
                name="selectedNumber"
                checked-value="suggested"
                v-model="selectedAddress">
                <div class="pl-4">
                    <fig-address
                        :street-address="suggestedLine1"
                        :extended-address="suggestedLine2"
                        :city="suggestedCity"
                        :state="suggestedState"
                        :zip="suggestedZip"
                        :country-code="suggestedCountry" />
                </div>
            </fig-form-radio>
        </div>

        <div class="mt-4  mb-1"
            :class="{'fig-compare-radio-label-selected': selectedIsOriginal}">{{ $t('The address you entered') }}:</div>
        <div class="fig-compare-radio"
            :class="{'fig-compare-radio-selected': selectedIsOriginal}">
            <fig-form-radio
                block
                name="selectedNumber"
                checked-value="original"
                v-model="selectedAddress">
                <div class="pl-4">
                    <fig-address
                        :street-address="originalLine1"
                        :extended-address="originalLine2"
                        :city="originalCity"
                        :state="originalState"
                        :zip="originalZip"
                        :country-code="originalCountry" />
                </div>
            </fig-form-radio>
        </div>

        <div class="fig-compare-radio mt-6"
            :class="{'fig-compare-radio-selected': selectedIsEdit}">
            <fig-form-radio
                block
                name="selectedNumber"
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
