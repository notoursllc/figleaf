import { ref } from 'vue';
import {
    FigOperationsDropdown,
    FigDropdownButton
} from '../../../index.js';
import { buttonSizes } from '../button/constants.js';

export default {
    title: 'Components/OperationsDropdown',
    component: FigOperationsDropdown,
    argTypes: {
        size: {
            control: { type: 'select' },
            options: Object.keys(buttonSizes)
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigOperationsDropdown,
        FigDropdownButton
    },
    setup() {
        const selected = ref(null);

        function onSelected(value) {
            selected.value = value;
        }

        return {
            args,
            onSelected,
            selected,
        }
    },
    template: `
        <div>
            <fig-operations-dropdown
                @selected="onSelected"
                v-bind="args" />

            <div class="mt-4">Selected: {{ selected }}</div>
        </div>
    `
});

export const OperationsDropdown = Template.bind({});
OperationsDropdown.args = {
    size: buttonSizes.sm
};


///////////


const Template2 = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigOperationsDropdown,
        FigDropdownButton
    },
    setup() {
        const selected = ref(null);

        function onSelected(value) {
            console.log('selected', value);
            selected.value = value;
        }

        function onView() {
            console.log('view');
        }

        function onEdit() {
            console.log('edit');
        }

        function onDelete() {
            console.log('delete');
        }

        return {
            args,
            onSelected,
            onView,
            onEdit,
            onDelete,
            selected,
        }
    },
    template: `
        <div>
            <fig-operations-dropdown
                @selected="onSelected"
                @view="onView"
                @edit="onEdit"
                @delete="onDelete"
                v-bind="args">
                <fig-dropdown-button value='custom1'>Custom option 1</fig-dropdown-button>
                <fig-dropdown-button value='custom2'>Custom option 2</fig-dropdown-button>
            </fig-operations-dropdown>

            <div class="mt-4">Selected: {{ selected }}</div>
        </div>
    `
});

export const CustomOptions = Template2.bind({});
CustomOptions.args = {
};
