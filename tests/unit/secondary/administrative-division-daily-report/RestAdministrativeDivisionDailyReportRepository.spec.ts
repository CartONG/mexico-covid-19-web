import { stubAxiosInstance, stubAxiosNotFound } from '../../TestUtils';

import { restAdministrativeDivisionDailyReport } from './RestAdministrativeDivisionDailyReport.fixture';

import { AdministrativeDivisionDailyReport } from '@/domain/administrative-division-daily-report/AdministrativeDivisionDailyReport';
import { AdministrativeDivisionTypes } from '@/domain/administrative-division/AdministrativeDivisionTypes';
import { NotFound } from '@/domain/NotFound';
import { RestAdministrativeDivisionDailyReportRepository } from '@/secondary/administrative-division-daily-report/RestAdministrativeDivisionDailyReportRepository';

describe('RestAdministrativeDivisionDailyReportRepository', () => {
  it('should raise an error if the list of administrative division daily reports cannot be found', next => {
    const axiosInstance = stubAxiosInstance();
    axiosInstance.get.rejects(stubAxiosNotFound('No AdministrativeDivisionDailyReport found'));
    const restAdministrativeDivisionDailyReportRepository = new RestAdministrativeDivisionDailyReportRepository(
      axiosInstance,
      'production'
    );
    restAdministrativeDivisionDailyReportRepository.listForAdministrativeDivision(AdministrativeDivisionTypes.COUNTRY, '').catch(error => {
      expect(error).toBeInstanceOf(NotFound);
      expect(error.message).toContain('administrative division daily report');
      expect(error.stack).toContain('Caused by');
      expect(error.stack).toContain('No AdministrativeDivisionDailyReport found');
      next();
    });
  });

  it('should list administrative divisions daily reports', async () => {
    const axiosInstance = stubAxiosInstance();
    const restReports = [restAdministrativeDivisionDailyReport()];
    axiosInstance.get.resolves({ data: restReports });
    const restAdministrativeDivisionDailyReportRepository = new RestAdministrativeDivisionDailyReportRepository(
      axiosInstance,
      'production'
    );
    const list = await restAdministrativeDivisionDailyReportRepository.listForAdministrativeDivision(
      AdministrativeDivisionTypes.COUNTRY,
      ''
    );
    expect(list).toHaveLength(1);
    expect(axiosInstance.get.getCall(0).args[0]).toBe('pais/historico');
    expect(list[0]).toEqual<AdministrativeDivisionDailyReport>({
      date: '2020-06-16',
      giveClasses: 0.47,
      teacherAttendance: 0.88,
      maleStudentAbsence: 0.23,
      femaleStudentAbsence: 0.23,
    });
  });

  it('should use URLs dedicated to development', async () => {
    const axiosInstance = stubAxiosInstance();
    axiosInstance.get.resolves({ data: [] });
    const restAdministrativeDivisionDailyReportRepository = new RestAdministrativeDivisionDailyReportRepository(
      axiosInstance,
      'development'
    );
    await restAdministrativeDivisionDailyReportRepository.listForAdministrativeDivision(AdministrativeDivisionTypes.COUNTRY, '');
    await restAdministrativeDivisionDailyReportRepository.listForAdministrativeDivision(AdministrativeDivisionTypes.STATE, '01');
    await restAdministrativeDivisionDailyReportRepository.listForAdministrativeDivision(AdministrativeDivisionTypes.MUNICIPALITY, '01001');
    expect(axiosInstance.get.getCall(0).args[0]).toBe('country_history.json');
    expect(axiosInstance.get.getCall(1).args[0]).toBe('state_history.json');
    expect(axiosInstance.get.getCall(2).args[0]).toBe('municipality_history.json');
  });

  it('should use URLs dedicated to production', async () => {
    const axiosInstance = stubAxiosInstance();
    axiosInstance.get.resolves({ data: [] });
    const restAdministrativeDivisionDailyReportRepository = new RestAdministrativeDivisionDailyReportRepository(
      axiosInstance,
      'production'
    );
    await restAdministrativeDivisionDailyReportRepository.listForAdministrativeDivision(AdministrativeDivisionTypes.COUNTRY, '');
    await restAdministrativeDivisionDailyReportRepository.listForAdministrativeDivision(AdministrativeDivisionTypes.STATE, '01');
    await restAdministrativeDivisionDailyReportRepository.listForAdministrativeDivision(AdministrativeDivisionTypes.MUNICIPALITY, '01001');
    expect(axiosInstance.get.getCall(0).args[0]).toBe('pais/historico');
    expect(axiosInstance.get.getCall(1).args[0]).toBe('entidades/historico?cod_entidad=01');
    expect(axiosInstance.get.getCall(2).args[0]).toBe('municipios/historico/?cod_entidad=01&cod_mun=001');
  });
});
