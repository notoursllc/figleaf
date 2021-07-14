<script>
import { headroom } from 'vue-headroom';
import { v4 as uuidv4 } from 'uuid';
import FigBadge from '../Badge.vue';
import FigIcon from '../icon/FigIcon.vue';
import FigPopover from '../popover/Popover.vue';
import FigButton from '../button/Button.vue';
import FigContent from '../content/Content.vue';

export default {
    components: {
        headroom,
        FigBadge,
        FigIcon,
        FigPopover,
        FigButton,
        FigContent
    },

    props: {
        inCheckout: {
            type: Boolean,
            default: false
        },

        numCartItems: {
            type: Number,
            default: 0
        }
    },

    data: function() {
        return {
            uuid: uuidv4()
        };
    },

    computed: {
        popoverRef() {
            return `popover-target-${this.uuid}`;
        },

        popoverCancelButtonRef() {
            return `btn-cancel-${this.uuid}`;
        }
    },

    methods: {
        emitCartClick() {
            this.$emit('cartClick');
        },

        emitSidebarOpen() {
            this.$emit('sidebarOpen');
        },

        hidePopover() {
            this.$refs[this.popoverRef].hide();
        },

        onReturnToCartClick() {
            this.hidePopover();
            this.emitCartClick();
        },

        onPopoverVisible(isVisible) {
            if(isVisible) {
                this.$refs[this.popoverCancelButtonRef].$el.focus();
            }
        }
    }
};
</script>

<template>
    <headroom :disabled="inCheckout" :zIndex="10">
        <header role="banner" class="fig-header h-12 md:h-16 flex items-center relative p-0 w-full">
            <fig-content nopad class="flex flex-row items-center w-full px-4">
                <div>
                    <slot name="logo" />
                </div>

                <!-- middle -->
                <div class="flex flex-no-wrap flex-grow items-center text-base justify-center">
                    <template v-if="!inCheckout">
                        <fig-icon
                            icon="menu-2"
                            :width="30"
                            :height="30"
                            class="block md:hidden cursor-pointer"
                            @click="emitSidebarOpen" />

                        <div class="hidden md:block">
                            <slot name="middle" />
                        </div>
                    </template>

                    <!-- checkout label and popover -->
                    <template v-else>
                        <div class="flex items-center">
                            <div class="pr-1">
                                <fig-icon
                                    icon="lock"
                                    class="vam"
                                    :width="22"
                                    :height="22" />
                            </div>

                            <div class="pr-1 text-xl">{{ $t('Checkout') }}</div>

                            <fig-popover
                                placement="top"
                                @visible="onPopoverVisible"
                                :ref="popoverRef">

                                <div
                                    slot="toggler"
                                    class="whitespace-nowrap text-xl cursor-pointer">(<a class="text-blue-500">{{ numCartItems }}&nbsp;{{ $tc('item_items', numCartItems) }}</a>)</div>

                                <div class="p-2 text-center">{{ $t('Return to your Shopping Cart?') }}</div>

                                <div
                                    slot="footer"
                                    class="flex items-center justify-center">
                                    <fig-button
                                        variant="plain"
                                        size="sm"
                                        @click="hidePopover"
                                        class="mr-1"
                                        :ref="popoverCancelButtonRef">{{ $t('cancel') }}</fig-button>

                                    <fig-button
                                        variant="primary"
                                        size="sm"
                                        @click="onReturnToCartClick">{{ $t('Yes, return to cart') }}</fig-button>
                                </div>
                            </fig-popover>
                        </div>
                    </template>
                </div>

                <!-- left -->
                <div v-if="!inCheckout">
                    <button
                        type="button"
                        class="cart-button relative p-0 m-0 mt-2 bg-transparent border-0 mr-3 lg:mr-0"
                        @click="emitCartClick">
                        <fig-icon
                            icon="cart"
                            :width="27"
                            :height="27"
                            :stroke-width="1.5" />
                        <fig-badge
                            :variant="numCartItems ? 'success' : 'light'"
                            size="sm">{{ numCartItems }}</fig-badge>
                    </button>
                </div>
            </fig-content>
        </header>
    </headroom>
</template>


<style scoped>
.cart-button .fig-badge {
    top: -10px;
    right: -11px;
}
</style>
