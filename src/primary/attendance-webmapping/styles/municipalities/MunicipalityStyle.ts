import { FeatureLike } from 'ol/Feature';
import { Fill, Stroke, Style } from 'ol/style';

import { AttendanceType } from '@/domain/AttendanceType';
import { GREEN, LIGHT_GREEN, LIGHT_GREY, LIGHT_RED, ORANGE, RED } from '@/primary/attendance-webmapping/styles/colors';

const noFill = new Style({
  stroke: new Stroke({ color: [77, 77, 77, 0.8], width: 3 }),
  fill: new Fill({ color: [255, 255, 255, 0] }),
  zIndex: 3,
});

const toStyle = (color: number[]) =>
  new Style({
    stroke: new Stroke({ color: '#fff', width: 1 }),
    fill: new Fill({ color: [...color, 1] }),
    zIndex: 2,
  });

const lightGrey = toStyle(LIGHT_GREY);
const lightGreen = toStyle(LIGHT_GREEN);
const green = toStyle(GREEN);
const orange = toStyle(ORANGE);
const lightRed = toStyle(LIGHT_RED);
const red = toStyle(RED);

export const municipalityStyler = (attendanceType: AttendanceType, selected: string) => (feature: FeatureLike, resolution: number) => {
  const key =
    attendanceType === AttendanceType.STUDENT
      ? 'studentAttendance'
      : attendanceType === AttendanceType.TEACHER
      ? 'teacherAttendance'
      : 'adminAttendance';

  let style: Style | Style[] = lightGrey;

  const rate = feature.get(key);

  if (rate >= 0 && rate <= 0.7) {
    style = red;
  }

  if (rate > 0.7 && rate <= 0.8) {
    style = lightRed;
  }

  if (rate > 0.8 && rate <= 0.9) {
    style = orange;
  }

  if (rate > 0.9 && rate <= 0.95) {
    style = lightGreen;
  }

  if (rate > 0.95 && rate <= 1) {
    style = green;
  }

  if (feature.getId().toString() === selected) {
    style = [style, noFill];
  }

  return style;
};
