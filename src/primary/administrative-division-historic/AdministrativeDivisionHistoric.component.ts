import * as d3 from 'd3';
import { Component, Inject, Prop, Vue, Watch } from 'vue-property-decorator';

import { AdministrativeDivisionDailyReport } from '@/domain/administrative-division-daily-report/AdministrativeDivisionDailyReport';
import { toAdministrativeDivisionHistoricDataSet } from '@/primary/administrative-division-historic/AdministrativeDivisionHistoricDataSet';
import { HistoricInfoModalVue } from '@/primary/historic-info-modal';
import { HistoricChart } from '@/primary/HistoricChart';
import { HistoricType } from '@/primary/HistoricType';

@Component({
  components: { HistoricInfoModalVue },
})
export default class Historic extends Vue {
  @Inject()
  historicChart!: () => HistoricChart;

  @Prop()
  readonly administrativeDivisionDailyReports!: AdministrativeDivisionDailyReport[];

  @Prop()
  readonly historicType!: HistoricType;

  @Prop({ default: false, required: false })
  readonly printable!: boolean;

  @Prop()
  readonly historicInterval!: [number, number];

  get animationDuration() {
    return this.printable ? 0 : 250;
  }

  get administrativeDivisionHistoricDataSet() {
    return toAdministrativeDivisionHistoricDataSet(this.administrativeDivisionDailyReports, this.historicType, this.animationDuration);
  }

  @Watch('administrativeDivisionHistoricDataSet')
  administrativeDivisionHistoricDataSetWatcher() {
    this.update();
  }

  @Watch('historicInterval')
  intervalWatcher() {
    this.update();
  }

  mounted() {
    const data = this.administrativeDivisionHistoricDataSet.chartData.slice(this.historicInterval[0], this.historicInterval[1] + 1);
    if (this.printable) {
      const callback = () => this.$emit('imageready');
      this.historicChart().transformStackedBarChartToImage(
        'historic-stacked-chart',
        data,
        this.administrativeDivisionHistoricDataSet.chartOptions,
        callback
      );
    } else {
      this.historicChart().makeStackedBarChart('historic-stacked-chart', data, this.administrativeDivisionHistoricDataSet.chartOptions);
    }
  }

  update() {
    const data = this.administrativeDivisionHistoricDataSet.chartData.slice(this.historicInterval[0], this.historicInterval[1] + 1);
    if (!this.printable) {
      this.historicChart().updateStackedChart('historic-stacked-chart', data, this.administrativeDivisionHistoricDataSet.chartOptions);
    }
  }

  tooltipLabel(index: number) {
    const parseDate = d3.timeFormat('%d/%m');
    return parseDate(new Date(this.administrativeDivisionHistoricDataSet.chartData[index].date));
  }
}
