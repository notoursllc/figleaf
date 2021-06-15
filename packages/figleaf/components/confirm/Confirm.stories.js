import FigConfirm from './index';
import FigButton from '../button/Button';
import { confirmSizes } from './constants';

export default {
    title: 'Components/Confirm',

    argTypes: {
        size: {
            control: {
                type: 'select',
                options: Object.keys(confirmSizes)
            }
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigButton
    },
    created() {
        FigConfirm();
    },
    methods: {
        showConfirm() {
            return this.$figleaf.confirm(
                'my confirm message',
                {
                    size: this.$props.size
                }
            );
        }
    },
    template: `
        <div>
            <fig-button @click="showConfirm()">Show</fig-button>
        </div>
    `
});

export const ConfirmAtc = Template.bind({});
ConfirmAtc.args = {
    size: confirmSizes.sm
};

