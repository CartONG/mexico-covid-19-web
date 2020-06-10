import { Feature } from 'ol';
import { Style } from 'ol/style';

import { MunicipalitySummary } from '@/domain/municipality/MunicipalitySummary';
import { Selection } from '@/domain/selection/Selection';
import { municipalityStyleName, municipalityStyles } from '@/primary/choropleth-map/styles/municipalities/municipalityStyles';

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
  return municipalityStyles[municipalityStyleName.RED];
};

export const toMunicipalityFeature = (
  feature: Feature,
  municipalitySummary: MunicipalitySummary | undefined,
  selection: Selection | null
): Feature => {
  const featureProperties = {
    geometry: feature.getGeometry(),
    name: '-',
    state: '-',
  };

  let style: Style | Style[] = municipalityStyles[municipalityStyleName.LIGHT_GREY];

  if (municipalitySummary) {
    featureProperties.name = municipalitySummary.name;
    featureProperties.state = municipalitySummary.stateId;
    style = toMunicipalityFeatureStyle(municipalitySummary.studentAbsenceRate);
  }

  if (selection && selection.municipalityId === feature.getId()) {
    style = [style, municipalityStyles[municipalityStyleName.NO_FILL]];
  }

  const newFeature = new Feature(featureProperties);
  feature.setId(feature.getId());
  feature.setStyle(style);

  return feature;
};
