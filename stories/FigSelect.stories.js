import FigSelect from '../packages/figleaf/components/select/FigSelect';
import FigIconSprite from '../packages/figleaf/components/icon/FigIconSprite';

export default {
    title: 'Components/Select',
    component: FigSelect,
    argTypes: {
        options: {
            description: 'overwritten description',
            defaultValue: ['Canada', 'United States'],
            // table: {
            //     type: {
            //         summary: 'something short',
            //         detail: 'something really really long'
            //     }
            // },
            control: {
                type: 'array'
            }
        }
    }
};


const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigIconSprite,
        FigSelect
    },
    template: `
        <div>
            <fig-icon-sprite />
            <fig-select v-bind="$props" />
        </div>
    `
});


export const Demo = Template.bind({});
Demo.args = {};
