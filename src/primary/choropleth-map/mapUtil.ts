import { Feature, Map } from 'ol';
import { TopoJSON } from 'ol/format';
import VectorLayer from 'ol/layer/Vector';
import Cluster from 'ol/source/Cluster';
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
