import MovieList from '@/components/MovieList.vue';
import SpoilerFreeComponent from '@/components/spoiler-free/SpoilerFree';
import SpoilerFree from '@/components/spoiler-free/SpoilerFree.vue';
import { EpisodeMap, fetchEpisodes, fetchMovies } from '@/services/api.service';
import { Movie } from '@/types';
import { debounce } from 'lodash-es';
import { Component, Ref, Vue, Watch } from 'vue-facing-decorator';

@Component({
  components: {
    MovieList,
    SpoilerFree
  }
})
export default class List extends Vue {

  currentDecade?= '';
  state: 'loading' | 'loaded' = 'loading';
  allMovies: Movie[] = [];
  episodes: EpisodeMap = [];
  search = '';
  searchInput = '';
  sortBy = [];
  sortDesc = [];
  itemsPerPage = 5;

  @Ref() spoilerFree: SpoilerFreeComponent;

  private debouncedSearchUpdate = debounce(this.applySearch.bind(this), 300);

  mounted() {
    window.scrollTo(0, 0);
  }

  async created() {
    this.refreshMoviesAndEpisodes();
    this.onRouteChange();
  }

  async refreshMoviesAndEpisodes() {
    this.state = 'loading';

    const [movies, episodes] = await Promise.all([
      fetchMovies(),
      fetchEpisodes()
    ]);

    this.episodes = episodes;
    this.allMovies = movies
      .filter(movie => {
        return !this.spoilerFree.isEnabled()
          || movie.episode <= this.spoilerFree.getLastWatchedEpisode();
      })
      .map(movie => {
        movie.episode = movie.id.episode;
        movie.searchString =
          movie.primaryTitle + '|' +
          movie.title + '|' +
          movie.actors?.join('|') + '|' +
          movie.directors?.join('|') +
          movie.year + '|' +
          'Episode ' + movie.episode
        return movie;
      })

    this.state = 'loaded';
  }

  @Watch('searchInput')
  public onSearchInputChange(searchInput: string) {
    this.debouncedSearchUpdate(searchInput);
  }

  get isSearchInProgress() {
    return this.search !== this.searchInput;
  }

  applySearch(search: string) {
    this.search = search;
  }

  @Watch('$route')
  public onRouteChange() {
    this.currentDecade = this.$route.meta?.decade;
    this.searchInput = '';
    this.sortBy = this.currentDecade ? [] : ['episode'];
    this.sortDesc = this.currentDecade ? [] : ['desc'];

    if (this.$route.hash && document.querySelector) {
      const scrollInterval = setInterval(() => {
        const target = document.querySelector(`[name=${this.$route.hash.slice(1)}]`) as HTMLElement;
        if (target) {
          target.scrollIntoView({ block: "center" });
          clearInterval(scrollInterval);
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }

  get movies(): Movie[] {
    if (this.currentDecade) {
      return this.allMovies
        .filter(movie => movie.decade === this.currentDecade)
        .sort((a, b) => a.ranking - b.ranking)
    } else {
      return this.allMovies.sort((a, b) => (b.year || 0) - (a.year || 0));
    }
  }

  get decadeTitle(): string {
    if (this.currentDecade) {
      return `La liste ultime des années ${this.currentDecade}`;
    }
  }

}
