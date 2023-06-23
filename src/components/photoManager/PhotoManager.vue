<script>
export default {
    name: 'FigPhotoManager'
}
</script>

<script setup>
import { reactive, ref, computed, watch } from 'vue';
import { VueDraggableNext as draggable } from 'vue-draggable-next';
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

const props = defineProps({
    modelValue: {
        type: Array,
        default: function() {
            return [];
        }
    },

    propertyPlaceholder: {
        type: String,
        default: null
    },

    isSortable: {
        type: Boolean,
        default: true
    }
});

const emit = defineEmits([
    'update:modelValue'
]);

const newdata = ref([]);
const previewUrl = ref('https://i.etsystatic.com/38025827/r/il/7d168e/4267350777/il_570xN.4267350777_9nj1.jpg');

const previewModal = ref(null);
const editModal = ref(null);
const editModalData = reactive({
    imageUrl: null,
    altText: null
});

const canSortRows = computed(() => {
    return isSortable && newdata.value.length > 1;
});

const densityClass = computed(() => {
    return `meta-data-row-${density}`;
});

function showPreviewModal(url) {
    previewUrl.value = url;
    previewModal.value.show();
}

function showEditModal(url) {
    previewUrl.value = url;
    editModal.value.show();
}

function emitInput() {
    emit(
        'update:modelValue', 
        !newdata.value.length ? null : newdata.value
    );
}

function sanitize() {
    let i = newdata.value.length;
    while (i--) {
        if(!newdata.value[i].property && !newdata.value[i].value) {
            newdata.value.splice(i, 1);
        }
    }
}

function onInputChange() {
    sanitize();
    emitInput();
}

function addNewItem() {
    newdata.value.push(
        { property: null, value: null }
    );
}

function onClickDeleteRow(index) {
    newdata.value.splice(index, 1);
    sanitize();
    emitInput();

    if(!newdata.value.length) {
        addNewItem();
    }
}

watch(
    () => props.modelValue,
    (newVal) => {
        newdata.value = Array.isArray(newVal) ? newVal : [];

        if(!newdata.value.length) {
            addNewItem();
        }
    },
    { immediate: true }
)
</script>


<template>
    <div>
        <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">

            <draggable
                :list="newdata"
                handle=".meta-row-handle"
                @change="emitInput"
                ghost-class="ghost"
                class="inline-block">

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
                    v-model="editModalData.altText"
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
