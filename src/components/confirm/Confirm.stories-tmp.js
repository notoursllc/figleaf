import { ref } from 'vue';
import FigConfirm from './index';
import useConfirm from './useConfirm.js';
import { confirmSizes } from './constants';

export default {
    title: 'Components/Confirm',
    component: FigConfirm,
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
    setup() {
        const $figConfirm = useConfirm();
        const isAccepted = ref(false);

        async function showConfirm() {
            try {
                await $figConfirm.show(
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
            showConfirm,
            isAccepted
        };
    },
    template: `
        <div>
            <a @click="showConfirm()">Show</a>

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

