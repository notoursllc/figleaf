import { ref } from 'vue';
import {
    FigDropdown,
    FigDropdownButton,
    FigDropdownDivider
 } from '../../../index.js';

export default {
    title: 'Components/Dropdown',
    component: FigDropdown,
    argTypes: {
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigDropdown,
        FigDropdownButton,
        FigDropdownDivider
    },
    setup() {
        const selected = ref(null);

        function onSelected(value) {
            selected.value = value;
        }

        return {
            args,
            onSelected,
            selected
        };
    },
    template: `
        <div>
            <fig-dropdown v-bind="args" @selected="onSelected">
                <template v-slot:toggler>Click me</template>
                <fig-dropdown-button value="item1">One</fig-dropdown-button>
                <fig-dropdown-button>Two</fig-dropdown-button>
                <fig-dropdown-divider />
                <fig-dropdown-button value="item3">Three</fig-dropdown-button>
            </fig-dropdown>

            <div class="mt-4">Selected: {{ selected }}</div>
        </div>
    `
});

export const Dropdown = Template.bind({});
Dropdown.args = {};

