<script>
import { v4 as uuidv4 } from 'uuid';
import FigButton from '../button/Button';
import FigPopover from '../popover/Popover';

export default {
    components: {
        FigButton,
        FigPopover
    },

    inheritAttrs: false,

    props: {
        showConfirmButton: {
            type: Boolean,
            default: true
        },

        showCancelButton: {
            type: Boolean,
            default: true
        },

        confirmButtonLabel: {
            type: String,
            default: ''
        },

        cancelButtonLabel: {
            type: String,
            default: ''
        },

        target: {}
    },

    data() {
        return {
            uuid: uuidv4()
        };
    },

    computed: {
        confirmLabel() {
            return this.confirmButtonLabel || this.$t('OK');
        },

        cancelLabel() {
            return this.cancelButtonLabel || this.$t('cancel');
        },

        confirmRef() {
            return `btn-confirm-${this.uuid}`;
        },

        cancelRef() {
            return `btn-cancel-${this.uuid}`;
        },

        popoverRef() {
            return `popover-target-${this.uuid}`;
        }
    },

    methods: {
        onConfirmClick(e) {
            this.$emit('confirm', e);
            this.hide();
        },

        onCancelClick(e) {
            this.$emit('cancel', e);
            this.hide();
        },

        focusCancelButton(isVisible) {
            if(isVisible) {
                this.$refs[this.cancelRef].$el.focus();
            }
        },

        hide() {
            this.$refs[this.popoverRef].hide();
        }
    }
};
</script>


<template>
    <fig-popover
        placement="top"
        @visible="focusCancelButton"
        :ref="popoverRef"
        v-bind="{ ...$attrs, ...$props }">

        <template v-slot:toggler>
            <slot name="reference"></slot>
        </template>

        <slot></slot>

        <div
            v-if="showConfirmButton || showCancelButton"
            slot="footer"
            class="flex items-center justify-end flex-nowrap">
            <fig-button
                v-if="showCancelButton"
                variant="link"
                size="sm"
                @click="onCancelClick"
                :ref="cancelRef">{{ cancelLabel }}</fig-button>

            <fig-button
                v-if="showConfirmButton"
                variant="primary"
                size="sm"
                @click="onConfirmClick"
                :ref="confirmRef">{{ confirmLabel }}</fig-button>
        </div>
    </fig-popover>
</template>
