import { MunicipalitySummary } from '@/domain/municipality/MunicipalitySummary';
import { SchoolSummary } from '@/domain/school/SchoolSummary';
import { StateSummary } from '@/domain/state/StateSummary';

export interface DropdownItem {
  id: string;
  name: string;
}

export const DropdownItem = (entity: StateSummary | MunicipalitySummary | SchoolSummary): DropdownItem => ({
  id: entity.id.toString(),
  name: entity.name,
});
