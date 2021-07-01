import FigSlideover from './Slideover.vue';
import FigButton from '../button/Button.vue';

export default {
    title: 'Components/Slideover',

    component: FigSlideover,

    argTypes: {
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigSlideover,
        FigButton
    },
    data() {
        return {
            opened: false
        };
    },
    methods: {
        onClose() {
            this.opened = false;
        },
        toggle() {
            this.opened = !this.opened;
        }
    },
    template: `
        <div>
            <fig-slideover
                :open="opened"
                @close="onClose"
                v-bind="$props"
                class="bg-gray-800">
                <div>slideover content slot</div>
                <div slot="footer">footer slot</div>
            </fig-slideover>

            <fig-button @click="toggle">Toggle</fig-button>
        </div>
    `
});

export const Slideover = Template.bind({});
Slideover.args = {};
