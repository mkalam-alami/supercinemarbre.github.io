import ChartLine from '@/components/chart/ChartLine.vue';
import { Movie } from '@/types';
import { Component, Prop, Vue, Watch } from 'vue-facing-decorator';

@Component({
  components: {
    ChartLine
  }
})
export default class MoviesPerEpisodeStats extends Vue {

  @Prop() movies: Movie[];

  moviesPerEpisode: number[] = [];
  episodeNumbers: number[] = [];

  created() {
    this.refresh();
  }

  @Watch("movies")
  async refresh() {
    this.movies.map(m => m.id.episode)
      .forEach(episode => {
        if (!this.moviesPerEpisode[episode]) {
          this.moviesPerEpisode[episode] = 0;
        }
        this.moviesPerEpisode[episode]++;
      });

    this.episodeNumbers = new Array(this.moviesPerEpisode.length)
      .fill(0)
      .map((_value, index) => index % 10 === 0 ? index : undefined);

    // XXX
    await Vue.nextTick();
    this.$forceUpdate();
  }

  get average() {
    return Math.round(10. * this.moviesPerEpisode.reduce((a, b) => a + b, 0) / this.moviesPerEpisode.length) / 10.;
  }

  get min() {
    const min = { episode: 0, count: this.moviesPerEpisode[0] };
    this.moviesPerEpisode.forEach((count, episode) => {
      if (count < min.count) {
        min.episode = episode;
        min.count = count;
      }
    });
    return min;
  }

  get max() {
    const max = { episode: 0, count: this.moviesPerEpisode[0] };
    this.moviesPerEpisode.forEach((count, episode) => {
      if (count > max.count) {
        max.episode = episode;
        max.count = count;
      }
    });
    return max;
  }

}
