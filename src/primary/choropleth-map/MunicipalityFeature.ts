import { Feature } from 'ol';
import { Style } from 'ol/style';

import { AdministrativeDivisionSummary } from '@/domain/administrative-division/AdministrativeDivisionSummary';
import { municipalityStyleName, municipalityStyles } from '@/primary/choropleth-map/styles/municipalities/municipalityStyles';
import { RateTypes } from '@/primary/RateTypes';

const getRate = (municipalitySummary: AdministrativeDivisionSummary, rateType: RateTypes): number => {
  switch (rateType) {
    case RateTypes.STUDENT_ABSENCE:
      return municipalitySummary.studentAbsenceRate;
    case RateTypes.TEACHER_ABSENCE:
      return municipalitySummary.teacherAbsenceRate;
    case RateTypes.PERSONAL_ABSENCE:
      return municipalitySummary.adminAbsenceRate;
  }
};

const toMunicipalityFeatureStyle = (rate: number): Style => {
  if (rate < 0.2) {
    return municipalityStyles[municipalityStyleName.GREEN];
  }
  if (rate >= 0.2 && rate < 0.4) {
    return municipalityStyles[municipalityStyleName.LIGHT_GREEN];
  }
  if (rate >= 0.4 && rate < 0.6) {
    return municipalityStyles[municipalityStyleName.ORANGE];
  }
  if (rate >= 0.6 && rate < 0.8) {
    return municipalityStyles[municipalityStyleName.LIGHT_RED];
  }
  if (rate >= 0.8 && rate <= 1) {
    return municipalityStyles[municipalityStyleName.RED];
  }
  return municipalityStyles[municipalityStyleName.LIGHT_GREY];
};

export const toMunicipalityFeature = (
  feature: Feature,
  municipalitySummary: AdministrativeDivisionSummary | undefined,
  selectedMunicipalityId: string,
  rateType: RateTypes
): Feature => {
  const featureProperties = {
    geometry: feature.getGeometry(),
    name: '-',
    state: '-',
  };

  let style: Style | Style[] = municipalityStyles[municipalityStyleName.LIGHT_GREY];

  if (municipalitySummary) {
    const rate = getRate(municipalitySummary, rateType);
    featureProperties.name = municipalitySummary.name;
    featureProperties.state = municipalitySummary.stateId;
    style = toMunicipalityFeatureStyle(rate);
  }

  if (selectedMunicipalityId === feature.getId()) {
    style = [style, municipalityStyles[municipalityStyleName.NO_FILL]];
  }

  const newFeature = new Feature(featureProperties);
  feature.setId(feature.getId());
  feature.setStyle(style);

  return feature;
};
