import FigJsonTreeView from './JsonTreeView.vue';

export default {
    title: 'Components/JsonTreeView',

    component: FigJsonTreeView,

    argTypes: {
        raw: {
            control: {
                type: 'text'
            }
        },

        data: {
            control: {
                type: 'object'
            }
        },

        level: {
            control: {
                type: 'number'
            }
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigJsonTreeView
    },
    template: '<fig-json-tree-view v-bind="$props" />'
});

export const JsonTreeView = Template.bind({});
JsonTreeView.args = {
    data: {
        employee: {
            name: 'greg',
            salary: 56000,
            married: true,
            pet: {
                type: 'dog',
                name: 'Tony',
                age: 7,
                colors: ['white', 'tan']
            }
        }
    }
};

