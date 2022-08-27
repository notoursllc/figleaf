<script>
import draggable from 'vuedraggable';
import FigButton from '../button/Button.vue';
import FigFormInput from '../form/text/FormText.vue';
import FigPopConfirm from '../popConfirm/PopConfirm.vue';
import FigIcon from '../icon/FigIcon.vue';
import { rowBuilderDensity } from './constants.js'

export default {
    name: 'RowBuilder',

    components: {
        draggable,
        FigPopConfirm,
        FigButton,
        FigFormInput,
        FigIcon
    },

    props: {
        value: {
            type: Array,
            default: function() {
                return [];
            }
        },

        sortable: {
            type: Boolean,
            default: true
        },

        addable: {
            type: Boolean,
            default: true
        },

        removable: {
            type: Boolean,
            default: true
        },

        removeConfirm: {
            type: Boolean,
            default: true
        },

        maxRows: {
            type: Number
        },

        density: {
            type: String,
            default: rowBuilderDensity.sm,
            validator: (value) => Object.keys(rowBuilderDensity).includes(value)
        },

        addNewOnEmpty: {
            type: Boolean,
            default: false
        }
    },

    data: function() {
        return {
            rows: []
        };
    },

    computed: {
        canSortRows() {
            return this.sortable && this.rows.length > 1;
        },

        densityClass() {
            return `fig-row-builder-row-${this.density}`;
        },

        canAddRow() {
            if(!this.addable) {
                return false;
            }
            const maxRows = parseInt(this.maxRows);
            return isNaN(maxRows) || (maxRows > 0 && this.rows.length < maxRows);
        }
    },

    watch: {
        value: {
            handler(newVal) {
                this.rows = Array.isArray(newVal) ? newVal : [];

                if(this.addNewOnEmpty && !this.rows.length) {
                    this.addRow();
                }
            },
            immediate: true
        }
    },

    methods: {
        addRow() {
            this.$emit('add');
        },

        removeRow(index) {
            this.$emit('remove', index);
        },

        onSort() {
            this.$emit('input', this.rows)
        },

        onPopoverToggleClick(index) {
            if(!this.removeConfirm) {
                this.removeRow(index);
            }
        }
    }
};
</script>


<template>
    <div>
        <div class="fig-row-builder">
            <draggable
                v-model="rows"
                handle=".fig-row-builder-row-handle"
                @update="onSort"
                ghost-class="ghost"
                tag="div">
                <div class="fig-row-builder-row" v-for="(obj, index) in rows" :key="index">
                    <div class="flex">
                        <!-- drag handle -->
                        <div class="fig-row-builder-row-handle cursor-grab" v-if="canSortRows">
                            <fig-icon icon="dots-vertical-double" />
                        </div>

                        <div class="flex flex-grow" :class="densityClass">
                            <slot :rowBuilder="obj"></slot>
                        </div>

                        <div
                            v-if="removable"
                            class="flex items-start flex-nowrap"
                            :class="densityClass">

                            <fig-pop-confirm
                                :disabled="!removeConfirm"
                                @confirm="removeRow(index)">
                                {{ $t('Delete this row?') }}

                                <template v-slot:reference>
                                    <fig-button
                                        class="ml-4"
                                        variant="plain"
                                        icon="trash"
                                        size="sm"
                                        @click="onPopoverToggleClick(index)"
                                        dotted />
                                </template>
                            </fig-pop-confirm>
                        </div>
                    </div>
                </div>
            </draggable>
        </div>

        <div
            :class="{'pt-2': rows.length}"
            class="flex items-center">
            <fig-button
                v-if="canAddRow"
                @click="addRow"
                variant="plain"
                size="sm"
                icon="plus"
                class="mr-3"><slot name="buttonLabel">{{ $t('Add row') }}</slot></fig-button>

            <div class="flex-grow">
                <slot name="addButtonRight" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.fig-row-builder .fig-row-builder-row {
    @apply flex flex-col flex-nowrap w-full;
}

.fig-row-builder .fig-row-builder-row-handle {
    @apply flex items-center w-6;
}

.fig-row-builder .fig-row-builder-row-sm {
    @apply py-1 pr-2;
}
.fig-row-builder .fig-row-builder-row-md {
    @apply py-2 pr-3;
}
.fig-row-builder .fig-row-builder-row-lg {
    @apply py-3 pr-4;
}
</style>
