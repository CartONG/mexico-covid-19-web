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
});
