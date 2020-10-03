import NButton from '../packages/figleaf/components/button/NButton';

export default {
    title: 'Components/Button',
    component: NButton,
    argTypes: {
        size: {
            control: {
                type: 'select',
                options: ['sm', 'md', 'lg']
            }
        },
        variant: {
            control: {
                type: 'select',
                options: ['primary', 'primary-outline', 'success', 'success-outline', 'danger', 'danger-outline', 'plain-outline', 'ghost']
            }
        },
        type: {
            control: {
                type: 'select',
                options: ['button', 'submit', 'reset']
            }
        },
        isDisabled: {
            control: {
                type: 'boolean'
            }
        }
    }
};


const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        NButton
    },
    template: '<n-button v-bind="$props">{{ $props.label }}</n-button>'
});


export const Demo = Template.bind({});
Demo.args = {
    label: 'Button',
    variant: 'primary',
    size: 'md'
};
