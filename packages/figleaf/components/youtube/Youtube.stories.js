import FigYouTube from './Youtube.vue';


export default {
    title: 'Components/YouTube',

    component: FigYouTube,

    argTypes: {

    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigYouTube
    },
    methods: {
        onPlaying() {
            console.log("ON PLAYING")
        }
    },
    template: `
        <fig-you-tube v-bind="$props" @playing="onPlaying" />
    `
});

export const YouTube = Template.bind({});
YouTube.storyName = 'YouTube';
YouTube.args = {
    url: 'https://www.youtube.com/watch?v=x-HDK92PNhE',
    autoplay: false,
    fitParent: false
};

