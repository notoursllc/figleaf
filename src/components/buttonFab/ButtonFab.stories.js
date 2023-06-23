import { FigButtonFab } from '../../../index.js';

export default {
    title: 'Components/Fab Button',
    component: FigButtonFab,
    argTypes: {
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigButtonFab
    },
    setup() {
        function onClick() {
            console.log('click');
        }

        return {
            args,
            onClick
        };
    },
    template: `
        <fig-button-fab
            v-bind="args"
            @click="onClick" />
    `
});

export const FabButton = Template.bind({});
FabButton.args = {
    icon: 'plus',
};
