import { RateType } from '@/primary/choropleth-map/RateType';

export const featureRateColors = {
  [RateType.UNKNOWN]: [224, 224, 224],
  [RateType.VERY_LOW]: [26, 150, 65],
  [RateType.LOW]: [166, 217, 106],
  [RateType.MEDIUM]: [254, 224, 139],
  [RateType.HIGH]: [253, 174, 97],
  [RateType.VERY_HIGH]: [215, 25, 28],
};
