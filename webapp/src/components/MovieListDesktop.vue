<template>
  <v-data-table
    :loading="state === 'loading'"
    :search="search"
    :headers="headers"
    :items="movies"
    :items-per-page="itemsPerPage"
    :mobile-breakpoint="991"
    :disable-pagination="!!currentDecade"
    hide-default-footer
    no-data-text=""
    :sort-by="sortBy"
    :sort-desc="sortDesc"
    :footer-props="{
      showFirstLastPage: true,
      showCurrentPage: true
    }"
    item-key="tconst">
    <template v-slot:item.ranking="{ item }">
      <v-lazy>
        <span>
          <span class="movie-ranking" v-if="!!currentDecade">{{ item.ranking }}<Ordinal :value="item.ranking" /></span>
          <span v-if="!currentDecade">
            <router-link :to="'/' + item.decade + '#' + item.tconst">
              <div class="movie-ranking">{{ item.ranking }}<Ordinal :value="item.ranking" /></div>
              Années {{ item.decade }}
            </router-link>
          </span>
        </span>
      </v-lazy>
    </template>
    <template v-slot:item.posterUrl="{ item }">
      <v-lazy>
        <div class="movie-poster">
          <v-img :src="item.posterUrl" width="70" height="100" aspect-ratio="1" />
        </div>
      </v-lazy>
    </template>
    <template v-slot:item.imdbRating="{ item }">
      <v-lazy>
        <div class="movie-ratings-and-links">
              <RatingIMDB class="movie-rating" v-if="!!item.tconst" :movie="item" />
          <div class="movie-rating" v-if="!!item.rottenTomatoesRating">
            <RatingRT :rating="item.rottenTomatoesRating" />
          </div>
          <div class="movie-rating" v-if="!!item.metascore">
            <RatingMetacritic :rating="item.metascore" />
          </div>
          <div class="movie-links">
            <JustWatchLink :movie="item" />
          </div>
        </div>
      </v-lazy>
    </template>
    <template v-slot:item.imdbVotes="{ item }">
      <v-lazy>
        <PopularityIMDB :votes="item.imdbVotes" />
      </v-lazy>
    </template>
    <template v-slot:item.searchString="{ item }">
      <a :name="item.tconst"></a>
      <div class="movie-info">
      <v-lazy>
        <div>
          <div>
            <div class="movie-title">
              {{ item.title }}
              <span class="movie-alt-title" v-if="item.title !== item.primaryTitle">({{ item.primaryTitle }})</span>
              <TimestampLink :movie="item" :episode="episodes[item.episode]" style="margin-left: 10px"></TimestampLink>
            </div>

            <div class="movie-details">
              {{ item.runtimeMinutes }} min
              <Genres v-if="item.genres" :genres="item.genres" style="margin-left: 10px"></Genres>
            </div>
          </div>
          <div class="movie-casting">
            <div v-if="item.directors">de {{ item.directors.join(', ') }}</div>
            <div v-if="item.actors">avec {{ item.actors.join(', ') }}</div>
            <div v-if="item.comment" style="margin-top: 5px"><b>Note:</b> {{ item.comment }}</div>
          </div>
        </div>
      </v-lazy>
      </div>
    </template>
    <template v-slot:item.year="{ item }">
      <v-lazy>
        <span>{{ item.year }}</span>
      </v-lazy>
    </template>
    <template v-slot:item.episode="{ item }">
      <v-lazy>
        <router-link v-if="item.episode !== undefined" :to="'/episodes?search=' + item.episode">Ep. {{ item.episode }}</router-link>
      </v-lazy>
    </template>
    <template v-slot:top="{ pagination, options, updateOptions }">
      <v-data-footer v-if="!currentDecade"
        :pagination="pagination"
        :options="options"
        @update:options="updateOptions"
        showFirstLastPage
        showCurrentPage
        :itemsPerPageOptions="[5,10,50,-1]"
        items-per-page-text="$vuetify.dataTable.itemsPerPageText"/>
    </template>
  </v-data-table>
</template>

<script src="./MovieListDesktop.ts" lang="ts"></script>

<style lang="scss" scoped>
.movie-ranking {
  font-size: 200%;
  font-weight: bold;
}
@media (max-width: 990px) {
  .movie-ranking {
    font-size: 120%;
  }
}

.movie-poster {
  display: inline-block;
  height: 110px;
  padding: 5px;
  box-sizing: border-box;
  overflow: hidden;
}

@media (min-width: 1600px) {
  .movie-ratings-and-links {
    min-width: 170px;
  }
}
.movie-rating {
  white-space: nowrap;
  display: inline-block;
  margin-right: 10px;
}
@media (min-width: 991px) and (max-width: 1600px) {
  .movie-rating {
    display: block;
    margin-bottom: 4px;
  }
}

.movie-links {
  margin-top: 5px;
}

.icon {
  margin-top: -4px;
  margin-right: 4px;
  vertical-align: middle;
}
.icon.imdb {
  height: 32px;
}

.movie-info {
  display: flex;
  min-height: 116px;
  flex-direction: column;
  justify-content: center;
}
.movie-title {
  display: block;
  font-size: 120%;
  font-weight: bold;
  margin-bottom: 5px;
}

.movie-play {
  margin-left: 5px;

  & i {
    transition: 0.15s cubic-bezier(0, 1.1, 0.8, 2);
  }

  &:hover i {
    backface-visibility: hidden;
    transform: scale(1.3) translateZ(0);
    -webkit-font-smoothing: subpixel-antialiased;
    color: #bce2ff;
  }
}

.movie-alt-title {
  color: #888888;
  font-weight: normal;
  font-size: 90%;
  margin-left: 10px;
}
:deep(.movie-casting) {
  color: #BBBBBB;
  font-size: 90%;
  margin-bottom: 5px;
}

.movie-details {
  color: #888888;
  font-weight: normal;
  font-size: 90%;
  margin-top: -5px;
  margin-bottom: 5px;
}
</style>
