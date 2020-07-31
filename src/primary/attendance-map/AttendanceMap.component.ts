import { Component, Inject, Prop, Vue, Watch } from 'vue-property-decorator';

import { AdministrativeDivisionSummary } from '@/domain/administrative-division/AdministrativeDivisionSummary';
import { AttendanceType } from '@/domain/AttendanceType';
import { School } from '@/domain/school/School';
import { SchoolSummary } from '@/domain/school/SchoolSummary';
import { Summary } from '@/domain/Summary';
import { AttendanceTabsVue } from '@/primary/attendance-map/attendance-tabs';
import { PopupVue } from '@/primary/attendance-map/popup';
import { AttendanceWebmapping } from '@/primary/attendance-webmapping/AttendanceWebmapping';
import { ComponentState } from '@/primary/ComponentState';
import { Delayer } from '@/primary/Delayer';
import { NavigationBus } from '@/primary/navigation/NavigationBus';
import { NavigationParams } from '@/primary/navigation/NavigationParams';

// TODO: inject a selector object to not directly use the global document object

@Component({
  components: { PopupVue, AttendanceTabsVue },
})
export default class ChoroplethMap extends Vue {
  state: ComponentState = ComponentState.PENDING;
  schoolItems: { id: string; name: string }[] = [];
  stateId = '';

  @Inject()
  private navigationBus!: () => NavigationBus;

  @Inject()
  private attendanceWebmapping!: () => AttendanceWebmapping;

  @Inject()
  private updateMapViewportDelayer!: () => Delayer;

  @Prop()
  private school!: School;

  @Prop()
  private schoolsSummaries!: SchoolSummary[];

  @Prop()
  private summary!: Summary[];

  @Prop({ default: false, required: false })
  readonly inline!: boolean;

  @Prop({ default: false, required: false })
  readonly printable!: boolean;

  @Prop()
  readonly attendanceType!: AttendanceType;

  @Watch('schoolsSummaries')
  schoolSummariesWatcher() {
    this.attendanceWebmapping().setSchoolsFeatures(this.schoolsSummaries);
  }

  @Watch('school')
  schoolWatcher() {
    this.updateMapViewportDelayer().afterDelay(() => this.attendanceWebmapping().updateMapSize());
  }

  @Watch('attendanceType')
  attendanceTypeWatcher(attendanceType: AttendanceType) {
    this.attendanceWebmapping().switchAttendanceType(attendanceType);
  }

  created() {
    this.attendanceWebmapping().onSelectState(navigationParams => this.navigationBus().goToState(navigationParams));
    this.attendanceWebmapping().onSelectMunicipality(navigationParams => this.navigationBus().goToMunicipality(navigationParams));
    this.attendanceWebmapping().onSelectSchoolCluster((schools: { id: string; name: string }[]) => (this.schoolItems = schools));
    this.attendanceWebmapping().onSelectSchool(navigationParams => this.navigationBus().goToSchool(navigationParams));
    this.navigationBus().onBackToCountry(() => this.attendanceWebmapping().fitToCountry(false));
    this.navigationBus().onGoToState(navigationParams => this.attendanceWebmapping().fitToState(navigationParams.id));
    this.navigationBus().onBackToState(navigationParams => this.attendanceWebmapping().fitToState(navigationParams.id));
    this.navigationBus().onGoToMunicipality(navigationParams => this.attendanceWebmapping().fitToMunicipality(navigationParams.id));
    this.navigationBus().onBackToMunicipality(navigationParams => this.attendanceWebmapping().fitToMunicipality(navigationParams.id));
    this.navigationBus().onGoToSchool((navigationParams: NavigationParams) => this.attendanceWebmapping().fitToSchool(navigationParams.id));
  }

  mounted() {
    const popupElement = document.getElementById('popup') || undefined;
    this.attendanceWebmapping().addControls();
    this.attendanceWebmapping().setMapTarget('map');
    this.attendanceWebmapping().setPopupElement(popupElement);
    this.attendanceWebmapping().updateMapSize();
    this.attendanceWebmapping().switchAttendanceType(this.attendanceType);

    this.updateMapViewportDelayer().afterDelay(() => {
      this.attendanceWebmapping().adjust();
      this.$emit('ready');
    });
  }

  beforeDestroy() {
    this.attendanceWebmapping().removeControls();
    this.attendanceWebmapping().setMapTarget(undefined);
  }

  private pickSchool(schoolItem: { id: string; name: string }) {
    this.navigationBus().goToSchool(schoolItem);
  }

  public goBackToCountry() {
    this.attendanceWebmapping().fitToCountry(false);
    this.navigationBus().backToCountry();
  }
}
