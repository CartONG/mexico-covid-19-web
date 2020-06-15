import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { transform } from 'ol/proj';

import { SchoolSummary } from '@/domain/school/SchoolSummary';

export const toSchoolFeature = (domainSchoolSummary: SchoolSummary, selectedSchoolId: string): Feature => {
  const featureOptions = {
    geometry: new Point(transform(domainSchoolSummary.coordinates, 'EPSG:4326', 'EPSG:3857')),
    name: domainSchoolSummary.name,
    selected: selectedSchoolId === domainSchoolSummary.id,
  };

  const feature = new Feature(featureOptions);
  feature.setId(domainSchoolSummary.id);

  return feature;
};
