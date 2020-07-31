import { Feature, Map, MapBrowserEvent, Overlay, View } from 'ol';
import { Attribution, defaults as defaultControls, ScaleLine } from 'ol/control';
import { TopoJSON } from 'ol/format';
import { defaults as defaultInteractions } from 'ol/interaction';
import VectorLayer from 'ol/layer/Vector';
import { transformExtent } from 'ol/proj';
import Cluster from 'ol/source/Cluster';
import VectorSource from 'ol/source/Vector';
import { Style } from 'ol/style';
import { StyleFunction } from 'ol/style/Style';
import { FitOptions } from 'ol/View';

export const parseTopoJson = (topoJson: any): Feature[] => {
  const parser = new TopoJSON();
  const readOptions = { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' };
  return parser.readFeatures(topoJson, readOptions);
};

export const setLayerFeature = (layer: VectorLayer, features: Feature[]) => {
  layer.getSource().clear();
  layer.getSource().addFeatures(features);
};

export const setClusterLayerFeature = (layer: VectorLayer, features: Feature[]) => {
  const source = layer.getSource() as Cluster;
  source.getSource().clear();
  source.getSource().addFeatures(features);
};

export const fitFeature = (map: Map, layer: VectorLayer, featureId: string, fitOptions: FitOptions = {}) => {
  const feature = layer.getSource().getFeatureById(featureId);
  if (feature) {
    const defaultOptions = { padding: [20, 20, 20, 20], duration: 1000 };
    map.getView().fit(feature.getGeometry().getExtent(), { ...defaultOptions, ...fitOptions });
  }
};

export const addLayerSingleClickEvent = (map: Map) => {
  map.on('singleclick', event => {
    const features = map.getFeaturesAtPixel(event.pixel, { hitTolerance: 5 });
    if (features.length) {
      const feature = features[0] as Feature;
      map.forEachLayerAtPixel(
        event.pixel,
        layer => {
          layer.dispatchEvent(event);
        },
        { layerFilter: layer => (layer as VectorLayer).getSource().hasFeature(feature) }
      );
    }
  });
};

export const makeEvent = (eventType: string, attributes = {}) => {
  return {
    target: undefined,
    type: eventType,
    preventDefault: () => {},
    stopPropagation: () => {},
    ...attributes,
  };
};

export const createMap = (extent?: [number, number, number, number]) => {
  const interactionOptions = {
    altShiftDragRotate: false,
    pinchRotate: false,
  };

  const controlOptions = {
    attribution: false,
    rotate: false,
  };

  const controlExtensions = [new Attribution({ collapsible: false }), new ScaleLine()];

  const viewOptions = {
    center: [0, 0],
    enableRotation: false,
    extent: extent ? transformExtent(extent, 'EPSG:4326', 'EPSG:3857') : undefined,
    showFullExtent: true,
    maxZoom: 19,
    minZoom: 0,
    zoom: 0,
  };

  const mapOptions = {
    controls: defaultControls(controlOptions).extend(controlExtensions),
    interactions: defaultInteractions(interactionOptions),
    loadTilesWhileAnimating: false,
    loadTilesWhileInteracting: false,
    moveTolerance: 2,
    view: new View(viewOptions),
  };

  return new Map(mapOptions);
};

export const createVectorLayer = (style?: Style | Style[] | StyleFunction) => {
  const sourceOptions = {
    features: [],
  };

  const options = {
    opacity: 1,
    visible: true,
    renderMode: 'image',
    renderBuffer: 1000,
    updateWhileAnimating: false,
    updateWhileInteracting: false,
    style,
    source: new VectorSource(sourceOptions),
  };

  return new VectorLayer(options);
};

type ClusterStyleFunction = (cluster: Cluster, resolution: number) => Style | Style[];

export const createClusterLayer = (style?: Style | Style[] | ClusterStyleFunction) => {
  const sourceOptions = {
    features: [],
  };

  const clusterSource = {
    distance: 40,
    source: new VectorSource(sourceOptions),
  };

  const options = {
    opacity: 1,
    visible: true,
    renderMode: 'image',
    renderBuffer: 1000,
    updateWhileAnimating: false,
    updateWhileInteracting: false,
    style: style as Style | Style[] | StyleFunction,
    source: new Cluster(clusterSource),
  };

  return new VectorLayer(options) as any;
};

export const createPopup = () => {
  const options = {
    autoPan: true,
    offset: [0, -18],
    autoPanMargin: 30,
    autoPanAnimation: {
      duration: 250,
    },
  };

  return new Overlay(options);
};
