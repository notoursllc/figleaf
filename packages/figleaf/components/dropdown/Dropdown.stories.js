import FigDropdown from './Dropdown.vue';
import FigDropdownButton from './DropdownButton.vue';
import FigDropdownDivider from './DropdownDivider.vue';

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
    methods: {

    },
    template: `
        <fig-dropdown v-bind="$props">
            <template v-slot:toggler>Click me</template>
            <fig-dropdown-button>One</fig-dropdown-button>
            <fig-dropdown-button>Two</fig-dropdown-button>
            <fig-dropdown-divider />
            <fig-dropdown-button>Three</fig-dropdown-button>
        </fig-dropdown>
    `
});

export const Dropdown = Template.bind({});
Dropdown.args = {};

