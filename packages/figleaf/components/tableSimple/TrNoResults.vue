<script>
import Vue from 'vue';

export default Vue.extend({
    name: 'TrNoResults',

    props: {
        colspan: {
            type: [String, Number],
            default: 1
        }
    }
});
</script>


<template>
    <tr>
        <td
            :colspan="colspan"
            class="text-center text-gray-500 px-6 py-1"
            v-bind="$attrs"><slot>{{ $t('No data') }}</slot></td>
    </tr>
</template>
