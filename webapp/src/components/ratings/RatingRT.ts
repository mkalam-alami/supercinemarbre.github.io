import { Component, Vue, Prop } from 'vue-facing-decorator';

@Component
export default class RatingRT extends Vue {

  @Prop() rating?: number;

  get isValid() {
    return typeof this.rating === 'number';
  }
  
  get ratingLabel() {
    if (this.isValid) {
      return this.rating + '%';
    }
    return '';
  }

  get tomatometer() {
    if (this.rating >= 60) {
      return 'fresh';
    } else {
      return 'rotten';
    }
  }

}
