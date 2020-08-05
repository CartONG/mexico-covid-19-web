import * as d3 from 'd3';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import { AdministrativeDivisionDailyReport } from '@/domain/administrative-division-daily-report/AdministrativeDivisionDailyReport';
import { toAdministrativeDivisionHistoricDataSet } from '@/primary/administrative-division-historic/AdministrativeDivisionHistoricDataSet';
import { makeCanvasStackedBarChart, makeStackedBarChart, updateStackedChart } from '@/primary/HistoricChart';
import { HistoricType } from '@/primary/HistoricType';

@Component
export default class Historic extends Vue {
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
      makeCanvasStackedBarChart('historic-stacked-chart', data, this.administrativeDivisionHistoricDataSet.chartOptions);
    } else {
      makeStackedBarChart('historic-stacked-chart', data, this.administrativeDivisionHistoricDataSet.chartOptions);
    }
  }

  update() {
    const data = this.administrativeDivisionHistoricDataSet.chartData.slice(this.historicInterval[0], this.historicInterval[1] + 1);
    if (!this.printable) {
      updateStackedChart('historic-stacked-chart', data, this.administrativeDivisionHistoricDataSet.chartOptions);
    }
  }

  tooltipLabel(index: number) {
    const parseDate = d3.timeFormat('%d/%m');
    return parseDate(new Date(this.administrativeDivisionHistoricDataSet.chartData[index].date));
  }
}
