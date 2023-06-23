<script>
export default {
    props: {

    },

    data() {
        return {
        }
    },
}
</script>


<template>
    <table>
        <thead>
            <slot name="thead" />
        </thead>

        <tbody>
            <slot name="tbody" />
        </tbody>
    </table>
</template>
