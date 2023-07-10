import { 
    FigToaster, 
    FigUseToaster, 
    FigButton 
} from '../../../index.js';


export default {
    title: 'Components/Toaster',
    component: FigToaster,
    argTypes: {
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigToaster,
        FigButton
    },
    setup() {
        const {
            showToast,
            showSuccessToast,
            showErrorToast,
            clearToasts
        } = FigUseToaster();

        function successToast() {
            showSuccessToast({
                title: 'Success',
                text: 'This is a success toast',
                // timeout: 100000
            });
        }

        function errorToast() {
            showErrorToast({
                title: 'Error',
                text: 'This is an error toast',
                // timeout: 100000
            });
        }

        function infoToast() {
            showToast({
                title: 'Info',
                text: 'This is an info toast',
                // timeout: 100000
            });
        }

        return {
            successToast,
            errorToast,
            infoToast,
            clearToasts,
            args
        };
    },
    template: `
        <div class="flex gap-2">
            <fig-button variant="success" @click="successToast">Show success toast</fig-button>
            <fig-button variant="danger" @click="errorToast">Show error toast</fig-button>
            <fig-button variant="primary" @click="infoToast">Show info toast</fig-button>
            <fig-button variant="plain" @click="clearToasts">Clear all toasts</fig-button>
        </div>
    `
});

export const Toast = Template.bind({});
Toast.args = {
};
