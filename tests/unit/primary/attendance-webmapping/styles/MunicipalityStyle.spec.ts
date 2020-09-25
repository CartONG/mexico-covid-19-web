import { Feature } from 'ol';
import { Style } from 'ol/style';

import { expectStyle, makeFeature } from './TestUtil';

import { AttendanceType } from '@/domain/AttendanceType';
import { GREEN, LIGHT_GREEN, LIGHT_GREY, LIGHT_RED, ORANGE, RED } from '@/primary/attendance-webmapping/styles/colors';
import { municipalityStyler } from '@/primary/attendance-webmapping/styles/municipalities/MunicipalityStyle';

describe('MunicipalityStyle', () => {
  it('should have light grey style by default for student attendance', () => {
    const feature = makeFeature();
    const styler = municipalityStyler(AttendanceType.STUDENT, '');
    const style = styler(feature, 0) as Style;
    expectStyle(style, [...LIGHT_GREY, 1], '#fff', 1);
  });

  it('should have light grey style by default for teacher attendance', () => {
    const feature = makeFeature();
    const styler = municipalityStyler(AttendanceType.TEACHER, '');
    const style = styler(feature, 0) as Style;
    expectStyle(style, [...LIGHT_GREY, 1], '#fff', 1);
  });

  it('should have light grey style by default for admin attendance', () => {
    const feature = makeFeature();
    const styler = municipalityStyler(AttendanceType.PERSONAL, '');
    const style = styler(feature, 0) as Style;
    expectStyle(style, [...LIGHT_GREY, 1], '#fff', 1);
  });

  it('should have red style for student attendance', () => {
    const feature = makeFeature(0.5);
    const styler = municipalityStyler(AttendanceType.STUDENT, '');
    const style = styler(feature, 0) as Style;
    expectStyle(style, [...RED, 1], '#fff', 1);
  });

  it('should have light red style for student attendance', () => {
    const feature = makeFeature(0.75);
    const styler = municipalityStyler(AttendanceType.STUDENT, '');
    const style = styler(feature, 0) as Style;
    expectStyle(style, [...LIGHT_RED, 1], '#fff', 1);
  });

  it('should have orange style for student attendance', () => {
    const feature = makeFeature(0.85);
    const styler = municipalityStyler(AttendanceType.STUDENT, '');
    const style = styler(feature, 0) as Style;
    expectStyle(style, [...ORANGE, 1], '#fff', 1);
  });

  it('should have light green style for student attendance', () => {
    const feature = makeFeature(0.93);
    const styler = municipalityStyler(AttendanceType.STUDENT, '');
    const style = styler(feature, 0) as Style;
    expectStyle(style, [...LIGHT_GREEN, 1], '#fff', 1);
  });

  it('should have green style for student attendance', () => {
    const feature = makeFeature(0.98);
    const styler = municipalityStyler(AttendanceType.STUDENT, '');
    const style = styler(feature, 0) as Style;
    expectStyle(style, [...GREEN, 1], '#fff', 1);
  });

  it('should have selected style', () => {
    const feature = makeFeature(1);
    const styler = municipalityStyler(AttendanceType.STUDENT, '0');
    const styles = styler(feature, 0) as Style[];
    expectStyle(styles[0], [...GREEN, 1], '#fff', 1);
    expect(styles[1]).toBeInstanceOf(Style);
    expect(styles[1].getFill().getColor()).toEqual([255, 255, 255, 0]);
    expect(styles[1].getStroke().getColor()).toEqual([77, 77, 77, 0.8]);
    expect(styles[1].getStroke().getWidth()).toBe(3);
  });
});
