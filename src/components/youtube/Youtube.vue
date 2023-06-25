<script>
export default {
    name: 'FigYoutube'
}
</script>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue';
import youtubePlayer from 'youtube-player';
import { getIdFromUrl } from '../../utils/youtube.js';

const props = defineProps({
    videoId: {
        type: String
    },

    url: {
        type: String
    },

    /*
    * @example
    * {
    *    start: 30,
    *    end: 120,
    *    autoplay: 1,
    *    controls: 0,
    *    showinfo: 0,
    * }
    */
    playerVars: {
        type: Object,
        default: () => ({})
    },

    height: {
        type: [Number, String],
        default: 360
    },

    width: {
        type: [Number, String],
        default: 640
    },

    resize: {
        type: Boolean,
        default: false
    },

    resizeDelay: {
        type: Number,
        default: 100
    },

    nocookie: {
        type: Boolean,
        default: false
    },

    fitParent: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['ready', 'playing', 'paused', 'ended', 'buffering', 'cued', 'error']);

const player = ref({});
const resizeTimeout = ref(null);
const el = ref(null);

const UNSTARTED = -1
const ENDED = 0
const PLAYING = 1
const PAUSED = 2
const BUFFERING = 3
const CUED = 5

const events = {
    [UNSTARTED]: 'unstarted',
    [PLAYING]: 'playing',
    [PAUSED]: 'paused',
    [ENDED]: 'ended',
    [BUFFERING]: 'buffering',
    [CUED]: 'cued'
}

const aspectRatio = computed(() => {
    return props.width / props.height;
});

function playerReady(e) {
    emit('ready', e.target);
}

function playerStateChange(e) {
    const state = e.data;
    // console.log('playerStateChange', state, events[state]);

    if (state !== null && state !== UNSTARTED) {
        emit(events[state], e.target);
    }
}

function playerError(e) {
    emit('error', e.target);
}

function updatePlayer(videoId) {
    if (!videoId) {
        player.value.stopVideo();
        return;
    }

    const params = { videoId: videoId };

    if (typeof props.playerVars.start === 'number') {
        params.startSeconds = props.playerVars.start;
    }

    if (typeof props.playerVars.end === 'number') {
        params.endSeconds = props.playerVars.end;
    }

    if (props.playerVars.autoplay === 1) {
        player.value.loadVideoById(params);
        return;
    }

    player.value.cueVideoById(params);
}

async function resizeProportionally() {
    const iframe = await player.value.getIframe();
    const width = props.fitParent ? iframe.parentElement.offsetWidth : iframe.offsetWidth;
    const height = width / aspectRatio.value;

    player.value.setSize(width, height);
}

function onResize() {
    clearTimeout(resizeTimeout.value);
    resizeTimeout.value = setTimeout(
        resizeProportionally,
        props.resizeDelay
    );
}

watch(
    () => props.videoId,
    updatePlayer
);

watch(
    () => props.url,
    (val) => {
        const videoId = getIdFromUrl(val);
        updatePlayer(videoId);
    }
);

watch(
    () => props.resize,
    (val) => {
        if (val) {
            window.addEventListener('resize', onResize);
            resizeProportionally();
        }
        else {
            window.removeEventListener('resize', onResize);
            player.value.setSize(props.width, props.height);
        }
    }
)

watch(
    () => props.width,
    (val) => {
        player.value.setSize(val, props.height);
    }
)

watch(
    () => props.height,
    (val) => {
        player.value.setSize(props.width, val);
    }
)

onMounted(() => {
    window.YTConfig = {
      host: 'https://www.youtube.com/iframe_api'
    }

    const host = props.nocookie ? 'https://www.youtube-nocookie.com' : 'https://www.youtube.com';

    player.value = youtubePlayer(el.value, {
        host,
        width: props.width,
        height: props.height,
        videoId: props.url ? getIdFromUrl(props.url) : props.videoId,
        playerVars: props.playerVars
    });

    player.value.on('ready', playerReady);
    player.value.on('stateChange', playerStateChange);
    player.value.on('error', playerError);

    if (props.resize) {
        window.addEventListener('resize', onResize);
    }

    if (props.fitParent) {
        resizeProportionally();
    }
});

onBeforeUnmount(() => {
    if (player.value !== null && player.value.destroy) {
        player.value.destroy();
        delete player.value;
    }

    if (props.resize) {
        window.removeEventListener('resize', onResize);
    }
});
</script>


<template>
    <div ref="el"></div>
</template>
