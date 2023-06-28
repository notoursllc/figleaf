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
            <div class="block border border-red-500 mr-6 whitespace-nowrap" style="width:550px">
                <h4>Don't have to be the same tag</h4>
                <p>I used a h4 instead of a h3</p>
            </div>

            <div class="block border border-red-500 mr-6 whitespace-nowrap" style="width:550px">
                <h3>Navigation Button</h3>
                <p>The navigation button will appear if there is an overflow.</p>
            </div>

            <div class="block border border-red-500 mr-6 whitespace-nowrap" style="width:550px">
                <h3>Scroll1</h3>
                <p>You can just trackpad to scroll still!</p>
            </div>

            <div class="block border border-red-500 mr-6 whitespace-nowrap" style="width:550px">
                <h3>Scroll2</h3>
                <p>You can just trackpad to scroll still!</p>
            </div>

            <div class="block border border-red-500 mr-6 whitespace-nowrap" style="width:550px">
                <h3>Scroll3</h3>
                <p>You can just trackpad to scroll still!</p>
            </div>

            <div class="block border border-red-500 mr-6 whitespace-nowrap" style="width:550px">
                <h3>Scroll4</h3>
                <p>You can just trackpad to scroll still!</p>
            </div>

            <div class="block border border-red-500 mr-6 whitespace-nowrap" style="width:550px">
                <h3>Scroll5</h3>
                <p>You can just trackpad to scroll still!</p>
            </div>

            <div class="block border border-red-500 mr-6 whitespace-nowrap" style="width:550px">
                <h3>Scroll6</h3>
                <p>You can just trackpad to scroll still!</p>
            </div>

            <div class="block border border-red-500 mr-6 whitespace-nowrap" style="width:550px">
                <h3>Scroll7</h3>
                <p>You can just trackpad to scroll still!</p>
            </div>

            <div class="block border border-red-500 mr-6 whitespace-nowrap" style="width:550px">
                <h3>Scroll8</h3>
                <p>You can just trackpad to scroll still!</p>
            </div>
        </fig-horizontal-slider>
    `
});

export const HorizontalSlider = Template.bind({});
HorizontalSlider.args = {
};

