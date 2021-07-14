<script>
export default {
    props: {
        nopad: {
            type: Boolean
        },

        fullHeight: {
            type: Boolean
        }
    },

    computed: {
        classNames() {
            const classes = ['fig-content'];

            if(!this.nopad) {
                classes.push('px-2');
            }
            if(this.fullHeight) {
                classes.push('h-full');
            }

            return classes;
        }
    }
};
</script>

<template>
    <div :class="classNames"><slot /></div>
</template>


<style scoped>
.fig-content {
    @apply relative;
    max-width: 1586px;
    margin: 0 auto;
}
</style>
