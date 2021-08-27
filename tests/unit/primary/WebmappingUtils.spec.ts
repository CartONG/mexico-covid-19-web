import sinon from 'sinon';

import { Feature, Map, Overlay, View } from 'ol';
import { Polygon } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import { transformExtent } from 'ol/proj';
import { Cluster } from 'ol/source';
import VectorSource from 'ol/source/Vector';

import {
  createClusterLayer,
  createMap,
  createPopup,
  createVectorLayer,
  fitFeature,
  parseTopoJson,
  setClusterLayerFeature,
  setLayerFeature,
} from '@/primary/WebmappingUtils';

const polygonFeature = () =>
  new Feature({
    geometry: new Polygon([
      [
        [-5e6, 6e6],
        [-5e6, 8e6],
        [-3e6, 8e6],
        [-3e6, 6e6],
        [-5e6, 6e6],
      ],
    ]),
  });

const makeEvent = (eventType: string, properties: any = {}) => ({
  target: undefined,
  type: eventType,
  preventDefault: () => {},
  stopPropagation: () => {},
  ...properties,
});

describe('WebmappingUtils', () => {
  it('should parse topojson data', () => {
    const topology = {
      type: 'Topology',
      transform: {
        scale: [1, 1],
        translate: [0, 0],
      },
      objects: {
        'two-squares': {
          type: 'GeometryCollection',
          geometries: [
            { type: 'Polygon', arcs: [[0, 1]], properties: { name: 'Left_Polygon' } },
            { type: 'Polygon', arcs: [[0, 1]], properties: { name: 'Right_Polygon' } },
          ],
        },
      },
      arcs: [
        [
          [1, 2],
          [0, -2],
        ],
        [
          [1, 0],
          [-1, 0],
          [0, 2],
          [1, 0],
        ],
      ],
    };
    const features = parseTopoJson(topology);
    expect(features).toHaveLength(2);
  });

  it('should set layer features', () => {
    const layer = new VectorLayer({ source: new VectorSource({ features: [new Feature()] }) });
    const features = [new Feature(), new Feature()];
    expect(layer.getSource().getFeatures()).toHaveLength(1);
    setLayerFeature(layer, features);
    expect(layer.getSource().getFeatures()).toHaveLength(2);
  });

  it('should set cluster layer features', () => {
    const cluster = new Cluster({ source: new VectorSource({ features: [new Feature()] }) });
    const layer = new VectorLayer({ source: cluster });
    const features = [new Feature(), new Feature()];
    expect(cluster.getSource().getFeatures()).toHaveLength(1);
    setClusterLayerFeature(layer, features);
    expect(cluster.getSource().getFeatures()).toHaveLength(2);
  });

  it('should fit feature', () => {
    const feature = polygonFeature();
    feature.setId('polygon');
    const layer = new VectorLayer({ source: new VectorSource({ features: [feature] }) });
    const view = new View();
    const fitSpy = sinon.spy(view, 'fit');
    const map = new Map({ view, layers: [layer] });
    fitFeature(map, layer, 'polygon');
    expect(fitSpy.getCall(0).args[0]).toEqual(feature.getGeometry().getExtent());
  });

  it('should not fit feature', () => {
    const feature = polygonFeature();
    const layer = new VectorLayer({ source: new VectorSource({ features: [feature] }) });
    const view = new View();
    const fitSpy = sinon.spy(view, 'fit');
    const map = new Map({ view, layers: [layer] });
    map.setSize([100, 100]);
    fitFeature(map, layer, 'polygon');
    expect(fitSpy.notCalled).toBeTruthy();
  });

  it('should make event', () => {
    const event = makeEvent('click', { pixel: [0, 0] });
    expect(event.type).toBe('click');
    expect(event.pixel).toEqual([0, 0]);
  });

  it('should create map with extent', () => {
    const map = createMap([0, 0, 0, 0]);
    expect(map).toBeInstanceOf(Map);
    expect(transformExtent(map.getView().calculateExtent(), 'EPSG:3857', 'EPSG:4326')).toEqual([0, 0, 0, 0]);
  });

  it('should create map without extent', () => {
    const map = createMap();
    expect(map).toBeInstanceOf(Map);
    expect(transformExtent(map.getView().calculateExtent(), 'EPSG:3857', 'EPSG:4326')).not.toEqual([0, 0, 0, 0]);
  });

  it('should create a vector layer', () => {
    const layer = createVectorLayer();
    expect(layer).toBeInstanceOf(VectorLayer);
  });

  it('should create a cluster layer', () => {
    const layer = createClusterLayer();
    expect(layer).toBeInstanceOf(VectorLayer);
    expect(layer.getSource()).toBeInstanceOf(Cluster);
  });

  it('should create a popup overlay', () => {
    const popup = createPopup();
    expect(popup).toBeInstanceOf(Overlay);
  });
});
