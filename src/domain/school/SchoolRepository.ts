import { SchoolSummary } from '@/domain/school/SchoolSummary';

export interface SchoolRepository {
  list: (municipalityId: string) => Promise<SchoolSummary[]>;
}
