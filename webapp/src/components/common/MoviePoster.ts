import { Episode, Movie } from '@/types';
import { Component, Prop, Vue } from 'vue-facing-decorator';
import TimestampLink from './TimestampLink.vue';

@Component({
  components: {
    TimestampLink
  }
})
export default class MoviePoster extends Vue {

  @Prop() episode!: Episode;
  @Prop() movie!: Movie;
  @Prop() hideTimestamp?: string;

  ellipsis(text: string, max: number) {
    if (text.length > max) {
      let result = '';
      for (const word of text.split(' ')) {
        if (result.length + word.length < max - 5) {
          result += ' ' + word;
        } else {
          return result + '[...]';
        }
      }
    }
    return text;
  }

}
