import { makeSchoolSummary } from '../SchoolSummary.fixture';

import { AdministrativeLevels } from '@/domain/AdministrativeLevels';
import { AttendanceType } from '@/domain/AttendanceType';
import { AttendanceListDataSet, toAttendanceListDataSet } from '@/primary/attendance-list/AttendanceListDataSet';
import { PercentageDataSet, toPercentageDataSet } from '@/primary/common/PercentageDataSet';

describe('AttendanceListDataSet', () => {
  it('should return attendance list data set', () => {
    const summaries = [makeSchoolSummary()];
    expect(toAttendanceListDataSet(AdministrativeLevels.COUNTRY, AttendanceType.STUDENT, summaries)).toEqual<AttendanceListDataSet>({
      header: 'Porcentaje de alumnado presente por entidad',
      entityColumnName: 'Entidad',
      items: [
        {
          id: '03DDI0003E4',
          name: 'CENTRO DE ATENCIÓN INFANTIL 3 CARMEN VERDUGO PEDRIN - Discontinuo',
          percentage: toPercentageDataSet(0.62),
        },
      ],
    });
    expect(toAttendanceListDataSet(AdministrativeLevels.COUNTRY, AttendanceType.TEACHER, [makeSchoolSummary({ turn: '' })])).toEqual<
      AttendanceListDataSet
    >({
      header: 'Porcentaje de docentes presentes por entidad',
      entityColumnName: 'Entidad',
      items: [
        {
          id: '03DDI0003E4',
          name: 'CENTRO DE ATENCIÓN INFANTIL 3 CARMEN VERDUGO PEDRIN',
          percentage: toPercentageDataSet(1),
        },
      ],
    });
    expect(toAttendanceListDataSet(AdministrativeLevels.COUNTRY, AttendanceType.PERSONAL, summaries)).toEqual<AttendanceListDataSet>({
      header: 'Porcentaje de personal presente por entidad',
      entityColumnName: 'Entidad',
      items: [
        {
          id: '03DDI0003E4',
          name: 'CENTRO DE ATENCIÓN INFANTIL 3 CARMEN VERDUGO PEDRIN - Discontinuo',
          percentage: toPercentageDataSet(1),
        },
      ],
    });
  });
});
