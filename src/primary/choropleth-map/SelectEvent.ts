import { Feature, MapBrowserEvent } from 'ol';
import BaseEvent from 'ol/events/Event';

export class SelectEvent extends BaseEvent {
  constructor(public type: string, public selected: Feature[], public deselected: Feature[], public mapBrowserEvent: MapBrowserEvent) {
    super(type);
    this.selected = selected;
    this.deselected = deselected;
    this.mapBrowserEvent = mapBrowserEvent;
  }
}
