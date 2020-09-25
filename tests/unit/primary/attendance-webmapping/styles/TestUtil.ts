import { Feature } from 'ol';
import { Style } from 'ol/style';

export const makeFeature = (studentAttendance = -1, teacherAttendance = -1, adminAttendance = -1) => {
  const properties = { studentAttendance, teacherAttendance, adminAttendance };
  const feature = new Feature();
  feature.setId('0');
  feature.setProperties(properties);
  return feature;
};

export const expectStyle = (style: Style, fillColor: number[], strokeColor: string, strokeWidth: number) => {
  expect(style).toBeInstanceOf(Style);
  expect(style.getFill().getColor()).toEqual(fillColor);
  expect(style.getStroke().getColor()).toBe(strokeColor);
  expect(style.getStroke().getWidth()).toBe(strokeWidth);
};
