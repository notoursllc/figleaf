<script>
import CreditCardIcon from '../icon/creditCard/CreditCard.vue';
import { cardTypes } from '../icon/creditCard/constants.js';

export default {
    name: 'CardLastFour',

    components: {
        CreditCardIcon
    },

    props: {
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
    },

    computed: {
        suffix() {
            if(this.type === cardTypes.paypal) {
                return this.email || '';
            }
            return `**** ${this.lastFour}`
        }
    }
};
</script>


<template>
    <div class="flex items-center">
        <credit-card-icon :type="type" style="width:50px" />
        <div class="pl-2">{{ suffix }}</div>
    </div>
</template>
