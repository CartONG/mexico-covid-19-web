import { Country } from '@/domain/country/Country';

export interface CountryRepository {
  get: () => Promise<Country>;
}
