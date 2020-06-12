import { AxiosInstance } from 'axios';

import { NotFound } from '@/domain/NotFound';
import { SchoolRepository } from '@/domain/school/SchoolRepository';
import { SchoolSummary } from '@/domain/school/SchoolSummary';
import { RestSchoolSummary, toSchoolSummary } from '@/secondary/school/RestSchoolSummary';

export class RestSchoolRepository implements SchoolRepository {
  constructor(private axiosInstance: AxiosInstance) {}

  list(municipalityId: string): Promise<SchoolSummary[]> {
    const restMunicipalityId = municipalityId.substring(2);
    const restStateId = municipalityId.substring(0, 2);
    const url =
      process.env.NODE_ENV === 'development'
        ? 'schools.json'
        : encodeURIComponent(`escuelas/?entidad=${restStateId}&municipio=${restMunicipalityId}`);
    return this.axiosInstance
      .get<RestSchoolSummary[]>('schools.json')
      .then(response => response.data.map(toSchoolSummary))
      .catch(error => {
        throw new NotFound('school summary').cause(error);
      });
  }
}
