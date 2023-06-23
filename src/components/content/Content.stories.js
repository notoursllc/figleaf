import { FigContent } from '../../../index.js';
import { contentSizes } from './constants';

export default {
    title: 'Components/Content',
    component: FigContent,
    argTypes: {
        size: {
            control: {
                type: 'select',
                options: Object.keys(contentSizes)
            }
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigContent
    },
    setup() {
        return { args };
    },
    template: `
        <fig-content v-bind="args">
            <div class="p-8 border border-gray-500">fig-content is wrapping this element</div>
        </fig-content>
    `
});

export const Content = Template.bind({});
Content.args = {
    size: contentSizes.xl
};

