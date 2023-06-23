import { ref } from 'vue';
import {
    FigPopConfirm,
    FigPopoverContent,
    FigButton
} from '../../../index.js';


export default {
    title: 'Components/PopConfirm',
    component: FigPopConfirm,
    argTypes: {
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigPopConfirm,
        FigPopoverContent,
        FigButton
    },
    setup() {
        const action = ref(null);

        function onConfirm() {
            action.value = 'confirmed'
        }

        function onCancel() {
            action.value = 'cancelled'
        }

        return {
            args,
            action,
            onConfirm,
            onCancel
        };
    },
    template: `
        <div>
            <fig-pop-confirm
                v-bind="args"
                @cancel="onCancel"
                @confirm="onConfirm">
                <template v-slot:reference>
                    <fig-button>Click me</fig-button>
                </template>
                Are you sure you want to do this?
            </fig-pop-confirm>

            <div class="mt-4">Action: {{ action }}</div>
        </div>
    `
});

export const PopConfirm = Template.bind({});
PopConfirm.args = {
};

