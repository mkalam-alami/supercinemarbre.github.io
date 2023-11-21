<template>
  <a v-if="movie && movie.jwFullPath" :href="'https://www.justwatch.com' + movie.jwFullPath">
    <img src="/src/img/justwatch.png" />
  </a>
</template>

<script src="./JustWatchLink.ts" lang="ts"></script>

<style lang="scss" scoped>
img {
  margin-top: -4px;
  margin-right: -1px;
  vertical-align: middle;
  border: 1px solid rgba(0,0,0,0);
  border-radius: 4px;
  transition: 0.2s;

  &:hover {
    border-color: #ccc;
  }
}
</style>
