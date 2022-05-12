<script>
/**
 * A simple wrapper for
 * https://www.npmjs.com/package/vue-youtube
 *
 * Additional props that can be passed in:
 * https://www.npmjs.com/package/vue-youtube#props
 */
import { Youtube, getIdFromUrl } from 'vue-youtube';

export default {
    name: 'FigYouTube',

    inheritAttrs: false,

    props: {
        url: {
            type: String
        },

        autoplay: {
            type: Boolean,
            default: false
        }
    },

    components: {
        Youtube
    },

    data() {
        return {
            videoId: null
        }
    },

    computed: {
        playerVars() {
            return {
                autoplay: this.autoplay ? 1 : 0
            }
        }
    },

    methods: {
        playVideo() {
            this.$refs.youtube.player.playVideo()
        },

        onPlaying() {
            this.$emit('playing');
        }
    },

    watch: {
        url: {
            handler: function(newVal) {
                this.videoId = getIdFromUrl(newVal);
            },
            immediate: true
        }
    }
};
</script>


<template>
    <youtube
        v-bind="$attrs"
        :video-id="videoId"
        :player-vars="playerVars"
        @playing="onPlaying"
        ref="youtube"></youtube>
</template>
