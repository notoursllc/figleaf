<script>
export default {
    name: 'Message'
}
</script>

<script setup>
import { computed, ref, useSlots } from 'vue';
import FigIcon from '../icon/FigIcon.vue';
import {
    messageSizes,
    messageVariants
} from './constants';

const props = defineProps({
    size: {
        type: String,
        default: messageSizes.md,
        validator: (value) => Object.keys(messageSizes).includes(value)
    },

    variant: {
        type: String,
        default: messageVariants.success,
        validator: (value) => Object.keys(messageVariants).includes(value)
    },

    showIcon: {
        type: Boolean,
        default: true
    },

    closable: {
        type: Boolean,
        default: false
    }
});

const slots = useSlots();

const isVisible = ref(true);

const hasIcon = computed(() => {
    return slots.icon || props.showIcon;
});

const iconName = computed(() => {
    switch(props.variant) {
        case messageVariants.error:
            return 'circle-x';

        case messageVariants.info:
            return 'info-circle';

        case messageVariants.warning:
            return 'alert-circle';

        default:
            return 'check-circle';
    }
});

const classNames = computed(() => {
    const classes = [
        'fig-message',
        `fig-message-${props.size}`,
        `fig-message-${props.variant}`
    ];

    if(hasIcon.value) {
        classes.push('align-bottom');
    }

    return classes;
});

const iconStrokeColor = computed(() => {
    switch(props.variant) {
        case messageVariants.error:
            return '#73000c';

        case messageVariants.info:
            return '#044868';

        case messageVariants.warning:
            return '#6d5100';

        default:
            return '#224a23';
    }
});

const iconWidth = computed(() => {
    switch(props.size) {
        case messageSizes.sm:
            return 20;

        default:
            return 24;
    }
});

function onCloseClick() {
    isVisible.value = false;
}
</script>


<template>
    <div :class="classNames" v-if="isVisible">
        <div class="flex items-center">
            <div class="flex grow justify-start items-center flex-nowrap">
                <div v-if="hasIcon">
                    <slot name="icon">
                        <fig-icon
                            :icon="iconName"
                            :stroke-width="1.5"
                            :stroke="iconStrokeColor"
                            :width="iconWidth"
                            :height="iconWidth" />
                    </slot>
                </div>
                <div :class="{'pl-1': hasIcon && $slots.default}"><slot></slot></div>
            </div>

            <div
                v-if="closable"
                class="fig-message-close"
                @click="onCloseClick" >
                <fig-icon
                    icon="x"
                    :stroke-width="1.5"
                    :stroke="iconStrokeColor"
                    :width="20"
                    :height="20" />
            </div>
        </div>
    </div>
</template>


<style scoped>
.fig-message {
    @apply rounded-sm;
}

.fig-message-close {
    @apply cursor-pointer flex items-center;
}

.fig-message-sm {
    @apply text-sm py-1 px-2;
}
.fig-message-md {
    @apply py-2 px-3;
}
.fig-message-lg {
    @apply py-4 px-3;
}

.fig-message-error {
    background: #FFCDD2;
    border: solid #e60017;
    border-width: 0 0 0 6px;
    color: #73000c;
}
.fig-message-success {
    @apply text-emerald-900;
    background: #C8E6C9;
    border: solid #439446;
    border-width: 0 0 0 6px;
}
.fig-message-info {
    background: #B3E5FC;
    border: solid #0891cf;
    border-width: 0 0 0 6px;
    color: #044868;
}
.fig-message-warning {
    background: #FFECB3;
    border: solid #d9a300;
    border-width: 0 0 0 6px;
    color: #6d5100;
}
</style>
