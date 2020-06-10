import { Map } from 'ol';
import { FeatureLike } from 'ol/Feature';
import { Fill, Stroke, Style } from 'ol/style';

import { featureRateColors } from '@/primary/choropleth-map/featureRateColors';
import { RateType } from '@/primary/choropleth-map/RateType';

const toStyle = (color: number[]) =>
  new Style({
    stroke: new Stroke({ color: '#fff', width: 1 }),
    fill: new Fill({ color: [...color, 0.5] }),
    zIndex: 1,
  });

export const createMunicipalitiesStyleFunction = (map: Map) => {
  const cache = {
    [RateType.UNKNOWN]: toStyle(featureRateColors[RateType.UNKNOWN]),
    [RateType.VERY_LOW]: toStyle(featureRateColors[RateType.VERY_LOW]),
    [RateType.LOW]: toStyle(featureRateColors[RateType.LOW]),
    [RateType.MEDIUM]: toStyle(featureRateColors[RateType.MEDIUM]),
    [RateType.HIGH]: toStyle(featureRateColors[RateType.HIGH]),
    [RateType.VERY_HIGH]: toStyle(featureRateColors[RateType.VERY_HIGH]),
  };

  return (feature: FeatureLike, resolution: number) => {
    const zoom = map.getView().getZoomForResolution(resolution);

    /*
    if (zoom <= 8) {
      return undefined;
    }
     */

    return cache[feature.get('rate') as RateType];
  };
};
