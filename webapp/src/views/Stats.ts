import MoviesPerEpisodeStats from '@/components/stats/MoviesPerEpisodeStats.vue';
import MostPresentDirectors from '@/components/stats/MostPresentDirectors.vue';
import MostPresentActors from '@/components/stats/MostPresentActors.vue';
import { fetchMovies } from '@/services/api.service';
import { Movie } from '@/types';
import { Component, Vue } from 'vue-facing-decorator';

@Component({
  components: {
    MoviesPerEpisodeStats,
    MostPresentDirectors,
    MostPresentActors
  }
})
export default class Stats extends Vue {

  movies: Movie[] = [];

  async created() {
    this.movies = await fetchMovies();
  }

  mounted() {
    window.scrollTo(0, 0);
  }

}
