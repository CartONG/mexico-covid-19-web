import { Feature } from 'ol';
import { Style } from 'ol/style';

import { AdministrativeDivisionSummary } from '@/domain/administrative-division/AdministrativeDivisionSummary';
import { stateStyleName, stateStyles } from '@/primary/choropleth-map/styles/states/stateStyles';
import { RateTypes } from '@/primary/RateTypes';

const getRate = (stateSummary: AdministrativeDivisionSummary, rateType: RateTypes): number => {
  switch (rateType) {
    case RateTypes.STUDENT_ABSENCE:
      return stateSummary.studentAbsenceRate;
    case RateTypes.TEACHER_ABSENCE:
      return stateSummary.teacherAbsenceRate;
    case RateTypes.PERSONAL_ABSENCE:
      return stateSummary.adminAbsenceRate;
  }
};

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
  if (rate >= 0.8 && rate <= 1) {
    return stateStyles[stateStyleName.RED];
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
