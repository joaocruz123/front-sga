<template>
<q-page class="flex flex-center">
    <div class="box">
        <div class="row q-pa-md gutter-sm">
            <div class="col-xs-12 col-sm-12 flex flex-center">
                <q-img src="~assets/img/logo.png" width="170px" />
            </div>
            <div class="col-xs-12 col-sm-12">
                <q-input color="primary" v-model="form.username" label="username" required>
                    <template v-slot:prepend>
                        <q-icon name="mail" />
                    </template>
                </q-input>
            </div>
            <div class="col-xs-12 col-sm-12">
                <q-input type="password" color="primary" v-model="form.password" label="password" required>
                    <template v-slot:prepend>
                        <q-icon name="lock" />
                    </template>
                </q-input>
            </div>
        </div>
        <div class="q-pr-md q-pb-md q-pl-md">
            <div class="col-xs-12 col-sm-12">
                <q-btn class="full-width" label="Login" color="secondary" @click="login([form.username, form.password])" />
            </div>
            <div class="col-xs-12 col-sm-12 flex flex-center">
                <p color="deep-orange-6">Ainda não é cadastrado? <strong>Clique aqui!</strong></p>
            </div>
        </div>
    </div>
</q-page>
</template>
<script>
import {mapActions, mapState} from 'vuex'

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
    computed: {
        ...mapState("auth", ["isLoading"])
    },
    methods:{
      ...mapActions("auth", ["login"]),
      
      reset(){
          this.form.username = ''
          this.form.password = ''
      }
    }
}
</script>
