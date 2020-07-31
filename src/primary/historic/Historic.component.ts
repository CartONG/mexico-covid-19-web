import * as d3 from 'd3';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import { AdministrativeDivisionHistory } from '@/domain/administrative-division-history/AdministrativeDivisionHistory';
import { makeCanvasChart, makeChart, updateChart } from '@/primary/HistoricChart';

@Component
export default class Historic extends Vue {
  interval: [number, number] = [0, 0];

  @Prop()
  readonly historyItems!: AdministrativeDivisionHistory[];

  @Prop({ default: false, required: false })
  readonly printable!: boolean;

  mounted() {
    const start = this.historyItems.length - 15 < 0 ? 0 : this.historyItems.length - 15;
    this.interval = [start, this.historyItems.length - 1];

    if (this.printable) {
      makeCanvasChart('historic-chart', this.historyItems);
    } else {
      makeChart('historic-chart', this.historyItems);
    }
  }

  @Watch('interval')
  intervalWatcher() {
    const historyItems = this.historyItems.slice(this.interval[0], this.interval[1] + 1);
    if (!this.printable) {
      updateChart('historic-chart', historyItems);
    }
  }

  tooltipLabel(index: number) {
    const parseDate = d3.timeFormat('%d/%m');
    return parseDate(new Date(this.historyItems[index].date));
  }
}
