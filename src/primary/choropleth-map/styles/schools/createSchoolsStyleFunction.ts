import { Feature } from 'ol';
import { Cluster } from 'ol/source';
import { Circle, Fill, Stroke, Style, Text } from 'ol/style';

const featureStyle = new Style({
  image: new Circle({
    radius: 6,
    fill: new Fill({ color: [77, 77, 77, 1] }),
  }),
});

const selectedFeatureStyle = new Style({
  image: new Circle({
    radius: 8,
    stroke: new Stroke({ color: [255, 255, 255, 1], width: 3 }),
    fill: new Fill({ color: [157, 36, 73, 1] }),
  }),
});

const clusterStyle = (totalFeatures: number) =>
  new Style({
    image: new Circle({
      radius: 15,
      stroke: new Stroke({ color: [77, 77, 77, 0.6], width: 3 }),
      fill: new Fill({ color: [255, 255, 255, 1] }),
    }),
    text: new Text({ text: '' + totalFeatures, textBaseline: 'middle', offsetY: 1 }),
  });

const selectedClusterStyle = (totalFeatures: number) =>
  new Style({
    image: new Circle({
      radius: 16,
      stroke: new Stroke({ color: [157, 36, 73, 0.6], width: 5 }),
      fill: new Fill({ color: [255, 255, 255, 1] }),
    }),
    text: new Text({ text: '' + totalFeatures, textBaseline: 'middle', offsetY: 1 }),
  });

export const createSchoolsStyleFunction = () => {
  return (cluster: Cluster, resolution: number) => {
    const features = cluster.get('features');
    const selected = features.find((feature: Feature) => feature.get('selected') === true);

    if (selected) {
      return features.length > 1 ? selectedClusterStyle(features.length) : selectedFeatureStyle;
    }

    return features.length > 1 ? clusterStyle(features.length) : featureStyle;
  };
};
