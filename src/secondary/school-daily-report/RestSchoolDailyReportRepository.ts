import { AxiosInstance } from 'axios';

import { NotFound } from '@/domain/NotFound';
import { SchoolDailyReport } from '@/domain/school-daily-report/SchoolDailyReport';
import { SchoolDailyReportRepository } from '@/domain/school-daily-report/SchoolDailyReportRepository';
import { RestSchoolDailyReport, toSchoolDailyReport } from '@/secondary/school-daily-report/RestSchoolDailyReport';

export class RestSchoolDailyReportRepository implements SchoolDailyReportRepository {
  constructor(private axiosInstance: AxiosInstance, private environment: string) {}

  listForSchool(schoolId: string): Promise<SchoolDailyReport[]> {
    const restSchoolId = schoolId.split('__')[0];
    const url = this.environment === 'development' ? 'school_history.json' : `escuelas/historico?idescuela=${restSchoolId}`;
    return this.axiosInstance
      .get<RestSchoolDailyReport[]>(url)
      .then(response => response.data.map(toSchoolDailyReport))
      .catch(error => {
        throw new NotFound('school daily reports').cause(error);
      });
  }
}
