import { Feature } from 'ol';
import { Style } from 'ol/style';

import { Selection } from '@/domain/selection/Selection';
import { StateSummary } from '@/domain/state/StateSummary';
import { stateStyleName, stateStyles } from '@/primary/choropleth-map/styles/states/stateStyles';

export const toStateFeatureStyle = (rate: number): Style => {
  if (rate < 0.2) {
    return stateStyles[stateStyleName.GREEN];
  }
  if (rate >= 0.2 && rate < 0.4) {
    return stateStyles[stateStyleName.LIGHT_GREEN];
  }
  if (rate >= 0.4 && rate < 0.6) {
    return stateStyles[stateStyleName.ORANGE];
  }
  if (rate >= 0.6 && rate < 0.8) {
    return stateStyles[stateStyleName.LIGHT_RED];
  }
  return stateStyles[stateStyleName.RED];
};

export const toStateFeature = (
  feature: Feature,
  stateSummaryById: { [key: string]: StateSummary },
  selection: Selection | null
): Feature => {
  const featureProperties = {
    geometry: feature.getGeometry(),
    name: '-',
  };

  let style = stateStyles[stateStyleName.LIGHT_GREY];

  const stateSummary = stateSummaryById[feature.getId()];

  if (stateSummary) {
    featureProperties.name = stateSummary.name;
    style = toStateFeatureStyle(stateSummary.studentAbsenceRate);
  }

  if (selection && selection.stateId === feature.getId()) {
    style = stateStyles[stateStyleName.NO_FILL];
  }

  const newFeature = new Feature(featureProperties);
  newFeature.setId(feature.getId());
  newFeature.setStyle(style);

  return newFeature;
};
