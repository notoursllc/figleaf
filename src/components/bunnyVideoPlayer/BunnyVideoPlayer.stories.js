import { FigBunnyVideoPlayer } from '../../../index.js';

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
    setup() {
        return {
            args
        }
    },
    template: `
        <fig-bunny-video-player v-bind="args" />
    `
});

export const BunnyVideoPlayer = Template.bind({});
BunnyVideoPlayer.args = {
    videoLibraryId: 65161,
    videoId: '4bbdbcf2-b6ff-4148-9bbc-99ed39487ef1',
    preload: false,
    muted: false,
    responsive: true,
};

