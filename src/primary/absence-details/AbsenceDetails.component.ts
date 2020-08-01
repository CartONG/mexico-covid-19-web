import * as d3 from 'd3';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import { AdministrativeDivision } from '@/domain/administrative-division/AdministrativeDivision';
import { AttendanceType } from '@/domain/AttendanceType';
import { School } from '@/domain/school/School';
import { toAbsenceDetailsDataSet } from '@/primary/absence-details/AbsenceDetailsDataSet';

@Component
export default class AbsenceReasonsDetails extends Vue {
  @Prop()
  readonly administrativeDivision!: AdministrativeDivision;

  @Prop()
  readonly school!: School;

  @Prop()
  readonly administrativeDivisionLevel!: boolean;

  @Prop()
  readonly attendanceType!: AttendanceType;

  @Watch('absenceDetailsDataSet')
  absenceDetailsDataSetWatcher() {
    this.updateChart(this.absenceDetailsDataSet.chart.data, this.absenceDetailsDataSet.chart.colors);
  }

  get absenceDetailsDataSet() {
    const absenceDetails = this.administrativeDivisionLevel ? this.administrativeDivision : this.school;
    return toAbsenceDetailsDataSet(absenceDetails, this.attendanceType);
  }

  mounted() {
    this.makeChart();
    this.updateChart(this.absenceDetailsDataSet.chart.data, this.absenceDetailsDataSet.chart.colors);
  }

  change(attendanceType: AttendanceType) {
    this.$emit('change', attendanceType);
  }

  makeChart() {
    const svg = d3.select('#absence-details-chart');
    const margin = { top: 0, right: 0, bottom: 0, left: 0 };
    const width = 150 - margin.right - margin.left;
    svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + 75 + ')');
  }

  updateChart(data: number[], colors: string[]) {
    const chartColors = d3.scaleOrdinal(colors);
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
      .attr('fill', (d, i) => chartColors(i.toString()))
      .attr('d', arc as any)
      .attr('stroke', 'white')
      .attr('stroke-width', '1px');

    selection
      .exit()
      .transition(t as any)
      .remove();
  }
}
