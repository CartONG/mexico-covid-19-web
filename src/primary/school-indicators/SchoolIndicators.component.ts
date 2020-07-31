import { Component, Prop, Vue } from 'vue-property-decorator';

import { School } from '@/domain/school/School';
import { toSchoolDataSet } from '@/primary/common/SchoolDataSet';

@Component
export default class SchoolIndicators extends Vue {
  @Prop()
  readonly school!: School;

  @Prop()
  readonly inline!: boolean;

  get schoolDataSet() {
    return toSchoolDataSet(this.school);
  }
}
