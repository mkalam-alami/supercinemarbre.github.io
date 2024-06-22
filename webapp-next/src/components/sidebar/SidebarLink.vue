<script setup lang="ts">
defineProps<{
  to: string,
  icon: string,
  label: string,
}>()
</script>

<template>
  <v-list-item link :to="to" :prepend-icon="icon" :title="label"></v-list-item>
</template>
