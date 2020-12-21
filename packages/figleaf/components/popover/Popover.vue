<script>
import Vue from 'vue';
import { createPopper } from '@popperjs/core';
import vClickOutside from 'v-click-outside';


export default Vue.extend({
    name: 'Popover',

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
            default: () => [0, 10]
        },

        flip: {
            type: Boolean,
            default: true
        },

        customPopperOptions: {
            type: Object,
            default: null
        },

        target: {}
    },

    data() {
        return {
            visible: this.show
        };
    },

    watch: {
        show: {
            handler(val) {
                this.setVisible(val);
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
        },

        propTarget() {
            if(this.target) {
                return this.target.$el || this.target;
            }
            return null;
        }
    },


    methods: {
        setVisible(visible) {
            this.visible = !!visible;
            this.$emit('visible', this.visible);
        },

        checkClick(e) {
            if (this.$scopedSlots.toggler
                && this.$el.firstElementChild.contains(e.target)) {
                this.toggle(e);
            }
        },

        hide() {
            this.setVisible(false);
        },

        toggle(e) {
            e.preventDefault();
            this.setVisible(!this.visible);
        },

        onClickOutside(e) {
            // If the target property is set and the click target is not contained in the prop target element
            // then hide the popup
            if (this.propTarget && !this.propTarget.contains(e.target)) {
                this.hide();
            }
            else if (this.$scopedSlots.toggler && !this.$el.firstElementChild.contains(e.target)) {
                this.hide();
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
                this.hide();
                return;
            };

            const targetEl = this.propTarget || this.$el.firstChild;

            this.$nextTick(() => {
                this._popper = createPopper(
                    targetEl,
                    this.$refs.menu,
                    this.customPopperOptions || this.defaultPopperOptions
                );
            });
        }
    }
});
</script>


<template>
    <div
        v-click-outside="onClickOutside"
        @click="checkClick($event)"
        class="relative inline-flex">
        <div class="leading-none"><slot name="toggler" :aria-attrs="ariaAttrs"></slot></div>

        <div
            ref="menu"
            class="bg-white text-base text-gray-700 z-50 list-none text-left rounded shadow-sm mt-1 max-w-md border border-gray-300 shadow-tight"
            :class="{hidden: !visible, block: visible}">
            <div ref="arrow" class="arrow"></div>

            <!-- header -->
            <div
                v-if="$slots.header"
                class="px-2 py-1 border-solid border-b border-gray-300 bg-gray-100 font-medium"><slot name="header"></slot></div>

            <div class="px-3 py-2 text-sm"><slot></slot></div>

            <!-- footer -->
            <div
                v-if="$slots.footer"
                class="p-2 text-sm border-solid border-t border-gray-300 bg-gray-100"><slot name="footer"></slot></div>
        </div>
    </div>
</template>


<style lang="postcss" scoped>
/* https://popper.js.org/docs/v2/tutorial/#arrow */
.arrow,
.arrow::before {
  position: absolute;
  width: 10px;
  height: 10px;
  z-index: -1;
}

.arrow::before {
  content: '';
  transform: rotate(45deg);
  @apply bg-gray-100;
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
