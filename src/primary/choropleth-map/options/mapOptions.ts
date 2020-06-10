import { View } from 'ol';
import { Attribution, defaults as defaultControls, ScaleLine } from 'ol/control';
import { defaults as defaultInteractions } from 'ol/interaction';
import { transformExtent } from 'ol/proj';

const extent: [number, number, number, number] = [-123.22837830685677, 14.112642349612102, -81.86662169314323, 33.096241159845206];

const interactionOptions = {
  altShiftDragRotate: false,
  pinchRotate: false,
};

const controlOptions = {
  attribution: false,
  rotate: false,
};

const controlExtensions = [new Attribution({ collapsible: false }), new ScaleLine()];

const viewOptions = {
  center: [0, 0],
  enableRotation: false,
  extent: transformExtent(extent, 'EPSG:4326', 'EPSG:3857'),
  showFullExtent: true,
  maxZoom: 19,
  minZoom: 0,
  zoom: 0,
};

export const mapOptions = {
  controls: defaultControls(controlOptions).extend(controlExtensions),
  interactions: defaultInteractions(interactionOptions),
  loadTilesWhileAnimating: false,
  loadTilesWhileInteracting: false,
  moveTolerance: 2,
  view: new View(viewOptions),
};
