import { makeSchool } from '../School.fixture';

import { toNumericDataSet } from '@/primary/common/NumericDataSet';
import { toPercentageDataSet } from '@/primary/common/PercentageDataSet';
import { SchoolDataSet, toSchoolDataSet } from '@/primary/common/SchoolDataSet';

const expectTakenActions = (takenActions: { visits: boolean; calls: boolean; scholarship: boolean; none: boolean }, expected: string) => {
  const school = makeSchool({ takenActions });
  expect(toSchoolDataSet(school).takenActions).toBe(expected);
};

const expectTurn = (domainTurn: string, expectedTur: string) => {
  const school = makeSchool({ turn: domainTurn });
  expect(toSchoolDataSet(school).turn).toBe(expectedTur);
};

const expectFoodSupportType = (
  foodSupportType: { dif: boolean; fullTimeProgram: boolean; state: boolean; others: boolean },
  expected: string
) => {
  const school = makeSchool({ foodSupportType });
  expect(toSchoolDataSet(school).foodSupportType).toBe(expected);
};

describe('SchoolDataSet', () => {
  it('should transform a school to a school data set', () => {
    const school = makeSchool();
    expect(toSchoolDataSet(school)).toEqual<SchoolDataSet>({
      id: '03KJN0025W4',
      locality: 'LA CANDELARIA',
      name: 'CURSO COMUNITARIO DE EDUCACION PREESCOLAR',
      studentAttendance: toPercentageDataSet(1),
      maleStudentAbsencePercentageOverStudentAbsence: toPercentageDataSet(0),
      femaleStudentAbsencePercentageOverStudentAbsence: toPercentageDataSet(0),
      teacherAttendance: toPercentageDataSet(1),
      adminAttendance: toPercentageDataSet(-1),
      level: 'PREESCOLAR',
      workCenterKey: '03KJN0025W',
      turn: 'discontinuo',
      givesClasses: { shortText: 'Si', longText: 'Personal y Alumnos realizan sus actividades en la escuela' },
      modality: 'PREESCOLAR COMUNITARIO',
      municipality: 'LOS CABOS',
      address: 'NINGUNO NINGUNO',
      support: 'PÚBLICO',
      femaleStudent: toNumericDataSet(1),
      maleStudent: toNumericDataSet(5),
      maleStudentPercentage: toPercentageDataSet(0.83),
      femaleStudentPercentage: toPercentageDataSet(0.17),
      students: toNumericDataSet(6),
      teachers: toNumericDataSet(1),
      assistants: toNumericDataSet(1),
      directors: toNumericDataSet(0),
      subDirectors: toNumericDataSet(0),
      technicalPedagogicalAdvisers: toNumericDataSet(0),
      physicalEducationTeachers: toNumericDataSet(0),
      admins: toNumericDataSet(0),
      quartermasters: toNumericDataSet(0),
      others: toNumericDataSet(0),
      waterSupply: 'Abastecimiento a través de pipas',
      waterServiceContinuity: 'De 2 a 4 días a la semana',
      waterForHandWashing: { shortText: 'Si', longText: 'Cuenta con agua para el lavado de manos' },
      functionalSinkCount: toNumericDataSet(2),
      soapSufficiency: { shortText: 'Suficiente', longText: 'Cuenta con suficiente jabón' },
      towelSufficiency: 'No cuenta',
      sanitizerSufficiency: 'Cuenta con suficiente alcohol en gel',
      binSufficiency: 'No cuenta con botes de basura para el manejo de los residuos',
      hasSepticSystem: 'No cuenta con Red de drenaje, fosa séptica para desalojo de aguas',
      hasAbilityToReorganizeSpace: 'Si',
      hasHygieneCommittee: 'Si',
      alternatesAttendance: 'Si',
      absentFemaleStudents: '0',
      absentMaleStudents: '0',
      studentAbsenceMainReasons: {
        '1': toNumericDataSet(0),
        '2': toNumericDataSet(0),
        '3': toNumericDataSet(0),
        '4': toNumericDataSet(0),
        '5': toNumericDataSet(0),
      },
      studentAbsenceMainReasonsPercentages: {
        '1': toPercentageDataSet(0),
        '2': toPercentageDataSet(0),
        '3': toPercentageDataSet(0),
        '4': toPercentageDataSet(0),
        '5': toPercentageDataSet(0),
      },
      studentAbsenceOtherReason: '',
      absentTeachers: '0',
      teacherAbsenceMainReasons: {
        '1': toNumericDataSet(0),
        '2': toNumericDataSet(0),
        '3': toNumericDataSet(0),
        '4': toNumericDataSet(0),
      },
      teacherAbsenceMainReasonsPercentages: {
        '1': toPercentageDataSet(0),
        '2': toPercentageDataSet(0),
        '3': toPercentageDataSet(0),
        '4': toPercentageDataSet(0),
      },
      teacherAbsenceOtherReason: '',
      absentAdmins: '0',
      adminAbsenceMainReasons: {
        '1': toNumericDataSet(0),
        '2': toNumericDataSet(0),
        '3': toNumericDataSet(0),
        '4': toNumericDataSet(0),
      },
      adminAbsenceMainReasonsPercentages: {
        '1': toPercentageDataSet(0),
        '2': toPercentageDataSet(0),
        '3': toPercentageDataSet(0),
        '4': toPercentageDataSet(0),
      },
      adminAbsenceOtherReason: '',
      comments: '',
      takenActions: 'Llamada telefónica, Gestión de becas',
      drinkers: toNumericDataSet(5),
      maleStudentToilets: toNumericDataSet(2),
      femaleStudentToilets: toNumericDataSet(2),
      foodSupport: 'Sí, reciben algún apoyo de alimentación',
      foodSupportType: 'Reciben alimentos  por parte del Programa de Tiempo Completo - Quienes proporcionan los alimentos. Otros',
      foodSupportComment: '',
      theSchoolIsOurs: 'Si pertenece',
      electricitySource: 'Planta de luz propria',
      internetAccess: 'La escuela cuenta con accesso a internet para uso de de alumnos, docentes y directivos',
    });
  });

  it('should set a default school data set', () => {
    expect(toSchoolDataSet(undefined)).toEqual<SchoolDataSet>({
      id: '-',
      locality: '-',
      name: '-',
      studentAttendance: toPercentageDataSet(-1),
      maleStudentAbsencePercentageOverStudentAbsence: toPercentageDataSet(-1),
      femaleStudentAbsencePercentageOverStudentAbsence: toPercentageDataSet(-1),
      teacherAttendance: toPercentageDataSet(-1),
      adminAttendance: toPercentageDataSet(-1),
      level: '-',
      workCenterKey: '-',
      turn: '-',
      givesClasses: { shortText: '-', longText: '-' },
      modality: '-',
      municipality: '-',
      address: '-',
      support: '-',
      femaleStudent: toNumericDataSet(-1),
      maleStudent: toNumericDataSet(-1),
      maleStudentPercentage: toPercentageDataSet(-1),
      femaleStudentPercentage: toPercentageDataSet(-1),
      students: toNumericDataSet(-1),
      teachers: toNumericDataSet(-1),
      assistants: toNumericDataSet(-1),
      directors: toNumericDataSet(-1),
      subDirectors: toNumericDataSet(-1),
      technicalPedagogicalAdvisers: toNumericDataSet(-1),
      physicalEducationTeachers: toNumericDataSet(-1),
      admins: toNumericDataSet(-1),
      quartermasters: toNumericDataSet(-1),
      others: toNumericDataSet(-1),
      waterSupply: '-',
      waterServiceContinuity: '-',
      waterForHandWashing: { shortText: '-', longText: '-' },
      functionalSinkCount: toNumericDataSet(-1),
      soapSufficiency: { shortText: '-', longText: '-' },
      towelSufficiency: '-',
      sanitizerSufficiency: '-',
      binSufficiency: '-',
      hasSepticSystem: '-',
      hasAbilityToReorganizeSpace: '-',
      hasHygieneCommittee: '-',
      alternatesAttendance: '-',
      absentFemaleStudents: '-',
      absentMaleStudents: '-',
      studentAbsenceMainReasons: {
        '1': toNumericDataSet(-1),
        '2': toNumericDataSet(-1),
        '3': toNumericDataSet(-1),
        '4': toNumericDataSet(-1),
        '5': toNumericDataSet(-1),
      },
      studentAbsenceMainReasonsPercentages: {
        '1': toPercentageDataSet(-1),
        '2': toPercentageDataSet(-1),
        '3': toPercentageDataSet(-1),
        '4': toPercentageDataSet(-1),
        '5': toPercentageDataSet(-1),
      },
      studentAbsenceOtherReason: '-',
      absentTeachers: '-',
      teacherAbsenceMainReasons: {
        '1': toNumericDataSet(-1),
        '2': toNumericDataSet(-1),
        '3': toNumericDataSet(-1),
        '4': toNumericDataSet(-1),
      },
      teacherAbsenceMainReasonsPercentages: {
        '1': toPercentageDataSet(-1),
        '2': toPercentageDataSet(-1),
        '3': toPercentageDataSet(-1),
        '4': toPercentageDataSet(-1),
      },
      teacherAbsenceOtherReason: '-',
      absentAdmins: '-',
      adminAbsenceMainReasons: {
        '1': toNumericDataSet(-1),
        '2': toNumericDataSet(-1),
        '3': toNumericDataSet(-1),
        '4': toNumericDataSet(-1),
      },
      adminAbsenceMainReasonsPercentages: {
        '1': toPercentageDataSet(-1),
        '2': toPercentageDataSet(-1),
        '3': toPercentageDataSet(-1),
        '4': toPercentageDataSet(-1),
      },
      adminAbsenceOtherReason: '-',
      comments: '-',
      takenActions: '',
      drinkers: toNumericDataSet(-1),
      maleStudentToilets: toNumericDataSet(-1),
      femaleStudentToilets: toNumericDataSet(-1),
      foodSupport: '-',
      foodSupportType: '',
      foodSupportComment: '',
      theSchoolIsOurs: '-',
      electricitySource: '-',
      internetAccess: '-',
    });
  });

  it('should set turn', () => {
    expectTurn('', '-');
    expectTurn('1', 'matutino');
    expectTurn('2', 'vespertino');
    expectTurn('3', 'nocturno');
    expectTurn('4', 'discontinuo');
    expectTurn('5', 'continuo (tiempo completo)');
    expectTurn('6', 'complementario');
    expectTurn('7', 'continuo (jornada ampliada)');
  });

  it('should set taken actions', () => {
    expectTakenActions({ visits: false, calls: false, scholarship: false, none: false }, '');
    expectTakenActions({ visits: true, calls: false, scholarship: false, none: false }, 'Visita domiciliaria');
    expectTakenActions({ visits: true, calls: true, scholarship: false, none: false }, 'Visita domiciliaria, Llamada telefónica');
    expectTakenActions(
      { visits: true, calls: true, scholarship: true, none: false },
      'Visita domiciliaria, Llamada telefónica, Gestión de becas'
    );
    expectTakenActions(
      { visits: true, calls: true, scholarship: true, none: true },
      'Visita domiciliaria, Llamada telefónica, Gestión de becas, Ninguna'
    );
  });

  it('should set food support type', () => {
    expectFoodSupportType({ dif: false, fullTimeProgram: false, state: false, others: false }, '');
    expectFoodSupportType({ dif: true, fullTimeProgram: false, state: false, others: false }, 'Reciben alimentos por parte del DIF');
    expectFoodSupportType(
      { dif: true, fullTimeProgram: true, state: false, others: false },
      'Reciben alimentos por parte del DIF - Reciben alimentos  por parte del Programa de Tiempo Completo'
    );
    expectFoodSupportType(
      { dif: true, fullTimeProgram: true, state: true, others: false },
      'Reciben alimentos por parte del DIF - Reciben alimentos  por parte del Programa de Tiempo Completo - Reciben alimentos por parte del Estado'
    );
    expectFoodSupportType(
      { dif: true, fullTimeProgram: true, state: true, others: true },
      'Reciben alimentos por parte del DIF - Reciben alimentos  por parte del Programa de Tiempo Completo - Reciben alimentos por parte del Estado - Quienes proporcionan los alimentos. Otros'
    );
  });

  it('should set food support', () => {
    expect(toSchoolDataSet(makeSchool({ foodSupport: true })).foodSupport).toBe('Sí, reciben algún apoyo de alimentación');
    expect(toSchoolDataSet(makeSchool({ foodSupport: false })).foodSupport).toBe('No, recibe apoyo de alimentación');
  });

  it('should set the school is ours', () => {
    expect(toSchoolDataSet(makeSchool({ theSchoolIsOurs: undefined })).theSchoolIsOurs).toBe('-');
    expect(toSchoolDataSet(makeSchool({ theSchoolIsOurs: 1 })).theSchoolIsOurs).toBe('Si pertenece');
    expect(toSchoolDataSet(makeSchool({ theSchoolIsOurs: 2 })).theSchoolIsOurs).toBe('No pertenece');
  });

  it('should set give classes', () => {
    expect(toSchoolDataSet(makeSchool({ givesClasses: 0 })).givesClasses).toEqual({ shortText: '-', longText: '-' });
    expect(toSchoolDataSet(makeSchool({ givesClasses: 1 })).givesClasses).toEqual({
      shortText: 'Si',
      longText: 'Personal y Alumnos realizan sus actividades en la escuela',
    });
    expect(toSchoolDataSet(makeSchool({ givesClasses: 2 })).givesClasses).toEqual({
      shortText: 'No',
      longText: 'Se está realizando la limpieza de espacios para poder iniciar con las clases',
    });
    expect(toSchoolDataSet(makeSchool({ givesClasses: 3 })).givesClasses).toEqual({
      shortText: 'No',
      longText: 'Existe la confirmación de al menos un caso de COVID-19 en la escuela',
    });
    expect(toSchoolDataSet(makeSchool({ givesClasses: 4 })).givesClasses).toEqual({
      shortText: 'No',
      longText: 'La Autoridad Educativa Local determinó continuar con la suspensión de clases',
    });
    expect(toSchoolDataSet(makeSchool({ givesClasses: 5 })).givesClasses).toEqual({
      shortText: 'No',
      longText: 'La comunidad escolar determinó continuar con la suspensión de clases',
    });
    expect(toSchoolDataSet(makeSchool({ givesClasses: 6 })).givesClasses).toEqual({
      shortText: 'No',
      longText: 'El personal de la escuela decidió continuar con la suspensión de clases',
    });
    expect(toSchoolDataSet(makeSchool({ givesClasses: 7 })).givesClasses).toEqual({
      shortText: 'No',
      longText: 'Todos las madres y los padres de familia determinarón no enviar a sus hijos a la escuela',
    });
    expect(toSchoolDataSet(makeSchool({ givesClasses: 8 })).givesClasses).toEqual({
      shortText: 'No',
      longText: 'Otras razones',
    });
  });
});
