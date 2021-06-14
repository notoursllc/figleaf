<script>
import Vue from 'vue';
import VueHotkey from 'v-hotkey';
import FigButton from '../button/Button';
import FigIcon from '../icon/FigIcon';

Vue.use(VueHotkey);

export default Vue.extend({
    name: 'AtcConfirm',

    components: {
        FigButton,
        FigIcon
    },

    methods: {
        show() {
            document.body.style.overflow = 'hidden'; // prevent body from scrolling too (double scroll bars)
            this.$root.$emit('fig::atc_confirm::show');
        },

        hide(buttonIndex) {
            document.body.style.overflow = '';
            this.$emit('hide', buttonIndex);
            this.$root.$emit('fig::atc_confirm::hide');
        },

        onCheckout() {
            this.hide(2);
        },

        onViewCart() {
            this.hide(1);
        },

        onClose() {
            this.hide(0);
        }
    }
});
</script>


<template>
    <div>
        <div
            class="flex items-center overflow-x-hidden overflow-y-auto fixed top-0 left-0 w-full h-full z-50 outline-none focus:outline-none"
            v-hotkey="{'esc': onClose}"
            @click="onClose">

            <!--content-->
            <div class="fig-atm-confirm">
                <div
                    class="relative max-w-xs' mx-auto border-0 shadow-tight bg-white outline-none focus:outline-none">

                    <div class="px-5 pt-3 pb-5">
                        <div class="flex items-center pb-2">
                            <!--title-->
                            <div
                                v-if="$slots.title"
                                class="flex-grow flex items-center">
                                <fig-icon
                                    icon="check-circle"
                                    stroke="#48bb78"
                                    stroke-width="1.5"
                                    :width="20"
                                    :height="20" />

                                <div class="pl-1 break-words font-semibold">
                                    <slot name="title"></slot>
                                </div>
                            </div>

                            <!-- close button -->
                            <fig-button
                                icon="x"
                                variant="plain"
                                size="sm"
                                @click="onClose" />
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
                            @click="onViewCart"><slot name="cancelLabel">View Cart</slot></button>
                        <button
                            type="button"
                            ref="btn_confirm_checkout"
                            class="hover:bg-green-200 bg-green-100 focus:outline-none"
                            @click="onCheckout"><slot name="checkoutLabel">Checkout</slot></button>
                    </div>
                </div>
            </div>
        </div>

        <!-- backdrop -->
        <div class="opacity-25 fixed top-0 left-0 z-40 bg-black h-screen w-screen"></div>
    </div>
</template>


<style>
.fig-atm-confirm {
    @apply w-11/12 mx-auto;
    top: 40px;
}

@screen sm {
    .fig-atm-confirm {
        @apply fixed;
        width: 400px;
        right: 10px;
    }
}

.footer-container {
    @apply flex items-center border-t border-solid border-gray-300;
}
.footer-container > button {
    @apply text-center py-3 px-5 border-0;
    flex-basis:50%;
}
.footer-container > button.confirm-btn-right {
    @apply border-r border-gray-300;
}
</style>
