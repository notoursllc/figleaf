// took from:
// https://raw.githubusercontent.com/vuestorefront/storefront-ui/v2-develop/packages/sfui/frameworks/vue/composables/useScrollable/useScrollable.ts

import Scrollable from '../utils/Scrollable.js';
// import { Scrollable } from '../utils/Scrollable.js';
import { ref, watch, computed } from 'vue';
import { noop, unrefElement } from '@vueuse/core';

export function useScrollable(options) {
    const containerRef = ref();
    const scrollable = ref(null);
    const state = ref({ 
        hasPrev: false, 
        hasNext: false, 
        isDragged: false 
    });

    let unregister = noop;

    watch(
        [containerRef, options],
        () => {
            const container = unrefElement(containerRef);

            if (!container) {
                return;
            }

            unregister();

            scrollable.value = new Scrollable(container, {
                ...options?.value,
                onScroll: (data) => {
                    state.value = { ...state.value, hasNext: data.hasNext, hasPrev: data.hasPrev };
                    options?.value?.onScroll?.(data);
                },
                onDragStart: (data) => {
                    state.value = { ...state.value, isDragged: data.isDragged };
                    options?.value?.onDragStart?.(data);
                },
            });

            unregister = scrollable.value?.register();

            const activeIndex = options?.value?.activeIndex;

            if (typeof activeIndex === 'number' && activeIndex >= 0 && options?.value?.isActiveIndexCentered) {
                scrollable.value.scrollToIndex(activeIndex);
            }
        },
        { immediate: true, deep: true },
    );

    const showPrev = () => {
        scrollable.value?.prev();
    };

    const showNext = () => {
        scrollable.value?.next();
    };

    const getPrevButtonProps = computed(() => ({
        onClick: showPrev,
        disabled: !state.value.hasPrev,
    }));

    const getNextButtonProps = computed(() => ({
        onClick: showNext,
        disabled: !state.value.hasNext,
    }));

    return {
        containerRef,
        getPrevButtonProps,
        getNextButtonProps,
        showNext,
        showPrev,
        state,
    };
}