import * as d3 from 'd3';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import { AttendanceDataSet } from '@/primary/common/AttendanceDataSet';
import { PercentageDataSet } from '@/primary/common/PercentageDataSet';

@Component
export default class AttendanceCard extends Vue {
  @Prop() readonly attendance!: AttendanceDataSet;
  @Prop({ default: false, required: false }) readonly light!: boolean;

  @Watch('attendance')
  valueWatcher(newAttendance: AttendanceDataSet, oldAttendance: AttendanceDataSet) {
    setTimeout(() => {
      this.updateChart(newAttendance.percentage, oldAttendance.percentage);
    }, 1000);
  }

  mounted() {
    this.makeChart();
    this.updateChart(this.attendance.percentage);
  }

  makeChart() {
    const svg = d3.select(`#${this.attendance.label}-attendance-chart`);
    svg.append('g').attr('transform', 'translate(44, 44)');
  }

  updateChart(percentage: PercentageDataSet, formerPercentage = { color: 'unknown', text: '0%', value: 0 }) {
    const g = d3.select(`#${this.attendance.label}-attendance-chart > g`);
    const t = d3.transition().duration(250);
    const pie = d3.pie().sortValues(null);

    const arc = d3
      .arc()
      .innerRadius(40)
      .outerRadius(44);

    const formerPieData = pie([formerPercentage.value, 1 - formerPercentage.value]);
    const pieData = pie([percentage.value, 1 - percentage.value]);
    const selection = g.selectAll('path').data(pieData);

    const arcTween = (a: any, index: number) => {
      const i = d3.interpolate(formerPieData[index], a);
      return (t: any) => arc(i(t));
    };

    selection
      .transition()
      .duration(500)
      .attr('class', (d, i) => (i === 0 ? `has-fill-${percentage.color}` : 'has-fill-unknown'))
      .attrTween('d', arcTween as any);

    selection
      .enter()
      .append('path')
      .attr('class', (d, i) => (i === 0 ? `has-fill-${percentage.color}` : 'has-fill-unknown'))
      .attr('d', arc as any)
      .attr('stroke', 'white')
      .attr('stroke-width', '1px');

    g.selectAll('text')
      .data([Math.round(percentage.value * 100), '%'])
      .join('text')
      .attr('text-anchor', 'baseline')
      .attr('dy', '5px')
      .attr('dx', d => (percentage.value < 0.1 ? '2px' : percentage.value < 1 ? '5px' : '7px'))
      .style('font', (d, index) => `${index === 0 ? '10' : '6'}px Montserrat-Regular, sans-serif`)
      .style('max-width', '100%')
      .style('height', 'auto')
      .attr('text-anchor', (d, index) => (index === 0 ? 'end' : 'start'))
      .attr('class', `has-fill-${percentage.color}`)
      .text(d => d)
      .attr('transform', `scale(${40 / 15})`);

    selection
      .exit()
      .transition(t as any)
      .remove();
  }
}
