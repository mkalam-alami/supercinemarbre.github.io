import { Movie } from '@/types';
import { Component, Prop, Vue } from 'vue-facing-decorator';

@Component
export default class RatingIMDB extends Vue {

  @Prop() movie?: Movie;

  get isValid() {
    return typeof this.movie?.imdbRating === 'number';
  }
  
  get ratingLabel() {
    if (this.isValid) {
      return this.movie.imdbRating.toFixed(1);
    }
    return '';
  }

}
