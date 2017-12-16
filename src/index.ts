import { SSAutoForm, SSTextField, SSCheckbox, SSRange } from './components';
import { PluginObject } from 'vue';
import { VueConstructor } from 'vue/types/vue';

const defaultComponents = [SSTextField, SSCheckbox, SSRange];

const ShapeshiftPlugin: PluginObject<any> = {
  install(Vue, options) {
    let components: VueConstructor[] = defaultComponents;
    if (options && options.components) {
      components = options.components;
    }

    components.forEach(component => {
      Vue.component(component['componentName'], component);
    });
    Vue.component('ss-auto-form', SSAutoForm);
  }
};

export default ShapeshiftPlugin;
