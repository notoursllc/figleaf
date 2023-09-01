<script>
export default {
    name: 'DisclosureNavItem'
}
</script>

<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import isString from 'lodash-es/isString.js';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import DisclosureNavItem from './DisclosureNavItem.vue';
import FigIcon from '../icon/FigIcon.vue';
import FigIconLabel from '../iconLabel/IconLabel.vue';

const props = defineProps({
    item: {
        type: Object,
    }
});

const hasActiveChild = computed(() => {
    function hasActiveItem(items) {
        return items.some(item => {
            if (item.active) {
                return true;
            }

            if (item.children) {
                return hasActiveItem(item.children);
            }

            return false;
        });
    }

    return hasActiveItem(props.item?.children);
});

const classNames = computed(() => {
    return {
        'group': true,
        'fig-disclosure-nav-item': true,
        'is-active': props.item?.active,
    }
});

const componentIs = computed(() => {
    return isString(props.item.href) && props.item.href?.startsWith('http') ? 'a' : 'router-link';
});
</script>

<template>
    <component
        v-if="!item.children?.length"
        :is="componentIs"
        :to="item.href"
        :href="item.href"
        :class="classNames">
        <fig-icon-label>
            <template v-if="item.icon" v-slot:left>
                <fig-icon
                    :icon="item.icon"
                    :stroke-width="1.5"
                    :width="18"
                    :height="18" />
            </template>
            {{ item.label }}
        </fig-icon-label>
    </component>

    <disclosure
        v-else
        v-slot="{ open }"
        :default-open="hasActiveChild">
        <disclosure-button :class="classNames">
            <fig-icon-label class="flex-1">
                <template v-if="item.icon" v-slot:left>
                    <fig-icon
                        :icon="item.icon"
                        :stroke-width="1.5"
                        :width="18"
                        :height="18" />
                </template>
                {{ item.label }}
            </fig-icon-label>

            <fig-icon
                icon="chevron-down"
                :stroke-width="1.5"
                :width="14"
                :height="14"
                :class="['shrink-0 mr-1', open ? '-rotate-180' : '']"/>
        </disclosure-button>

        <disclosure-panel class="ml-4">
            <disclosure-nav-item
                v-for="child in item?.children"
                :item="child" />
        </disclosure-panel>
    </disclosure>
</template>

<style scoped>
.fig-disclosure-nav > .fig-disclosure-nav-item {
    @apply font-medium;
}
.fig-disclosure-nav-item {
    @apply flex w-full items-center rounded-sm py-2 px-3 text-left text-sm hover:bg-gray-100 text-gray-600 no-underline;

    &.is-active {
        @apply text-blue-600;
    }
}
</style>
