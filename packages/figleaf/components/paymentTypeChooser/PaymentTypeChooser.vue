<script>
import Vue from 'vue';
import FigIcon from '../icon/FigIcon';
import FigIconLabel from '../iconLabel/IconLabel';
import { paymentTypes } from './constants';


export default Vue.extend({
    components: {
        FigIcon,
        FigIconLabel
    },

    props: {
        value: {
            type: String,
            default: paymentTypes.cc,
            validator: (value) => Object.keys(paymentTypes).includes(value)
        }
    },

    data: function() {
        return {
            selectedType: paymentTypes.cc
        };
    },

    watch: {
        value: {
            handler: function(newVal) {
                this.selectedType = newVal;
            },
            immediate: true
        }
    },

    methods: {
        onClickType(type) {
            this.selectedType = type;
            this.$emit('input', this.selectedType);
        }
    }
});
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
