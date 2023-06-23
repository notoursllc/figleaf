<script>
export default {
    name: 'FigSlideover'
}
</script>

<script setup>
import { useSlots } from 'vue';
import FigButton from '../button/Button.vue';
import FigIcon from '../icon/FigIcon.vue';

const props = defineProps({
    opened: {
        type: Boolean,
        default: false
    },

    closable: {
        type: Boolean,
        default: true
    }
});

const emit = defineEmits(['close']);

const slots = useSlots();

function onClose() {
    emit('close');
}
</script>

<template>
    <transition name="slide">
        <aside v-if="opened" class="fig-slideover sm:w-64">
            <div v-if="closable" class="p-5 flex justify-end">
                <fig-button
                    variant="naked"
                    @click="onClose">
                    <fig-icon
                        icon="x"
                        :width="24"
                        :height="24"
                        stroke="#fff"
                        class="cursor-pointer" />
                </fig-button>
            </div>

            <div class="flex grow w-full md:overflow-y-auto">
                <slot />
            </div>

            <!-- footer -->
            <div v-if="slots.footer" class="flex items-center w-full">
                <slot name="footer" />
            </div>
        </aside>
    </transition>
</template>


<style scoped>
.fig-slideover {
    @apply fixed flex flex-col w-full h-full m-0 left-0 top-0 overflow-y-auto;
    z-index: 999;
}

.slide-enter,
.slide-leave-to {
   left: -105%;
}
.slide-enter-active {
    transition: all .5s ease-in-out;
}
.slide-leave-active {
    transition: all .7s ease-in-out;
}
</style>
