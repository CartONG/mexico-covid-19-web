import { SelectionSource } from '@/domain/selection/SelectionSource';
import { SelectionType } from '@/domain/selection/SelectionType';

export interface Selection {
  type: SelectionType;
  source: SelectionSource;
  stateId: string;
  municipalityId: string;
  schoolId: string;
}
