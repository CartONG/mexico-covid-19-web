import * as d3 from 'd3';

import { AdministrativeDivisionHistory } from '@/domain/administrative-division-history/AdministrativeDivisionHistory';

export const makeChart = (selectorId: string, historyItems: AdministrativeDivisionHistory[]) => {
  const container = d3.select(`#${selectorId}`);

  const svg = container
    .append('svg')
    .attr('width', 1200)
    .attr('height', 400)
    .attr('viewBox', '0 0 1200 400')
    .attr('preserveAspectRatio', 'xMinYMid meet')
    .attr('class', 'is-full-width has-height-auto');

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
  const yAxis = d3.axisLeft(y).ticks(10);

  const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  x.domain(historyItems.map(d => d.date));
  y.domain([0, 100]);

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

  updateChart(selectorId, historyItems);
};

export const updateChart = (selectorId: string, historyItems: AdministrativeDivisionHistory[]) => {
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

  const g = d3.select(`#${selectorId} > svg > g`);
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
    .style('fill', '#d4c19c')
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
};

export const makeCanvasChart = (selectorId: string, historyItems: AdministrativeDivisionHistory[]) => {
  makeChart(selectorId, historyItems);
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
