<script>
import isObject from 'lodash.isobject';
import FigFormSelect from '../select/FormSelect.vue';
import { formSelectProps } from '../select/constants';

export default {
    components: {
        FigFormSelect
    },

    props: {
        ...formSelectProps,

        // overwriting the 'value' prop coming from formSelectProps
        // in order to remove the 'type' property constraints
        value: {}
    },

    data: function() {
        return {
            selectedVal: []
        };
    },

    watch: {
        value: {
            handler(newVal) {
                this.setSelectedValue();
            },
            immediate: true
        },

        options: {
            handler(newVal) {
                this.setSelectedValue();
            },
            immediate: true
        }
    },

    methods: {
        selectValueChanged(valueArray) {
            let total = 0;

            if(!Array.isArray(valueArray)) {
                valueArray = [valueArray];
            }

            valueArray.forEach(function(obj) {
                if(isObject(obj)) {
                    total += obj.value;
                }
            });

            this.$emit('input', total);
        },

        setSelectedValue() {
            this.selectedVal = !this.multiple
                ? this.options.find((obj) => obj.value === this.value)
                : this.options.filter((obj) => obj.value & this.value);
        }
    }
};
</script>

<template>
    <fig-form-select
        v-model="selectedVal"
        v-bind="$props"
        @input="selectValueChanged" />
</template>
