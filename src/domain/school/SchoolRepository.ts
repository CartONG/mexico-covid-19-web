import { SchoolSummary } from '@/domain/school/SchoolSummary';

export interface SchoolRepository {
  list: () => Promise<SchoolSummary[]>;
}
