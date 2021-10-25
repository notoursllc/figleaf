<script>
import draggable from 'vuedraggable';
import FigButton from '../button/Button.vue';
import FigFormInput from '../form/text/FormText.vue';
import FigPopConfirm from '../popConfirm/PopConfirm.vue';
import FigIcon from '../icon/FigIcon.vue';
import { metaDataBuilderDensity } from './constants.js'

export default {
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

        propertyPlaceholder: {
            type: String,
            default: null
        },

        valuePlaceholder: {
            type: String,
            default: function() {
                return this.$t('Value');
            }
        },

        isSortable: {
            type: Boolean,
            default: true
        },

        density: {
            type: String,
            default: metaDataBuilderDensity.sm,
            validator: (value) => Object.keys(metaDataBuilderDensity).includes(value)
        }
    },

    data: function() {
        return {
            newdata: []
        };
    },

    computed: {
        canSortRows() {
            return this.isSortable && this.newdata.length > 1;
        },

        densityClass() {
            return `meta-data-row-${this.density}`;
        }
    },

    watch: {
        value: {
            handler(newVal) {
                this.newdata = Array.isArray(newVal) ? newVal : [];

                if(!this.newdata.length) {
                    this.addNewItem();
                }
            },
            immediate: true
        }
    },

    methods: {
        emitInput() {
            if(!this.newdata.length) {
                this.$emit('input', null);
                return;
            }

            this.$emit('input', this.newdata);
        },

        sanitize() {
            let i = this.newdata.length;
            while (i--) {
                if(!this.newdata[i].property && !this.newdata[i].value) {
                    this.newdata.splice(i, 1);
                }
            }
        },

        onInputChange() {
            this.sanitize();
            this.emitInput();
        },

        onClickDeleteRow(index) {
            this.newdata.splice(index, 1);
            this.sanitize();
            this.emitInput();

            if(!this.newdata.length) {
                this.addNewItem();
            }
        },

        addNewItem() {
            this.newdata.push(
                { property: null, value: null }
            );
        }
    }
};
</script>


<template>
    <div>
        <div class="metaDataHeader">
            <draggable
                v-model="newdata"
                handle=".meta-row-handle"
                @update="emitInput"
                ghost-class="ghost"
                tag="div">
                <div class="meta-row" v-for="(obj, index) in newdata" :key="index">
                    <div class="flex">
                        <!-- drag handle -->
                        <div class="meta-row-handle cursor-grab" v-if="canSortRows">
                            <fig-icon icon="dots-vertical-double" />
                        </div>

                        <div class="flex" :class="densityClass">
                            <fig-form-input
                                v-model="obj.property"
                                @input="onInputChange"
                                :placeholder="propertyPlaceholder" />
                        </div>

                        <div class="flex flex-grow items-start flex-nowrap" :class="densityClass">
                            <fig-form-input
                                v-model="obj.value"
                                @input="onInputChange"
                                :placeholder="valuePlaceholder" />

                            <fig-pop-confirm @confirm="onClickDeleteRow(index)">
                                {{ $t('Delete this row?') }}

                                <fig-button
                                    slot="reference"
                                    class="ml-4"
                                    variant="plain"
                                    icon="trash"
                                    size="sm"
                                    dotted />
                            </fig-pop-confirm>
                        </div>
                    </div>
                </div>
            </draggable>
        </div>

        <div class="pt-6 text-left">
            <fig-button
                @click="addNewItem"
                variant="plain"
                size="sm"
                icon="plus">{{ $t('New item') }}</fig-button>
        </div>
    </div>
</template>

<style scoped>
.metaDataHeader .meta-row {
    @apply flex flex-col flex-nowrap;
}

.metaDataHeader .meta-row-handle {
    @apply flex items-center w-6;
}

.metaDataHeader .meta-data-row-sm {
    @apply py-1 pr-2;
}
.metaDataHeader .meta-data-row-md {
    @apply py-2 pr-3;
}
.metaDataHeader .meta-data-row-lg {
    @apply py-3 pr-4;
}
</style>
