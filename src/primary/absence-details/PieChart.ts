import * as d3 from 'd3';

export interface Margins {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export const makeChart = (id: string, radius: number, margins: Margins) => {
  const svg = d3.select(`#${id}`);
  const pieWidth = radius * 2 - margins.right - margins.left;
  svg.append('g').attr('transform', 'translate(' + radius + ',' + radius + ')');
};

export const updateChart = (id: string, radius: number, data: number[], colors: string[]) => {
  const chartColors = d3.scaleOrdinal(colors);
  const g = d3.select(`#${id} > g`);
  const t = d3.transition().duration(250);
  const pie = d3.pie();

  const arc = d3
    .arc()
    .innerRadius(0)
    .outerRadius(radius);

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
};
