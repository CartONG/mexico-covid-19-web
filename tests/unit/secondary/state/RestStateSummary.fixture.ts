import { RestStateSummary } from '@/secondary/state/RestStateSummary';

interface RestStateSummaryOption {
  id?: string;
  nombre?: string;
  alumnosInasistencia?: number;
  docentesInasistencia?: number;
  adminInasistencia?: number;
}

const defaultRestStateSummary: RestStateSummary = {
  id: '01',
  nombre: 'Aguascalientes',
  alumnosInasistencia: 0.48,
  docentesInasistencia: 0.48,
  adminInasistencia: 0.48,
};

export const restStateSummary = (options: RestStateSummaryOption): RestStateSummary => ({
  ...defaultRestStateSummary,
  ...options,
});
