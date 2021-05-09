<template>
  <q-layout view="lHh Lpr lFf" class="background">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
 
<script>
export default {
  name: 'Auth',
  data () {
    return {
     
    }
  }
}
</script>
<style>
.background{
  background: #F19240;
}
</style>
