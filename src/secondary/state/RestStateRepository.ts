import { AxiosInstance } from 'axios';

import { NotFound } from '@/domain/NotFound';
import { State } from '@/domain/state/State';
import { StateRepository } from '@/domain/state/StateRepository';
import { StateSummary } from '@/domain/state/StateSummary';
import { RestState, toState } from '@/secondary/state/RestState';
import { RestStateSummary, toStateSummary } from '@/secondary/state/RestStateSummary';

export class RestStateRepository implements StateRepository {
  constructor(private axiosInstance: AxiosInstance) {}

  list(): Promise<StateSummary[]> {
    const url = process.env.NODE_ENV === 'development' ? 'states.json' : 'entidades';
    return this.axiosInstance
      .get<RestStateSummary[]>(url)
      .then(response => response.data.map(toStateSummary))
      .catch(error => {
        throw new NotFound('state summary').cause(error);
      });
  }

  find(stateId: string): Promise<State> {
    const url = process.env.NODE_ENV === 'development' ? 'state.json' : `/entidades?cod_entidad=${stateId}`;
    return this.axiosInstance
      .get<RestState>(url)
      .then(response => toState(response.data))
      .catch(error => {
        throw new NotFound('state').cause(error);
      });
  }
}
