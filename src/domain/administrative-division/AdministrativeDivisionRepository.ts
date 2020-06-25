import { AdministrativeDivision } from '@/domain/administrative-division/AdministrativeDivision';
import { AdministrativeDivisionSummary } from '@/domain/administrative-division/AdministrativeDivisionSummary';
import { AdministrativeDivisionTypes } from '@/domain/administrative-division/AdministrativeDivisionTypes';

export interface AdministrativeDivisionRepository {
  list: (type: AdministrativeDivisionTypes) => Promise<AdministrativeDivisionSummary[]>;
  find: (type: AdministrativeDivisionTypes, AdministrativeDivisionId: string) => Promise<AdministrativeDivision>;
}
