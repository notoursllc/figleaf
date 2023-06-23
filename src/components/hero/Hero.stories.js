import { ref, computed } from 'vue';
import {
    FigHero,
} from '../../../index.js';

export default {
    title: 'Components/Hero',
    component: FigHero,
    argTypes: {
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigHero
    },
    setup() {
        const imageClass = ref('w375');

        function onResize(e) {
            if(e.offsetWidth <= 640) {
                imageClass.value = 'w375';
            }
            else if(e.offsetWidth <= 768) {
                imageClass.value = 'w550';
            }
            else {
                imageClass.value = 'w1280';
            }
        }

        const imageUrl = computed(() => {
            return args.url
                ? `${args.url}?class=${imageClass.value}`
                : '';
        });

        return {
            imageUrl,
            onResize,
            args,
        };
    },
    template: `
        <fig-hero
            v-bind="args"
            :url="imageUrl"
            @resize="onResize">

            <div class="w-full h-full p-4 md:pl-40 flex items-center">
                <div class="inline-block">
                    <h1 class="bg-black bg-opacity-50 p-2 mb-4 text-3xl sm:text-4xl inline-block text-amber-500 m-0 font-extrabold">
                        This is the hero title
                    </h1>

                    <div class="bg-black bg-opacity-50 p-2 w-full md:w-1/2 lg:w-2/5 xl:1/3 text-lg sm:text-xl text-white font-extrabold">
                        This is the hero caption
                    </div>
                </div>
            </div>
        </fig-hero>
    `
});

export const Hero = Template.bind({});
Hero.args = {};
