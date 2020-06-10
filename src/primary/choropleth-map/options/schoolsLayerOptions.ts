import { Cluster } from 'ol/source';
import VectorSource from 'ol/source/Vector';

const sourceOptions = {
  features: [],
};

const clusterSource = {
  distance: 40,
  source: new VectorSource(sourceOptions),
};

export const schoolsLayerOptions = {
  opacity: 1,
  visible: true,
  renderMode: 'image',
  renderBuffer: 1000,
  updateWhileAnimating: false,
  updateWhileInteracting: false,
  source: new Cluster(clusterSource),
};
