import { AxiosInstance } from 'axios';

import { NotFound } from '@/domain/NotFound';
import { SchoolRepository } from '@/domain/school/SchoolRepository';
import { SchoolSummary } from '@/domain/school/SchoolSummary';
import { RestSchoolSummary, toSchoolSummary } from '@/secondary/school/RestSchoolSummary';

export class RestSchoolRepository implements SchoolRepository {
  constructor(private axiosInstance: AxiosInstance) {}

  list(): Promise<SchoolSummary[]> {
    return this.axiosInstance
      .get<RestSchoolSummary[]>('schools_MX005002.json')
      .then(response => response.data.map(toSchoolSummary))
      .catch(error => {
        throw new NotFound('school summary').cause(error);
      });
  }
}
