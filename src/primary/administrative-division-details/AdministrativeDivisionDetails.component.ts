import { Component, Prop, Vue } from 'vue-property-decorator';

import { AdministrativeDivision } from '@/domain/administrative-division/AdministrativeDivision';
import { toAdministrativeDivisionDataset } from '@/primary/common/AdministrativeDivisionDataSet';

@Component
export default class AdministrativeDivisionDetails extends Vue {
  @Prop()
  readonly administrativeDivision!: AdministrativeDivision;

  @Prop({ default: false, required: false })
  readonly printable!: boolean;

  get administrativeDivisionDataSet() {
    return toAdministrativeDivisionDataset(this.administrativeDivision);
  }
}
