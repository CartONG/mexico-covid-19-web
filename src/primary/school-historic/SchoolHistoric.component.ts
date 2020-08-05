import * as d3 from 'd3';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import { SchoolDailyReport } from '@/domain/school-daily-report/SchoolDailyReport';
import { makeCanvasStackedBarChart, makeStackedBarChart, updateStackedChart } from '@/primary/HistoricChart';
import { HistoricType } from '@/primary/HistoricType';
import { toSchoolHistoricDataSet } from '@/primary/school-historic/SchoolHistoricDataSet';

@Component
export default class SchoolHistoric extends Vue {
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
      makeCanvasStackedBarChart('historic-stacked-chart', data, this.schoolHistoricDataSet.chartOptions);
    } else {
      makeStackedBarChart('historic-stacked-chart', data, this.schoolHistoricDataSet.chartOptions);
    }
  }

  update() {
    const data = this.schoolHistoricDataSet.chartData.slice(this.historicInterval[0], this.historicInterval[1] + 1);
    if (!this.printable) {
      updateStackedChart('historic-stacked-chart', data, this.schoolHistoricDataSet.chartOptions);
    }
  }

  tooltipLabel(index: number) {
    const parseDate = d3.timeFormat('%d/%m');
    return parseDate(new Date(this.schoolHistoricDataSet.chartData[index].date));
  }
}
