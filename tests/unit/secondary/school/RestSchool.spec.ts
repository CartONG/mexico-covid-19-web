import { restSchool } from './RestSchool.fixture';

import { toSchool } from '@/secondary/school/RestSchool';

describe('RestSchool', () => {
  it('should set gender percentages to -1 if gender percentages cannot be calculated', () => {
    const restSchool1 = restSchool({ alumnos: -1 });
    const restSchool2 = restSchool({ alumnas: -1 });
    expect(toSchool(restSchool1).maleStudentPercentage).toBe(-1);
    expect(toSchool(restSchool1).femaleStudentPercentage).toBe(-1);
    expect(toSchool(restSchool2).maleStudentPercentage).toBe(-1);
    expect(toSchool(restSchool2).femaleStudentPercentage).toBe(-1);
  });

  it('should calculate gender percentages', () => {
    const school1 = toSchool(restSchool({ alumnos: 5, alumnas: 5 }));
    const school2 = toSchool(restSchool({ alumnos: 0, alumnas: 0 }));
    expect(school1.femaleStudentPercentage).toBe(0.5);
    expect(school2.femaleStudentPercentage).toBe(0);
  });

  it('should calculate main absence reasons percentages', () => {
    const school = toSchool(restSchool({ inadoc_causa1: 3, inadoc_causa2: 3 }));
    expect(school.teacherAbsenceMainReasonsPercentages['2']).toBe(0.5);
  });

  it('should calculate main absence reasons percentages', () => {
    const school = toSchool(restSchool({ inadoc_causa1: 3, inadoc_causa2: 3 }));
    expect(school.teacherAbsenceMainReasonsPercentages['2']).toBe(0.5);
  });

  it('should treat -1 values as 0 for calculating absence reasons percentages', () => {
    const school = toSchool(
      restSchool({
        inaalum_causa1: -1,
        inaalum_causa2: -1,
        inaalum_causa3: -1,
        inaalum_causa4: 4,
        inaalum_causa5: -1,
        inadoc_causa1: -1,
        inadoc_causa2: -1,
        inadoc_causa3: -1,
        inadoc_causa4: -1,
        inaadm_causa1: -1,
        inaadm_causa2: -1,
        inaadm_causa3: -1,
        inaadm_causa4: -1,
      })
    );
    expect(school.studentAbsenceMainReasonsPercentages['1']).toBe(0);
    expect(school.studentAbsenceMainReasonsPercentages['2']).toBe(0);
    expect(school.studentAbsenceMainReasonsPercentages['3']).toBe(0);
    expect(school.studentAbsenceMainReasonsPercentages['4']).toBe(1);
    expect(school.studentAbsenceMainReasonsPercentages['5']).toBe(0);
    expect(school.teacherAbsenceMainReasonsPercentages['1']).toBe(0);
    expect(school.teacherAbsenceMainReasonsPercentages['2']).toBe(0);
    expect(school.teacherAbsenceMainReasonsPercentages['3']).toBe(0);
    expect(school.teacherAbsenceMainReasonsPercentages['4']).toBe(0);
    expect(school.adminAbsenceMainReasonsPercentages['1']).toBe(0);
    expect(school.adminAbsenceMainReasonsPercentages['2']).toBe(0);
    expect(school.adminAbsenceMainReasonsPercentages['3']).toBe(0);
    expect(school.adminAbsenceMainReasonsPercentages['4']).toBe(0);
  });

  it('should handle undefined values for electricity sources and internet data', () => {
    const school = toSchool(restSchool({ contservelectrica: undefined, internet: undefined }));
    expect(school.electricitySource).toBe(0);
    expect(school.internetAccess).toBe(0);
  });
});
