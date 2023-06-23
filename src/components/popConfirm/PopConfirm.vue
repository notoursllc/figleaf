<script>
export default {
    name: 'PopConfirm'
}
</script>

<script setup>
import { ref, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import FigButton from '../button/Button.vue';
import FigPopover from '../popover/Popover.vue';
import FigPopoverContent from '../popover/PopoverContent.vue';
import { popoverProps } from '../popover/constants.js';

const props = defineProps({
    showConfirmButton: {
        type: Boolean,
        default: true
    },

    showCancelButton: {
        type: Boolean,
        default: true
    },

    ...popoverProps
});

const emit = defineEmits([
    'confirm',
    'cancel'
])

const { t } = useI18n();

const cancelButton = ref(null);
const popoverEl = ref(null);

function onConfirmClick(e) {
    emit('confirm', e);
}

function onCancelClick(e) {
    emit('cancel', e);
}

async function focusCancelButton(isVisible) {
    if(cancelButton.value) {
        await nextTick();
        cancelButton.value.$el.focus();
    }
}
</script>


<template>
    <fig-popover
        placement="top"
        @visible="focusCancelButton"
        ref="popoverEl"
        v-bind="$props">

        <template v-slot:toggler>
            <slot name="reference"></slot>
        </template>

        <fig-popover-content>
            <slot></slot>
        </fig-popover-content>

        <template v-slot:footer>
            <div
                v-if="showConfirmButton || showCancelButton"
                class="flex items-center justify-end flex-nowrap">
                <fig-button
                    v-if="showCancelButton"
                    variant="link"
                    size="sm"
                    @click="onCancelClick"
                    ref="cancelButton"><slot name="cancelLabel">{{ $t('cancel') }}</slot></fig-button>

                <fig-button
                    v-if="showConfirmButton"
                    variant="primary"
                    size="sm"
                    @click="onConfirmClick"><slot name="confirmLabel">{{ $t('OK') }}</slot></fig-button>
            </div>
        </template>
    </fig-popover>
</template>
