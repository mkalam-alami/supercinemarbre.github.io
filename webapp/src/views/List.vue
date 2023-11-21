<template>
  <div>
    <h2>
      <span v-if="state !== 'loading'">
        <span v-if="decadeTitle">{{ decadeTitle }}</span>
        <span v-if="!decadeTitle">Tous les films classés du <a href="http://supercinebattle.fr/">Super Ciné Battle</a></span>
      </span>
    </h2>

    <v-container fluid style="margin-bottom: 15px">
      <v-row>
        <v-col class="d-flex" cols="6" sm="4">
          <SpoilerFree ref="spoilerFree" :episodes="episodes" @onChange="refreshMoviesAndEpisodes"></SpoilerFree>
        </v-col>
        <v-col class="d-flex" cols="6" sm="8">
          <v-card min-width="100%">
            <v-card-title>
              <v-text-field
                v-model="searchInput"
                append-icon="search"
                label="Recherche"
                single-line
                hide-details
                placeholder="Chercher un film, réalisateur, acteur..."
              ></v-text-field>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <MovieList
      :movies="isSearchInProgress ? [] : movies"
      :episodes="episodes"
      :currentDecade="currentDecade"
      :state="state"
      :search="search"
      :sortBy="sortBy"
      :sortDesc="sortDesc"
      :itemsPerPage="itemsPerPage"
    ></MovieList>
  </div>
</template>

<script src="./List.ts" lang="ts"></script>

<style lang="scss" scoped>
@media (max-width: 990px) {
  h1 {
    font-size: 130%;
    text-align: center;
    margin: 5px 5px 10px 5px !important;
  }
}

// TODO Move this IMDB popularity styling
:deep(td .v-progress-linear) {
  width: 150px;
}
</style>
