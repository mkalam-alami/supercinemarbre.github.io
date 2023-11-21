import { Component, Vue, Prop } from 'vue-facing-decorator';

@Component
export default class RatingMetacritic extends Vue {

  @Prop() rating?: number;

  get isValid() {
    return typeof this.rating === 'number';
  }

  get color() {
    if (this.rating > 60) {
      return 'green';
    } else if (this.rating > 40) {
      return 'orange';
    } else {
      return 'red';
    }
  }

}
