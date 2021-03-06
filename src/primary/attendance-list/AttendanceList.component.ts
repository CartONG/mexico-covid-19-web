import { Component, Inject, Prop, Vue } from 'vue-property-decorator';

import { AdministrativeLevels } from '@/domain/AdministrativeLevels';
import { AttendanceType } from '@/domain/AttendanceType';
import { Summary } from '@/domain/Summary';
import { toAttendanceListDataSet } from '@/primary/attendance-list/AttendanceListDataSet';
import { NavigationBus } from '@/primary/navigation/NavigationBus';
import { NavigationParams } from '@/primary/navigation/NavigationParams';

@Component
export default class RateList extends Vue {
  @Inject()
  private navigationBus!: () => NavigationBus;

  @Prop()
  readonly summaries!: Summary[];

  @Prop()
  readonly attendanceType!: AttendanceType;

  @Prop()
  readonly navigation!: NavigationParams[];

  @Prop()
  readonly administrativeLevel!: AdministrativeLevels;

  @Prop()
  readonly attendanceListSortOptions!: [string, string];

  @Prop({ default: false, required: false })
  readonly stickyHeader!: boolean;

  get attendanceListDataSet() {
    return toAttendanceListDataSet(this.administrativeLevel, this.attendanceType, this.summaries);
  }

  get schoolId() {
    return this.navigation[2] && this.navigation[2].id ? this.navigation[2].id : '';
  }

  public goTo(id: string, name: string) {
    switch (this.administrativeLevel) {
      case AdministrativeLevels.COUNTRY:
        return this.navigationBus().goToState({ id, name });
      case AdministrativeLevels.STATE:
        return this.navigationBus().goToMunicipality({ id, name });
      case AdministrativeLevels.MUNICIPALITY:
        return this.navigationBus().goToSchool({ id, name });
      case AdministrativeLevels.SCHOOL:
        return this.navigationBus().goToSchool({ id, name });
    }
  }

  public sort(field: string, order: string) {
    this.$emit('sort', [field, order]);
  }
}
