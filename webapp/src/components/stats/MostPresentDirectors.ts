import Ordinal from '@/components/common/Ordinal.vue';
import { fetchMovies } from '@/services/api.service';
import { Movie } from '@/types';
import { Component, Vue } from 'vue-facing-decorator';

function byRanking(a: Movie, b: Movie) {
  return a.ranking - b.ranking;
}

@Component({
  components: {
    Ordinal
  }
})
export default class MostPresentDirectors extends Vue {

  minimumMovies = 3;
  allMovies: Movie[] = [];
  state: 'loading' | 'loaded' = 'loading';

  async created() {
    this.allMovies = await fetchMovies();
    this.state = 'loaded';
  }
  
  get headers() {
    return [
      { text: "Classement", value: "ranking", align: "center" },
      { text: "Réalisateur", value: "director" },
      { text: "Nb. classés", value: "movieCount" },
      { text: "Classé", value: "movies" },
    ];
  }

  get items() {
    const moviesByDirector = this.groupMoviesByDirector(); 
    let previousCount = -1, previousRanking = 1;
    return Object.entries(moviesByDirector)
      .map((entry) => ({ director: entry[0], movies: entry[1] }))
      .filter(entry => entry.movies.length >= this.minimumMovies)
      .sort((entry1, entry2) => {
        const movieCountDiff = entry2.movies.length - entry1.movies.length;
        const tieBreaker = entry1.movies[0].ranking - entry2.movies[0].ranking; // best ranking
        return movieCountDiff + tieBreaker * 0.0001;
      })
      .map(({ director, movies }, index) => {
        let ranking;
        if (movies.length == previousCount) {
          ranking = previousRanking;
        } else {
          ranking = index + 1;
          previousCount = movies.length;
          previousRanking = ranking
        }
        return {
          director,
          movies: movies.sort(byRanking),
          movieCount: movies.length,
          ranking
        }
      });
  }

  private groupMoviesByDirector() {
    const result: Record<string, Movie[]> = {};
    this.allMovies.forEach(movie => {
      movie.directors.forEach(director => {
        if (!result[director]) {
          result[director] = [];
        }
        result[director].push(movie)
      })
    })
    return result;
  }
  
}
