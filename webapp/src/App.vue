<template>
  <v-app id="app">
    <v-app-bar app clipped-left height="100" aria-label="En-tête">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" aria-label="Bascule menu"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <h1>
          <a id="app-logo" to="/">
            <img src="/src/img/logo.png" />
            Super Ciné Marbre
          </a>
        </h1>
      </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped aria-label="Menu">
      <Sidebar></Sidebar>
    </v-navigation-drawer>

    <v-main aria-label="Corps">
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-footer app>
      Contribuez à ce projet 
      <a style="margin: 0 5px" href="https://github.com/supercinemarbre/supercinemarbre.github.io"><v-icon>mdi-github-circle</v-icon>{{' '}}sur Github </a> 
    </v-footer>
  </v-app>
</template>

<style lang="scss">
@import '@/styles/app.scss';

@media (max-height: 700px) {
  .v-footer {
    visibility: hidden !important;
  }
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import Sidebar from './components/sidebar/Sidebar.vue';

export default defineComponent({
  components: {
    Sidebar
  },
  data: () => ({
    drawer: null
  }),
  created () {
    // TODO UPGRADE
    // this.$vuetify.theme.dark = true;
    // this.$vuetify.lang.current = 'fr';
  }
});
</script>
