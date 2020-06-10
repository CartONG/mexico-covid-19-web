import VectorSource from 'ol/source/Vector';

const sourceOptions = {
  features: [],
};

export const municipalitiesLayerOptions = {
  opacity: 1,
  visible: true,
  renderMode: 'image',
  renderBuffer: 1000,
  updateWhileAnimating: false,
  updateWhileInteracting: false,
  source: new VectorSource(sourceOptions),
};
