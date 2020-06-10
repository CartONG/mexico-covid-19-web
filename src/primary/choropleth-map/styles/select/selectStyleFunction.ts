import { Feature } from 'ol';
import { FeatureLike } from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import { Fill, Stroke, Style } from 'ol/style';

export const selectStyleFunction = (statesLayer: VectorLayer, municipalitiesLayer: VectorLayer) => {
  const largeStroke = new Style({
    stroke: new Stroke({ color: [77, 77, 77, 0.8], width: 4 }),
    // fill: new Fill({ color: [0, 0, 0, 0] }),
    zIndex: 2,
  });

  return function(feature: FeatureLike, resolution: number) {
    const layer = statesLayer.getSource().hasFeature(feature as Feature) ? statesLayer : municipalitiesLayer;

    const featureFromLayer = layer.getSource().getFeatureById(feature.getId());

    const style = layer
      .getSource()
      .getFeatureById(feature.getId())
      .getStyle();

    console.log(JSON.stringify(featureFromLayer.getStyle()));

    // return style ? ([style, largeStroke] as Style[]) : largeStroke;
    return [largeStroke] as Style[];
    // console.log(feature.getStyle());
  };
};
