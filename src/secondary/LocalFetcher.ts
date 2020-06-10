import { AxiosInstance } from 'axios';

import { Fetcher } from '@/domain/Fetcher';
import { NotFound } from '@/domain/NotFound';

export class LocalFetcher implements Fetcher {
  constructor(private axiosInstance: AxiosInstance) {}

  fetch(file: string): Promise<any> {
    return this.axiosInstance
      .get<any>(file)
      .then(response => response.data)
      .catch(error => {
        throw new NotFound(`at the url: "${file}"`).cause(error);
      });
  }
}
