import * as d3 from 'd3';

import { transformToImage } from '@/primary/chart/ChartUtils';

export interface HistoricChartOptions {
  colors: string[];
  stackedKeys: string[];
  name: string;
  legend: { text: string; color: string }[];
  animationDuration: number;
}

const WIDTH = 1200;
const HEIGHT = 400;
const MARGIN_TOP = 35;
const MARGIN_RIGHT = 20;
const MARGIN_BOTTOM = 80;
const MARGIN_LEFT = 40;

const locale = {
  dateTime: '%A, %e de %B de %Y, %X',
  date: '%d/%m/%Y',
  time: '%H:%M:%S',
  periods: ['AM', 'PM'],
  days: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
  shortDays: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
  months: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
  shortMonths: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
};

d3.timeFormatDefaultLocale(locale as any);

export const transformStackedBarChartToImage = (
  selectorId: string,
  data: { [key: string]: any }[],
  options: HistoricChartOptions,
  callback: () => void
) => {
  makeStackedBarChart(selectorId, data, options);
  transformToImage(selectorId, callback);
};

const parseDate = d3.timeFormat('%e de %B');

const tickFormat = (length: number): ((d: any, index: number) => string) => {
  const step = Math.trunc(length / 60) + 1;
  return (d: any, index: number) => (index % step === 0 ? parseDate(new Date(d)) : '');
};

export const makeStackedBarChart = (selectorId: string, data: { [key: string]: any }[], options: HistoricChartOptions) => {
  const chartWidth = WIDTH - MARGIN_LEFT - MARGIN_RIGHT;
  const chartHeight = HEIGHT - MARGIN_TOP - MARGIN_BOTTOM;

  d3.select(`#${selectorId} > svg`).remove();
  const container = d3.select(`#${selectorId}`);

  const svg = container
    .append('svg')
    .attr('width', WIDTH)
    .attr('height', HEIGHT)
    .attr('viewBox', `0 0 ${WIDTH} ${HEIGHT}`)
    .attr('preserveAspectRatio', 'xMinYMid meet')
    .attr('class', 'is-full-width has-height-auto');

  const g = svg.append('g').attr('transform', `translate(${MARGIN_LEFT},${MARGIN_TOP})`);

  const x = d3
    .scaleBand()
    .rangeRound([0, chartWidth])
    .paddingInner(0.05);

  const y = d3.scaleLinear().range([chartHeight, 0]);

  const format = tickFormat(data.length);

  const xAxis = d3.axisBottom(x).tickFormat(format);

  const yAxis = d3
    .axisLeft(y)
    .ticks(10)
    .tickFormat(d => `${d}%`);

  x.domain(data.map(d => d.date));

  y.domain([0, 100]);

  g.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + chartHeight + ')')
    .call(xAxis)
    .selectAll('text')
    .style('text-anchor', 'end')
    .attr('dx', '-.8em')
    .attr('transform', 'rotate(-45)');

  const yAxisSelector = g
    .append('g')
    .attr('class', 'y-axis')
    .call(yAxis);

  const text = yAxisSelector
    .append('text')
    .attr('class', 'y-axis-title')
    .attr('y', -30)
    .attr('x', -20)
    .attr('dy', '.71em')
    .style('text-anchor', 'start')
    .style('fill', '#363636')
    .style('font', '11px Montserrat-Regular, sans-serif')
    .text(options.name);

  updateStackedChart(selectorId, data, options);
};

export const updateStackedChart = (selectorId: string, data: { [key: string]: any }[], options: HistoricChartOptions) => {
  const chartWidth = WIDTH - MARGIN_LEFT - MARGIN_RIGHT;
  const chartHeight = HEIGHT - MARGIN_TOP - MARGIN_BOTTOM;
  const svg = d3.select(`#${selectorId} > svg`);
  const g = d3.select(`#${selectorId} > svg > g`);
  const group = svg.selectAll('g.layer').data(d3.stack().keys(options.stackedKeys)(data as any), (d: any) => d.key);
  const t = d3.transition().duration(options.animationDuration);

  const x = d3
    .scaleBand()
    .rangeRound([0, chartWidth])
    .paddingInner(0.05);

  const y = d3.scaleLinear().range([chartHeight, 0]);

  x.domain(data.map(d => d.date));
  y.domain([0, 100]);

  const z = d3
    .scaleOrdinal()
    .range(options.colors)
    .domain(options.stackedKeys);

  const format = tickFormat(data.length);

  const xAxis = d3.axisBottom(x).tickFormat(format);

  g.select('.x')
    .transition(t as any)
    .call(xAxis as any)
    .selectAll('text')
    .style('text-anchor', 'end')
    .attr('dx', '-.8em')
    .attr('transform', 'rotate(-45)');

  const yAxisSelector = d3.select(`#${selectorId} > svg g.y-axis`);
  const yAxisTitle = d3.select(`#${selectorId} > svg text.y-axis-title`).text(options.name) as any;
  const textLength = yAxisTitle.node()!.getComputedTextLength();
  let xLegend = textLength + 20;

  d3.selectAll(`#${selectorId} > svg text.legend-text`).remove();
  d3.selectAll(`#${selectorId} > svg rect.legend-color`).remove();

  options.legend.forEach(legendItem => {
    yAxisSelector
      .append('rect')
      .attr('class', 'legend-color')
      .attr('y', -32)
      .attr('x', xLegend)
      .attr('width', 10)
      .attr('height', 10)
      .style('fill', legendItem.color);

    xLegend += 15;

    const text = yAxisSelector
      .append('text')
      .attr('class', 'legend-text')
      .attr('y', -30)
      .attr('x', xLegend)
      .attr('dy', '.71em')
      .style('text-anchor', 'start')
      .style('fill', '#363636')
      .style('font', '10px Montserrat-Regular, sans-serif')
      .text(legendItem.text);

    xLegend += text.node()!.getComputedTextLength() + 15;
  });

  group
    .enter()
    .append('g')
    .attr('transform', `translate(${MARGIN_LEFT},${MARGIN_TOP})`)
    .classed('layer', true)
    .attr('fill', d => z(d.key) as any);

  group.exit().remove();

  const bars = svg
    .selectAll('g.layer')
    .selectAll('rect')
    .data(
      (d: any) => d,
      (e: any) => e.data.date
    );

  bars
    .enter()
    .append('rect')
    .merge(bars as any)
    .attr('x', (d: any) => x(d.data.date) as any)
    .attr('width', x.bandwidth())
    .attr('y', (d: any) => y(d[1]))
    .attr('height', (d: any) => y(d[0]) - y(d[1]));

  bars
    .exit()
    .transition(t as any)
    .remove();
};
