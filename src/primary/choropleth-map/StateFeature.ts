import { Feature } from 'ol';
import { Style } from 'ol/style';

import { AdministrativeDivisionSummary } from '@/domain/administrative-division/AdministrativeDivisionSummary';
import { stateStyleName, stateStyles } from '@/primary/choropleth-map/styles/states/stateStyles';
import { RateTypes } from '@/primary/RateTypes';

const getRate = (stateSummary: AdministrativeDivisionSummary, rateType: RateTypes): number => {
  switch (rateType) {
    case RateTypes.STUDENT:
      return stateSummary.studentAttendance;
    case RateTypes.TEACHER:
      return stateSummary.teacherAttendance;
    case RateTypes.PERSONAL:
      return stateSummary.adminAttendance;
  }
};

export const toStateFeatureStyle = (rate: number): Style => {
  if (rate <= 0.7) {
    return stateStyles[stateStyleName.RED];
  }
  if (rate > 0.7 && rate <= 0.8) {
    return stateStyles[stateStyleName.LIGHT_RED];
  }
  if (rate > 0.8 && rate <= 0.9) {
    return stateStyles[stateStyleName.ORANGE];
  }
  if (rate > 0.9 && rate <= 0.95) {
    return stateStyles[stateStyleName.LIGHT_GREEN];
  }
  if (rate > 0.95 && rate <= 1) {
    return stateStyles[stateStyleName.GREEN];
  }
  return stateStyles[stateStyleName.LIGHT_GREY];
};

export const toStateFeature = (
  feature: Feature,
  stateSummaryById: { [key: string]: AdministrativeDivisionSummary },
  selectedStateId: string,
  rateType: RateTypes
): Feature => {
  const featureProperties = {
    geometry: feature.getGeometry(),
    name: '-',
  };

  let style = stateStyles[stateStyleName.LIGHT_GREY];

  const stateSummary = stateSummaryById[feature.getId()];

  if (stateSummary) {
    const rate = getRate(stateSummary, rateType);
    featureProperties.name = stateSummary.name;
    style = toStateFeatureStyle(rate);
  }

  if (selectedStateId === feature.getId()) {
    style = stateStyles[stateStyleName.NO_FILL];
  }

  const newFeature = new Feature(featureProperties);
  newFeature.setId(feature.getId());
  newFeature.setStyle(style);

  return newFeature;
};
