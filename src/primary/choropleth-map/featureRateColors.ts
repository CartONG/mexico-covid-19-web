import { RateType } from '@/primary/choropleth-map/RateType';

export const featureRateColors = {
  [RateType.UNKNOWN]: [224, 224, 224],
  [RateType.VERY_LOW]: [217, 29, 32],
  [RateType.LOW]: [238, 131, 54],
  [RateType.MEDIUM]: [255, 196, 0],
  [RateType.HIGH]: [151, 211, 86],
  [RateType.VERY_HIGH]: [30, 155, 71],
};
