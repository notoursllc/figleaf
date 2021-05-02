import FigFormSelectCountry from './FormSelectCountry.vue';

export default {
    title: 'Components/Form/SelectCountry',

    component: FigFormSelectCountry,

    argTypes: {

    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigFormSelectCountry
    },
    data: function() {
        return {
            selected: null
        };
    },
    template: `
        <div>
            <div>Selected: {{ selected }}</div>
            <fig-form-select-country v-bind="$props" v-model="selected" />
        </div>
    `
});

export const SelectCountry = Template.bind({});
SelectCountry.args = {
};
