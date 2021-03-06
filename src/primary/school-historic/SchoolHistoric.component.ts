import * as d3 from 'd3';
import { Component, Inject, Prop, Vue, Watch } from 'vue-property-decorator';

import { SchoolDailyReport } from '@/domain/school-daily-report/SchoolDailyReport';
import { HistoricInfoModalVue } from '@/primary/historic-info-modal';
import { HistoricChart } from '@/primary/HistoricChart';
import { HistoricType } from '@/primary/HistoricType';
import { toSchoolHistoricDataSet } from '@/primary/school-historic/SchoolHistoricDataSet';

@Component({
  components: { HistoricInfoModalVue },
})
export default class SchoolHistoric extends Vue {
  @Inject()
  historicChart!: () => HistoricChart;

  @Prop()
  readonly schoolDailyReports!: SchoolDailyReport[];

  @Prop()
  readonly historicType!: HistoricType;

  @Prop({ default: false, required: false })
  readonly printable!: boolean;

  @Prop()
  readonly historicInterval!: [number, number];

  get animationDuration() {
    return this.printable ? 0 : 250;
  }

  get schoolHistoricDataSet() {
    return toSchoolHistoricDataSet(this.schoolDailyReports, this.historicType, this.animationDuration);
  }

  @Watch('schoolHistoricDataSet')
  schoolHistoricDataSetWatcher() {
    this.update();
  }

  @Watch('historicInterval')
  intervalWatcher() {
    this.update();
  }

  mounted() {
    const data = this.schoolHistoricDataSet.chartData.slice(this.historicInterval[0], this.historicInterval[1] + 1);
    if (this.printable) {
      const callback = () => this.$emit('imageready');
      this.historicChart().transformStackedBarChartToImage(
        'historic-stacked-chart',
        data,
        this.schoolHistoricDataSet.chartOptions,
        callback
      );
    } else {
      this.historicChart().makeStackedBarChart('historic-stacked-chart', data, this.schoolHistoricDataSet.chartOptions);
    }
  }

  update() {
    const data = this.schoolHistoricDataSet.chartData.slice(this.historicInterval[0], this.historicInterval[1] + 1);
    if (!this.printable) {
      this.historicChart().updateStackedChart('historic-stacked-chart', data, this.schoolHistoricDataSet.chartOptions);
    }
  }

  tooltipLabel(index: number) {
    const parseDate = d3.timeFormat('%d/%m');
    return parseDate(new Date(this.schoolHistoricDataSet.chartData[index].date));
  }
}
