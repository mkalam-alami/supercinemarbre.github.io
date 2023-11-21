import { fetchEpisodes, fetchMovies, fetchTvSchedule } from '@/services/api.service';
import { Episode, Movie, XmltvBroadcast, XmltvMatch } from '@/types';
import { Component, Vue } from 'vue-facing-decorator';
import MoviePoster from '@/components/common/MoviePoster.vue';

interface BroadcastsDay {
  day: string;
  broadcastMovies: BroadcastMovie[];
}

interface BroadcastMovie {
  broadcast: XmltvBroadcast;
  movie: Movie;
  episode: Episode;
  csaRating: string;
}

@Component({
  components: {
    MoviePoster
  }
})
export default class Home extends Vue {

  fromDate = '';
  toDate = '';
  broadcastsByDay: BroadcastsDay[] = [];
  error? = '';

  async created() {
    const [movies, tvSchedule, episodes] = await Promise.all([
      fetchMovies(),
      fetchTvSchedule(),
      fetchEpisodes()
    ]);

    if ("error" in tvSchedule) {
      this.error = tvSchedule.error;
    } else {
      this.fromDate = tvSchedule.fromDate;
      this.toDate = this.isoString(tvSchedule.toDate);
      this.broadcastsByDay = this.buildBroadcastsByDay(tvSchedule.matches, movies, episodes);
    }
  }

  private buildBroadcastsByDay(matches: XmltvMatch[], movies: Movie[], episodes: Record<number, Episode>): BroadcastsDay[] {
    let broadcastMovies: BroadcastMovie[] = [];
    for (const match of matches) {
      const movie = movies.find((movie) => 
        movie.id.episode === match.movie.episode && movie.id.name === match.movie.name);
      if (movie) {
        const newBroadcasts: BroadcastMovie[] = match.broadcasts
          .map(broadcast => ({
            broadcast,
            movie,
            csaRating: match.csaRating,
            episode: episodes[movie.id.episode]
          }));
        broadcastMovies = [...broadcastMovies, ...newBroadcasts];
      }
    }

    broadcastMovies.sort((a, b) => {
      return a.broadcast.date.localeCompare(b.broadcast.date);
    });

    const broadcastsByDayMap: Record<string, BroadcastsDay> = {};
    for (const broadcastMovie of broadcastMovies) {
      const day = broadcastMovie.broadcast.date.slice(0, 10); // Remove time part from ISO string
      if (!broadcastsByDayMap[day]) {
        broadcastsByDayMap[day] = { day, broadcastMovies: [] };
      }
      broadcastsByDayMap[day].broadcastMovies.push(broadcastMovie);
    }

    return Object.values(broadcastsByDayMap);
  }

  private isoString(isoString: string) {
    const date = new Date(isoString);
    const minusOneDayTime = date.getTime() - 24 * 3600 * 1000;
    return new Date(minusOneDayTime).toISOString();
  }

}
