import { Feature, Map, View } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { Polygon } from 'ol/geom';
import { transform } from 'ol/proj';
import { Style } from 'ol/style';

import { RateType } from '@/primary/choropleth-map/RateType';
import { featureRateColors } from '@/primary/choropleth-map/featureRateColors';
import { createMunicipalitiesStyleFunction } from '@/primary/choropleth-map/styles/municipalities/createMunicipalitiesStyleFunction';

const coordinates = [
  [-10, 0],
  [0, 10],
  [10, 0],
  [0, -10],
].map((coordinates: number[]): Coordinate => transform(coordinates, 'EPSG:4326', 'EPSG:3857'));

const createFeature = (rate: RateType) =>
  new Feature({
    geometry: new Polygon([coordinates]),
    rate,
  });

const view = new View({ maxZoom: 19, minZoom: 0, zoom: 10 });
const map = new Map({ view });

const expectGreyFill = (style: Style | undefined) => {
  expect(style?.getFill().getColor()).toEqual([224, 224, 224, 0.5]);
};

const expectColor = (rate: RateType, color: number[]) => {
  const feature = createFeature(rate);
  const styleFunction = createMunicipalitiesStyleFunction(map);
  const resolution = view.getResolutionForZoom(10);
  expect(
    styleFunction(feature, resolution)
      ?.getFill()
      .getColor()
  ).toEqual(color);
};

describe('createMunicipalitiesStyleFunction', () => {
  it('should not return style if zoom is lower or equal to 8', () => {
    const feature = createFeature(RateType.MEDIUM);
    const styleFunction = createMunicipalitiesStyleFunction(map);
    const resolution1 = view.getResolutionForZoom(8);
    const resolution2 = view.getResolutionForZoom(7);
    expect(styleFunction(feature, resolution1)).toBeUndefined();
    expect(styleFunction(feature, resolution2)).toBeUndefined();
  });

  it('should return style according to school attendance rate', () => {
    expectColor(RateType.UNKNOWN, [...featureRateColors[RateType.UNKNOWN], 0.5]);
    expectColor(RateType.VERY_LOW, [...featureRateColors[RateType.VERY_LOW], 0.5]);
    expectColor(RateType.LOW, [...featureRateColors[RateType.LOW], 0.5]);
    expectColor(RateType.MEDIUM, [...featureRateColors[RateType.MEDIUM], 0.5]);
    expectColor(RateType.HIGH, [...featureRateColors[RateType.HIGH], 0.5]);
    expectColor(RateType.VERY_HIGH, [...featureRateColors[RateType.VERY_HIGH], 0.5]);
  });
});
