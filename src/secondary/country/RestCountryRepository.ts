import { AxiosInstance } from 'axios';

import { Country } from '@/domain/country/Country';
import { CountryRepository } from '@/domain/country/CountryRepository';
import { NotFound } from '@/domain/NotFound';
import { RestCountry, toCountry } from '@/secondary/country/RestCountry';

export class RestCountryRepository implements CountryRepository {
  constructor(private axiosInstance: AxiosInstance) {}

  get(): Promise<Country> {
    const url = process.env.NODE_ENV === 'development' ? 'country.json' : 'pais';
    return this.axiosInstance
      .get<RestCountry>(url)
      .then(response => toCountry(response.data))
      .catch(error => {
        throw new NotFound('country').cause(error);
      });
  }
}
