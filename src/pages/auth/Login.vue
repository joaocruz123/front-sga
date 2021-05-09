<template>
<q-page class="flex flex-center">
    <div class="box">
        <div class="row q-pa-xl gutter-sm">
            <div class="col-xs-4 col-sm-4"></div>
            <div class="col-xs-4 col-sm-4">
                <q-img src="~assets/img/logo.png" />
            </div>
            <div class="col-xs-4 col-sm-4"></div>
            <div class="col-xs-12 col-sm-12">
                <q-input v-model="form.username" label="username" required />
            </div>
            <div class="col-xs-12 col-sm-12">
                <q-input type="password" v-model="form.password" label="password" required />
            </div>
        </div>
        <div class="q-pr-xl q-pb-xl q-pl-xl">
            <div class="col-xs-12 col-sm-12">
                <q-btn class="full-width" label="Login" color="secondary" @click="login([form.username, form.password])" />
            </div>
            <div class="col-xs-12 col-sm-12 q-pt-md">
                <q-btn class="full-width" label="Reset" flat @click="reset()" />
            </div>
        </div>
    </div>
</q-page>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            form: {
                username: '',
                password: ''
            }
        }
    },
}
</script>

<style scoped>
.box {
    width: 600px;
    height: 440px;
    /* background-color: #c9c9c9; */
    border-radius: 4px;
    color: black;
}
</style>
