import MoviePoster from '@/components/common/MoviePoster.vue';
import { SpoilerFreeSettings } from '@/components/spoiler-free/SpoilerFree';
import SpoilerFree from '@/components/spoiler-free/SpoilerFree.vue';
import { EpisodeMap, fetchEpisodes, fetchMovies } from '@/services/api.service';
import { getMaxEpisode } from '@/services/utils.service';
import { Episode, Movie } from '@/types';
import { Component, Vue } from 'vue-facing-decorator';

@Component({
  components: {
    MoviePoster,
    SpoilerFree
  }
})
export default class Home extends Vue {

  state: 'loading' | 'loaded' = 'loading';
  allMovies: Movie[] = [];
  episodeMap: EpisodeMap = {};
  episodes: Episode[] = [];
  search = '';
  hideMoviesAboveEpisode = 0;

  mounted() {
    window.scrollTo(0, 0);
  }

  async created() {
    this.search = this.$route.query.search?.toString();

    const [movies, episodeMap] = await Promise.all([
      fetchMovies(),
      fetchEpisodes()
    ])

    this.episodeMap = episodeMap;
    this.episodes = Object.values(this.episodeMap)
      .map(episode => {
        episode.searchString = this.toSearchString(episode.title);
        return episode;
      })
      .sort((e1, e2) => e2.number - e1.number);

    this.allMovies = movies
      .map(movie => {
        movie.episode = movie.id.episode;
        return movie;
      });
    this.state = 'loaded';
  }

  onSpoilerFreeSettingsChange(settings: SpoilerFreeSettings) {
    this.hideMoviesAboveEpisode = settings.enabled ? parseInt(settings.lastWatched, 10) : getMaxEpisode(this.episodeMap);
  }

  toSearchString(value: string) {
    return value.replace(/[^a-zA-Z]/g, '').toLowerCase();
  }

  headers() {
    return [
      { text: 'Ep.', value: 'number' },
      { text: 'Date', class: 'date' },
      { text: 'Titre', value: 'title' },
      { text: 'Décennie', class: 'decade' },
      { text: 'Article' },
      { text: 'MP3' }
    ]
  }

  customFilter(value: Episode, search: string | null, item: Episode): boolean {
    const searchString = this.toSearchString(search);
    return !search
      || item.number.toString() === search
      || item.decade === search
      || (searchString && item.searchString.includes(searchString));
  }

  episodeMovies(episodeNumber: number) {
    return this.allMovies
      .filter(m => m.episode === episodeNumber)
      .sort((a, b) => {
        if (a.timestamp && b.timestamp) {
          return a.timestamp - b.timestamp;
        }
        return b.timestamp || -a.timestamp;
      });
  }

}
