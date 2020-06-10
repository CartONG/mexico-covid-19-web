import { RestMunicipalitySummary } from '@/secondary/municipality/RestMunicipalitySummary';

interface RestMunicipalitySummaryOption {
  id?: string;
  nombre?: string;
  entidadId?: string;
  alumnosInasistencia?: number;
  docentesInasistencia?: number;
  adminInasistencia?: number;
}

const defaultRestMunicipalitySummary: RestMunicipalitySummary = {
  id: '001',
  nombre: 'Armería',
  entidadId: '06',
  alumnosInasistencia: 0.48,
  docentesInasistencia: 0.48,
  adminInasistencia: 0.48,
};

export const restMunicipalitySummary = (options: RestMunicipalitySummaryOption): RestMunicipalitySummary => ({
  ...defaultRestMunicipalitySummary,
  ...options,
});
