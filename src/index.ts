import { SSAutoForm, SSTextField } from './components';
import { PluginObject } from 'vue';

const ShapeshiftPlugin: PluginObject<any> = {
  install(Vue, options) {
    Vue.component('ss-auto-form', SSAutoForm);
    Vue.component('ss-text-field', SSTextField);
  }
};

export default ShapeshiftPlugin;
// export { SSAutoForm, SSTextField } from './components';
