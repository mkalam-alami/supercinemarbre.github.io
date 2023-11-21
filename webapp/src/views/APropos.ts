import { Component, Vue } from 'vue-facing-decorator';

@Component({})
export default class APropos extends Vue {

  mounted() {
    window.scrollTo(0, 0);
  }
  
}
