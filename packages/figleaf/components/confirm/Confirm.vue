<script>
import Vue from 'vue';

export default Vue.extend({
    name: 'Confirm',

    props: {
        size: {
            type: String,
            default: 'sm',
            validator(size) {
                return ['sm', 'md', 'lg', 'xl'].indexOf(size) > -1;
            }
        },

        centered: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            confirmed: false,
            isShowing: false
        };
    },

    computed: {
        widthClass() {
            switch(this.size) {
                case 'sm':
                    return 'max-w-xs';

                case 'lg':
                    return 'max-w-2xl';

                case 'xl':
                    return 'max-w-5xl';

                default:
                    return 'max-w-lg';
            }
        }
    },

    methods: {
        show() {
            document.body.style.overflow = 'hidden'; // prevent body from scrolling too (double scroll bars)
            this.isShowing = true;
            this.$root.$emit('fig::confirm::show');
        },

        hide(e) {
            document.body.style.overflow = '';
            this.isShowing = false;
        },

        onConfirm(e) {
            this.confirmed = true;
            this.hide(e);
        },

        onReject(e) {
            this.confirmed = false;
            this.hide(e);
        },

        onAfterEnter() {
            if(this.$refs.btn_confirm_cancel) {
                this.$refs.btn_confirm_cancel.focus();
            }
        },

        onAfterLeave() {
            this.$emit('hide', this.confirmed);
            this.$root.$emit('fig::confirm::hide', this.confirmed);
        }
    }
});
</script>


<template>
    <div>
        <transition
            name="confirm-fade"
            @after-enter="onAfterEnter"
            @after-leave="onAfterLeave">
            <div
                v-if="isShowing"
                key="confirm-content"
                class="flex items-center overflow-x-hidden overflow-y-auto fixed top-0 left-0 w-full h-full z-50 outline-none focus:outline-none"
                v-hotkey="{'esc': onReject}">

                <!--content-->
                <div class="relative w-full">
                    <div
                        class="relative mx-auto border-0 rounded-md shadow-tight bg-white outline-none focus:outline-none"
                        :class="widthClass">

                        <div class="p-5">
                            <!--title-->
                            <div
                                v-if="$slots.title"
                                class="pb-2 break-words font-semibold"
                                :class="{'text-center': centered}"><slot name="title"></slot></div>

                            <!--body-->
                            <div
                                class="relative flex-auto text-md text-gray-600 break-words text-center"
                                :class="{'text-center': centered}"><slot name="message"></slot></div>
                        </div>

                        <!--footer buttons-->
                        <div class="footer-container">
                            <button
                                type="button"
                                class="confirm-btn-right hover:bg-gray-200"
                                ref="btn_confirm_cancel"
                                @click="onReject"><slot name="cancelLabel">Cancel</slot></button>
                            <button
                                type="button"
                                class="hover:bg-gray-200"
                                @click="onConfirm"><slot name="okLabel">OK</slot></button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

        <!-- backdrop -->
        <transition name="confirm-bg-fade">
            <div
                v-if="isShowing"
                key="confirm-bg"
                class="opacity-25 fixed top-0 left-0 z-40 bg-black h-screen w-screen"></div>
        </transition>
    </div>
</template>


<style lang="postcss" scoped>
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

.confirm-bg-fade-enter-active,
.confirm-bg-fade-leave-active {
    transition: opacity 0.1s ease-out;
}

.confirm-fade-enter,
.confirm-fade-leave-to,
.confirm-bg-fade-enter,
.confirm-bg-fade-leave-to {
    opacity: 0;
}
</style>
