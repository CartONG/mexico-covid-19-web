import { stubAxiosInstance, stubAxiosNotFound } from '../../TestUtils';

import { restStateSummary } from './RestStateSummary.fixture';

import { NotFound } from '@/domain/NotFound';
import { StateSummary } from '@/domain/state/StateSummary';
import { RestStateRepository } from '@/secondary/state/RestStateRepository';
import { RestStateSummary } from '@/secondary/state/RestStateSummary';

describe('RestStateRepository', () => {
  it('should raised a not found error if it fails to list state summaries', next => {
    const axiosInstance = stubAxiosInstance();
    axiosInstance.get.rejects(stubAxiosNotFound('No state summary found'));
    const restMunicipalityRepository = new RestStateRepository(axiosInstance);
    restMunicipalityRepository.list().catch(error => {
      expect(error).toBeInstanceOf(NotFound);
      expect(error.message).toContain('state summary');
      expect(error.stack).toContain('Caused by');
      expect(error.stack).toContain('No state summary found');
      next();
    });
  });

  it('should list state summaries', async () => {
    const axiosInstance = stubAxiosInstance();
    const restStateSummaries: RestStateSummary[] = [
      restStateSummary({}),
      restStateSummary({ id: '02', nombre: 'Baja California', alumnosInasistencia: 77 }),
    ];
    axiosInstance.get.resolves({ data: restStateSummaries });
    const restMunicipalityRepository = new RestStateRepository(axiosInstance);
    const list = await restMunicipalityRepository.list();
    const [first, second] = list;
    expect(list).toHaveLength(2);
    expect(axiosInstance.get.getCall(0).args[0]).toBe('states.json');
    expect(first).toEqual<StateSummary>({
      id: '01',
      name: 'Aguascalientes',
      studentAbsenceRate: 0.48,
      teacherAbsenceRate: 0.48,
      adminAbsenceRate: 0.48,
    });
    expect(second).toEqual<StateSummary>({
      id: '02',
      name: 'Baja California',
      studentAbsenceRate: 77,
      teacherAbsenceRate: 0.48,
      adminAbsenceRate: 0.48,
    });
  });
});
