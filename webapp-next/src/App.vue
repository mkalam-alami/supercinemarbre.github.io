<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import Sidebar from './components/sidebar/Sidebar.vue';

const drawer = ref(true)
</script>

<template>
  <v-layout>
    <v-app-bar id="app-bar">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <h1>
          <RouterLink id="logo" to="/">
            <img src="/img/logo.png" />
            Super Ciné Marbre
          </RouterLink>
        </h1>
      </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer id="nav" v-model="drawer">
      <Sidebar></Sidebar>

      <template v-slot:append>
        <div id="nav-contribute-call" class="pa-2">
          Contribuez à ce projet
          <a href="https://github.com/supercinemarbre/supercinemarbre.github.io"> sur
            Github </a>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main id="main">

      <RouterView />

    </v-main>
  </v-layout>
</template>

<style scoped lang="scss">
#app-bar {
  height: var(--app-bar-height);
  background-image: url('/img/bgmarbre.jpg');
  padding: 20px;
}

#logo {
  color: transparent !important;
  font-size: 0px;

  & img {
    margin-top: 3px;
    max-height: 32px;
    transition: 0.2s;

    @media (max-width: 600px) {
      max-width: 200px;
    }

    @media (max-width: 300px) {
      max-width: 150px;
    }
  }

  &:hover,
  &:hover img {
    filter: brightness(1.2);
  }
}

#main {
  --v-layout-top: var(--app-bar-height) !important;
}

#nav {
  top: var(--app-bar-height) !important;
  height: calc(100% - var(--app-bar-height)) !important;

  #nav-contribute-call {
    text-align: center;
    opacity: .7;
    font-size: .9rem;
  }
}

#footer {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1;
}
</style>
