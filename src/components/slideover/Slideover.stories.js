import { ref } from 'vue';
import { FigSlideover } from '../../../index.js';

export default {
    title: 'Components/SlideOver',
    component: FigSlideover,
    argTypes: {

    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigSlideover
    },
    setup() {
        const isOpen = ref(false);

        function onClose() {
            console.log('onClose');
            isOpen.value = false;
        }

        function toggle() {
            isOpen.value = !isOpen.value;
        }

        return {
            isOpen,
            onClose,
            toggle,
            args
        };
    },
    template: `
        <div>
            <fig-slideover
                @close="onClose"
                :opened="isOpen"
                v-bind="args"
                class="bg-gray-800 text-white">
                Slideover content
                <template v-slot:footer>slideover footer</template>
            </fig-slideover>

            <div class="mt-10">
                <button @click="toggle">toggle sidebar</button>
            </div>
        </div>
    `
});

export const Slideover = Template.bind({});
Slideover.args = {

};

