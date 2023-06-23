<script>
export default {
    name: 'CartCtaLayout'
}
</script>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    rightFirstOnBreak: {
        type: Boolean
    }
});

const parentClasses = computed(() => {
    const classes = ['flex lg:flex-row items-start items-stretch mx-auto'];

    classes.push(
        props.rightFirstOnBreak ? 'flex-col-reverse' : 'flex-col'
    );

    return classes;
});

const rightClasses = computed(() => {
    const classes = ['shrink-0 align-top w-full lg:w-1/3'];

    classes.push(
        props.rightFirstOnBreak ? 'pb-4 lg:pb-0' : 'pb-0'
    );

    return classes;
});
</script>


<template>
    <section class="container mx-auto">
        <div :class="parentClasses">
            <div class="grow pr-0 pb-4 lg:pr-4 lg:pb-0 align-top w-full lg:w-2/3"><slot name="left"></slot></div>
            <div :class="rightClasses"><slot name="right"></slot></div>
        </div>
    </section>
</template>
