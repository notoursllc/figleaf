<script>
export default {
    name: 'SidebarLayout'
}
</script>

<script setup>
import { ref } from 'vue';
import { TransitionChild, TransitionRoot, Dialog, DialogOverlay } from '@headlessui/vue';
import FigIcon from '../../components/icon/FigIcon.vue';
import FigDisclosureNav from '../../components/disclosureNav/DisclosureNav.vue';
import FigVictoryIcon from '../../components/icon/VictoryIcon.vue';

const props = defineProps({
    navItems: {
        type: Array,
    }
});

const sidebarOpened = ref(false);
</script>


<template>
    <div class="fig-sidebar-layout">

        <!-- mobile view -->
        <TransitionRoot :show="sidebarOpened">
            <Dialog as="div" @close="sidebarOpened = false" class="fixed inset-0 z-40 md:hidden">
                <TransitionChild
                    enter="transition ease-in-out duration-200 transform"
                    enter-from="-translate-x-full"
                    enter-to="translate-x-0"
                    leave="transition ease-in-out duration-200 transform"
                    leave-from="translate-x-0"
                    leave-to="-translate-x-full"
                    as="template">
                    <aside class="fig-sidebar-layout-aside flex relative z-10 flex-col w-72 h-full md:hidden">
                        <header>
                            LOGO

                            <button
                                class="p-0 m-0 bg-transparent border-0 absolute right-2"
                                @click="sidebarOpened = false">
                                <fig-icon
                                    icon="x"
                                    :stroke-width="1.5"
                                    :width="18"
                                    :height="18" />
                            </button>
                        </header>

                        <div class="overflow-y-auto flex-1">
                            <fig-disclosure-nav :nav-items="navItems" />
                        </div>
                    </aside>
            </TransitionChild>

            <TransitionChild
                enter="transition-opacity ease-linear duration-200"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="transition-opacity ease-linear duration-200"
                leave-from="opacity-100"
                leave-to="opacity-0"
                as="template">
                <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-50"></DialogOverlay>
            </TransitionChild>
            </Dialog>
        </TransitionRoot>

        <!-- desktop view -->
        <aside class="fig-sidebar-layout-aside hidden w-64 md:block">
            <header>
                <fig-victory-icon
                    fill="#565656"
                    :width="60"
                    :height="30" />
            </header>

            <div class="pr-2">
                <fig-disclosure-nav :nav-items="navItems" />
            </div>
        </aside>

        <!-- main content -->
        <div class="fig-sidebar-layout-main">
            <header>
                <button
                    class="p-0 m-0 bg-transparent border-0 md:hidden"
                    @click="sidebarOpened = true">
                    <fig-icon
                        icon="menu-2"
                        :stroke-width="1.5"
                        :width="20"
                        :height="20" />
                </button>

                <!-- spacer -->
                <div class="flex-grow"></div>

                <!-- tools -->
                <div>
                    <slot name="headerTools" />
                </div>
            </header>

            <div class="flex-1">
                <!-- element id added to help support teleport -->
                <div id="fig-sidebar-layout-above-content"><slot name="aboveContent" /></div>
                <div class="px-4 pt-4 pb-10">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.fig-sidebar-layout {
    @apply flex h-screen bg-white;
}

.fig-sidebar-layout-aside {
    @apply bg-gray-50;

    header {
        @apply flex items-center justify-center relative w-full h-full mb-4;
    }

    .fig-disclosure-nav-item.is-active {
        @apply bg-blue-50;
    }
}

.fig-sidebar-layout-aside header,
.fig-sidebar-layout-main header {
    height: 40px;
}

.fig-sidebar-layout-main {
    @apply flex-1 h-full overflow-x-hidden overflow-y-auto;

    header {
        @apply w-full px-4 flex items-center;
        line-height: 100%;
    }
}
</style>
