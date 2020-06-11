import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Popup extends Vue {
  @Prop({ default: [] })
  readonly items!: { id: string; text: string }[];

  close() {
    this.$emit('close');
  }
}
