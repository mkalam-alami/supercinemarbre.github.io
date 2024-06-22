<script setup lang="ts">
import { fetchEpisodes, fetchMovies, type EpisodeMap } from '@/services/api-client';
import { watchDebounced } from '@/services/utils';
import type { Movie } from '@/types';
import type { Ref } from 'vue';
import { computed, ref } from 'vue';
import MovieListDesktop from '@/components/movie-list/MovieListDesktop.vue';
import MovieListMobile from '@/components/movie-list/MovieListMobile.vue';

const props = defineProps({
  decade: String
})

const window = globalThis.window;
const state = ref('loading' as 'loading' | 'loaded')
const searchInput = ref('')
const searchInputUndebounced = ref('')
const itemsPerPage = ref(5)
const allMovies: Ref<Movie[]> = ref([])
const episodes: Ref<EpisodeMap> = ref({})
const spoilerFreeFromEpisode = ref(false as false | number); // TODO
const mobileMode = ref(false);

const decadeTitle = computed(() => props.decade ? `La liste ultime des années ${props.decade}` : '')
const movies = computed(() => {
  if (props.decade) {
    return allMovies.value
      .filter(movie => !spoilerFreeFromEpisode.value || movie.id.episode <= spoilerFreeFromEpisode.value)
      .filter(movie => movie.decade === props.decade)
      .sort((a, b) => a.ranking - b.ranking)
  } else {
    return [...allMovies.value].sort((a, b) => (b.year || 0) - (a.year || 0));
  }
})
const filteredMovies = computed(() => {
  console.log(movies.value.map(m => m.searchString).filter(m => m.includes(searchInput.value.toLowerCase()), searchInput.value), searchInput.value);
  return movies.value.filter(m => m.searchString.includes(searchInput.value.toLowerCase()))
})

const refreshMobileMode = () => mobileMode.value = window.innerWidth < 991;

watchDebounced(searchInputUndebounced, (value) => searchInput.value = value, 300);

// Initialization

refreshMobileMode();

;[allMovies.value, episodes.value] = await Promise.all([
  fetchMovies(),
  fetchEpisodes()
]);
allMovies.value.forEach(movie => {
  movie.searchString =
    (movie.primaryTitle + '|' +
      movie.title + '|' +
      movie.actors?.join('|') + '|' +
      movie.directors?.join('|') +
      movie.year + '|' +
      'episode ' + movie.id.episode).toLowerCase()
  movie.episode = movie.id.episode
})
state.value = 'loaded';


</script>

<template>
  <h1>
    <span v-if="state !== 'loading'">
      <span v-if="decadeTitle">{{ decadeTitle }}</span>
      <span v-if="!decadeTitle">Tous les films classés du <a href="http://supercinebattle.fr/">Super Ciné
          Battle</a></span>
    </span>
  </h1>

  <v-container fluid style="margin-bottom: 15px">
    <v-row>
      <v-col class="d-flex" cols="6" sm="8">
        <!--TODO fix icon, review attributes -->
        <v-text-field v-model="searchInputUndebounced" append-icon="search" single-line hide-details
          placeholder="Chercher un film, réalisateur, acteur..."></v-text-field>
      </v-col>
      <v-col class="d-flex" cols="6" sm="4">
        <!-- <SpoilerFree ref="spoilerFree" :episodes="episodes" @onChange="refreshMoviesAndEpisodes"></SpoilerFree> -->
      </v-col>
    </v-row>
  </v-container>

  <div v-resize="refreshMobileMode">
    <MovieListDesktop
      v-if="!mobileMode"
      :movies="filteredMovies"
      :episodes="episodes"
      :currentDecade="props.decade"
      :state="state"
      :search="searchInput"
      :sortBy="decade ? [] : [{key: 'episode', order: 'desc'}]"
      :itemsPerPage="itemsPerPage"
    ></MovieListDesktop>
    <MovieListMobile
      v-if="mobileMode"
      :movies="filteredMovies"
      :episodes="episodes"
      :currentDecade="props.decade"
      :state="state"
      :search="searchInput"
      :sortBy="decade ? [] : [{key: 'episode', order: 'desc'}]"
      :itemsPerPage="itemsPerPage"
    ></MovieListMobile>
  </div>
</template>
