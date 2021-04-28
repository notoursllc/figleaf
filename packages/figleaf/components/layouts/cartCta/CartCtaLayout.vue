
<script>
export default {
    name: 'CartCtaLayout',

    props: {
        rightFirstOnBreak: {
            type: Boolean
        }
    },

    computed: {
        parentClasses() {
            const classes = ['flex lg:flex-row items-start items-stretch mx-auto'];

            classes.push(
                this.rightFirstOnBreak ? 'flex-col-reverse' : 'flex-col'
            );

            return classes;
        },

        rightClasses() {
            const classes = ['flex-shrink-0 align-top w-full lg:w-1/3'];

            classes.push(
                this.rightFirstOnBreak ? 'pb-4 lg:pb-0' : 'pb-0'
            );

            return classes;
        }
    }
};
</script>


<template>
    <section class="container mx-auto">
        <div :class="parentClasses">
            <div class="flex-grow pr-0 pb-4 lg:pr-4 lg:pb-0 align-top w-full lg:w-2/3"><slot name="left"></slot></div>
            <div :class="rightClasses"><slot name="right"></slot></div>
        </div>
    </section>
</template>
