import * as d3 from 'd3';
import { Component, Inject, Vue, Watch } from 'vue-property-decorator';

import { AppStore } from '@/primary/app/AppStore';
import { toAdministrativeDivisionDataset } from '@/primary/common/AdministrativeDivisionDataSet';
import { toSchoolDataSet } from '@/primary/common/SchoolDataSet';

@Component
export default class AbsenceReasonsDetails extends Vue {
  @Inject()
  private appStore!: () => AppStore;

  get navigation() {
    return this.appStore().getNavigation();
  }

  get administrativeDivision() {
    return this.appStore().getCurrentAdministrativeDivision();
  }

  get school() {
    return this.appStore().getSchool();
  }

  get dataSet() {
    return this.navigation.schoolId
      ? toSchoolDataSet(this.school).studentAbsenceMainReasons
      : toAdministrativeDivisionDataset(this.administrativeDivision).studentAbsenceMainReasons;
  }

  @Watch('dataSet')
  dataSetWatcher() {
    this.updateChart(this.dataSet);
  }

  mounted() {
    this.makeChart();
    this.updateChart(toAdministrativeDivisionDataset(this.administrativeDivision).studentAbsenceMainReasons);
  }

  makeChart() {
    const svg = d3.select('#absence-reasons-details-chart');
    const margin = { top: 0, right: 0, bottom: 0, left: 0 };
    const width = 150 - margin.right - margin.left;
    const height = 150 - margin.top - margin.bottom;
    const radius = Math.min(width, height) / 2;
    svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + 65 + ')');
  }

  updateChart(dataset: { [key: string]: { text: string; value: number } }) {
    const data = [dataset['1'], dataset['2'], dataset['3'], dataset['4'], dataset['5']].map(d => d.value);

    const colors = d3.scaleOrdinal([
      'rgba(212, 193, 156, 0.7)',
      'rgba(157, 36, 73, 0.7)',
      'rgba(40, 92, 77, 0.7)',
      'rgba(191, 191, 191, 0.7)',
      'rgba(98, 17, 50, 0.7)',
    ]);

    const g = d3.select('#absence-reasons-details-chart > g');
    const t = d3.transition().duration(250);

    const pie = d3.pie();

    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(65);

    const pieData = pie(data);
    const selection = g.selectAll('path').data(pieData);

    const arcTween = (a: any) => {
      const i = d3.interpolate({ data: 0, index: 0, value: 0, startAngle: 0, endAngle: 0, padAngle: 0 }, a);
      return (t: any) => arc(i(t));
    };

    selection
      .transition()
      .duration(500)
      .attrTween('d', arcTween as any);

    selection
      .enter()
      .append('path')
      .attr('fill', (d, i) => colors(i.toString()))
      .attr('d', arc as any)
      .attr('stroke', 'white')
      .attr('stroke-width', '1px');

    selection
      .exit()
      .transition(t as any)
      .remove();
  }
}
