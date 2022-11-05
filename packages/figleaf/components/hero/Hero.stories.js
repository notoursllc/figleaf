import { FigHero } from '../../index.js';

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
    data() {
        return {
            imageClass: 'w375'
        }
    },
    computed: {
        imageUrl() {
            return this.url
                ? `${this.url}?class=${this.imageClass}`
                : '';
        }
    },
    methods: {
        onResize(e) {
            console.log('resize', e);

            if(e.offsetWidth <= 640) {
                this.imageClass = 'w375';
            }
            else if(e.offsetWidth <= 768) {
                this.imageClass = 'w550';
            }
            else {
                this.imageClass = 'w1280';
            }
        }
    },
    template: `
        <fig-hero
            v-bind="$props"
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
Hero.args = {
    url: 'https://bv-pullzone-1.b-cdn.net/dev/images/1667323451683-herotest.jpg'
};

