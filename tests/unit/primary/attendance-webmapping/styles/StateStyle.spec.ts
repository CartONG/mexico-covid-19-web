import { Style } from 'ol/style';

import { expectStyle, makeFeature } from './TestUtil';

import { AttendanceType } from '@/domain/AttendanceType';
import { GREEN, LIGHT_GREEN, LIGHT_GREY, LIGHT_RED, ORANGE, RED } from '@/primary/attendance-webmapping/styles/colors';
import { statesStyler } from '@/primary/attendance-webmapping/styles/states/StateStyle';

describe('StateStyle', () => {
  it('should have light grey style by default for student attendance', () => {
    const feature = makeFeature();
    const styler = statesStyler(AttendanceType.STUDENT, '');
    const style = styler(feature, 0);
    expectStyle(style, [...LIGHT_GREY, 1], '#fff', 1);
  });

  it('should have light grey style by default for teacher attendance', () => {
    const feature = makeFeature();
    const styler = statesStyler(AttendanceType.TEACHER, '');
    const style = styler(feature, 0);
    expectStyle(style, [...LIGHT_GREY, 1], '#fff', 1);
  });

  it('should have light grey style by default for admin attendance', () => {
    const feature = makeFeature();
    const styler = statesStyler(AttendanceType.PERSONAL, '');
    const style = styler(feature, 0);
    expectStyle(style, [...LIGHT_GREY, 1], '#fff', 1);
  });

  it('should have red style for student attendance', () => {
    const feature = makeFeature(0.5);
    const styler = statesStyler(AttendanceType.STUDENT, '');
    const style = styler(feature, 0);
    expectStyle(style, [...RED, 1], '#fff', 1);
  });

  it('should have light red style for student attendance', () => {
    const feature = makeFeature(0.75);
    const styler = statesStyler(AttendanceType.STUDENT, '');
    const style = styler(feature, 0);
    expectStyle(style, [...LIGHT_RED, 1], '#fff', 1);
  });

  it('should have orange style for student attendance', () => {
    const feature = makeFeature(0.85);
    const styler = statesStyler(AttendanceType.STUDENT, '');
    const style = styler(feature, 0);
    expectStyle(style, [...ORANGE, 1], '#fff', 1);
  });

  it('should have light green style for student attendance', () => {
    const feature = makeFeature(0.93);
    const styler = statesStyler(AttendanceType.STUDENT, '');
    const style = styler(feature, 0);
    expectStyle(style, [...LIGHT_GREEN, 1], '#fff', 1);
  });

  it('should have green style for student attendance', () => {
    const feature = makeFeature(0.98);
    const styler = statesStyler(AttendanceType.STUDENT, '');
    const style = styler(feature, 0);
    expectStyle(style, [...GREEN, 1], '#fff', 1);
  });

  it('should have selected style', () => {
    const feature = makeFeature(1);
    const styler = statesStyler(AttendanceType.STUDENT, '0');
    const style = styler(feature, 0);
    expect(style).toBeInstanceOf(Style);
    expect(style.getFill().getColor()).toEqual([255, 255, 255, 0]);
    expect(style.getStroke().getColor()).toEqual([255, 255, 255, 1]);
    expect(style.getStroke().getWidth()).toBe(6);
  });
});
