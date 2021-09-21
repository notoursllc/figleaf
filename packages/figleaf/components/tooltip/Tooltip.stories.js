import FigTooltip from './Tooltip';
import { tooltipPlacements, tooltipTriggers } from './constants';

export default {
    title: 'Components/Tooltip',

    component: FigTooltip,

    argTypes: {
        placement: {
            control: {
                type: 'select',
                options: Object.keys(tooltipPlacements)
            }
        },

        triggers: {
            control: {
                type: 'select',
                options: [
                    tooltipTriggers.hover,
                    tooltipTriggers.click,
                    [tooltipTriggers.hover, tooltipTriggers.click]
                ]
            }
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigTooltip
    },
    template: `
        <fig-tooltip v-bind="$props">
            <template slot="toggler">Hover over me</template>
            I am the tooltip content
        </fig-tooltip>`
});

export const Tooltip = Template.bind({});
// LeftIcon.storyName = 'icon on the left';
Tooltip.args = {
    placement: tooltipPlacements.top
};
