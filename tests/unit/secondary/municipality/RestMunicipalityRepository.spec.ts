import { stubAxiosInstance, stubAxiosNotFound } from '../../TestUtils';

import { restMunicipalitySummary } from './RestMunicipalitySummary.fixture';

import { MunicipalitySummary } from '@/domain/municipality/MunicipalitySummary';
import { NotFound } from '@/domain/NotFound';
import { RestMunicipalityRepository } from '@/secondary/municipality/RestMunicipalityRepository';
import { RestMunicipalitySummary } from '@/secondary/municipality/RestMunicipalitySummary';

describe('RestMunicipalityRepository', () => {
  it('should raised a not found error if it fails to list municipality summaries', next => {
    const axiosInstance = stubAxiosInstance();
    axiosInstance.get.rejects(stubAxiosNotFound('No municipality summary found'));
    const restMunicipalityRepository = new RestMunicipalityRepository(axiosInstance);
    restMunicipalityRepository.list().catch(error => {
      expect(error).toBeInstanceOf(NotFound);
      expect(error.message).toContain('municipality summary');
      expect(error.stack).toContain('Caused by');
      expect(error.stack).toContain('No municipality summary found');
      next();
    });
  });

  it('should list municipality summaries', async () => {
    const axiosInstance = stubAxiosInstance();
    const restMunicipalitySummaries: RestMunicipalitySummary[] = [
      restMunicipalitySummary({}),
      restMunicipalitySummary({ id: '002', nombre: 'Colima', entidadId: '06', alumnosInasistencia: 77 }),
    ];
    axiosInstance.get.resolves({ data: restMunicipalitySummaries });
    const restMunicipalityRepository = new RestMunicipalityRepository(axiosInstance);
    const list = await restMunicipalityRepository.list();
    const [first, second] = list;
    expect(list).toHaveLength(2);
    expect(axiosInstance.get.getCall(0).args[0]).toBe('municipalities.json');
    expect(first).toEqual<MunicipalitySummary>({
      id: '001',
      name: 'Armería',
      stateId: '06',
      studentAbsenceRate: 0.48,
      teacherAbsenceRate: 0.48,
      adminAbsenceRate: 0.48,
    });
    expect(second).toEqual<MunicipalitySummary>({
      id: '002',
      name: 'Colima',
      stateId: '06',
      studentAbsenceRate: 77,
      teacherAbsenceRate: 0.48,
      adminAbsenceRate: 0.48,
    });
  });
});
