<script>
export default {
    name: 'TabPanel',

    props: {
        header: null,
        disabled: Boolean
    },

    data() {
        return {}
    }
}
</script>


<template>
    <div><slot></slot></div>
</template>
