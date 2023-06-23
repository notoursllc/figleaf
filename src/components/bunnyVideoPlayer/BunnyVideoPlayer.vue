<script>
export default {
    name: 'BunnyVideoPlayer'
}
</script>

<script setup>
import { computed } from 'vue';

const props = defineProps({
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
});

const containerStyle = computed(() => {
    return props.responsive ? 'position: relative; padding-top: 56.33802816901409%;' : ''
});
</script>


<template>
    <div :style="containerStyle">
        <iframe
            :src="`https://iframe.mediadelivery.net/embed/${props.videoLibraryId}/${props.videoId}?autoplay=${props.autoplay}&preload=${props.preload}&loop=${props.loop}&muted=${props.muted}&captions=${props.captions}`"
            :loading="props.loading"
            style="border: none; position: absolute; top: 0; height: 100%; width: 100%;"
            :allow="props.allow"
            :allowfullscreen="props.allowFullScreen"></iframe>
    </div>
</template>

