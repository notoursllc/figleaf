
<script>
export default {
    name: 'CartCtaLayout',

    props: {
        shadow: {
            type: Boolean
        }
    },

    computed: {

    }
};
</script>


<template>
    <section class="container mx-auto">
        <div class="flex flex-col md:flex-row items-start items-stretch mx-auto">
            <div class="flex-grow md:pr-8 align-top w-full md:w-2/3"><slot name="left"></slot></div>
            <div class="flex-shrink-0 align-top w-full md:w-1/3"><slot name="right"></slot></div>
        </div>
    </section>
</template>
