import { Component, Vue, Prop } from 'vue-facing-decorator';

@Component
export default class Ordinal extends Vue {

  @Prop() value?: number;
  
}
