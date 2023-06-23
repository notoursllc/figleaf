import { FigYouTube } from '../../../index.js';

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
    setup() {
        function onReady(target) {
            console.log('onReady', target);
        }

        function onPlaying(target) {
            console.log('onPlaying', target);
        }

        function onPaused(target) {
            console.log('onPaused', target);
        }

        function onEnded(target) {
            console.log('onEnded', target);
        }

        function onBuffering(target) {
            console.log('onBuffering', target);
        }

        function onCued(target) {
            console.log('onCued', target);
        }

        function onError(target) {
            console.log('onError', target);
        }

        return {
            onReady,
            onPlaying,
            onPaused,
            onEnded,
            onBuffering,
            onCued,
            onError,
            args
        };
    },
    template: `
        <fig-you-tube
            @ready="onReady"
            @playing="onPlaying"
            @paused="onPaused"
            @ended="onEnded"
            @buffering="onBuffering"
            @cued="onCued"
            @error="onError"
            v-bind="args" />
    `
});

export const YouTube = Template.bind({});
YouTube.args = {
    // videoId: 'dQw4w9WgXcQ',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
};

