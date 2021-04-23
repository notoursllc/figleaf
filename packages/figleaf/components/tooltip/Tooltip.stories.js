import FigTooltip from './Tooltip';
import { tooltipPlacements } from './constants';

export default {
    title: 'Components/Tooltip',

    component: FigTooltip,

    argTypes: {
        placement: {
            control: {
                type: 'select',
                options: Object.keys(tooltipPlacements)
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
