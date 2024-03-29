<script>
export default {
    name: 'Confirm'
}
</script>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { onKeyStroke } from '@vueuse/core';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import FigOverlay from '../overlay/Overlay.vue';
import { confirmSizes } from './constants.js';

defineExpose({
    show
});

const footer_buttons = ref(null);
const btn_confirm_cancel = ref(null);

const { activate, deactivate } = useFocusTrap(
    footer_buttons,
    {
        onPostActivate: () => {
            btn_confirm_cancel.value?.focus();
        }
    }
);

const currentConfirm = ref(null);
const resolveFn = ref(null);
const rejectFn = ref(null);

function reset() {
    currentConfirm.value = null;
    resolveFn.value = null;
    rejectFn.value = null;
}

function resolve() {
    resolveFn.value?.();
    reset();
}

function reject() {
    rejectFn.value?.();
    reset();
}

function show(message, config) {
    reset();

    currentConfirm.value = {
        title: null,
        okLabel: null,
        cancelLabel: null,
        centered: true,
        size: confirmSizes.sm,
        ...config,
        message: message
    }

    return new Promise((resolve, reject) => {
        resolveFn.value = resolve;
        rejectFn.value = reject;
    });
}

const title = computed(() => {
    return currentConfirm.value?.title;
});

const message = computed(() => {
    return currentConfirm.value?.message;
});

const centered = computed(() => {
    return currentConfirm.value?.centered;
});

const okLabel = computed(() => {
    return currentConfirm.value?.okLabel;
});

const cancelLabel = computed(() => {
    return currentConfirm.value?.cancelLabel;
});

const widthClass = computed(() => {
    return `fig-confirm-content-${currentConfirm.value?.size}`;
});

function onConfirm() {
    resolve();
    deactivate();
};

function onReject() {
    reject();
    deactivate();
};

async function onFadeEnter() {
    activate();
}

onMounted(() => {
    onKeyStroke('Escape', onReject, { target: document });
});
</script>


<template>
    <div>
        <transition
            name="confirm-fade"
            @after-enter="onFadeEnter">
            <div
                v-if="currentConfirm"
                class="fig-confirm">

                <!--content-->
                <div class="relative w-full">
                    <div
                        class="fig-confirm-content shadow-tight"
                        :class="widthClass">

                        <div class="p-5">
                            <!--title-->
                            <div
                                v-if="title"
                                class="fig-confirm-title"
                                :class="{'text-center': centered}">{{ title }}</div>

                            <!--body-->
                            <div
                                class="fig-confirm-body"
                                :class="{'text-center': centered}">{{ message }}</div>
                        </div>

                        <!--footer buttons-->
                        <div ref="footer_buttons" class="footer-container">
                            <button
                                type="button"
                                class="confirm-btn-right hover:bg-gray-200"
                                ref="btn_confirm_cancel"
                                @click="onReject">{{ cancelLabel || $t('cancel') }}</button>

                            <button
                                type="button"
                                class="hover:bg-gray-200"
                                @click="onConfirm">{{ okLabel || $t('OK') }}</button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

        <fig-overlay
            :show="!!currentConfirm"
            :show-spinner="false"
            :z-index="1" />
    </div>
</template>


<style scoped>
.fig-confirm {
    @apply flex items-center overflow-x-hidden overflow-y-auto fixed top-0 left-0 w-full h-full z-50 outline-none focus:outline-none;
}

.fig-confirm-content {
    @apply relative mx-auto border-0 rounded-md bg-white outline-none focus:outline-none;
}

.fig-confirm-content-sm {
    @apply max-w-xs;
}
.fig-confirm-content-md {
    @apply max-w-lg;
}
.fig-confirm-content-lg {
    @apply max-w-2xl;
}
.fig-confirm-content-xl {
    @apply max-w-5xl;
}

.fig-confirm-title {
    @apply pb-2 break-words font-semibold;
}

.fig-confirm-body {
    @apply relative flex-auto text-base text-gray-600 break-words text-center;
}

.footer-container {
    @apply flex items-center border-t border-solid border-gray-300 bg-gray-100 rounded-b-md;
}
.footer-container > button {
    @apply text-center py-3 px-5 border-0;
    flex-basis:50%;
}
.footer-container > button.confirm-btn-right {
    @apply border-r border-gray-300;
}

/**
* Transition
*/
.confirm-fade-enter-active {
    transition: opacity 0.25s ease-out;
}
.confirm-fade-leave-active {
    transition: opacity 0.35s ease-out;
}

.confirm-fade-enter,
.confirm-fade-leave-to {
    opacity: 0;
}
</style>
