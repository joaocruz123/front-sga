<template>
<q-tabs inline-label class="text-white shadow-2">
    <q-tab name="home" icon="home" @click="alterTab('home')"/>
    <q-tab name="calendar" icon="today" @click="alterTab('calendar')"/>
    <span class="flex flex-center"> 
        <q-btn class="button-center" color="secondary" round icon="add" />
    </span>
    <q-tab name="search" icon="search" @click="alterTab('search')"/>
    <q-tab name="favorite" icon="favorite" @click="alterTab('favorite')"/>
</q-tabs>
</template>

<script>
import {
    mapActions,
    mapState
} from 'vuex'

export default {
    name: 'FooterHome',
    data() {
        return {}
    },
    methods:{
      ...mapActions("navigation", ["alterTab"]),
      
    }
}
</script>
<style scoped>
.button-center{
    position: absolute;
    transform: translate(0, -55%);
}
</style>