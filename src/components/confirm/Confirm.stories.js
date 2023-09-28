import { ref } from 'vue';
import { FigConfirm, FigUseConfirm } from '../../../index.js';
import { confirmSizes } from './constants';

export default {
    title: 'Components/Confirm',
    component: FigConfirm,
    argTypes: {
        size: {
            control: { type: 'select' },
            options: Object.keys(confirmSizes)
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
        const { showConfirm } = FigUseConfirm();
        const isAccepted = ref(false);

        async function onShowConfirm() {
            try {
                await showConfirm(
                    "Are you sure?",
                    {
                        size: args.size || confirmSizes.md,
                        title: 'Test title'
                    }
                );

                isAccepted.value = true;
            }
            catch(e) {
                isAccepted.value = false;
            }
        };

        return {
            args,
            onShowConfirm,
            isAccepted
        };
    },
    template: `
        <div>
            <button @click="onShowConfirm" class="bg-gray-100 p-2">Show confirm</button>

            <div class="mt-4">
                Confirm is accepted: {{ isAccepted ? 'true' : 'false' }}
            </div>
        </div>
    `
});

export const Confirm = Template.bind({});
Confirm.args = {
    size: confirmSizes.sm
};

