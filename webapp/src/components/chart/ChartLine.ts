import { generateId } from '@/services/utils.service';
import Chartist, { IChartistLineChart } from 'chartist';
import { Component, Prop, Vue, Watch } from 'vue-facing-decorator';

@Component({})
export default class ChartLine extends Vue {

  @Prop() labels: string[];
  @Prop() series: number[][];
  @Prop() height;

  id = generateId();
  chart = {} as IChartistLineChart;

  async created() {
    await this.$nextTick();
    this.refresh();
  }

  @Watch("labels")
  @Watch("series")
  refresh() {
    if (this.chart.detach) {
      this.chart.detach();  
    }
    this.chart = new Chartist.Line('#' + this.id, {
      series: this.series,
      labels: this.labels
    }, {
      height: this.height || 200
    });
  }
}

