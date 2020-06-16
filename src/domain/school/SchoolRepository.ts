import { School } from '@/domain/school/School';
import { SchoolSummary } from '@/domain/school/SchoolSummary';

export interface SchoolRepository {
  list: (municipalityId: string) => Promise<SchoolSummary[]>;
  find: (schoolId: string) => Promise<School>;
}
