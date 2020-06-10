import { Fill, Stroke, Style } from 'ol/style';

import { colorName, colors } from '@/primary/choropleth-map/styles/colors';

export const enum municipalityStyleName {
  'NO_FILL' = 'NO_FILL',
  'LIGHT_GREY' = 'LIGHT_GREY',
  'RED' = 'RED',
  'LIGHT_RED' = 'LIGHT_RED',
  'ORANGE' = 'ORANGE',
  'LIGHT_GREEN' = 'LIGHT_GREEN',
  'GREEN' = 'GREEN',
}

const noFill = new Style({
  stroke: new Stroke({ color: [77, 77, 77, 0.8], width: 3 }),
  fill: new Fill({ color: [255, 255, 255, 0] }),
  zIndex: 2,
});

const toStyle = (color: number[]) =>
  new Style({
    stroke: new Stroke({ color: '#fff', width: 1 }),
    fill: new Fill({ color: [...color, 0.5] }),
    zIndex: 1,
  });

export const municipalityStyles = {
  [municipalityStyleName.NO_FILL]: noFill,
  [municipalityStyleName.LIGHT_GREY]: toStyle(colors[colorName.LIGHT_GREY]),
  [municipalityStyleName.GREEN]: toStyle(colors[colorName.GREEN]),
  [municipalityStyleName.LIGHT_GREEN]: toStyle(colors[colorName.LIGHT_GREEN]),
  [municipalityStyleName.ORANGE]: toStyle(colors[colorName.ORANGE]),
  [municipalityStyleName.LIGHT_RED]: toStyle(colors[colorName.LIGHT_RED]),
  [municipalityStyleName.RED]: toStyle(colors[colorName.RED]),
};
