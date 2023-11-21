import { Component, Vue, Prop } from 'vue-facing-decorator';

@Component
export default class SidebarLink extends Vue {

  @Prop() to!: string;
  @Prop() icon!: string;
  @Prop() label!: string;
  
}
