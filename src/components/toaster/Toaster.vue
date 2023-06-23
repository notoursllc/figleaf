<script>
import { state, methods } from './toaster.js';
import FigIcon from '../icon/FigIcon';

export default {
    name: 'Toaster',

    components: {
        FigIcon
    },

    props: {
        maxNotifications: {
            type: Number,
            default: 10
        }
    },

    data() {
        return {
            toasts: state.toasts
        };
    },

    computed: {
        enterActiveClasses() {
            const classes = [
                'transform',
                'ease-out',
                'duration-300',
                'transition'
            ];

            if(this.toasts.length > 1) {
                classes.push('delay-300');
            }

            return classes.join(',');
        },

        includedToasts() {
            return [...this.toasts].slice(0, this.maxNotifications);
        }
    },

    methods: {
        closeToast(id) {
            this.$emit('close');
            methods.removeToast(id);
        },

        getTitleClass(variant) {
            switch(variant) {
                case 'success':
                    return 'text-emerald-700';

                case 'error':
                    return 'text-red-600';

                default:
                    return 'text-blue-900';
            }
        },

        getIconType(variant) {
            switch(variant) {
                case 'success':
                    return 'check-circle';

                case 'error':
                    return 'alert-circle';

                default:
                    return 'info-circle';
            }
        },

        getMessageClasses(variant) {
            const classes = [];

            switch(variant) {
                case 'success':
                    classes.push('bg-success');
                    break;

                case 'error':
                    classes.push('bg-error');
                    break;

                default:
                    classes.push('bg-info');
            }

            return classes;
        },

        getIconBgClasses(toastConfig) {
            const classes = [];

            classes.push(
                toastConfig.icon !== false ? 'w-10' : 'w-2'
            );

            switch(toastConfig.variant) {
                case 'success':
                    classes.push('bg-emerald-500');
                    break;

                case 'error':
                    classes.push('bg-red-500');
                    break;

                default:
                    classes.push('bg-blue-400');
            }

            return classes;
        }
    },

    mounted() {
        this.$root.$on('fig::toaster::hideall', methods.removeAllToasts);
    },

    beforeDestroy() {
        this.$root.$off('fig::toaster::hideall', methods.removeAllToasts);
    }
};
</script>


<template>
    <div class="fig-toast">
        <div class="max-w-sm w-full">

            <transition-group
                :enter-active-class="enterActiveClasses"
                enter-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
                enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
                leave-active-class="transition ease-in duration-500"
                leave-class="opacity-100"
                leave-to-class="opacity-0"
                move-class="transition duration-500">

                <div
                    class="flex max-w-sm w-full mx-auto shadow-tight rounded-lg overflow-hidden mt-4 relative pointer-events-auto"
                    :class="getMessageClasses(toastConfig.variant)"
                    v-for="toastConfig in includedToasts"
                    :key="toastConfig.id">

                    <!-- icon -->
                    <div
                        class="flex justify-center items-center"
                        :class="getIconBgClasses(toastConfig)">
                        <i class="px-1">
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
                </div>
            </transition-group>

        </div>
    </div>
</template>


<style scoped>
/* Note that toasts should have the hightest z-index so they appear over modal and everything else */
.fig-toast {
    @apply fixed inset-0 flex px-4 py-6 p-6 items-start justify-end pointer-events-none;
    z-index: 9999;
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
</style>
