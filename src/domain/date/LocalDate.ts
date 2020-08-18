import { InvalidDate } from '@/domain/date/InvalidDate';

export class LocalDate {
  private constructor(private isoDate: string) {
    InvalidDate.assertValidity(isoDate);
  }

  static of(isoDate: string): LocalDate {
    return new LocalDate(isoDate);
  }

  toHuman() {
    const [, year, month, day] = this.isoDate.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/)!;
    return `${day}/${month}/${year}`;
  }
}
