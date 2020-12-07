<script>
// this component was heavily influenced by:
// https://raw.githubusercontent.com/coreui/coreui-vue/master/src/components/dropdown/CDropdown.vue
// https://coreui.io/vue/docs/components/dropdown.html

import Vue from 'vue';
import VueHotkey from 'v-hotkey';
import { createPopper } from '@popperjs/core';
import vClickOutside from 'v-click-outside';

Vue.use(VueHotkey);

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
        v-hotkey="{'esc': onClickOutside}"
        @click="checkClick($event)"
        class="relative inline-flex align-middle">
        <slot name="toggler" :aria-attrs="ariaAttrs"></slot>

        <div
            ref="menu"
            class="fig-dropdown"
            :class="{hidden: !visible, block: visible}">
            <div ref="arrow" class="arrow"></div>
            <slot></slot>
        </div>
    </div>
</template>


<style lang="postcss" scoped>
.fig-dropdown {
    @apply bg-white text-base z-50 float-left py-2 list-none text-left rounded mt-1;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
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
  background: #fff;
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
