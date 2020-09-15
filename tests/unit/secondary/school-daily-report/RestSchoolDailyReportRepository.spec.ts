import { stubAxiosInstance, stubAxiosNotFound } from '../../TestUtils';

import { restSchoolDailyReport } from './RestSchoolDailyReport.fixture';

import { NotFound } from '@/domain/NotFound';
import { SchoolDailyReport } from '@/domain/school-daily-report/SchoolDailyReport';
import { RestSchoolDailyReportRepository } from '@/secondary/school-daily-report/RestSchoolDailyReportRepository';

describe('RestSchoolDailyReportRepository', () => {
  it('should raise an error if the list of school daily reports cannot be found', next => {
    const axiosInstance = stubAxiosInstance();
    axiosInstance.get.rejects(stubAxiosNotFound('No SchoolDailyReport found'));
    const restSchoolDailyReportRepository = new RestSchoolDailyReportRepository(axiosInstance, 'production');
    restSchoolDailyReportRepository.listForSchool('03KJN0025W4').catch(error => {
      expect(error).toBeInstanceOf(NotFound);
      expect(error.message).toContain('school daily report');
      expect(error.stack).toContain('Caused by');
      expect(error.stack).toContain('No SchoolDailyReport found');
      next();
    });
  });

  it('should list school daily reports', async () => {
    const axiosInstance = stubAxiosInstance();
    const restReports = [restSchoolDailyReport()];
    axiosInstance.get.resolves({ data: restReports });
    const restSchoolDailyReportRepository = new RestSchoolDailyReportRepository(axiosInstance, 'production');
    const list = await restSchoolDailyReportRepository.listForSchool('03KJN0025W4');
    expect(list).toHaveLength(1);
    expect(axiosInstance.get.getCall(0).args[0]).toBe('escuelas/historico?idescuela=03KJN0025W4');
    expect(list[0]).toEqual<SchoolDailyReport>({
      date: '2020-06-16',
      teacherAttendance: 1,
      maleStudentAbsence: 0,
      femaleStudentAbsence: 0,
    });
  });

  it('should use URLs dedicated to development', async () => {
    const axiosInstance = stubAxiosInstance();
    axiosInstance.get.resolves({ data: [] });
    const restSchoolDailyReportRepository = new RestSchoolDailyReportRepository(axiosInstance, 'development');
    await restSchoolDailyReportRepository.listForSchool('03KJN0025W4');
    expect(axiosInstance.get.getCall(0).args[0]).toBe('school_history.json');
  });
});
