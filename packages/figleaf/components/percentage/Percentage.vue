<script>
import accounting from 'accounting';

export default {
    name: 'Percentage',

    props: {
        value: {
            type: [Number, String],
            required: true
        },

        fixed: {
            type: Number,
            default: null,
            required: false
        }
    },

    computed: {
        decimalAsPercentage() {
            let val = parseFloat(this.value);

            if(!isNaN(val)) {
                val = `${val * 100}%`;

                if(this.fixed !== null) {
                    val = accounting.toFixed(val, this.fixed);
                }

                return val;
            }

            return '';
        }
    }
};
</script>


<template>
    <span>{{ decimalAsPercentage }}</span>
</template>
