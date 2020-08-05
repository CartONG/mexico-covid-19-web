import * as d3 from 'd3';

const HEXA_COLORS: { [key: string]: string } = {
  'danger-darker': '#d91d20',
  danger: '#ee8336',
  warning: '#ffc400',
  success: '#97d356',
  'success-darker': '#1e9b47',
  unknown: '#7a7a7a',
};

export const makeChart = (selectorId: string, attendance: number, color: string, unknown: boolean, animationDuration: number) => {
  const container = d3.select(`#${selectorId}`);

  const svg = container
    .append('svg')
    .attr('width', 88)
    .attr('height', 88)
    .attr('viewBox', '0 0 88 88');
  // .attr('perserveAspectRatio', 'xMinYMid meet')
  // .attr('class', 'is-full-width has-height-auto');

  svg.append('g').attr('transform', 'translate(44, 44)');

  updateChart(selectorId, attendance, 0, color, unknown, animationDuration);
};

export const updateChart = (
  selectorId: string,
  attendance: number,
  formerAttendance: number,
  color: string,
  unknown: boolean,
  animationDuration: number
) => {
  const g = d3.select(`#${selectorId} > svg > g`);
  const t = d3.transition().duration(250);
  const pie = d3.pie().sortValues(null);

  const arc = d3
    .arc()
    .innerRadius(40)
    .outerRadius(44);

  const formerPieData = pie([formerAttendance, 1 - formerAttendance]);
  const pieData = pie([attendance, 1 - attendance]);
  const selection = g.selectAll('path').data(pieData);

  const arcTween = (a: any, index: number) => {
    const i = d3.interpolate(formerPieData[index], a);
    return (t: any) => arc(i(t));
  };

  selection
    .transition()
    .duration(animationDuration)
    .attr('fill', (d, i) => (i === 0 ? HEXA_COLORS[color] : '#dbdbdb'))
    .attrTween('d', arcTween as any);

  selection
    .enter()
    .append('path')
    .attr('fill', (d, i) => (i === 0 ? HEXA_COLORS[color] : '#dbdbdb'))
    .attr('d', arc as any)
    .attr('stroke', 'white')
    .attr('stroke-width', '1px');

  if (unknown) {
    g.selectAll('text')
      .attr('dy', '4px')
      .attr('dx', '0px')
      .style('font', '10px Montserrat-Regular, sans-serif')
      .style('max-width', '100%')
      .style('height', 'auto')
      .attr('text-anchor', 'middle')
      .attr('fill', HEXA_COLORS[color])
      .text('-')
      .attr('transform', `scale(${40 / 15})`);
  } else {
    g.selectAll('text')
      .data([Math.round(attendance * 100), '%'])
      .join('text')
      .attr('dy', '5px')
      .attr('dx', d => (attendance < 0.1 ? '2px' : attendance < 1 ? '5px' : '7px'))
      .style('font', (d, index) => `${index === 0 ? '10' : '6'}px Montserrat-Regular, sans-serif`)
      .style('max-width', '100%')
      .style('height', 'auto')
      .attr('text-anchor', (d, index) => (index === 0 ? 'end' : 'start'))
      .attr('fill', HEXA_COLORS[color])
      .text(d => d)
      .attr('transform', `scale(${40 / 15})`);
  }

  selection
    .exit()
    .transition(t as any)
    .remove();
};

export const makeCanvasChart = (selectorId: string, attendance: number, color: string, unknown: boolean) => {
  makeChart(selectorId, attendance, color, unknown, 0);
  const svg = d3.select(`#${selectorId} > svg`);

  const svgString = getSVGString(svg.node() as HTMLElement);
  svgString2Image(selectorId, svgString, 88, 88);
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
