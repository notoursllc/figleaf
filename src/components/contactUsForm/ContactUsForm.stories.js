import { ref } from 'vue';
import { FigContactUsForm } from '../../../index.js';

export default {
    title: 'Components/ContactUsForm',
    component: FigContactUsForm,
    argTypes: {

    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigContactUsForm
    },
    setup() {
        const formData = ref(null);

        function onSubmit(data) {
            formData.value = data;
        }

        return {
            args,
            formData,
            onSubmit
        };
    },
    template: `
        <div>
            <fig-contact-us-form
                @submit="onSubmit" />

            <div class="pt-10">
                <div>Form data:</div>
                <pre>{{ formData }}</pre>
            </div>
        </div>
    `
});

export const ContactUsForm = Template.bind({});
ContactUsForm.args = {
};

