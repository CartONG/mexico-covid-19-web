import { AxiosInstance } from 'axios';

import { NotFound } from '@/domain/NotFound';
import { School } from '@/domain/school/School';
import { SchoolRepository } from '@/domain/school/SchoolRepository';
import { SchoolSummary } from '@/domain/school/SchoolSummary';
import { RestSchool, toSchool } from '@/secondary/school/RestSchool';
import { RestSchoolSummary, toSchoolSummary } from '@/secondary/school/RestSchoolSummary';

export class RestSchoolRepository implements SchoolRepository {
  constructor(private axiosInstance: AxiosInstance) {}

  list(municipalityId: string): Promise<SchoolSummary[]> {
    const restMunicipalityId = municipalityId.substring(2);
    const restStateId = municipalityId.substring(0, 2);
    const url =
      process.env.NODE_ENV === 'development' ? 'schools.json' : `escuelas/?cod_entidad=${restStateId}&cod_mun=${restMunicipalityId}`;
    return this.axiosInstance
      .get<RestSchoolSummary[]>(url)
      .then(response => response.data.map(toSchoolSummary))
      .catch(error => {
        throw new NotFound('school summary').cause(error);
      });
  }

  find(schoolId: string): Promise<School> {
    const restSchoolId = schoolId.split('__')[0];
    const restLevel = schoolId.split('__')[1];
    const url = process.env.NODE_ENV === 'development' ? 'school.json' : `escuelas/?idescuela=${restSchoolId}&nivel=${restLevel}`;
    return this.axiosInstance
      .get<RestSchool>(url)
      .then(response => toSchool(response.data))
      .catch(error => {
        throw new NotFound('school').cause(error);
      });
  }
}
