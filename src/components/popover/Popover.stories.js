import {
    FigPopover,
    FigPopoverDivider,
    FigPopoverContent
 } from '../../../index.js';
 import {
    popoverPlacements
} from './constants';

export default {
    title: 'Components/Popover',
    component: FigPopover,
    argTypes: {
        placement: {
            control: {
                type: 'select',
                options: Object.keys(popoverPlacements)
            },
            table: {
                defaultValue: {
                    summary: popoverPlacements['bottom-start']
                }
            }
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigPopover,
        FigPopoverDivider,
        FigPopoverContent
    },
    setup() {
        return {
            args
        };
    },
    template: `
        <div>
            <fig-popover v-bind="args">
                <template v-slot:toggler>Click me</template>
                <template v-slot:header>Header slot</template>
                <fig-popover-content>
                    <div class="px-2">I am the popover content</div>
                    <fig-popover-divider />
                    <div class="px-2">Below the divider</div>
                </fig-popover-content>
                <template v-slot:footer>Footer slot</template>
            </fig-popover>
        </div>
    `
});

export const Popover = Template.bind({});
Popover.args = {
    placement: popoverPlacements['bottom-start']
};
