<script>
export default {
    name: 'CardLastFour'
}
</script>

<script setup>
import { computed } from 'vue';
import CreditCardIcon from '../icon/creditCard/CreditCard.vue';
import { cardTypes } from '../icon/creditCard/constants.js';

const props = defineProps({
    type: {
        type: String,
        validator: (value) => Object.keys(cardTypes).includes(value)
    },

    lastFour: {
        type: [String, Number]
    },

    email: {
        type: String
    }
});

const suffix = computed(() => {
    if(props.type === cardTypes.paypal) {
        return props.email || '';
    }
    return `**** ${props.lastFour}`
});
</script>


<template>
    <div class="flex items-center">
        <credit-card-icon :type="props.type" style="width:50px" />
        <div class="pl-2">{{ suffix }}</div>
    </div>
</template>
