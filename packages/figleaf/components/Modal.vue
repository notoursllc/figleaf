<script>
import Vue from 'vue';
import FigButton from './Button';

export default Vue.extend({
    name: 'Modal',

    components: {
        FigButton
    },

    props: {
        size: {
            type: String,
            default: 'lg',
            validator(size) {
                return ['sm', 'md', 'lg', 'xl'].indexOf(size) > -1;
            }
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
                    return 'max-w-5xl';

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
            this.emitVisible();
        },

        hide() {
            this.visible = false;
            this.emitVisible();
        }
    }
});
</script>


<template>
    <div>
        <div
            v-if="visible"
            class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
            <div
                class="relative w-auto my-6 mx-auto"
                :class="widthClass">
                <!--content-->
                <div class="border-0 rounded-md shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                    <!--header-->
                    <div
                        v-if="$slots.header"
                        class="flex items-center justify-between py-2 px-5 border-b border-solid border-gray-300 rounded-t-md">
                        <h3 class="text-lg font-semibold break-words">
                            <slot name="header"></slot>
                        </h3>

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
        </div>

        <!-- backdrop -->
        <div v-if="visible" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
</template>
