<script>
export default {
    name: 'ImageManager'
}
</script>

<script setup>
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { VueDraggableNext as draggable } from 'vue-draggable-next';
import { getImage } from '../nuxtImgBunny/bunnyProvider.js';
import FigFormGroup from '../form/group/FormGroup.vue';
import FigFormText from '../form/text/FormText.vue';
import FigFormInputFileButton from '../form/fileButton/FormInputFileButton.vue';
import FigButton from '../button/Button.vue';
import FigTooltip from '../tooltip/Tooltip.vue';
import FigOverlay from '../overlay/Overlay.vue';
import FigModal from '../modal/Modal.vue';
import FigPopConfirm from '../popConfirm/PopConfirm.vue';
import FigTag from '../tag/Tag.vue';
import FigUseToaster from '../toaster/useToaster.js';
import FigIcon from '../icon/FigIcon.vue';
import useFile from '../../composables/useFile.js';

const props = defineProps({
    modelValue: {
        type: Array,
        default: () => {
            return [];
        }
    },

    /**
     * The maximum number of images allowed
     */
    maxNumImages: {
        type: Number,
        default: 10
    },

    /**
     * Allow the file input element to select multiple files
     */
    selectMultiple: {
        type: Boolean,
        default: true
    },

    /**
     * File types accepted
     */
    accept: {
        type: String,
        default: 'image/png, image/jpeg, image/gif'
    },

    tagFirstAsPrimary: {
        type: Boolean,
        default: true
    }
});

const emit = defineEmits([
    'add',
    'update:modelValue',
    'delete'
]);

const { t } = useI18n();
const { filesAreAcceptedType } = useFile();
const { showErrorToast } = FigUseToaster();

const dialogImageUrl = ref(null);
const fileList = ref([]);
const fileInputErrorMessage = ref(null);
const image_preview_modal = ref(null);
const fileButton = ref(null);

const numRemainingUploads = computed(() => {
    return props.maxNumImages - fileList.value.length;
});

function emitUpdate() {
    emit('update:modelValue', fileList.value);
}

function emitDelete(id) {
    emit('delete', id);
}

function onPreview(url) {
    const img = getImage(url, {
        preset: 'w1280'
    });

    dialogImageUrl.value = img?.url;
    image_preview_modal.value.show();
}

/**
 * @param {*} uploadedFiles  a FileList object: https://developer.mozilla.org/en-US/docs/Web/API/FileList
 */
function onFileChange(uploadedFiles) {
    // console.log("ON FILE CHAGNE", uploadedFiles);

    if (!uploadedFiles?.length) {
        return;
    }

    fileButton.value.clear();

    if(!filesAreAcceptedType(uploadedFiles, props.accept)) {
        showErrorToast({
            title: t('Error'),
            text: t('File type not allowed')
        });

        return;
    }

    const imageOverage = (fileList.value.length + uploadedFiles.length) - props.maxNumImages;

    if(imageOverage > 0) {
        const numRemaining = props.maxNumImages - fileList.value.length;

        fileInputErrorMessage.value = numRemaining === 1
            ? t('You can choose only one more image')
            : t('You can choose only {number} more images', {number: numRemaining});
        return;
    }

    fileInputErrorMessage.value = '';

    // this adds a new entry to the table so the user can see a loading
    // indicator for the new image(s)
    fileList.value.push({
        id: null,
        alt_text: null,
        ordinal: fileList.value.length,
        url: null,
        loading: true
    });

    emit('add', uploadedFiles)
}

function setOrdinals() {
    fileList.value.forEach((obj, index) => {
        obj.ordinal = index;
    });

    emitUpdate();
}

function onDeleteImage(obj, index) {
    if(obj.id) {
        emitDelete(obj.id);
    }

    // If this is a newly uploaded image then all we need to do
    // is splice it from the fileList
    fileList.value.splice(index, 1);

    setOrdinals();
}

function getCardStyle(url) {
    if (!url) {
        return;
    }

    const img = getImage(url, {
        preset: 'w375'
    });

    return img.url ? `background-image: url(${img.url});` : null
}

watch(
    () => props.modelValue,
    (newVal) => {
        if(Array.isArray(newVal)) {
            fileList.value = [...newVal];
        }
    },
    { immediate: true, deep: true }
)
</script>


<template>
    <div>
        <!-- upload form -->
        <div class="mb-4">
            <fig-form-group>
                <fig-form-input-file-button
                    ref="fileButton"
                    v-show="numRemainingUploads > 0"
                    :accept="accept"
                    :multiple="selectMultiple"
                    @input="onFileChange" />

                <template v-slot:error v-if="fileInputErrorMessage">{{ fileInputErrorMessage }}</template>
                <template v-slot:description>{{ $t('You can upload {number} more images', {number: numRemainingUploads} ) }}</template>
            </fig-form-group>
        </div>

        <!-- image table -->
        <draggable
            :list="fileList"
            ghost-class="ghost"
            handle=".handle"
            @change="setOrdinals"
            tag="div"
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <div
                v-for="(obj, index) in fileList" :key="index"
                class="shadow-sm rounded-lg bg-gray-50 border border-gray-200 flex-shrink-0 h-full">
                    <div class="flex flex-col h-full">
                        <div v-if="fileList.length > 1"  class="flex items-center justify-center w-full p-1">
                            <i class="handle">
                                <fig-icon icon="dots" />
                            </i>
                        </div>

                        <fig-overlay :show="obj.loading" class="p-2 flex-1">
                            <div @click="onPreview(obj.url)"
                                class="cursor-pointer relative flex-grow">
                                <div style="padding:0 0 100% 0;">
                                    <div class="cardImage"
                                        :style="getCardStyle(obj.url)">
                                        <fig-tag
                                            v-if="index === 0 && props.tagFirstAsPrimary"
                                            size="sm"
                                            variant="dark"
                                            class="absolute top-0 left-0 mt-1 ml-1">{{ $t('Primary') }}</fig-tag>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-2 flex w-full items-center gap-1">
                                <div class="flex-grow">
                                    <fig-form-text
                                        v-model="obj.alt_text"
                                        class="w-full"
                                        :placeholder="$t('Image alt text')"
                                        @change="emitUpdate" />
                                </div>

                                <div>
                                    <fig-tooltip placement="top">
                                        <template v-slot:toggler>
                                            <div class="cursor-pointer">
                                                <fig-icon
                                                    icon="info-circle"
                                                    width="20"
                                                    height="20" />
                                            </div>
                                        </template>

                                        {{ $t('image_alt_text_description') }}
                                    </fig-tooltip>
                                </div>
                            </div>
                        </fig-overlay>

                        <div class="flex justify-end w-full pr-1 pb-1">
                            <fig-pop-confirm
                                @confirm="onDeleteImage(obj, index)"
                                v-if="!obj.loading">
                                {{ $t('Delete this item?') }}

                                <template v-slot:reference>
                                    <fig-button
                                        variant="plain"
                                        dotted
                                        icon="trash"
                                        size="sm" />
                                </template>
                            </fig-pop-confirm>
                        </div>
                    </div>
            </div>
        </draggable>

        <fig-modal
            ref="image_preview_modal"
            size="xl">
            <img :src="dialogImageUrl" alt="">
        </fig-modal>
    </div>
</template>

<style>
.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}

.handle {
    @apply cursor-move;
}

.cardImage {
    @apply absolute top-0 right-0 left-0 bottom-0;
    background-size: contain;
    background-position: 50% 50%;
    background-repeat: no-repeat;
}
</style>
