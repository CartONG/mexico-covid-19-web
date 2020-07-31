import { Component, Prop, Vue } from 'vue-property-decorator';

import { School } from '@/domain/school/School';
import { toSchoolDataSet } from '@/primary/common/SchoolDataSet';

@Component
export default class SchoolDetails extends Vue {
  @Prop()
  private school!: School;

  @Prop({ default: false, required: false })
  readonly printable!: boolean;

  get schoolDataSet() {
    return toSchoolDataSet(this.school);
  }
}
