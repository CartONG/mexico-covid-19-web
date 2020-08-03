import * as d3 from 'd3';

export const makeCanvasStackedBarChart = (selectorId: string, data: { [key: string]: any }[], stackedKeys: string[]) => {
  makeStackedBarChart(selectorId, data, stackedKeys);
  const svg = d3.select(`#${selectorId} > svg`);

  const svgString = getSVGString(svg.node() as HTMLElement);
  svgString2Image(selectorId, svgString, 2 * 1200, 2 * 400);
};

const getSVGString = (svgNode: HTMLElement) => {
  const serializer = new XMLSerializer();
  svgNode.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
  let svgString = serializer.serializeToString(svgNode);
  svgString = svgString.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink='); // Fix root xlink without namespace
  svgString = svgString.replace(/NS\d+:href/g, 'xlink:href'); // Safari NS namespace fix
  return svgString;
};

const svgString2Image = (selectorId: string, svgString: any, width: number, height: number) => {
  var imgsrc = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString))); // Convert SVG string to data URL

  // var canvas = document.createElement('canvas');
  // var context = canvas.getContext('2d') as any;

  // canvas.width = width / 2;
  // canvas.height = height / 2;

  d3.select(`#${selectorId} > svg`).remove();
  d3.select(`#${selectorId} > svg`).remove();
  // container.append(canvas);

  var image = new Image();
  image.width = width;
  image.height = height;
  image.onload = function() {
    // context.clearRect(0, 0, width / 2, height / 2);
    // context.drawImage(image, 0, 0, width / 2, height / 2);
    document.querySelector(`#${selectorId}`)!.append(image);

    /*
    canvas.toBlob(function(blob: any) {
      var filesize = Math.round(blob.length / 1024) + ' KB';
      document.querySelector(`#${selectorId}`)!.append(image);
      if (callback) callback(blob, filesize);
    });
     */
  };

  image.src = imgsrc;
};

const WIDTH = 1200;
const HEIGHT = 400;
const MARGIN_TOP = 20;
const MARGIN_RIGHT = 20;
const MARGIN_BOTTOM = 80;
const MARGIN_LEFT = 40;

export const makeStackedBarChart = (selectorId: string, data: { [key: string]: any }[], stackedKeys: string[], animationDuration = 0) => {
  const parseDate = d3.timeFormat('%d/%m');
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

  const xAxis = d3.axisBottom(x).tickFormat(d => parseDate(new Date(d)));
  const yAxis = d3.axisLeft(y).ticks(10);

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

  g.append('g')
    .attr('class', 'y axis')
    .call(yAxis)
    .append('text')
    .attr('y', -18)
    .attr('x', 20)
    .attr('dy', '.71em')
    .style('text-anchor', 'middle')
    .style('fill', '#000')
    .text('');

  updateStackedChart(selectorId, data, stackedKeys, animationDuration);
};

export const updateStackedChart = (selectorId: string, data: { [key: string]: any }[], stackedKeys: string[], animationDuration = 0) => {
  const chartWidth = WIDTH - MARGIN_LEFT - MARGIN_RIGHT;
  const chartHeight = HEIGHT - MARGIN_TOP - MARGIN_BOTTOM;
  const svg = d3.select(`#${selectorId} > svg`);
  const g = d3.select(`#${selectorId} > svg > g`);
  const group = svg.selectAll('g.layer').data(d3.stack().keys(stackedKeys)(data as any), (d: any) => d.key);
  const t = d3.transition().duration(animationDuration);
  const colors = stackedKeys.length == 1 ? ['#285c4d'] : ['#9d2449', '#285c4d'];

  const x = d3
    .scaleBand()
    .rangeRound([0, chartWidth])
    .paddingInner(0.05);

  const y = d3.scaleLinear().range([chartHeight, 0]);

  x.domain(data.map(d => d.date));
  y.domain([0, 100]);

  const z = d3
    .scaleOrdinal()
    .range(colors)
    .domain(stackedKeys);

  const parseDate = d3.timeFormat('%d/%m');

  const xAxis = d3.axisBottom(x).tickFormat(d => parseDate(new Date(d)));

  g.select('.x')
    .transition(t as any)
    .call(xAxis as any)
    .selectAll('text')
    .style('text-anchor', 'end')
    .attr('dx', '-.8em')
    .attr('transform', 'rotate(-45)');

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
