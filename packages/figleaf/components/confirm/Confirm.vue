<script>
import Vue from 'vue';

export default Vue.extend({
    name: 'Confirm',

    props: {
        size: {
            type: String,
            default: 'sm',
            validator(size) {
                return ['sm', 'md', 'lg'].indexOf(size) > -1;
            }
        },

        message: {
            type: String,
            default: ''
        },

        no: {
            type: String,
            default: this.$t('Cancel')
        },

        yes: {
            type: String,
            default: this.$t('Yes')
        },

        callback: {
            type: Function
        }
    },

    data() {
        return {
            visible: true
        };
    },

    computed: {
        widthClass() {
            switch(this.size) {
                case 'sm':
                    return 'max-w-xs';

                case 'lg':
                    return 'max-w-3xl';

                case 'xl':
                    return 'max-w-6xl';

                default:
                    return 'max-w-lg';
            }
        }
    },

    methods: {
        show() {
            this.visible = true;
            document.body.style.overflow = 'hidden'; // prevent body from scrolling too (double scroll bars)
        },

        hide() {
            this.visible = false;
            document.body.style.overflow = '';
        }
    }
});
</script>


<template>
    <transition name="fade">
        <div
            v-if="visible"
            class="overflow-x-hidden overflow-y-auto fixed top-0 left-0 w-full h-full z-50 outline-none focus:outline-none"
            v-hotkey="{'esc': hide}">

            <!--content-->
            <div
                class="relative w-auto my-6 mx-auto border-0 rounded-md shadow-lg bg-white outline-none focus:outline-none"
                :class="widthClass">

                <!--header-->
                <div
                    v-if="$slots.header"
                    class="flex items-center justify-between py-2 px-5 rounded-t-md">
                    <h3 class="text-lg font-semibold break-words">
                        <slot name="header"></slot>
                    </h3>
                </div>

                <!--body-->
                <div class="relative py-4 px-5 flex-auto text-md text-gray-600 break-words">
                    <slot></slot>
                </div>

                <!--footer buttons-->
                <div class="flex items-center py-3 px-5 border-t border-solid border-gray-300 bg-gray-100 rounded-b-md">
                    <div style="flex-basis:50%">Cancel</div>
                    <div style="flex-basis:50%">OK</div>
                </div>
            </div>

        </div>

        <!-- backdrop -->
        <div v-if="visible" class="opacity-25 fixed top-0 left-0 z-40 bg-black h-screen w-screen"></div>
    </transition>
</template>


<style lang="postcss">

/**
* Transition
*/
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.21s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
