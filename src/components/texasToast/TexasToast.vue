<script>
import { directive } from 'vue3-click-away';
import FigOverlay from '../overlay/Overlay.vue';

export default {
    name: 'FigTexasToast',

    directives: {
        clickOutside: directive
    }
}
</script>

<script setup>
import { ref, computed, onUnmounted, onMounted } from 'vue';
import { onKeyStroke } from '@vueuse/core';
import FigButton from '../button/Button.vue';
import FigIcon from '../icon/FigIcon.vue';
import { texasToastVariants } from './constants.js';

const props = defineProps({
    variant: {
        type: String,
        default: texasToastVariants.success,
        validator: (value) => Object.keys(texasToastVariants).includes(value)
    }
});

const emit = defineEmits(['hide']);

defineExpose({
    show,
    hide
});

const visible = ref(false);
const timeoutId = ref(null);

const theme = computed(() => {
    const themeData = {
        icon: null,
        stroke: null,
        primaryButtonClass: null
    };

    switch(props.variant) {
        case texasToastVariants.success:
            themeData.icon = 'check-circle';
            themeData.stroke = '#48bb78';
            themeData.primaryButtonClass = 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900';
            break;

        case texasToastVariants.danger:
            themeData.icon = 'alert-circle';
            themeData.stroke = '#dc2626';
            themeData.primaryButtonClass = 'bg-red-100 hover:bg-red-200 text-red-800';
            break;

        case texasToastVariants.info:
            themeData.icon = 'info-circle';
            themeData.stroke = '#2563eb';
            themeData.primaryButtonClass = 'bg-blue-100 hover:bg-blue-200 text-blue-900';
            break;
    }

    return themeData;
});

function show(timeout) {
    document.body.style.overflow = 'hidden'; // prevent body from scrolling too (double scroll bars)
    visible.value = true;

    if(timeout) {
        timeoutId.value = setTimeout(() => {
            // the toast may have been hidden by the user manually
            // before the timer expires, so checking if it's still
            // visible before calling hide() so the 'hide' event
            // does not fire again unnecessarily
            if(visible.value) {
                hide();
            }
        }, timeout);
    }
}

function hide(buttonIndex) {
    document.body.style.overflow = '';
    visible.value = false;
    emit('hide', buttonIndex === undefined ? null : buttonIndex);
    removeTimeout();
}


function removeTimeout() {
    if(timeoutId.value) {
        clearTimeout(timeoutId.value);
        timeoutId.value = null;
    }
}

onMounted(() => {
    onKeyStroke('Escape', hide, { target: document });
});

onUnmounted(() => {
    removeTimeout();
});
</script>


<template>
    <div>
        <transition
            enter-active-class="transform ease-out duration-300 transition"
            enter-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
            enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
            leave-active-class="transition ease-in duration-500"
            leave-class="opacity-100"
            leave-to-class="opacity-0"
            move-class="transition duration-500">

            <div
                v-if="visible"
                class="flex items-center overflow-x-hidden overflow-y-auto fixed top-0 left-0 w-full h-full z-50 outline-none focus:outline-none">

                <!--content-->
                <div class="fig-texas-toast" v-click-outside="hide">
                    <div
                        class="relative max-w-xs' mx-auto border-0 shadow-tight bg-white outline-none focus:outline-none">

                        <div class="px-5 pt-3 pb-5">
                            <div class="flex items-center pb-2">
                                <!--title-->
                                <div
                                    v-if="$slots.title"
                                    class="flex items-center">
                                    <fig-icon
                                        :icon="theme.icon"
                                        :stroke="theme.stroke"
                                        stroke-width="1.5"
                                        :width="24"
                                        :height="24" />

                                    <div class="pl-1 break-words font-semibold">
                                        <slot name="title"></slot>
                                    </div>
                                </div>

                                <!-- close button -->
                                <div class="grow flex justify-end">
                                    <fig-button
                                        icon="x"
                                        variant="plain"
                                        size="sm"
                                        @click="hide" />
                                </div>
                            </div>

                            <!--body-->
                            <div class="relative flex-auto break-words">
                                <slot name="message"></slot>
                            </div>
                        </div>

                        <!--footer buttons-->
                        <div class="footer-container">
                            <button
                                type="button"
                                class="confirm-btn-right hover:bg-gray-200 bg-gray-100 focus:outline-none"
                                @click="() => { hide(1) }"><slot name="secondaryButtonLabel">{{ $t('View cart') }}</slot></button>
                            <button
                                type="button"
                                ref="btn_confirm_checkout"
                                class="focus:outline-none"
                                :class="theme.primaryButtonClass"
                                @click="() => { hide(2) }"><slot name="primaryButtonLabel">{{ $t('Checkout') }}</slot></button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

        <fig-overlay
            :show="visible"
            :show-spinner="false"
            :z-index="40" />
    </div>
</template>


<style>
.fig-texas-toast {
    @apply w-11/12 mx-auto;
    top: 40px;
}

@screen sm {
    .fig-texas-toast {
        @apply fixed;
        width: 400px;
        right: 10px;
    }
}

.footer-container {
    @apply flex items-center border-t border-solid border-gray-300;
}
.footer-container > button {
    @apply text-center py-3 px-5 border-0 m-0;
    flex-basis:50%;
}
.footer-container > button.confirm-btn-right {
    @apply border-r border-gray-300;
}
</style>
