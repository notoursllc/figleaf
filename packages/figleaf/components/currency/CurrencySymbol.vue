<script>
export default {
    name: 'CurrencySymbol',

    props: {
        currency: {
            type: String,
            default: 'USD'
        },

        tag: {
            type: String,
            default: 'span'
        },
    }
}
</script>


<template>
    <i18n-n :tag="tag" :value="0" :format="{ key: 'currency', currency: currency }">
        <template v-slot:currency="slotProps">{{ slotProps.currency }}</template>
        <template v-slot:integer="slotProps"></template> <!-- slotProps.integer -->
        <template v-slot:group="slotProps"></template> <!-- slotProps.group -->
        <template v-slot:decimal="slotProps"></template> <!-- slotProps.decimal -->
        <template v-slot:fraction="slotProps"></template> <!-- slotProps.fraction -->
    </i18n-n>
</template>
