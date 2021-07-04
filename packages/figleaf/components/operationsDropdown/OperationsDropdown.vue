<script>
import debounce from 'lodash.debounce';
import FigButton from '../button/Button';
import FigDropdown from '../dropdown/Dropdown';
import FigDropdownButton from '../dropdown/DropdownButton';
import { buttonSizes } from '../button/constants';

export default {
    components: {
        FigButton,
        FigDropdown,
        FigDropdownButton
    },

    props: {
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
    },

    computed: {
        canShow() {
            return this.showView || this.showEdit || this.showDelete;
        }
    },

    methods: {
        onDelete: debounce(function() {
            this.$emit('delete');
        }, 200),

        onEdit: debounce(function() {
            this.$emit('edit');
        }, 200),

        onView: debounce(function() {
            this.$emit('view');
        }, 200)
    }
};
</script>

<template>
    <fig-dropdown placement="bottom" v-if="canShow">
        <span slot="toggler" slot-scope="props">
            <fig-button
                v-bind="props.ariaAttrs"
                variant="plain"
                :size="size"
                icon="chevron-down" />
        </span>

        <fig-dropdown-button v-if="showView" @click="onView">{{ $t('View') }}</fig-dropdown-button>
        <fig-dropdown-button v-if="showEdit" @click="onEdit">{{ $t('Edit') }}</fig-dropdown-button>
        <fig-dropdown-button v-if="showDelete" @click="onDelete">{{ $t('Delete') }}</fig-dropdown-button>
    </fig-dropdown>
</template>
