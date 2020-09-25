import { Feature } from 'ol';
import { Cluster } from 'ol/source';
import { Circle, Style } from 'ol/style';

import { makeFeature } from './TestUtil';

import { AttendanceType } from '@/domain/AttendanceType';
import { schoolStyler } from '@/primary/attendance-webmapping/styles/schools/SchoolStyler';

export const makeCluster = (features: Feature[]) => {
  const cluster = new Cluster({});
  cluster.setProperties({ features });
  return cluster;
};

const expectCircle = (style: Style, radius: number, fillColor: string, strokeColor: number[], strokeWidth: number) => {
  const circle = style.getImage() as Circle;
  expect(circle.getRadius()).toBe(radius);
  expect(circle.getStroke().getColor()).toEqual(strokeColor);
  expect(circle.getStroke().getWidth()).toBe(strokeWidth);
  expect(circle.getFill().getColor()).toEqual(fillColor);
};

describe('SchoolStyler', () => {
  it('should make a default circle for a cluster with several features', () => {
    const cluster = makeCluster([makeFeature(), makeFeature()]);
    const style = schoolStyler(AttendanceType.STUDENT, '')(cluster, 0);
    const circle = style.getImage() as Circle;
    expect(circle.getRadius()).toBe(15);
    expect(circle.getStroke().getColor()).toEqual([77, 77, 77, 0.6]);
    expect(circle.getStroke().getWidth()).toBe(3);
    expect(circle.getFill().getColor()).toEqual([255, 255, 255, 1]);
    expect(style.getText().getText()).toBe('2');
  });

  it('should make a golden circle for a cluster with the selected school inside it', () => {
    const cluster = makeCluster([makeFeature(), makeFeature()]);
    const style = schoolStyler(AttendanceType.STUDENT, '0')(cluster, 0);
    const circle = style.getImage() as Circle;
    expect(circle.getRadius()).toBe(16);
    expect(circle.getStroke().getColor()).toEqual([179, 142, 93, 1]);
    expect(circle.getStroke().getWidth()).toBe(5);
    expect(circle.getFill().getColor()).toEqual([255, 255, 255, 1]);
    expect(style.getText().getText()).toBe('2');
  });

  it('should make a default grey dot', () => {
    const cluster = makeCluster([makeFeature()]);
    const styleStudents = schoolStyler(AttendanceType.STUDENT, '')(cluster, 0);
    const styleTeachers = schoolStyler(AttendanceType.TEACHER, '')(cluster, 0);
    const styleAdmin = schoolStyler(AttendanceType.PERSONAL, '')(cluster, 0);
    const styleSelectedStudents = schoolStyler(AttendanceType.STUDENT, '0')(cluster, 0);
    const styleSelectedTeachers = schoolStyler(AttendanceType.TEACHER, '0')(cluster, 0);
    const styleSelectedAdmin = schoolStyler(AttendanceType.PERSONAL, '0')(cluster, 0);
    expectCircle(styleStudents, 6, '#dbdbdb', [255, 255, 255, 1], 3);
    expectCircle(styleTeachers, 6, '#dbdbdb', [255, 255, 255, 1], 3);
    expectCircle(styleAdmin, 6, '#dbdbdb', [255, 255, 255, 1], 3);
    expectCircle(styleSelectedStudents, 8, '#dbdbdb', [255, 255, 255, 1], 4);
    expectCircle(styleSelectedTeachers, 8, '#dbdbdb', [255, 255, 255, 1], 4);
    expectCircle(styleSelectedAdmin, 8, '#dbdbdb', [255, 255, 255, 1], 4);
  });

  it('should have the dot color corresponding to the percentage', () => {
    const clusterRed = makeCluster([makeFeature(0.5)]);
    const styleRed = schoolStyler(AttendanceType.STUDENT, '')(clusterRed, 0);
    const clusterLightRed = makeCluster([makeFeature(0.75)]);
    const styleLightRed = schoolStyler(AttendanceType.STUDENT, '')(clusterLightRed, 0);
    const clusterOrange = makeCluster([makeFeature(0.85)]);
    const styleOrange = schoolStyler(AttendanceType.STUDENT, '')(clusterOrange, 0);
    const clusterLightGreen = makeCluster([makeFeature(0.92)]);
    const styleLightGreen = schoolStyler(AttendanceType.STUDENT, '')(clusterLightGreen, 0);
    const clusterGreen = makeCluster([makeFeature(0.99)]);
    const styleLGreen = schoolStyler(AttendanceType.STUDENT, '')(clusterGreen, 0);
    expectCircle(styleRed, 6, '#D91D20', [255, 255, 255, 1], 3);
    expectCircle(styleLightRed, 6, '#EE8336', [255, 255, 255, 1], 3);
    expectCircle(styleOrange, 6, '#FFC400', [255, 255, 255, 1], 3);
    expectCircle(styleLightGreen, 6, '#97D356', [255, 255, 255, 1], 3);
    expectCircle(styleLGreen, 6, '#1E9B47', [255, 255, 255, 1], 3);
  });

  it('should have a golden stroke for selected feature', () => {
    const clusterRed = makeCluster([makeFeature(0.5)]);
    const styleRed = schoolStyler(AttendanceType.STUDENT, '0')(clusterRed, 0);
    const clusterLightRed = makeCluster([makeFeature(0.75)]);
    const styleLightRed = schoolStyler(AttendanceType.STUDENT, '0')(clusterLightRed, 0);
    const clusterOrange = makeCluster([makeFeature(0.85)]);
    const styleOrange = schoolStyler(AttendanceType.STUDENT, '0')(clusterOrange, 0);
    const clusterLightGreen = makeCluster([makeFeature(0.92)]);
    const styleLightGreen = schoolStyler(AttendanceType.STUDENT, '0')(clusterLightGreen, 0);
    const clusterGreen = makeCluster([makeFeature(0.99)]);
    const styleLGreen = schoolStyler(AttendanceType.STUDENT, '0')(clusterGreen, 0);
    expectCircle(styleRed, 8, '#D91D20', [255, 255, 255, 1], 4);
    expectCircle(styleLightRed, 8, '#EE8336', [255, 255, 255, 1], 4);
    expectCircle(styleOrange, 8, '#FFC400', [255, 255, 255, 1], 4);
    expectCircle(styleLightGreen, 8, '#97D356', [255, 255, 255, 1], 4);
    expectCircle(styleLGreen, 8, '#1E9B47', [255, 255, 255, 1], 4);
  });
});
