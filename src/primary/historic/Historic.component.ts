import * as d3 from 'd3';
import { Component, Inject, Vue, Watch } from 'vue-property-decorator';

import { AdministrativeDivisionHistory } from '@/domain/administrative-division-history/AdministrativeDivisionHistory';
import { AdministrativeDivisionHistoryRepository } from '@/domain/administrative-division-history/AdministrativeDivisionHistoryRepository';
import { AdministrativeDivisionTypes } from '@/domain/administrative-division/AdministrativeDivisionTypes';
import { Logger } from '@/domain/Logger';

@Component
export default class Historic extends Vue {
  interval: [number, number] = [0, 0];
  currentHistoryItems: AdministrativeDivisionHistory[] = [];

  @Inject()
  private logger!: () => Logger;

  @Inject()
  private administrativeDivisionHistoryRepository!: () => AdministrativeDivisionHistoryRepository;

  created() {
    this.administrativeDivisionHistoryRepository()
      .listForAdministrativeDivision(AdministrativeDivisionTypes.COUNTRY, '')
      .then(administrativeDivisionHistoryItems => {
        this.currentHistoryItems = administrativeDivisionHistoryItems;
        const start = this.currentHistoryItems.length - 15 < 0 ? 0 : this.currentHistoryItems.length - 15;
        this.interval = [start, this.currentHistoryItems.length - 1];
        this.makeChart(this.currentHistoryItems);
      })
      .catch(error => {
        this.error(error, AdministrativeDivisionTypes.COUNTRY, '');
      });
  }

  @Watch('interval')
  intervalWatcher() {
    const historyItems = this.currentHistoryItems.slice(this.interval[0], this.interval[1] + 1);
    this.updateChart(historyItems);
  }

  private error(error: Error, type: AdministrativeDivisionTypes, entityId: string): void {
    this.logger().error(
      `Fail to retrieve country, state or municipality history [${type}${entityId === '' ? '' : ` - ${entityId}`}]`,
      error
    );
  }

  private makeChart(historyItems: AdministrativeDivisionHistory[]) {
    const margin = { top: 20, right: 20, bottom: 80, left: 40 };
    const svg = d3.select('#historic-chart');
    const width = 1200 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const parseDate = d3.timeFormat('%d/%m');

    const x = d3
      .scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.05);

    const y = d3.scaleLinear().range([height, 0]);

    const xAxis = d3.axisBottom(x).tickFormat(d => parseDate(new Date(d)));
    const yAxis = d3.axisLeft(y).ticks(10);

    const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    x.domain(historyItems.map(d => d.date));
    y.domain([0, 50]);

    g.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('transform', 'rotate(-45)');

    g.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr('y', -18)
      .attr('x', 20)
      .attr('dy', '.71em')
      .style('text-anchor', 'middle')
      .style('fill', '#000')
      .text('Número de escuelas');

    this.updateChart(historyItems);
  }

  updateChart(historyItems: AdministrativeDivisionHistory[]) {
    const margin = { top: 20, right: 20, bottom: 80, left: 40 };
    const width = 1200 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const parseDate = d3.timeFormat('%d/%m');

    const x = d3
      .scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.05);

    const y = d3.scaleLinear().range([height, 0]);

    const xAxis = d3.axisBottom(x).tickFormat(d => parseDate(new Date(d)));

    x.domain(historyItems.map(d => d.date));
    y.domain([0, 50]);

    const yAxis = d3.axisLeft(y).ticks(10);

    const g = d3.select('#historic-chart > g');
    const t = d3.transition().duration(250);

    g.select('.x')
      .transition(t as any)
      .call(xAxis as any)
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('transform', 'rotate(-45)');

    const selection = g.selectAll('.bar').data(historyItems);

    selection
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .style('fill', '#bfbfbf')
      .attr('x', d => x(d.date) as any)
      .attr('width', x.bandwidth())
      .attr('y', d => y(d.openSchools))
      .attr('height', d => height - y(d.openSchools));

    selection
      .transition(t as any)
      .attr('x', d => x(d.date) as any)
      .attr('width', x.bandwidth())
      .attr('y', d => y(d.openSchools))
      .attr('height', d => height - y(d.openSchools));

    selection
      .exit()
      .transition(t as any)
      .remove();
  }

  tooltipLabel(index: number) {
    const parseDate = d3.timeFormat('%d/%m');
    return parseDate(new Date(this.currentHistoryItems[index].date));
  }
}
