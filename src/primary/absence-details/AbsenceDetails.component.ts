import * as d3 from 'd3';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import { AdministrativeDivision } from '@/domain/administrative-division/AdministrativeDivision';
import { School } from '@/domain/school/School';
import { toAdministrativeDivisionDataset } from '@/primary/common/AdministrativeDivisionDataSet';
import { toSchoolDataSet } from '@/primary/common/SchoolDataSet';

@Component
export default class AbsenceReasonsDetails extends Vue {
  @Prop()
  administrativeDivision!: AdministrativeDivision;

  @Prop()
  school!: School;

  @Prop()
  administrativeDivisionLevel!: boolean;

  @Watch('dataSet')
  dataSetWatcher() {
    this.updateChart(this.dataSet);
  }

  get dataSet() {
    return this.administrativeDivisionLevel
      ? toAdministrativeDivisionDataset(this.administrativeDivision).studentAbsenceMainReasons
      : toSchoolDataSet(this.school).studentAbsenceMainReasons;
  }

  mounted() {
    this.makeChart();
    this.updateChart(toAdministrativeDivisionDataset(this.administrativeDivision).studentAbsenceMainReasons);
  }

  makeChart() {
    const svg = d3.select('#absence-details-chart');
    const margin = { top: 0, right: 0, bottom: 0, left: 0 };
    const width = 150 - margin.right - margin.left;
    const height = 150 - margin.top - margin.bottom;
    const radius = Math.min(width, height) / 2;
    svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + 75 + ')');
  }

  updateChart(dataset: { [key: string]: { text: string; value: number } }) {
    const data = [dataset['1'], dataset['2'], dataset['3'], dataset['4'], dataset['5']].map(d => d.value);

    const colors = d3.scaleOrdinal(['#b38e5d', '#9d2449', '#285c4d', '#C0C0C0', '#621132']);

    const g = d3.select('#absence-details-chart > g');
    const t = d3.transition().duration(250);

    const pie = d3.pie();

    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(75);

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
