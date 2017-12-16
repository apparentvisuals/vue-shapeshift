import { SSAutoForm, SSTextField, SSCheckbox } from './components';
import { PluginObject } from 'vue';

const ShapeshiftPlugin: PluginObject<any> = {
  install(Vue, options) {
    Vue.component('ss-text-field', SSTextField);
    Vue.component('ss-checkbox', SSCheckbox);
    Vue.component('ss-auto-form', SSAutoForm);
  }
};

export default ShapeshiftPlugin;
