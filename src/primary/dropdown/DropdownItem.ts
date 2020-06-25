import { AdministrativeDivisionSummary } from '@/domain/administrative-division/AdministrativeDivisionSummary';
import { SchoolSummary } from '@/domain/school/SchoolSummary';

export interface DropdownItem {
  id: string;
  name: string;
}

export const DropdownItem = (entity: AdministrativeDivisionSummary | SchoolSummary): DropdownItem => ({
  id: entity.id.toString(),
  name: entity.name,
});
