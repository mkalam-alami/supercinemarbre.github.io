import { Episode, Movie } from '@/types';
import { Component, Vue, Prop } from 'vue-facing-decorator';

@Component
export default class TimestampLink extends Vue {

  @Prop() episode!: Episode;
  @Prop() movie!: Movie;
  @Prop() textOnly: boolean;
  @Prop() showTimestamp: boolean;
  
  timestamp(time: number) {
    if (time) {
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor(time / 60) % 60;
      const seconds = time % 60;

      const minSec = `${this.leftPad(minutes)}:${this.leftPad(seconds)}`;
      if (hours > 0) {
        return `${hours}:${minSec}`;
      }
      return minSec;
    } else {
      return '';
    }
  }
    
  private leftPad(number: number) {
    let result = number.toString();
    while (result.length < 2) {
      result = '0' + result;
    }
    return result;
  }

}
