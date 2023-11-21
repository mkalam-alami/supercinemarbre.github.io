import { Component, Vue, Prop } from 'vue-facing-decorator';

@Component
export default class RatingIMDB extends Vue {

  @Prop() votes?: number;

  get percentage() {
    const votes = this.votes || 0;
    return Math.pow(votes, 0.2) * 10 - 35;
  }

  get votesLabel() {
    if (this.votes > 1000) {
      const kVotes = ((this.votes || 0) / 1000);
      return `${kVotes.toFixed(0)}k votes`;
    } else {
      return `${this.votes} votes`;
    }
  }

}
