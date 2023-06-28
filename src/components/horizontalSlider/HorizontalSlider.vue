<script>
// This component was copied from: https://github.com/fuxingloh/vue-horizontal/blob/main/src/vue-horizontal.vue
// and converted to vue3 syntax.
export default {
    name: 'FigHorizontalSlider'
}
</script>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import debounce from 'lodash-es/debounce.js';
import { horizontalSliderScrollBehaviors, horizontalSliderSnapPositions } from './constants.js';

const props = defineProps({
    /**
     * Navigation button visibility
     */
    button: {
        type: Boolean,
        default: true
    },

    /**
     * Navigation button alignment, default to between the edge of the horizontal axis.
     */
    buttonBetween: {
        type: Boolean,
        default: true
    },

    /**
     * Scrollbar visibility
     */
    scroll: {
        type: Boolean,
        default: false
    },

    /**
     * Use default responsive breakpoint.
     */
    responsive: {
        type: Boolean,
        default: false
    },

    /**
     * Move window, indicates the percent of width to travel when nav is triggered.
     */
    displacement: {
        type: Number,
        default: 1.0
    },

    /**
     * Snap position
     */
    snap: {
        type: String,
        default: horizontalSliderSnapPositions.start,
        validator: (value) => Object.values(horizontalSliderSnapPositions).includes(value)
    },

    /**
     * Scrolling behavior
     */
    scrollBehavior: {
        type: String,
        default: horizontalSliderScrollBehaviors.smooth,
        validator: (value) => Object.values(horizontalSliderScrollBehaviors).includes(value)
    }
});

const emit = defineEmits([
    'prev',
    'next',
    // 'scroll-debounce'
]);

// Compatibility delta due to rounding issues
const delta = 2.5
  
const left = ref(0);
const width = ref(0);
const scrollWidth = ref(0);
const hasPrev = ref(false);
const hasNext = ref(false);
const debounceId = ref(null);
const slideContainer = ref(null);
  
function getContainerChildren() {
    return slideContainer.value.children || [];
}

function findPrevSlot(x) {
    const children = getContainerChildren();

    for (let i = 0; i < children.length; i++) {
        const rect = children[i].getBoundingClientRect()

        if (rect.left <= x && x <= rect.right) {
            return children[i];
        }

        if (x <= rect.left) {
            return children[i];
        }
    }
}

function findNextSlot(x) {
    const children = getContainerChildren()

    for (let i = 0; i < children.length; i++) {
        const rect = children[i].getBoundingClientRect()

        if (rect.right <= x) {
            continue;
        } 
        else if (rect.left <= x) {
            return children[i];
        }

        if (x <= rect.left) {
            return children[i];
        }
    }
}


/**
 * Toggle and scroll to the previous set of horizontal content.
 */
function prev() {
    emit('prev');

    const container = slideContainer.value;
    const left = container.getBoundingClientRect().left;
    const x = left + (container.clientWidth * -props.displacement) - delta;
    const element = findPrevSlot(x);

    if (element) {
        const width = element.getBoundingClientRect().left - left;
        scrollToLeft(container.scrollLeft + width);
        return;
    }

    const width = container.clientWidth * props.displacement;
    scrollToLeft(container.scrollLeft - width);
}

/**
 * Toggle and scroll to the next set of horizontal content.
 */
function next() {
    emit('next');

    const container = slideContainer.value;
    const left = container.getBoundingClientRect().left;
    const x = left + (container.clientWidth * props.displacement) + delta;
    const element = findNextSlot(x);

    if (element) {
        const width = element.getBoundingClientRect().left - left;

        if (width > delta) {
            scrollToLeft(container.scrollLeft + width);
            return;
        }
    }

    const width = container.clientWidth * props.displacement;
    scrollToLeft(container.scrollLeft + width)
}

/**
 * Index of the slots to scroll to.
 * @param {number} i index
 */
function scrollToIndex(i) {
    const children = getContainerChildren();

    if (children[i]) {
        const container = slideContainer.value;
        const rect = children[i].getBoundingClientRect();

        const left = rect.left - container.getBoundingClientRect().left;
        scrollToLeft(container.scrollLeft + left)
    }
}

/**
 * Amount of pixel to scroll to on the left.
 * @param {number} left of the horizontal
 */
function scrollToLeft(left) {
    slideContainer.value.scrollTo({
        left: left, 
        behavior: props.scrollBehavior
    });
}

function calculate() {
    const container = slideContainer.value;
    const firstChild = getContainerChildren()[0];

    function hasNextSlide() {
        return container.scrollWidth > container.scrollLeft + container.clientWidth + delta;
    }

    function hasPreviousSlide() {
        if (container.scrollLeft === 0) {
            return false;
        }

        const containerVWLeft = container.getBoundingClientRect().left;
        const firstChildLeft = firstChild?.getBoundingClientRect()?.left ?? 0;
        return Math.abs(containerVWLeft - firstChildLeft) >= delta;
    }

    return {
        left: container.scrollLeft,
        width: container.clientWidth,
        scrollWidth: container.scrollWidth,
        hasNext: hasNextSlide(),
        hasPrev: hasPreviousSlide()
    }
}

/**
 * Manually refresh
 */
function refresh(callback) {
    const data = calculate();
    // console.log("REFRESH DATA", data);

    left.value = data.left;
    width.value  = data.width;
    scrollWidth.value  = data.scrollWidth;
    hasNext.value  = data.hasNext;
    hasPrev.value  = data.hasPrev;

    callback?.(data);
}

