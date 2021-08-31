import { makeSchool } from '../School.fixture';

import { toSchoolCsvExportContent } from '@/primary/export-dropdown/SchoolCsvExportContent';

const expectTakenActions = (takenActions: { visits: boolean; calls: boolean; scholarship: boolean; none: boolean }, expected: string) => {
  const school = makeSchool({ takenActions });
  expect(toSchoolCsvExportContent(school)['Acciones para reincorporar a los alumnos con inasistencias']).toBe(expected);
};

const expectFoodSupportType = (
  foodSupportType: { dif: boolean; fullTimeProgram: boolean; state: boolean; others: boolean },
  expected: string
) => {
  const school = makeSchool({ foodSupportType });
  expect(toSchoolCsvExportContent(school)['Quienes proporcionan los alimentos']).toBe(expected);
};

describe('SchoolCsvExportContent', () => {
  it('should export taken actions', () => {
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

  it('should export food support type', () => {
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

  it('should export food support', () => {
    expect(toSchoolCsvExportContent(makeSchool({ foodSupport: true }))['Reciben el apoyo de alimentación en la escuela']).toBe(
      'Sí, reciben algún apoyo de alimentación'
    );
    expect(toSchoolCsvExportContent(makeSchool({ foodSupport: false }))['Reciben el apoyo de alimentación en la escuela']).toBe(
      'No, recibe apoyo de alimentación'
    );
  });

  it('should set the school is ours', () => {
    expect(
      toSchoolCsvExportContent(makeSchool({ theSchoolIsOurs: undefined }))['La escuela pertenece al programa La Escuela es nuestra']
    ).toBe('-');
    expect(toSchoolCsvExportContent(makeSchool({ theSchoolIsOurs: 1 }))['La escuela pertenece al programa La Escuela es nuestra']).toBe(
      'Si pertenece'
    );
    expect(toSchoolCsvExportContent(makeSchool({ theSchoolIsOurs: 2 }))['La escuela pertenece al programa La Escuela es nuestra']).toBe(
      'No pertenece'
    );
  });

  it('should set give classes', () => {
    expect(toSchoolCsvExportContent(makeSchool({ givesClasses: 0 }))['En la escuela se reiniciaron las clases presenciales']).toBe('-');
    expect(toSchoolCsvExportContent(makeSchool({ givesClasses: 1 }))['En la escuela se reiniciaron las clases presenciales']).toBe(
      'Si, Personal y Alumnos realizan sus actividades en la escuela'
    );
    expect(toSchoolCsvExportContent(makeSchool({ givesClasses: 2 }))['En la escuela se reiniciaron las clases presenciales']).toBe(
      'No, Se está realizando la limpieza de espacios para poder iniciar con las clases'
    );
    expect(toSchoolCsvExportContent(makeSchool({ givesClasses: 3 }))['En la escuela se reiniciaron las clases presenciales']).toBe(
      'No, Existe la confirmación de al menos un caso de COVID-19 en la escuela'
    );
    expect(toSchoolCsvExportContent(makeSchool({ givesClasses: 4 }))['En la escuela se reiniciaron las clases presenciales']).toBe(
      'No, La Autoridad Educativa Local determinó continuar con la suspensión de clases'
    );
    expect(toSchoolCsvExportContent(makeSchool({ givesClasses: 5 }))['En la escuela se reiniciaron las clases presenciales']).toBe(
      'No, La comunidad escolar determinó continuar con la suspensión de clases'
    );
    expect(toSchoolCsvExportContent(makeSchool({ givesClasses: 6 }))['En la escuela se reiniciaron las clases presenciales']).toBe(
      'No, El personal de la escuela decidió continuar con la suspensión de clases'
    );
    expect(toSchoolCsvExportContent(makeSchool({ givesClasses: 7 }))['En la escuela se reiniciaron las clases presenciales']).toBe(
      'No, Todos las madres y los padres de familia determinarón no enviar a sus hijos a la escuela'
    );
    expect(toSchoolCsvExportContent(makeSchool({ givesClasses: 8 }))['En la escuela se reiniciaron las clases presenciales']).toBe(
      'No, Otras razones'
    );
  });
});
