<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-custom text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          UTS - UAS PBK
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="center">
        <q-route-tab to="/todos" label="Todos" />
        <q-route-tab to="/post" label="Post" />
        <q-route-tab to="/album" label="Album" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-custom text-white">
      <q-toolbar>
        <q-toolbar-title align="center">
          <div>ILHAM | 2024 | Universitas Islam Riau</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<style scoped>
.bg-custom {
  background-color: #322C2B;
}
</style>