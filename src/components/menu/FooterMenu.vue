<template>
<q-tabs inline-label class="text-white shadow-2">
    <q-tab name="home" icon="home" />
    <q-tab name="calendar" icon="today" />
    <span class="flex flex-center"> 
        <q-btn class="button-center" color="secondary" round icon="add" />
    </span>
    <q-tab name="search" icon="search" />
    <q-tab name="favorite" icon="favorite" />
</q-tabs>
</template>

<script>
export default {
    name: 'FooterMenu'
}
</script>
<style scoped>
.button-center{
    position: absolute;
    transform: translate(0, -55%);
}
</style>