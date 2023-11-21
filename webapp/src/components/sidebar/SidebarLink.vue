<template>
  <v-list-item link :to="to">
    <template v-slot:prepend>
      <v-icon :icon="icon"></v-icon>
    </template>
    <v-list-item-title>{{ label }}</v-list-item-title>
  </v-list-item>
</template>

<script src="./SidebarLink.ts" lang="ts"></script>
