import FigSizeButtons from './SizeButtons.vue';

export default {
    title: 'Components/SizeButtons',

    component: FigSizeButtons,

    argTypes: {

    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigSizeButtons
    },
    data: () => {
        return {
            selected: {}
        };
    },
    methods: {

    },
    template: `
        <div>
            <fig-size-buttons v-model="selected" v-bind="$props" />
            <div class="mt-4">SELECTED: {{ selected }}</div>
        </div>`
});

export const SizeButtons = Template.bind({});
SizeButtons.args = {
    skus: [
        { label: 'XS', inventory_count: 1, visible_if_no_inventory: true, disabled: false, id: 1 },
        { label: 'S', inventory_count: 1, visible_if_no_inventory: true, disabled: false, id: 2 },
        { label: 'M', inventory_count: 1, visible_if_no_inventory: true, disabled: false, id: 3 },
        { label: 'L', inventory_count: 1, visible_if_no_inventory: true, disabled: false, id: 4 },
        { label: 'XL', inventory_count: 0, visible_if_no_inventory: true, disabled: false, id: 5 },
        { label: 'XXL', inventory_count: 0, visible_if_no_inventory: false, disabled: false, id: 6 }
    ]
};

