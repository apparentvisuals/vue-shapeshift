<template>
  <div>
    <template v-for="property in uiSchema.order">
      <div v-if="schema.properties[property].type === 'boolean'" :key="property">
        <v-checkbox color="primary"
          v-model="value[property]"
          :label="schema.properties[property].title"
          :rules="rules[property]"
          :required="schema.required && schema.required.indexOf(property) > -1" />
      </div>
      <div v-else-if="schema.properties[property].type === 'number'" :key="property">
        <v-text-field
					box
          v-model="value[property]"
          :label="schema.properties[property].title"
          :rules="rules[property]"
          :required="schema.required && schema.required.indexOf(property) > -1" />
      </div>
      <template v-else>
        <div v-if="schema.properties[property].format === 'date'" :key="property">
          <v-menu
            lazy
            :close-on-content-click="false"
            v-model="triggers[property]"
            transition="scale-transition"
            offset-y
          >
            <v-text-field box readonly slot="activator" v-model="value[property]"
              :label="schema.properties[property].title"
              :required="schema.required && schema.required.indexOf(property) > -1" />
            <v-date-picker v-model="value[property]" autosave />
          </v-menu>
        </div>
        <div v-else-if="schema.properties[property].format === 'email'" :key="property">
          <v-text-field
						box
            v-model="value[property]"
            :label="schema.properties[property].title"
            :rules="rules[property]"
            :required="schema.required && schema.required.indexOf(property) > -1" />
        </div>
        <div v-else :key="property">
          <ss-text-field></ss-text-field>
        </div>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor, VNode } from 'vue';
import Shapeshift from '../../core/Shapeshift';

const SSAutoFrom = Vue.extend({
  props: {
    schema: {
      type: Object,
      required: true
    },
    uiSchema: {
      type: Object,
      required: true
    },
    value: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      triggers: {}
    };
  }
});
export default SSAutoFrom;
</script>
