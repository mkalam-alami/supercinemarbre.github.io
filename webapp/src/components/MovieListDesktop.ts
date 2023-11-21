import Genres from '@/components/common/Genres.vue';
import Ordinal from '@/components/common/Ordinal.vue';
import TimestampLink from '@/components/common/TimestampLink.vue';
import JustWatchLink from '@/components/common/JustWatchLink.vue';
import PopularityIMDB from '@/components/ratings/PopularityIMDB.vue';
import RatingIMDB from '@/components/ratings/RatingIMDB.vue';
import RatingMetacritic from '@/components/ratings/RatingMetacritic.vue';
import RatingRT from '@/components/ratings/RatingRT.vue';
import { EpisodeMap } from '@/services/api.service';
import { Movie } from '@/types';
import { Component, Prop, Vue } from 'vue-facing-decorator';

@Component({
  components: {
    RatingIMDB,
    RatingRT,
    RatingMetacritic,
    JustWatchLink,
    PopularityIMDB,
    Ordinal,
    TimestampLink,
    Genres
  }
})
export default class MovieListDesktop extends Vue {

  @Prop() currentDecade: string | undefined;
  @Prop() state: 'loading' | 'loaded';
  @Prop() movies: Movie[];
  @Prop() episodes: EpisodeMap;
  @Prop() search: string;
  @Prop() sortBy: object[];
  @Prop() sortDesc: object[];
  @Prop() itemsPerPage: number;

  shortDecade(decade: string) {
    return decade.slice(2) + 's';
  }

  get headers() {
    return [
      { text: "Classement", value: "ranking", align: "center", filterable: false },
      { text: "Poster", value: "posterUrl", align: "center", sortable: false, filterable: false },
      { text: "Titre", value: "searchString" },
      { text: "Année", value: "year", align: "center", filterable: false },
      { text: "Notes & liens", value: "imdbRating", sort: (a, b) => (b||0) - (a||0), filterable: false, class: "column-imdb-ranking" },
      { text: "Popularité IMDB", value: "imdbVotes", sort: (a, b) => (b||0) - (a||0), filterable: false },
      { text: "Episode", value: "episode", align: "center", filterable: false }
    ];
  }

}
