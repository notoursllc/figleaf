import toastPlugin from './index';
import FigToast from './Toaster.vue';
import FigButton from '../button/Button';

export default {
    title: 'Components/Toast',

    component: FigToast,

    argTypes: {
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigButton
    },
    created() {
        toastPlugin();
    },
    methods: {
        successToast() {
            return this.$successToast({
                variant: 'success',
                title: 'Title goes here',
                text: 'Text body goes here',
                closable: true,
                timeout: 0
            });
        },
        errorToast() {
            return this.$errorToast({
                variant: 'error',
                title: 'Title goes here',
                text: 'Text body goes here',
                closable: true,
                timeout: 0
            });
        },
        infoToast() {
            return this.$toast({
                variant: 'info',
                title: 'Title goes here',
                text: 'Text body goes here',
                closable: true,
                timeout: 0
            });
        },
        clearToasts() {
            this.$clearToasts();
        }
    },
    template: `
        <div>
            <fig-toaster v-bind="$props" />
            <div class="mb-2"><fig-button @click="successToast()">Success toast</fig-button></div>
            <div class="mb-2"><fig-button @click="errorToast()">Error toast</fig-button></div>
            <div class="mb-2"><fig-button @click="infoToast()">Info toast</fig-button></div>
            <div class="mb-2"><fig-button @click="clearToasts()">Clear all toasts</fig-button></div>
        </div>
    `
});

export const Toast = Template.bind({});
Toast.args = {
    maxNotifications: 5
};

