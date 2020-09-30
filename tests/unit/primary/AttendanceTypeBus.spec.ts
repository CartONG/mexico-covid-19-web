import sinon from 'sinon';

import { Vue } from 'vue-property-decorator';

import { AttendanceType } from '@/domain/AttendanceType';
import { AttendanceTypeBus } from '@/primary/AttendanceTypeBus';

describe('AttendanceTypeBus', () => {
  it('should register to switch attendance event', () => {
    const bus = new AttendanceTypeBus(new Vue());
    const listenerStub = sinon.stub();
    bus.onSwitchAttendanceType(listenerStub);
    bus.switchAttendanceType(AttendanceType.PERSONAL);
    expect(listenerStub.getCall(0).args[0]).toBe(AttendanceType.PERSONAL);
  });
});
