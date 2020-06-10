import { Feature, Map, View } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { Polygon } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import { transform } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import { Style } from 'ol/style';

import { RateType } from '@/primary/choropleth-map/RateType';
import { createMunicipalitiesStyleFunction } from '@/primary/choropleth-map/styles/municipalities/createMunicipalitiesStyleFunction';
import { selectStyleFunction } from '@/primary/choropleth-map/styles/select/selectStyleFunction';
import { createStatesStyleFunction } from '@/primary/choropleth-map/styles/states/createStatesStyleFunction';

const coordinates = [
  [-10, 0],
  [0, 10],
  [10, 0],
  [0, -10],
].map((coordinates: number[]): Coordinate => transform(coordinates, 'EPSG:4326', 'EPSG:3857'));

const view = new View({ maxZoom: 19, minZoom: 0, zoom: 6 });
const map = new Map({ view });

const stateFeature = new Feature({ geometry: new Polygon([coordinates]), rate: RateType.MEDIUM });
const municipalityFeature = new Feature({ geometry: new Polygon([coordinates]) });

const stateLayer = new VectorLayer({ source: new VectorSource({ features: [stateFeature] }), style: createStatesStyleFunction(map) });

const municipalityLayer = new VectorLayer({
  source: new VectorSource({ features: [municipalityFeature] }),
  style: createMunicipalitiesStyleFunction(map),
});

describe('createSelectStyleFunction', () => {
  it('should return an array of style if the selected feature is a state', () => {
    const styleFunction = selectStyleFunction(stateLayer, municipalityLayer);
    expect(styleFunction(stateFeature, view.getResolutionForZoom(6))).toHaveLength(2);
  });

  it('should return a single style if the selected feature is a municipality', () => {
    const styleFunction = selectStyleFunction(stateLayer, municipalityLayer);
    expect(styleFunction(municipalityFeature, view.getResolutionForZoom(6))).toBeInstanceOf(Style);
  });
});
