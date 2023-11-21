<template>
  <div>
    <h2>Liste des épisodes</h2>

    <v-container fluid style="margin-bottom: 15px">
      <v-row>
        <v-col class="d-flex" cols="6" sm="4">
          <SpoilerFree :episodes="episodes" @onChange="onSpoilerFreeSettingsChange"></SpoilerFree>
        </v-col>
        <v-col class="d-flex" cols="6" sm="8">
          <v-card min-width="100%">
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Recherche"
                single-line
                hide-details
                placeholder="Chercher un épisode, une décennie"
              ></v-text-field>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>


    <v-data-table
      :loading="state === 'loading'"
      :search="search"
      :headers="headers()"
      :items="episodes"
      :items-per-page="5"
      :mobile-breakpoint="0"
      :custom-filter="customFilter"
      hide-default-footer>
      <template v-slot:item="{ item }">
        <tr>
          <td class="number">{{ item.number }}</td>
          <td class="date">{{ item.date | date }}</td>
          <td class="episode-title">
            <a :href="item.url">{{ item.title }}</a>
            <div class="inline-details">
              Années {{ item.decade }}
            </div>
          </td>
          <td class="decade">{{ item.decade }}</td>
          <td class="article">
            <a :href="item.url"><v-icon>mdi-bookmark</v-icon></a>
          </td>
          <td class="download">
            <a :href="item.mp3url"><v-icon>mdi-download</v-icon></a>
          </td>
        </tr>
        <tr v-if="hideMoviesAboveEpisode >= item.number" class="movies-row">
          <td></td>
          <td colspan="5">
            <v-lazy>
              <div class="movies">
                <div v-for="movie in episodeMovies(item.number)" :key="movie.tconst">
                  <MoviePoster :movie="movie" :episode="item"></MoviePoster>
                </div>
                <div v-if="episodeMovies(item.number).length === 0">
                  <br />
                  <span v-if="item.title.includes('Super') && item.title.includes('Battle')">
                    Les listes spéciales ne sont pas encore supportées sur Super Ciné Marbre.
                  </span>
                  <span v-else>
                    Classements et timestamps manquants pour cet episode. Voir <router-link to="/about">A propos</router-link> pour les contribuer !
                  </span>
                </div>
              </div>
            </v-lazy>
          </td>
        </tr>
      </template>
      <template v-slot:top="{ pagination, options, updateOptions }">
        <v-data-footer 
          :pagination="pagination" 
          :options="options"
          @update:options="updateOptions"
          showFirstLastPage
          showCurrentPage
          :itemsPerPageOptions="[1,5,10,50,-1]"
          items-per-page-text="$vuetify.dataTable.itemsPerPageText"/>
      </template>
    </v-data-table>
  </div>
</template>

<script src="./Episodes.ts" lang="ts"></script>

<style lang="scss" scoped>
@media (max-width: 990px) {
  h1 {
    font-size: 130%;
    text-align: center;
    margin: 5px 5px 10px 5px !important;
  }
}

:deep(.number) {
  font-size: 150% !important;
}

@media (max-width: 520px) {
  :deep(.date) {
    display: none;
  }
}

.inline-details {
  display: none;
  color: #888;
}
@media (max-width: 520px) {
  :deep(.decade) {
    display: none;
  }
  :deep(.inline-details) {
    display: block;
  }
}

:deep(.episode-title) {
  font-size: 120% !important;
  font-weight: 700;
}
@media (max-width: 991px) {
  :deep(.episode-title) {
    font-size: 90% !important;
    font-weight: normal;
  }
}

:deep(.movies) {
  margin-top: 5px;
  margin-bottom: 30px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
@media (max-width: 600px) {
  :deep(.movies-row) {
    display: none;
  }
}

:deep(.article .v-icon, ::v-deep .download .v-icon) {
  font-size: 250% !important;
  color: #7ec6ff !important;
}
</style>
