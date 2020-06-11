import { Component, Vue } from 'vue-property-decorator';

import { DropdownVue } from '@/primary/dropdown';

@Component({
  components: { DropdownVue },
})
export default class Sidebar extends Vue {}
