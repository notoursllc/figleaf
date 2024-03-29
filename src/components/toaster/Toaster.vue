<script>
export default {
    name: 'FigToaster'
}
</script>

<script setup>
import { computed, reactive } from 'vue';
import FigIcon from '../icon/FigIcon.vue';
import FigTimerBar from '../timerBar/TimerBar.vue'
import { toastVariants } from './constants.js';
import { v4 as uuidv4 } from 'uuid';

const props = defineProps({
    maxToasts: {
        type: Number,
        default: 10
    }
});

const emit = defineEmits([
    'close'
]);

defineExpose({
    addToast, 
    clearToasts
});

const currentToasts = reactive([]);

const includedToasts = computed(() => {
    return [...currentToasts].slice(0, props.maxToasts);
});

function closeToast(id) {
    emit('close');
    removeToast(id);
}

const enterActiveClasses = computed(() => {
    const classes = [
        'transform',
        'ease-out',
        'duration-300',
        'transition'
    ];

    if(currentToasts.length > 1) {
        classes.push('delay-300');
    }

    return classes.join(',');
});


function getTitleClass(variant) {
    switch(variant) {
        case toastVariants.success:
            return 'text-emerald-700';

        case toastVariants.error:
            return 'text-red-600';

        default:
            return 'text-blue-900';
    }
}

function getIconType(variant) {
    switch(variant) {
        case toastVariants.success:
            return 'check-circle';

        case toastVariants.error:
            return 'alert-circle';

        default:
            return 'info-circle';
    }
}

function getMessageClasses(variant) {
    const classes = [];

    switch(variant) {
        case toastVariants.success:
            classes.push('bg-success');
            break;

        case toastVariants.error:
            classes.push('bg-error');
            break;

        default:
            classes.push('bg-info');
    }

    return classes;
}

function getIconBgClasses(toastConfig) {
    const classes = [];

    classes.push(
        toastConfig.icon !== false ? 'w-10' : 'w-2'
    );

    switch(toastConfig.variant) {
        case toastVariants.success:
            classes.push('bg-emerald-500');
            break;

        case toastVariants.error:
            classes.push('bg-red-500');
            break;

        default:
            classes.push('bg-blue-400');
    }

    return classes;
}

function clearToasts() {
    currentToasts.splice(0, currentToasts.length);
}

function removeToast(id) {
    currentToasts.splice(
        currentToasts.findIndex(toastConfig => toastConfig.id === id), 
        1
    );
}

function addToast(toastConfig) {
    const cfg = Object.assign(
        {},
        {
            timeout: 4000,
            icon: true,
            variant: toastVariants.info,
            closable: true,
            title: null,
            text: null,
            dangerousText: null
        },
        toastConfig,
        {
            id: uuidv4()
        }
    );

    // add toasts to the front of the array so
    // the new ones appear at the top of the UI
    currentToasts.unshift(cfg);

    if(cfg.timeout === 0) {
        return;
    }

    setTimeout(
        () => {
            removeToast(cfg.id);
        }, 
        cfg.timeout || 4000
    );
}

function getTimerBarColor(variant) {
    switch(variant) {
        case toastVariants.success:
            return '#4ADE80';

        case toastVariants.error:
            return '#FCA5A5';

        default:
            return '#93C5FD';
    }
}
</script>


<template>
    <div class="fig-toaster">
        <div class="max-w-sm w-full">

            <transition-group
                :enter-active-class="enterActiveClasses"
                enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
                enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
                leave-active-class="transition ease-in duration-500"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
                move-class="transition duration-500">

                <div
                    class="fig-toast shadow-tight"
                    :class="getMessageClasses(toastConfig.variant)"
                    v-for="toastConfig in includedToasts"
                    :key="toastConfig.id">

                    <!-- icon -->
                    <div
                        class="flex justify-center items-center"
                        :class="getIconBgClasses(toastConfig)">
                        <i class="p-2">
                            <fig-icon
                                v-if="toastConfig.icon !== false"
                                :icon="getIconType(toastConfig.variant)"
                                stroke="#fff"
                                stroke-width="1.5"
                                :width="26"
                                :height="26" />
                        </i>
                    </div>

                    <!-- message -->
                    <div
                        class="fig-toast-content"
                        :class="{'pr-6': toastConfig.closable !== false, 'pr-4': !(toastConfig.closable !== false)}">
                        <!-- title -->
                        <div
                            class="text-sm font-semibold break-words mb-1"
                            :class="getTitleClass(toastConfig.variant)">{{ toastConfig.title }}</div>

                        <!-- message -->
                        <div
                            v-if="toastConfig.text"
                            class="text-gray-600 text-sm break-words">{{ toastConfig.text }}</div>
                    </div>

                    <!-- close button -->
                    <button
                        v-if="toastConfig.closable !== false"
                        type="button"
                        @click="closeToast(toastConfig.id)"
                        class="absolute top-0 right-0 p-0 m-0 mt-2 mr-2 border-0 background-transparent hover:bg-gray-200">
                        <fig-icon
                            icon="x"
                            stroke="#000"
                            stroke-width="1.5"
                            :width="18"
                            :height="18" />
                    </button>

                    <fig-timer-bar ref="timerBar" 
                        autostart
                        :duration="toastConfig.timeout" 
                        height="1px" 
                        :color="getTimerBarColor(toastConfig.variant)"
                        class="timer-bar" />
                </div>
            </transition-group>

        </div>
        
    </div>
</template>


<style scoped>
/* Note that toasts should have the hightest z-index so they appear over modal and everything else */
.fig-toaster {
    @apply fixed inset-0 flex px-4 py-6 p-6 items-start justify-end pointer-events-none;
    z-index: 9999;
}

.fig-toast {
    @apply flex max-w-sm w-full mx-auto bg-white rounded-lg overflow-hidden mt-4 relative pointer-events-auto;
}

.fig-toast-content {
    @apply py-3 px-4 overflow-y-auto;
    max-height: 300px;
}

.bg-success {
    background-color: #f3fbf0;
}
.bg-error {
    background-color: #fbf0f0;
}
.bg-info {
    background-color: #f0f3fb;
}

.timer-bar {
    @apply absolute bottom-0 left-0 right-0;
}
</style>
