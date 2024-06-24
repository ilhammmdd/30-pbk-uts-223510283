<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-custom text-black" height-hint="98">
      <q-tabs align="center">
        <q-route-tab to="/todos" label="Todos" />
        <p>|</p>
        <q-route-tab to="/post" label="Post" />
        <p>|</p>
        <q-route-tab to="/album" label="Album" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <q-card dark bordered class="bg-custoom my-card">
        <q-card-section>
          <div class="text-h6">UAS 2 PEMOGRAMAN BERBASIS KOMPONEN</div>
          <div class="text-subtitle2">ILHAM 4D (223510283)</div>
          <div class="text-subtitle2">Web yang memiliki 3 fitur Todos,Post,Album</div>
        </q-card-section>
      </q-card>
      
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-custom text-black">
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
  background-color: #CCC8AA;
}

.bg-custoom{
  background-color: #7D7C7C;
}

.my-card {
  margin-top: 0px;
}
</style>
