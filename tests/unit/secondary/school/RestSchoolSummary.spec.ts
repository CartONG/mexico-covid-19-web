import { restSchoolSummary } from './RestSchoolSummary.fixture';

import { toSchoolSummary } from '@/secondary/school/RestSchoolSummary';

const expectTurn = (restTurn: string, turn: string): void => {
  const restSummary = restSchoolSummary({ turno: restTurn });
  expect(toSchoolSummary(restSummary).turn).toBe(turn);
};

describe('RestSchoolSummary', () => {
  it('should set turn', () => {
    expectTurn('1', 'Matutino');
    expectTurn('2', 'Vespertino');
    expectTurn('3', 'Nocturno');
    expectTurn('4', 'Discontinuo');
    expectTurn('5', 'Continuo (tiempo completo)');
    expectTurn('6', 'Complementario');
    expectTurn('7', 'Continuo (jornada ampliada)');
    expectTurn('', '');
  });
});
