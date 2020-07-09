import { Fill, Stroke, Style } from 'ol/style';

import { colorName, colors } from '@/primary/choropleth-map/styles/colors';

export const enum stateStyleName {
  'NO_FILL' = 'NO_FILL',
  'LIGHT_GREY' = 'LIGHT_GREY',
  'RED' = 'RED',
  'LIGHT_RED' = 'LIGHT_RED',
  'ORANGE' = 'ORANGE',
  'LIGHT_GREEN' = 'LIGHT_GREEN',
  'GREEN' = 'GREEN',
}

const noFill = new Style({
  // stroke: new Stroke({ color: [77, 77, 77, 1], width: 3 }),
  stroke: new Stroke({ color: [255, 255, 255, 1], width: 6 }),
  fill: new Fill({ color: [255, 255, 255, 0] }),
  zIndex: 4,
});

const toStyle = (color: number[]) =>
  new Style({
    stroke: new Stroke({ color: '#fff', width: 1 }),
    fill: new Fill({ color: [...color, 1] }),
    zIndex: 2,
  });

export const stateStyles = {
  [stateStyleName.NO_FILL]: noFill,
  [stateStyleName.LIGHT_GREY]: toStyle(colors[colorName.LIGHT_GREY]),
  [stateStyleName.GREEN]: toStyle(colors[colorName.GREEN]),
  [stateStyleName.LIGHT_GREEN]: toStyle(colors[colorName.LIGHT_GREEN]),
  [stateStyleName.ORANGE]: toStyle(colors[colorName.ORANGE]),
  [stateStyleName.LIGHT_RED]: toStyle(colors[colorName.LIGHT_RED]),
  [stateStyleName.RED]: toStyle(colors[colorName.RED]),
};
