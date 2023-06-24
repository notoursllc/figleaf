<script>
export default {
    name: 'OperationsDropdown'
}
</script>

<script setup>
import { computed } from 'vue';
import debounce from 'lodash-es/debounce.js';
import FigButton from '../button/Button.vue';
import FigDropdown from '../dropdown/Dropdown.vue';
import FigDropdownButton from '../dropdown/DropdownButton.vue';
import { buttonSizes } from '../button/constants.js';

const props = defineProps({
    showView: {
        type: Boolean,
        default: true
    },

    showEdit: {
        type: Boolean,
        default: true
    },

    showDelete: {
        type: Boolean,
        default: true
    },

    size: {
        type: String,
        default: buttonSizes.sm,
        validator: (value) => Object.keys(buttonSizes).includes(value)
    }
});

const emit = defineEmits([
    'selected',
    'view',
    'edit',
    'delete'
]);

const canShow = computed(() => {
    return props.showView || props.showEdit || props.showDelete;
});

const onSelected = debounce(function(value) {
    emit('selected', value);

    switch (value) {
        case 'view':
            emit('view');
            break;

        case 'edit':
            emit('edit');
            break;

        case 'delete':
            emit('delete');
            break;
    }
})
</script>

<template>
    <fig-dropdown
        v-if="canShow"
        placement="bottom"
        @selected="onSelected">
        <template v-slot:toggler="props">
            <fig-button
                v-bind="props.ariaAttrs"
                variant="plain"
                :size="size"
                icon="chevron-down" />
        </template>

        <fig-dropdown-button v-if="showView" value='view'>{{ $t('View') }}</fig-dropdown-button>
        <fig-dropdown-button v-if="showEdit" value='edit'>{{ $t('Edit') }}</fig-dropdown-button>
        <fig-dropdown-button v-if="showDelete" value='delete'>{{ $t('Delete') }}</fig-dropdown-button>
        <slot></slot>
    </fig-dropdown>
</template>
