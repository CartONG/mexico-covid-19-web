import { StateSummary } from '@/domain/state/StateSummary';

export interface StateRepository {
  list: () => Promise<StateSummary[]>;
}
