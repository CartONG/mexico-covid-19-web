import { restAdministrativeDivision } from './RestAdministrativeDivision.fixture';

import { AdministrativeDivisionTypes } from '@/domain/administrative-division/AdministrativeDivisionTypes';
import { toAdministrativeDivision } from '@/secondary/administrative-division/RestAdministrativeDivision';

describe('RestAdministrativeDivision', () => {
  it('should set gender percentages to -1 if gender percentages cannot be calculated', () => {
    const restAdminDivision1 = restAdministrativeDivision({ sumaAlumnas: -1 });
    const restAdminDivision2 = restAdministrativeDivision({ sumaAlumnos: -1 });
    expect(toAdministrativeDivision(restAdminDivision1, AdministrativeDivisionTypes.STATE).maleStudentPercentage).toBe(-1);
    expect(toAdministrativeDivision(restAdminDivision1, AdministrativeDivisionTypes.STATE).femaleStudentPercentage).toBe(-1);
    expect(toAdministrativeDivision(restAdminDivision2, AdministrativeDivisionTypes.STATE).maleStudentPercentage).toBe(-1);
    expect(toAdministrativeDivision(restAdminDivision2, AdministrativeDivisionTypes.STATE).femaleStudentPercentage).toBe(-1);
  });

  it('should set gender percentages to 0 if there are no students', () => {
    const restAdminDivision = restAdministrativeDivision({ sumaAlumnas: 0, sumaAlumnos: 0 });
    expect(toAdministrativeDivision(restAdminDivision, AdministrativeDivisionTypes.STATE).femaleStudentPercentage).toBe(0);
  });

  it('should set main reasons to empty object if main reasons numbers are not provided', () => {
    const restAdminDivision = restAdministrativeDivision({
      sumaCausaInaAlum: undefined,
      causaInaAlum: undefined,
      sumaCausaInaDocente: undefined,
      causaInaDocente: undefined,
      sumaCausaInaAdmin: undefined,
      causaInaAdmin: undefined,
    });
    const adminDivision = toAdministrativeDivision(restAdminDivision, AdministrativeDivisionTypes.STATE);
    expect(adminDivision.studentAbsenceMainReasons).toEqual({});
    expect(adminDivision.studentAbsenceMainReasonsPercentages).toEqual({});
    expect(adminDivision.teacherAbsenceMainReasons).toEqual({});
    expect(adminDivision.teacherAbsenceMainReasonsPercentages).toEqual({});
    expect(adminDivision.adminAbsenceMainReasons).toEqual({});
    expect(adminDivision.adminAbsenceMainReasonsPercentages).toEqual({});
  });
});
