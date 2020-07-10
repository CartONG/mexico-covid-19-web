import { Feature } from 'ol';
import { Cluster } from 'ol/source';
import { Circle, Fill, Stroke, Style, Text } from 'ol/style';

import { RateTypes } from '@/primary/RateTypes';

const highDangerFeatureStyle = new Style({
  image: new Circle({
    radius: 6,
    fill: new Fill({ color: '#D91D20' }),
    stroke: new Stroke({ color: [255, 255, 255, 1], width: 3 }),
  }),
});

const dangerFeatureStyle = new Style({
  image: new Circle({
    radius: 6,
    fill: new Fill({ color: '#EE8336' }),
    stroke: new Stroke({ color: [255, 255, 255, 1], width: 3 }),
  }),
});

const warningFeatureStyle = new Style({
  image: new Circle({
    radius: 6,
    fill: new Fill({ color: '#FFC400' }),
    stroke: new Stroke({ color: [255, 255, 255, 1], width: 3 }),
  }),
});

const successFeatureStyle = new Style({
  image: new Circle({
    radius: 6,
    fill: new Fill({ color: '#97D356' }),
    stroke: new Stroke({ color: [255, 255, 255, 1], width: 3 }),
  }),
});

const highSuccessFeatureStyle = new Style({
  image: new Circle({
    radius: 6,
    fill: new Fill({ color: '#1E9B47' }),
    stroke: new Stroke({ color: [255, 255, 255, 1], width: 3 }),
  }),
});

const unknownFeatureStyle = new Style({
  image: new Circle({
    radius: 6,
    fill: new Fill({ color: '#dbdbdb' }),
    stroke: new Stroke({ color: [255, 255, 255, 1], width: 3 }),
  }),
});

const highDangerSelectedFeatureStyle = new Style({
  image: new Circle({
    radius: 8,
    fill: new Fill({ color: '#D91D20' }),
    stroke: new Stroke({ color: [255, 255, 255, 1], width: 4 }),
  }),
});

const dangerSelectedFeatureStyle = new Style({
  image: new Circle({
    radius: 8,
    fill: new Fill({ color: '#EE8336' }),
    stroke: new Stroke({ color: [255, 255, 255, 1], width: 4 }),
  }),
});

const warningSelectedFeatureStyle = new Style({
  image: new Circle({
    radius: 8,
    fill: new Fill({ color: '#FFC400' }),
    stroke: new Stroke({ color: [255, 255, 255, 1], width: 4 }),
  }),
});

const successSelectedFeatureStyle = new Style({
  image: new Circle({
    radius: 8,
    fill: new Fill({ color: '#97D356' }),
    stroke: new Stroke({ color: [255, 255, 255, 1], width: 4 }),
  }),
});

const highSuccessSelectedFeatureStyle = new Style({
  image: new Circle({
    radius: 8,
    fill: new Fill({ color: '#1E9B47' }),
    stroke: new Stroke({ color: [255, 255, 255, 1], width: 4 }),
  }),
});

const unknownSelectedFeatureStyle = new Style({
  image: new Circle({
    radius: 8,
    fill: new Fill({ color: '#dbdbdb' }),
    stroke: new Stroke({ color: [255, 255, 255, 1], width: 4 }),
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
      stroke: new Stroke({ color: [179, 142, 93, 1], width: 5 }),
      fill: new Fill({ color: [255, 255, 255, 1] }),
    }),
    text: new Text({ text: '' + totalFeatures, textBaseline: 'middle', offsetY: 1 }),
  });

const getFeatureStyle = (feature: Feature, rateType: RateTypes) => {
  const rate =
    rateType === RateTypes.STUDENT
      ? feature.get('maleStudentAttendance')
      : rateType === RateTypes.TEACHER
      ? feature.get('teacherAttendance')
      : feature.get('adminAttendance');

  if (rate <= 0.7) {
    return highDangerFeatureStyle;
  }
  if (rate > 0.7 && rate <= 0.8) {
    return dangerFeatureStyle;
  }
  if (rate > 0.8 && rate <= 0.9) {
    return warningFeatureStyle;
  }
  if (rate > 0.9 && rate <= 0.95) {
    return successFeatureStyle;
  }
  if (rate > 0.95 && rate <= 1) {
    return highSuccessFeatureStyle;
  }
  return unknownFeatureStyle;
};

const getSelectedFeatureStyle = (feature: Feature, rateType: RateTypes) => {
  const rate =
    rateType === RateTypes.STUDENT
      ? feature.get('maleStudentAttendance')
      : rateType === RateTypes.TEACHER
      ? feature.get('teacherAttendance')
      : feature.get('adminAttendance');

  if (rate <= 0.7) {
    return highDangerSelectedFeatureStyle;
  }
  if (rate > 0.7 && rate <= 0.8) {
    return dangerSelectedFeatureStyle;
  }
  if (rate > 0.8 && rate <= 0.9) {
    return warningSelectedFeatureStyle;
  }
  if (rate > 0.9 && rate <= 0.95) {
    return successSelectedFeatureStyle;
  }
  if (rate > 0.95 && rate <= 1) {
    return highSuccessSelectedFeatureStyle;
  }
  return unknownSelectedFeatureStyle;
};

export const createSchoolsStyleFunction = (rateType: RateTypes) => {
  return (cluster: Cluster, resolution: number) => {
    const features = cluster.get('features');
    const selected = features.find((feature: Feature) => feature.get('selected') === true);

    if (selected) {
      return features.length > 1 ? selectedClusterStyle(features.length) : getSelectedFeatureStyle(features[0], rateType);
    }

    return features.length > 1 ? clusterStyle(features.length) : getFeatureStyle(features[0], rateType);
  };
};
