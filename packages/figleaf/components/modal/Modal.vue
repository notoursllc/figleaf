<script>
import Vue from 'vue';
import VueHotkey from 'v-hotkey';
import FigButton from '../button/Button';
import { modalSizes } from './constants';

Vue.use(VueHotkey);

export default Vue.extend({
    name: 'Modal',

    components: {
        FigButton
    },

    props: {
        size: {
            type: String,
            default: modalSizes.lg,
            validator: (value) => Object.keys(modalSizes).includes(value)
        },

        closeButton: {
            type: Boolean,
            default: true
        }
    },

    data() {
        return {
            visible: false
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
        emitVisible() {
            this.$emit('visible', this.visible);
        },

        toggle() {
            this.visible ? this.hide() : this.show();
        },

        show() {
            this.visible = true;
            document.body.style.overflow = 'hidden'; // prevent body from scrolling too (double scroll bars)
            this.emitVisible();
        },

        hide() {
            this.visible = false;
            document.body.style.overflow = '';
            this.emitVisible();
        }
    }
});
</script>


<template>
    <div>
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
                    class="flex items-center justify-between py-2 px-5 border-b border-solid border-gray-300 rounded-t-md">
                    <div class="text-lg font-semibold break-words">
                        <slot name="header"></slot>
                    </div>

                    <fig-button
                        v-if="closeButton"
                        size="md"
                        variant="ghost"
                        icon="x"
                        @click="toggle" />
                </div>

                <!--body-->
                <div class="relative py-4 px-5 flex-auto text-md text-gray-600 break-words">
                    <slot></slot>
                </div>

                <!--footer-->
                <div
                    v-if="$slots.footer"
                    class="flex items-center py-3 px-5 border-t border-solid border-gray-300 bg-gray-100 rounded-b-md">
                    <slot name="footer"></slot>
                </div>
            </div>

        </div>

        <!-- backdrop -->
        <div v-if="visible" class="opacity-25 fixed top-0 left-0 z-40 bg-black h-screen w-screen"></div>
    </div>
</template>
