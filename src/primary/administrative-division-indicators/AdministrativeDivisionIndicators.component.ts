import { Component, Prop, Vue } from 'vue-property-decorator';

import { AdministrativeDivision } from '@/domain/administrative-division/AdministrativeDivision';
import { toAdministrativeDivisionDataset } from '@/primary/common/AdministrativeDivisionDataSet';

@Component
export default class AdministrativeDivisionIndicators extends Vue {
  @Prop()
  readonly administrativeDivision!: AdministrativeDivision;

  @Prop()
  readonly inline!: boolean;

  get administrativeDivisionDataSet() {
    return toAdministrativeDivisionDataset(this.administrativeDivision);
  }
}
