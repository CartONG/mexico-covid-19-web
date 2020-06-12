import { AxiosInstance } from 'axios';

import { NotFound } from '@/domain/NotFound';
import { StateRepository } from '@/domain/state/StateRepository';
import { StateSummary } from '@/domain/state/StateSummary';
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
}
