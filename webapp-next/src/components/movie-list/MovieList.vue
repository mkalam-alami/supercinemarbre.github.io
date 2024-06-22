<template>
  <div v-resize="onResize">
    <MovieListDesktop
      v-if="!mobileMode"
      :movies="movies"
      :episodes="episodes"
      :currentDecade="currentDecade"
      :state="state"
      :search="search"
      :sortBy="sortBy"
      :sortDesc="sortDesc"
      :itemsPerPage="itemsPerPage"
    ></MovieListDesktop>
    <MovieListMobile
      v-if="mobileMode"
      :movies="movies"
      :episodes="episodes"
      :currentDecade="currentDecade"
      :state="state"
      :search="search"
      :sortBy="sortBy"
      :sortDesc="sortDesc"
      :itemsPerPage="itemsPerPage"
    ></MovieListMobile>
  </div>
</template>

<script src="./MovieList.ts" lang="ts"></script>
