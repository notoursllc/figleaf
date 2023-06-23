<script>
export default {
    name: 'StockLevelWarning'
}
</script>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import FigIconLabel from '../iconLabel/IconLabel.vue';
import FigIcon from '../icon/FigIcon.vue';

const props = defineProps({
    qty: {
        type: Number,
        default: 0
    },

    threshold: {
        type: Number,
        default: 10
    }
});

const { t } = useI18n();

const message = computed(() => {
    return props.qty === 0
        ? t('Sold out')
        : t('Just a few left. Order soon.');
});
</script>


<template>
    <fig-icon-label
        v-if="qty <= threshold"
        class="text-amber-600">
        <template v-slot:left>
            <fig-icon
                icon="urgent"
                width="28"
                height="28"
                stroke="#fd7e14"
                :stroke-width="1" />
        </template>
        {{ message }}
    </fig-icon-label>
</template>
