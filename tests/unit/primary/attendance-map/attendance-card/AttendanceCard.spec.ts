import sinon from 'sinon';

import { shallowMount, Wrapper } from '@vue/test-utils';

import { AttendanceCardComponent, AttendanceCardVue } from '@/primary/attendance-map/attendance-card';
import * as attendanceChart from '@/primary/attendance-map/attendance-card/AttendanceChart';
import { toAttendanceDataset } from '@/primary/common/AttendanceDataSet';
import { Delayer } from '@/primary/Delayer';
import { RateTypes } from '@/primary/RateTypes';

let wrapper: Wrapper<AttendanceCardComponent>;
let component: AttendanceCardComponent;
const makeChartStub = sinon.stub(attendanceChart, 'makeChart');
const updateChartStub = sinon.stub(attendanceChart, 'updateChart');
const transformChartToImageStub = sinon.stub(attendanceChart, 'transformChartToImage');

const wrap = (printable = false) => {
  wrapper = shallowMount<AttendanceCardComponent>(AttendanceCardVue, {
    propsData: {
      attendance: toAttendanceDataset(0.5, RateTypes.STUDENT),
      readonly: false,
      printable: printable,
    },
    provide: {
      animationDelayer: () => new Delayer(window, 0),
    },
  });
  component = wrapper.vm;
};

describe('AttendanceCard', () => {
  beforeEach(() => {
    makeChartStub.resetHistory();
    updateChartStub.resetHistory();
    transformChartToImageStub.resetHistory();
  });

  it('should be a Vue instance', () => {
    wrap();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('should make chart', async () => {
    await wrap();
    const dataSet = toAttendanceDataset(0.5, RateTypes.STUDENT);
    const [chartId, attendance, color, unknown, duration] = makeChartStub.getCall(0).args;
    expect(chartId).toBe(`${dataSet.label}-attendance-chart`);
    expect(attendance).toBe(dataSet.percentage.value);
    expect(color).toBe(dataSet.percentage.color);
    expect(unknown).toBe(false);
    expect(duration).toBe(500);
  });

  it('should transform chart to image in print mode', async () => {
    await wrap(true);
    const dataSet = toAttendanceDataset(0.5, RateTypes.STUDENT);
    const [chartId, attendance, color, unknown] = transformChartToImageStub.getCall(0).args;
    expect(chartId).toBe(`${dataSet.label}-attendance-chart`);
    expect(attendance).toBe(dataSet.percentage.value);
    expect(color).toBe(dataSet.percentage.color);
    expect(unknown).toBe(false);
  });

  it('should watch attendance', async next => {
    const dataSet = toAttendanceDataset(0.4, RateTypes.TEACHER);
    wrap();
    await wrapper.setProps({ attendance: dataSet });
    setTimeout(() => {
      const [chartId, newAttendance, oldAttendance, color, unknown, duration] = updateChartStub.getCall(0).args;
      expect(chartId).toBe(`${dataSet.label}-attendance-chart`);
      expect(newAttendance).toBe(dataSet.percentage.value);
      expect(oldAttendance).toBe(0.5);
      expect(color).toBe(dataSet.percentage.color);
      expect(unknown).toBe(false);
      expect(duration).toBe(500);
      next();
    }, 1);
  });
});
