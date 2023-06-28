import { FigHorizontalSlider } from '../../../index.js';
import { horizontalSliderScrollBehaviors, horizontalSliderSnapPositions } from './constants.js';

export default {
    title: 'Components/HorizontalSlider',
    component: FigHorizontalSlider,
    argTypes: {
        snap: {
            control: {
                type: 'select',
            },
            options: Object.values(horizontalSliderSnapPositions),
            table: {
                defaultValue: { 
                    summary: horizontalSliderSnapPositions.start 
                }
            }
        },

        scrollBehavior: {
            control: {
                type: 'select',
            },
            options: Object.values(horizontalSliderScrollBehaviors),
            table: {
                defaultValue: { 
                    summary: horizontalSliderScrollBehaviors.smooth 
                }
            }
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigHorizontalSlider
    },
    setup() {
        return { args };
    },
    template: `
        <fig-horizontal-slider v-bind="args" style="width:800px">
            <div 
                v-for="i in [0,1,2,3,4,5,6,7,8,9]" 
                :key="i"
                class="block border border-red-500 mr-6 whitespace-nowrap" 
                style="width:550px">
                <h4>Slide {{ i }}</h4>
                <p>slide {{ i }} content</p>
            </div>
        </fig-horizontal-slider>
    `
});

export const HorizontalSlider = Template.bind({});
HorizontalSlider.args = {
};

