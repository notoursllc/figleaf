import FigOperationsDropdown from './OperationsDropdown.vue';
import { buttonSizes } from '../button/constants';

export default {
    title: 'Components/OperationsDropdown',

    component: FigOperationsDropdown,

    argTypes: {
        size: {
            control: {
                type: 'select',
                options: Object.keys(buttonSizes)
            }
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigOperationsDropdown
    },
    methods: {
        onDelete() {
            console.log('delete');
        },
        onEdit() {
            console.log('edit');
        },
        onView() {
            console.log('view');
        }
    },
    template: ` <fig-operations-dropdown @delete="onDelete" @edit="onEdit" @view="onView" v-bind="$props" />`
});

export const OperationsDropdown = Template.bind({});
OperationsDropdown.args = {
    size: buttonSizes.sm
};
