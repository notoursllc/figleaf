<script>
import Vue from 'vue';
import { createPopper } from '@popperjs/core';


export default Vue.extend({
    name: 'Tooltip',

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

        centered: {
            type: Boolean,
            default: true
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

        // target: {}
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
        checkHover(e) {
            if (this.$scopedSlots.toggler) {
                this.toggle(e);
            }
        },

        hide() {
            this.visible = false;
        },

        toggle(e) {
            e.preventDefault();

            if(this.visible) {
                this.visible = false;
            }
            else {
                this.visible = true;
                this.createPopper();
            }
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

            let targetEl = this.$el.firstChild;
            // if(this.target) {
            //     targetEl = this.target.$el || this.target;
            // }

            this.$nextTick(() => {
                this._popper = createPopper(
                    targetEl,
                    this.$refs.tooltipRef,
                    this.customPopperOptions || this.defaultPopperOptions
                );
            });
        }
    }
});
</script>


<template>
    <div
        class="relative inline-flex"
        @mouseenter="checkHover($event)"
        @mouseleave="checkHover($event)">
        <slot name="toggler" :aria-attrs="ariaAttrs"></slot>
        <div
            ref="tooltipRef"
            :class="{'hidden': !visible, 'block': visible, 'text-center': centered, 'text-left': !centered}"
            class="fig-tip bg-gray-800 text-white absolute top-0 left-0 py-1 px-2 block z-50 font-normal leading-normal text-xs max-w-xs break-words rounded-sm">
            <slot></slot>
        </div>
    </div>
</template>


<style scoped>
.fig-tip {
    min-width: 100px;
    opacity: .9;
}
</style>
