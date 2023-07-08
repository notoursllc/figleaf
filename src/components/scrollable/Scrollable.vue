<script>
// took from:
// https://github.com/vuestorefront/storefront-ui/blob/v2-develop/packages/sfui/frameworks/vue/components/SfScrollable/SfScrollable.vue
export default {
    inheritAttrs: false,
};
</script>

<script setup>
import { computed, toRefs, reactive } from 'vue';
import FigIcon from '../icon/FigIcon.vue';
import { useScrollable } from '../../composables/useScrollable.js';

const props = defineProps({
    tag: {
        type: String,
        default: 'div',
    },
    direction: {
        type: String,
        default: 'horizontal',
    },
    buttonsPlacement: {
        type: String,
        default: 'block',
    },
    activeIndex: {
        type: Number,
        default: undefined,
    },
    reduceMotion: {
        type: Boolean,
        default: undefined,
    },
    drag: {
        type: [Object, Boolean],
        default: undefined,
    },
    prevDisabled: {
        type: Boolean,
        default: undefined,
    },
    nextDisabled: {
        type: Boolean,
        default: undefined,
    },
    isActiveIndexCentered: {
        type: Boolean,
        default: false,
    },
    buttonPrevAriaLabel: {
        type: String,
        default: 'Previous',
    },
    buttonNextAriaLabel: {
        type: String,
        default: 'Next',
    },
});

const emit = defineEmits([
    'onDragStart',
    'onDragEnd',
    'onScroll',
    'onPrev',
    'onNext',
]);

const { direction, activeIndex, reduceMotion, drag, isActiveIndexCentered } = toRefs(props);

const { containerRef, state, getNextButtonProps, getPrevButtonProps } = useScrollable(
    computed(() => ({
        ...reactive({
            direction,
            activeIndex,
            reduceMotion,
            drag,
            isActiveIndexCentered,
        }),
        onDragStart: (data) => emit('onDragStart', data),
        onDragEnd: (data) => emit('onDragEnd', data),
        onScroll: (data) => emit('onScroll', data),
        onPrev: (data) => emit('onPrev', data),
        onNext: (data) => emit('onNext', data),
    })),
);

const changeDisabledClass = (isDisabled) => isDisabled ? '!ring-disabled-300 !text-disabled-500' : '!ring-neutral-500 !text-neutral-500';
const isHorizontal = computed(() => props.direction === 'horizontal');
</script>

<template>
    <div :class="['items-center', 'relative', isHorizontal ? 'flex' : 'flex-col h-full inline-flex']">

        <!-- previous button -->
        <button
            variant="secondary"
            size="lg"
            square
            :class="[
                '!rounded-full bg-white hidden md:block',
                buttonsPlacement === 'block' && (isHorizontal ? 'mr-4' : 'mb-4 rotate-90'),
                buttonsPlacement === 'floating' && (isHorizontal ? 'left-4' : 'top-4 rotate-90'),
                { 'absolute z-10': buttonsPlacement === 'floating' },
                changeDisabledClass(typeof prevDisabled === 'boolean' ? prevDisabled : getPrevButtonProps.disabled),
            ]"
            v-bind="getPrevButtonProps"
            :disabled="prevDisabled"
            :aria-label="buttonPrevAriaLabel">
            <fig-icon
                icon="chevron-left"
                :stroke-width="2"
                stroke="#000"
                :width="26"
                :height="26" />
        </button>

        <component
            :is="tag"
            ref="containerRef"
            :class="[
                'motion-safe:scroll-smooth',
                {
                'overflow-x-auto flex gap-4': isHorizontal,
                'overflow-y-auto flex flex-col gap-4': !isHorizontal,
                'cursor-grab': state.isDragged,
                },
            ]"
            v-bind="{ ...$attrs, ...props }"
            :disabled="prevDisabled"
            >
            <slot />
        </component>

        <!-- next button -->
        <button
            :class="[
                '!rounded-full bg-white hidden md:block',
                buttonsPlacement === 'block' && (isHorizontal ? 'ml-4' : 'mt-4 rotate-90'),
                buttonsPlacement === 'floating' && (isHorizontal ? 'right-4' : 'bottom-4 rotate-90'),
                { 'absolute z-10': buttonsPlacement === 'floating' },
                changeDisabledClass(typeof nextDisabled === 'boolean' ? nextDisabled : getNextButtonProps.disabled),
            ]"
            v-bind="getNextButtonProps"
            :disabled="nextDisabled"
            :aria-label="buttonNextAriaLabel">
            <fig-icon
                icon="chevron-right"
                :stroke-width="2"
                stroke="#000"
                :width="26"
                :height="26" />
        </button>
    </div>
</template>