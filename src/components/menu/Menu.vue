<template>
<div>
    <div class="bg-primary top-menu"></div>

    <div class="box-user">
        <q-img src="~assets/img/avatar_sga.png" />
        <div class="nome">João Paulo Franco da Cruz</div>
        <div class="atuacao">Membro</div>
    </div>

    <q-list bordered padding class="rounded-borders text-menu">
        <q-item clickable v-ripple :active="link === 'home'" @click="link = 'home'" active-class="my-menu-link">
            <q-item-section avatar>
                <q-icon name="home" />
            </q-item-section>

            <q-item-section>Inico</q-item-section>
        </q-item>

        <q-item clickable v-ripple :active="link === 'secretaria'" @click="link = 'secretaria'" active-class="my-menu-link">
            <q-item-section avatar>
                <q-icon name="person" />
            </q-item-section>

            <q-item-section>Secretaria</q-item-section>
        </q-item>

        <q-item clickable v-ripple :active="link === 'agenda'" @click="link = 'agenda'" active-class="my-menu-link">
            <q-item-section avatar>
                <q-icon name="book" />
            </q-item-section>

            <q-item-section>Agenda</q-item-section>
        </q-item>

        <q-item clickable v-ripple :active="link === 'financeiro'" @click="link = 'financeiro'" active-class="my-menu-link">
            <q-item-section avatar>
                <q-icon name="attach_money" />
            </q-item-section>

            <q-item-section>Financeiro</q-item-section>
        </q-item>

        <q-item clickable v-ripple :active="link === 'celulas'" @click="link = 'celulas'" active-class="my-menu-link">
            <q-item-section avatar>
                <q-icon name="group" />
            </q-item-section>

            <q-item-section>Celulas</q-item-section>
        </q-item>

        <q-separator spaced />

        <q-item clickable v-ripple :active="link === 'settings'" @click="link = 'settings'" active-class="my-menu-link">
            <q-item-section avatar>
                <q-icon name="settings" />
            </q-item-section>

            <q-item-section>Settings</q-item-section>
        </q-item>

        <q-item clickable v-ripple :active="link === 'help'" @click="link = 'help'" active-class="my-menu-link">
            <q-item-section avatar>
                <q-icon name="help" />
            </q-item-section>

            <q-item-section>Help</q-item-section>
        </q-item>
    </q-list>
</div>
</template>

<script>
export default {
    name: 'Menu',
    data() {
        return {
            link: 'home'
        }
    },
}
</script>

<style>
.my-menu-link {
    color: #F19240;
    background: #d1ced4;
}
</style>
