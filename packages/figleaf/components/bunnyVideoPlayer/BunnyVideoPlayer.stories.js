import FigBunnyVideoPlayer from './BunnyVideoPlayer.vue';

export default {
    title: 'Components/BunnyVideoPlayer',

    component: FigBunnyVideoPlayer,

    argTypes: {

    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigBunnyVideoPlayer
    },
    data: () => {
        return {
        };
    },
    template: `
        <fig-bunny-video-player v-bind="$props" />
    `
});

export const BunnyVideoPlayer = Template.bind({});
BunnyVideoPlayer.storyName = 'Bunny video player';
BunnyVideoPlayer.args = {
    videoLibraryId: 65161,
    videoId: '9a899ccb-04e2-4fb3-a41e-6783304a6243',
    preload: false,
    muted: false,
    responsive: true,
};

