<script setup lang="ts">
import { fetchEpisodes, fetchMovies, type EpisodeMap } from '@/services/api-client';
import { watchDebounced } from '@/services/utils';
import type { Movie } from '@/types';
import type { Ref } from 'vue';
import { computed, ref } from 'vue';

const props = defineProps({
  decade: String
})

const state = ref('loading')
const searchInput = ref('');
const searchUndebouncedInput = ref('');
const allMovies: Ref<Movie[]> = ref([])
const episodes: Ref<EpisodeMap> = ref({})
const spoilerFreeFromEpisode = ref(false as false | number); // TODO

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

watchDebounced(searchUndebouncedInput, (value) => searchInput.value = value, 300);

// Initialization

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
      'episode ' + movie.id.episode).toLowerCase();
  return movies;
})
state.value = 'loaded';

</script>

<template>
  <h2>
    <span v-if="state !== 'loading'">
      <span v-if="decadeTitle">{{ decadeTitle }}</span>
      <span v-if="!decadeTitle">Tous les films classés du <a href="http://supercinebattle.fr/">Super Ciné
          Battle</a></span>
    </span>
  </h2>

  <v-container fluid style="margin-bottom: 15px">
    <v-row>
      <v-col class="d-flex" cols="6" sm="4">
        <!-- <SpoilerFree ref="spoilerFree" :episodes="episodes" @onChange="refreshMoviesAndEpisodes"></SpoilerFree> -->
      </v-col>
      <v-col class="d-flex" cols="6" sm="8">
        <!--TODO fix icon, review attributes -->
        <v-text-field v-model="searchUndebouncedInput" append-icon="search" single-line hide-details
          placeholder="Chercher un film, réalisateur, acteur..."></v-text-field>
      </v-col>
    </v-row>
  </v-container>

  {{ filteredMovies.map(m => m.title).join(' ') }}
</template>
