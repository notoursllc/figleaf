<script>
export default {
    name: 'Address'
}
</script>

<script setup>
import { computed } from 'vue';
import accounting from 'accounting';

const props = defineProps({
    value: {
        type: [Number, String],
        required: true
    },

    fixed: {
        type: Number,
        default: null,
        required: false
    }
});

const decimalAsPercentage = computed(() => {
    let val = parseFloat(props.value);

    if(!isNaN(val)) {
        val = `${val * 100}%`;

        if(props.fixed !== null) {
            val = accounting.toFixed(val, props.fixed);
        }

        return val;
    }

    return '';
});
</script>

<template>
    <span>{{ decimalAsPercentage }}</span>
</template>