function onScrollDebounce() {
    refresh((data) => {
        // emit('scroll-debounce', data)
    })
}

const onScroll = debounce(
    () => {
        if (!slideContainer.value) {
            return;
        }

        emit('scroll', {
            left: slideContainer.value.scrollLeft,
        });

        refresh();
    },
    100,
    { leading: true, trailing: true }
);

// function onScroll() {
//     if (!slideContainer.value) {
//         return;
//     }

//     emit('scroll', {
//         left: slideContainer.value.scrollLeft,
//     })

//     clearTimeout(debounceId.value);
//     debounceId.value = setTimeout(onScrollDebounce, 100);
// }

onMounted(() => {
    onScrollDebounce();
});

onBeforeUnmount(() => {
    clearTimeout(debounceId.value);
});
</script>


<template>
    <div class="fig-hs">
        <!-- previous button -->
        <div 
            v-if="button && hasPrev"
            class="fig-hs-btn fig-hs-btn-prev" 
            @click.stop="prev" 
            role="button"
            :class="{'fig-hs-btn-between': buttonBetween}">
            <svg class="fig-hs-svg" viewBox="0 0 24 24" aria-label="horizontal scroll area navigate to previous button">
                <path d="m9.8 12 5 5a1 1 0 1 1-1.4 1.4l-5.7-5.7a1 1 0 0 1 0-1.4l5.7-5.7a1 1 0 0 1 1.4 1.4l-5 5z"/>
            </svg>
        </div>
  
        <!-- next button -->
        <div 
            v-if="button && hasNext" 
            class="fig-hs-btn fig-hs-btn-next" 
            @click.stop="next" 
            role="button"
            :class="{'fig-hs-btn-between': buttonBetween}">
            <svg class="fig-hs-svg" viewBox="0 0 24 24" aria-label="horizontal scroll area navigate to next button">
                <path d="m14.3 12.1-5-5a1 1 0 0 1 1.4-1.4l5.7 5.7a1 1 0 0 1 0 1.4l-5.7 5.7a1 1 0 0 1-1.4-1.4l5-5z"/>
            </svg>
        </div>
  
        <!-- slides container -->
        <div 
            ref="slideContainer"
            class="fig-hs-container"  
            @scroll.passive="onScroll" 
            :class="{
                'fig-hs-responsive': responsive,
                'fig-hs-scroll': scroll,
                'fig-hs-snap-start': snap === 'start',
                'fig-hs-snap-center': snap === 'center',
                'fig-hs-snap-end': snap === 'end',
            }">
            <slot></slot>
        </div>
    </div>
</template>

  
<style scoped>
.fig-hs {
    @apply relative flex;
}

.fig-hs-btn {
    position: absolute;
    align-self: center;
    z-index: 1;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    cursor: pointer;
}

.fig-hs-btn-prev {
    left: 0;
}

.fig-hs-btn-prev.fig-hs-btn-between {
    transform: translateX(-50%);
}

.fig-hs-btn-next {
    right: 0;
}

.fig-hs-btn-next.fig-hs-btn-between {
    transform: translateX(50%);
}

.fig-hs-svg {
    width: 40px;
    height: 40px;
    margin: 6px;
    padding: 6px;
    border-radius: 20px;
    box-sizing: border-box;
    background: white;
    color: black;
    fill: currentColor;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.fig-hs-container {
    display: flex;
    width: 100%;
    margin: 0;
    padding: 0;
    border: none;
    box-sizing: content-box;
    overflow-x: scroll;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
}

.fig-hs-container > * {
    flex-shrink: 0;
    box-sizing: border-box;

    /* Prevent content from collapsing when empty. E.g. image while loading height=0. */
    min-height: 1px;
}

.fig-hs-snap-start > * {
    scroll-snap-align: start;
}

.fig-hs-snap-center > * {
    scroll-snap-align: center;
}

.fig-hs-snap-end > * {
    scroll-snap-align: end;
}

.fig-hs-container:not(.fig-hs-scroll) {
    scrollbar-width: none;
    -ms-overflow-style: none;

    /* To effectively hide scrollbar for iOS Safari. 10% of the users. */
    padding-bottom: 30px;
    margin-bottom: -30px;
    clip-path: inset(0 0 30px 0);
}

.fig-hs-container:not(.fig-hs-scroll)::-webkit-scrollbar {
    /* !important: So that users don't accidentally show scrollbar. */
    width: 0 !important;
    height: 0 !important;
}

/* Using https://tailwindcss.com/docs/responsive-design breakpoints. */

.fig-hs-responsive > * {
    width: 100%;
    margin-right: 24px;
}

.fig-hs-responsive > *:last-child {
    margin-right: 0;
}

@media (min-width: 640px) {
    .fig-hs-responsive > * {
        width: calc((100% - 24px) / 2);
    }
}

@media (min-width: 768px) {
    .fig-hs-responsive > * {
        width: calc((100% - 48px) / 3);
    }
}

@media (min-width: 1024px) {
    .fig-hs-responsive > * {
        width: calc((100% - 72px) / 4);
    }
}

@media (min-width: 1280px) {
    .fig-hs-responsive > * {
        width: calc((100% - 96px) / 5);
    }
}
</style>
  