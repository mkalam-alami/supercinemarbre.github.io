<template>
  <a v-if="!!movie.tconst && isValid" :href="'https://www.imdb.com/title/' + movie.tconst">
    <img src="/src/img/imdb.png" />
    {{ ratingLabel }}
  </a>
</template>

<script src="./RatingIMDB.ts" lang="ts"></script>

<style lang="scss" scoped>
a:hover img {
  border-color: #ccc;
}

img {
  margin-top: -4px;
  margin-right: 2px;
  vertical-align: middle;
  height: 16px;
  border: 1px solid rgba(0,0,0,0);
  border-radius: 6px;
  transition: 0.2s;
}
</style>
