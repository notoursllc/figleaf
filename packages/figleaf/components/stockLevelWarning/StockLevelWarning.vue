<script>
import FigIconLabel from '../iconLabel/IconLabel.vue';
import FigIcon from '../icon/FigIcon';

export default {
    components: {
        FigIconLabel,
        FigIcon
    },

    props: {
        qty: {
            type: Number,
            default: 0
        },

        threshold: {
            type: Number,
            default: 10
        }
    },

    computed: {
        message() {
            if(this.qty === 0) {
                return this.$t('Sold out');
            }
            return this.$t('Just a few left. Order soon.');
        }
    }
};
</script>


<template>
    <fig-icon-label
        v-if="qty <= threshold"
        class="text-yellow-600">
        <fig-icon
            slot="left"
            icon="urgent"
            width="28"
            height="28"
            stroke="#fd7e14"
            :stroke-width="1" /> {{ message }}
    </fig-icon-label>
</template>
