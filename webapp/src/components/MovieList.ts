import { EpisodeMap } from '@/services/api.service';
import { Movie } from '@/types';
import { Component, Prop, Vue } from 'vue-facing-decorator';
import MovieListDesktop from './MovieListDesktop.vue';
import MovieListMobile from './MovieListMobile.vue';

@Component({
  components: {
    MovieListDesktop,
    MovieListMobile
  }
})
export default class MovieList extends Vue {

  @Prop() currentDecade: string | undefined;
  @Prop() state: 'loading' | 'loaded';
  @Prop() movies: Movie[];
  @Prop() episodes: EpisodeMap;
  @Prop() search: string;
  @Prop() sortBy: object[];
  @Prop() sortDesc: object[];
  @Prop() itemsPerPage: number;

  mobileMode = false;

  mounted() {
    this.onResize();
  }

  onResize() {
    this.mobileMode = window.innerWidth < 991;
  }

}
