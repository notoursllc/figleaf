<script>
export default {
    name: 'DisclosureNav'
}
</script>

<script setup>
import DisclosureNavItem from './DisclosureNavItem.vue';

const props = defineProps({
    navItems: {
        type: Array,
    },

    as: {
        type: String,
        default: 'nav',
    }
})

</script>

<template>
    <component :is="as" class="fig-disclosure-nav">
        <disclosure-nav-item
            v-for="item in navItems"
            :item="item"
            :key="item.label" />
    </component>
</template>
