<script>
import Vue from 'vue';
import { createPopper } from '@popperjs/core';
import vClickOutside from 'v-click-outside';


export default Vue.extend({
    directives: {
        clickOutside: vClickOutside.directive
    },

    data() {
        return {
            dropdownPopoverShow: false
        };
    },

    methods: {
        toggleDropdown: function () {
            if (this.dropdownPopoverShow) {
                this.hideDropdown();
            }
            else {
                this.showDropdown();
            }
        },

        showDropdown() {
            this.dropdownPopoverShow = true;
            createPopper(
                this.$refs.btnDropdownRef,
                this.$refs.popoverDropdownRef,
                {
                    placement: 'bottom-start'
                }
            );
        },

        hideDropdown() {
            this.dropdownPopoverShow = false;
        },

        onClickOutside (event) {
            console.log('Clicked outside. Event: ', event);
            this.hideDropdown();
        }
    }
});
</script>


<template>
    <div class="flex flex-wrap">
        <div class="w-full sm:w-6/12 md:w-4/12 px-4">
            <div
                v-click-outside="onClickOutside"
                class="relative inline-flex align-middle w-full">
                <button
                    class="text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 bg-green-500 active:bg-green-600 ease-linear transition-all duration-150"
                    type="button"
                    ref="btnDropdownRef"
                    v-on:click="toggleDropdown()">
                    green Dropdown
                </button>

                <div
                    ref="popoverDropdownRef"
                    class="bg-green-500 text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 min-w-48"
                    :class="{hidden: !dropdownPopoverShow, block: dropdownPopoverShow}">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>
