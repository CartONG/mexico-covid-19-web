import { State } from '@/domain/state/State';
import { StateSummary } from '@/domain/state/StateSummary';

export interface StateRepository {
  list: () => Promise<StateSummary[]>;
  find: (stateId: string) => Promise<State>;
}
