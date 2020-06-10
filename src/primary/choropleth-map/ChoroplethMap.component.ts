import { Feature, Map, MapBrowserEvent } from 'ol';
import { TopoJSON } from 'ol/format';
import VectorLayer from 'ol/layer/Vector';
import { Component, Inject, Vue, Watch } from 'vue-property-decorator';

import { Fetcher } from '@/domain/Fetcher';
import { Logger } from '@/domain/Logger';
import { SelectionSource } from '@/domain/selection/SelectionSource';
import { SelectionType } from '@/domain/selection/SelectionType';
import { AppStore } from '@/primary/app/AppStore';
import { toMunicipalityFeature } from '@/primary/choropleth-map/MunicipalityFeature';
import { mapOptions } from '@/primary/choropleth-map/options/mapOptions';
import { municipalitiesLayerOptions } from '@/primary/choropleth-map/options/municipalitiesLayerOptions';
import { statesLayerOptions } from '@/primary/choropleth-map/options/statesLayerOptions';
import { toStateFeature } from '@/primary/choropleth-map/StateFeature';
import { ComponentState } from '@/primary/ComponentState';

@Component
export default class ChoroplethMap extends Vue {
  state: ComponentState = ComponentState.PENDING;
  map = new Map(mapOptions);
  municipalityGeometriesByState: { [key: string]: Feature[] } = {};
  municipalitiesLayer = new VectorLayer(municipalitiesLayerOptions);
  stateGeometries: Feature[] = [];
  statesLayer = new VectorLayer(statesLayerOptions);
  // select!: Select;

  @Inject()
  private appStore!: () => AppStore;

  @Inject()
  private fetcher!: () => Fetcher;

  @Inject()
  private logger!: () => Logger;

  @Watch('selection')
  selectionWatcher() {
    if (this.selection && this.selection.type === SelectionType.STATE) {
      const feature = this.statesLayer.getSource().getFeatureById(this.selection.stateId);
      this.map.getView().fit(feature.getGeometry().getExtent(), { padding: [20, 20, 20, 20], duration: 1000 });
    }

    if (this.selection && this.selection.type === SelectionType.MUNICIPALITY) {
      const feature = this.municipalitiesLayer.getSource().getFeatureById(this.selection.municipalityId);
      this.map.getView().fit(feature.getGeometry().getExtent(), { padding: [20, 20, 20, 20], duration: 1000 });
    }

    this.adaptToStateDomain();
    this.adaptToMunicipalityDomain();
  }

  get selection() {
    return this.appStore().getSelection();
  }

  created() {
    // this.select = new Select({ style: null as any });
    this.map.addLayer(this.municipalitiesLayer);
    this.map.addLayer(this.statesLayer);
    this.map.on('singleclick', this.selectEntity);
    // this.map.addInteraction(this.select);
    // this.select.on('select', this.selectEntity);
  }

  mounted() {
    this.map.setTarget('map');

    Promise.all([this.fetcher().fetch('states.topojson'), this.fetcher().fetch('municipalities.topojson')])
      .then(results => {
        this.stateGeometries = this.parseTopoJson(results[0]);
        this.municipalityGeometriesByState = this.parseTopoJson(results[1]).reduce(this.municipalityReducer, {});

        this.adaptToStateDomain();
        this.adaptToMunicipalityDomain();

        const sourceExtent = this.statesLayer.getSource().getExtent();
        this.map.getView().fit(sourceExtent, { padding: [20, 20, 20, 20] });
        this.map.getView().setMinZoom(this.map.getView().getZoom());

        this.state = ComponentState.SUCCESS;
      })
      .catch(error => this.error(error));
  }

  private municipalityReducer(accumulator: { [key: string]: Feature[] }, geometry: Feature) {
    const geometries = accumulator[geometry.get('stateId')] ? accumulator[geometry.get('stateId')] : [];
    return { ...accumulator, [geometry.get('stateId')]: [...geometries, geometry] };
  }

  private parseTopoJson(topoJson: any): Feature[] {
    const parser = new TopoJSON();
    const readOptions = { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' };
    return parser.readFeatures(topoJson, readOptions);
  }

  private adaptToStateDomain() {
    const features = this.stateGeometries.map(geometry => toStateFeature(geometry, this.appStore().getStateSummaryById(), this.selection));
    this.statesLayer.getSource().clear();
    this.statesLayer.getSource().addFeatures(features);
  }

  private adaptToMunicipalityDomain() {
    if (!this.selection) {
      this.municipalitiesLayer.getSource().clear();
      return;
    }

    const summaryList = this.appStore().getMunicipalitySummaryList();

    const features = this.municipalityGeometriesByState[this.selection?.stateId].map(geometry =>
      toMunicipalityFeature(
        geometry,
        summaryList.find(summary => summary.id === geometry.getId()),
        this.selection
      )
    );

    this.municipalitiesLayer.getSource().clear();
    this.municipalitiesLayer.getSource().addFeatures(features);
  }

  private error(error: Error): void {
    this.logger().error('Fail to retrieve state or municipality geometries', error);
    this.state = ComponentState.ERROR;
  }

  private selectEntity(event: MapBrowserEvent) {
    const features = this.map.getFeaturesAtPixel(event.pixel);

    if (features.length === 0) {
      this.appStore().select(null);
      return;
    }

    const feature = features.pop() as Feature;
    const selection = { source: SelectionSource.MAP };

    if (this.statesLayer.getSource().hasFeature(feature)) {
      this.appStore().select({
        ...selection,
        stateId: feature.getId().toString(),
        municipalityId: '',
        schoolId: '',
        type: SelectionType.STATE,
      });
      return;
    }

    if (this.selection && this.municipalitiesLayer.getSource().hasFeature(feature)) {
      this.appStore().select({
        ...selection,
        stateId: this.selection?.stateId,
        municipalityId: feature.getId().toString(),
        schoolId: '',
        type: SelectionType.MUNICIPALITY,
      });
    }
  }

  /*
  private selectEntity(event: SelectEvent) {
    if (event.selected.length === 0) {
      this.appStore().select(null);
      return;
    }

    const feature = event.selected[0];
    const selection = { source: SelectionSource.MAP };

    if (this.statesLayer.getSource().hasFeature(feature)) {
      this.appStore().select({
        ...selection,
        stateId: feature.getId().toString(),
        municipalityId: '',
        schoolId: '',
        type: SelectionType.STATE,
      });
    }

    // const type = this.statesLayer.getSource().hasFeature(feature) ? SelectionType.STATE : SelectionType.MUNICIPALITY;
    // const selection = { type, source: SelectionSource.MAP, entityId: feature.getId().toString() };
    // this.appStore().select(selection);
  }
   */

  /*
  private selectFeature(feature: Feature) {
    const mapBrowserEvent = new MapBrowserEvent(MapBrowserEventType.SINGLECLICK, this.map, new Event('click'));
    const event: SelectEvent = new SelectEvent('select', [feature], this.select.getFeatures().getArray(), mapBrowserEvent);
    this.select.getFeatures().setAt(0, feature);
    this.select.un('select', this.selectEntity);
    this.select.dispatchEvent(event);
    this.select.on('select', this.selectEntity);
  }
   */
}
