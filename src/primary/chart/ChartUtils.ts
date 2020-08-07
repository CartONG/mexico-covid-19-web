import * as d3 from 'd3';

export const transformToImage = (selectorId: string, callback: () => void) => {
  const svg = d3.select(`#${selectorId} > svg`);
  const svgString = getSVGString(svg.node() as HTMLElement);
  svgString2Image(selectorId, svgString, 2 * 1200, 2 * 400, callback);
};

const getSVGString = (svgNode: HTMLElement) => {
  const serializer = new XMLSerializer();
  svgNode.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
  let svgString = serializer.serializeToString(svgNode);
  svgString = svgString.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink='); // Fix root xlink without namespace
  svgString = svgString.replace(/NS\d+:href/g, 'xlink:href'); // Safari NS namespace fix
  return svgString;
};

const svgString2Image = (selectorId: string, svgString: any, width: number, height: number, callback: () => void) => {
  const imgsrc = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString))); // Convert SVG string to data URL
  d3.select(`#${selectorId} > svg`).remove();
  d3.select(`#${selectorId} > svg`).remove();
  const image = new Image();
  image.width = width;
  image.height = height;
  image.onload = function() {
    document.querySelector(`#${selectorId}`)!.append(image);
    callback();
  };
  image.src = imgsrc;
};
