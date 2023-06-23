<script>
export default {
    name: 'DataTableCell',

    props: {
        data: {
            type: Object,
        }
    }
}
</script>


<template>
    <td>cell slot <slot /></td>
</template>


<style>

</style>
