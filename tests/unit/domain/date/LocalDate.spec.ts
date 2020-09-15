import { InvalidDate } from '@/domain/date/InvalidDate';
import { LocalDate } from '@/domain/date/LocalDate';

describe('LocalDate', () => {
  it('Should not build with invalid date format', () => {
    expect(() => LocalDate.of('unexisting')).toThrow(InvalidDate);
  });

  it('Should be readable for a human', () => {
    expect(LocalDate.of('2020-01-21').toHuman()).toBe('21/01/2020');
  });
});
