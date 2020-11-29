<script>
// this component was heavily influenced by:
// https://raw.githubusercontent.com/coreui/coreui-vue/master/src/components/dropdown/CDropdown.vue
// https://coreui.io/vue/docs/components/dropdown.html

import Vue from 'vue';
import { createPopper } from '@popperjs/core';
import vClickOutside from 'v-click-outside';


export default Vue.extend({
    name: 'Dropdown',

    directives: {
        clickOutside: vClickOutside.directive
    },

    props: {
        placement: {
            type: String,
            validator: (position) => {
                return [
                    '',
                    'top-end',
                    'top',
                    'top-start',
                    'bottom-end',
                    'bottom',
                    'bottom-start',
                    'right-start',
                    'right',
                    'right-end',
                    'left-start',
                    'left',
                    'left-end'
                ].includes(position);
            },
            default: 'bottom-start'
        },

        show: {
            type: Boolean,
            default: false
        },

        disabled: {
            type: Boolean,
            default: false
        },

        offset: {
            type: Array,
            default: () => [0, 0]
        },

        flip: {
            type: Boolean,
            default: true
        },

        customPopperOptions: {
            type: Object,
            default: null
        }
    },

    data() {
        return {
            visible: this.show
        };
    },

    watch: {
        show: {
            handler(val) {
                this.visible = val;
            }
        },

        visible: {
            handler (val) {
                val ? this.createPopper() : this.removePopper();
                // this.$emit('update:show', val)
            },
            immediate: true
        }
    },

    computed: {
        defaultPopperOptions () {
            return {
                placement: this.placement,
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: this.offset
                        }
                    },
                    {
                        name: 'flip',
                        enabled: this.flip
                    },
                    {
                        name: 'preventOverflow',
                        options: {
                            padding: 10
                        }
                    }
                ]
            };
        },

        ariaAttrs () {
            return {
                'aria-expanded': this.visible ? 'true' : 'false',
                'aria-haspopup': 'true'
            };
        }
    },


    methods: {
        checkClick(e) {
            if (this.$scopedSlots.toggler
                && this.$el.firstElementChild.contains(e.target)) {
                this.toggle(e);
            }
        },

        hide() {
            this.visible = false;
        },

        toggle(e) {
            e.preventDefault();
            this.visible = !this.visible;
        },

        onClickOutside(event) {
            this.hide();
        },

        removePopper() {
            if (this._popper) {
                this._popper.destroy();
            }
            this._popper = null;
        },

        createPopper() {
            this.removePopper();

            if (this.disabled) {
                this.visible = false;
                return;
            };

            this.$nextTick(() => {
                this._popper = createPopper(
                    this.$el.firstChild,
                    this.$refs.menu,
                    this.customPopperOptions || this.defaultPopperOptions
                );
            });
        }
    },

    mounted () {
        this.$on('fig::dropdown::close', this.hide);
    }
});
</script>


<template>
    <div
        v-click-outside="onClickOutside"
        @click="checkClick($event)"
        class="relative inline-flex align-middle w-full">
        <slot name="toggler" :aria-attrs="ariaAttrs"></slot>

        <div
            ref="menu"
            class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 min-w-48"
            :class="{hidden: !visible, block: visible}">
            <slot></slot>
        </div>
    </div>
</template>
