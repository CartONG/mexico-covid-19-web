import * as d3 from 'd3';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class AttendanceCard extends Vue {
  @Prop({ default: 0 }) readonly value!: number;

  @Watch('value')
  valueWatcher(newValue: number, oldValue: number) {
    this.updateChart(newValue, oldValue);
  }

  mounted() {
    this.makeChart();
    this.updateChart(this.value);
  }

  makeChart() {
    const svg = d3.select('#chart');
    svg.append('g').attr('transform', 'translate(44, 44)');
  }

  updateChart(currentValue: number, formerValue = 0) {
    const g = d3.select('#chart > g');
    const t = d3.transition().duration(250);

    const colors = d3.scaleOrdinal(['#000', '#ccc']);

    const pie = d3.pie().sortValues(null);

    const arc = d3
      .arc()
      .innerRadius(40)
      .outerRadius(44);

    const formerPieData = pie([formerValue, 1 - formerValue]);
    const pieData = pie([currentValue, 1 - currentValue]);

    const selection = g.selectAll('path').data(pieData);

    const arcTween = (a: any, index: number) => {
      const i = d3.interpolate(formerPieData[index], a);
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

    g.selectAll('text')
      .data([currentValue * 100, '%'])
      .join('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.3em')
      .attr('dx', '2px')
      .style('font', '10px sans-serif')
      .style('max-width', '100%')
      .style('height', 'auto')
      .attr('text-anchor', (d, index) => (index === 0 ? 'end' : 'start'))
      .attr('fill', '#000')
      .text(d => d)
      .attr('transform', `scale(${40 / 15})`);

    selection
      .exit()
      .transition(t as any)
      .remove();
  }
}
