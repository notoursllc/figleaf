<script>
import draggable from 'vuedraggable';
import {
    FigFormTextarea,
    FigNuxtImgBunny,
    FigModal,
    FigTag,
    FigPopConfirm,
    FigFormInput,
    FigButton,
    FigIcon
} from '../../index.js';

export default {
    components: {
        draggable,
        FigPopConfirm,
        FigButton,
        FigFormInput,
        FigIcon,
        FigTag,
        FigModal,
        FigNuxtImgBunny,
        FigFormTextarea
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
        }
    },

    data: function() {
        return {
            newdata: [],
            previewUrl: 'https://i.etsystatic.com/38025827/r/il/7d168e/4267350777/il_570xN.4267350777_9nj1.jpg',
            editModal: {
                imageUrl: null,
                altText: null
            }
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
        showPreviewModal(url) {
            this.previewUrl = url;
            this.$refs.previewModal.show();
        },

        showEditModal(url) {
            this.previewUrl = url;
            this.$refs.editModal.show();
        },

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
        <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">

            <draggable
                v-model="newdata"
                handle=".meta-row-handle"
                @update="emitInput"
                ghost-class="ghost"
                class="inline-block"
                tag="div">

                <div v-for="(obj, index) in newdata" :key="index" class="fig-photomgr-card">
                    <div class="fig-photomgr-placeholder">
                        <button
                            class="fig-unstyled-button w-full h-full fig-photomgr-placeholder"
                            title="View full photo"
                            @click="showPreviewModal()"
                            style="background-image: url(https://i.etsystatic.com/38025827/r/il/7d168e/4267350777/il_570xN.4267350777_9nj1.jpg); background-size: contain; background-position: 50% 50%; background-repeat: no-repeat;">
                        </button>

                        <fig-tag
                            v-if="index === 0"
                            variant="dark"
                            size="sm"
                            class="absolute top-0 left-0 mt-1 ml-1">{{ $t('Primary') }}</fig-tag>

                        <!-- bottom button group -->
                        <div class="fig-photomgr-toolkit">
                            <button
                                class="fig-photomgr-toolkit-btn"
                                @click="showEditModal()"
                                ref="editBtn">
                                <fig-icon
                                    icon="edit"
                                    :height="20"
                                    :width="20" />
                            </button>

                            <button class="fig-photomgr-toolkit-btn">
                                <fig-icon
                                    icon="trash"
                                    :height="20"
                                    :width="20" />
                            </button>
                        </div>

                        <!-- <fig-pop-confirm :target="$refs.editBtn">
                            <div>Are you sure you want to do this?</div>
                        </fig-pop-confirm> -->
                    </div>
                </div>
            </draggable>

        </div>

        <div class="pt-2 text-left">
            <fig-button
                @click="addNewItem"
                variant="plain"
                size="sm"
                icon="plus">{{ $t('New item') }}</fig-button>
        </div>

        <fig-modal size="lg" ref="previewModal">
            modal content
        </fig-modal>

        <fig-modal size="lg" ref="editModal">
            <template v-slot:header>{{ $t('Add alt text to image') }}</template>
            <div class="mb-2">{{ $t('alt_text_explanation') }}</div>

            <!-- <fig-nuxt-img-bunny
                :src="previewUrl"
                preset="w375"
                loading="lazy" /> -->

            <div class="mt-1">
                <fig-form-textarea
                    rows="4"
                    maxlength="250"
                    v-model="editModal.altText"
                    :placeholder="$t('Alt text')" />
            </div>
        </fig-modal>
    </div>
</template>

<style scoped>
.pb-full {
    padding: 0 0 100% 0;
}

.fig-photomgr-card {
    @apply rounded-md relative w-full bg-gray-100 border border-gray-300 inline-block select-none;
    padding: 0 0 100% 0;
}
.fig-photomgr-card:before {
    content: '';
    display: block;
    height: 0;
}
.fig-photomgr-placeholder {
    @apply absolute inset-0;
}

.fig-photomgr-toolkit {
    @apply text-center whitespace-nowrap absolute right-0 bottom-0 left-0 opacity-0;
    /* margin-left: -1px;
    margin-right: -1px;
    margin-bottom: -1px; */
    height: calc(100% / 3);
    transition: opacity 0.25s ease-out;
}
.fig-photomgr-card:hover .fig-photomgr-toolkit {
    @apply opacity-100;
}

.fig-photomgr-toolkit-btn {
    @apply p-1 h-full m-0 bg-white text-center select-none whitespace-nowrap border-gray-300 rounded-t-none rounded-b-sm;
}
.fig-photomgr-toolkit-btn:hover {
    @apply bg-gray-100;
}
.fig-photomgr-toolkit-btn:first-of-type {
    @apply border-r border-gray-300 absolute bottom-0 left-0;
    width: 50%;
    /* width: calc(100% / 2 + 1px); */
}
.fig-photomgr-toolkit-btn:last-of-type {
    @apply border-l border-gray-300 absolute bottom-0 right-0;
    width: 50%;
    /* width: calc(100% / 2 + 1px); */
}
</style>
