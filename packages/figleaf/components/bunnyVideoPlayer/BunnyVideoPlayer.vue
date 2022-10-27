<script>
export default {
    name: 'BunnyVideoPlayer',

    props: {
        videoLibraryId: {
            type: [String, Number],
            default: null
        },

        videoId: {
            type: String,
            default: null
        },

        responsive: {
            type: Boolean,
            default: true
        },

        loading: {
            type: String,
            default: 'lazy'
        },

        autoplay: {
            type: Boolean,
            default: false
        },

        preload: {
            type: Boolean,
            default: false
        },

        loop: {
            type: Boolean,
            default: false
        },

        muted: {
            type: Boolean,
            default: false
        },

        captions: {
            type: Boolean,
            default: false
        },

        allow: {
            type: String,
            default: 'autoplay; encrypted-media; picture-in-picture;' // accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;
        },

        allowFullScreen: {
            type: Boolean,
            default: true
        }
    },

    computed: {
        containerStyle() {
            return this.responsive ? 'position: relative; padding-top: 56.33802816901409%;' : ''
        }
    }
};
</script>


<template>
    <div :style="containerStyle">
        <iframe
            :src="`https://iframe.mediadelivery.net/embed/${videoLibraryId}/${videoId}?autoplay=${autoplay}&preload=${preload}&loop=${loop}&muted=${muted}&captions=${captions}`"
            :loading="loading"
            style="border: none; position: absolute; top: 0; height: 100%; width: 100%;"
            :allow="allow"
            :allowfullscreen="allowFullScreen"></iframe>
    </div>
</template>

