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
            default: () => [0, 8]
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
                strategy: 'fixed',
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
                    },
                    {
                        name: 'arrow',
                        options: {
                            enabled: true,
                            element: this.$refs.arrow
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

            const targetEl = this.$el.firstChild;
            // if(this.target) {
            //     targetEl = this.target.$el || this.target;
            // }

            this._popper = createPopper(
                targetEl,
                this.$refs.tooltipRef,
                this.customPopperOptions || this.defaultPopperOptions
            );
        }
    }
});
</script>


<template>
    <div
        class="relative inline-flex"
        @mouseenter="checkHover($event)"
        @mouseleave="checkHover($event)">
        <div class="leading-none"><slot name="toggler" :aria-attrs="ariaAttrs"></slot></div>
        <div
            ref="tooltipRef"
            :class="{'hidden': !visible, 'block': visible, 'text-center': centered, 'text-left': !centered}"
            class="fig-tip">
            <div ref="arrow" class="arrow"></div>
            <slot></slot>
        </div>
    </div>
</template>


<style lang="postcss" scoped>
.fig-tip {
    @apply bg-gray-800 text-white absolute top-0 left-0 py-1 px-2 z-50 font-normal leading-normal text-xs max-w-xs break-words rounded-sm;
    min-width: 100px;
}

/* https://popper.js.org/docs/v2/tutorial/#arrow */
.arrow,
.arrow::before {
  position: absolute;
  width: 8px;
  height: 8px;
  z-index: -1;
}

.arrow::before {
  content: '';
  transform: rotate(45deg);
  @apply bg-gray-800;
}

[data-popper-placement^='top'] > .arrow {
  bottom: -4px;
}

[data-popper-placement^='bottom'] > .arrow {
  top: -4px;
}

[data-popper-placement^='left'] > .arrow {
  right: -4px;
}

[data-popper-placement^='right'] > .arrow {
  left: -4px;
}
</style>
