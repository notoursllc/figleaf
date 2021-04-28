<script>
import { dividerMargins } from './constants';

export default {
    name: 'Divider',

    props: {
        margin: {
            type: [String, Number],
            default: 5,
            validator: (value) => dividerMargins.includes(parseInt(value, 10))
        }
    },

    computed: {
        classNames() {
            return [
                'border-b border-0 border-gray-300 w-auto',
                `my-${this.margin}`
            ];
        }
    }
};
</script>


<template>
    <hr :class="classNames">
</template>
