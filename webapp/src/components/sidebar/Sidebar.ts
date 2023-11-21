import { Component, Vue } from 'vue-facing-decorator';
import SidebarLink from './SidebarLink.vue';

@Component({
  components: {
    SidebarLink
  }
})
export default class Sidebar extends Vue {

}
