import { VueConstructor, VNode } from 'vue';
import { Shapeshift } from '@shapeshift/core';

export function getRootElement(this: any, createElement: any, ss: Shapeshift): VNode[] {
  console.log('form(root)');
  if (ss.type === 'object') {
    let children: VNode[] = [];
    ss.forEach((name, ss) => {
      children.push(getElement.call(this, createElement, ss, name));
    });
    return children;
  } else {
    return [getElement.call(this, createElement, ss)];
  }
}

export function getElement(this: any, createElement: any, ss: Shapeshift, name?: string): VNode {
  ssDebug(ss, name);
  let self = this;
  switch (ss.widget) {
    case 'checkbox':
      return createElement('ss-checkbox', {
        domProps: {
          value: name ? self.nestedValue[name] : self.nestedValue
        },
        props: {
          ss,
        },
        on: {
          input: function (event: any) {
            console.log(event);
            if (name) {
              self.$set(self.nestedValue, name, event);
            } else {
              self.nestedValue = event;
            }
            self.$emit('input', self.nestedValue);
          }
        }
      });
    case 'fieldset':
      return createElement('ss-field-set', {
        domProps: {
          value: name ? self.nestedValue[name] : self.nestedValue
        },
        props: {
          name,
          ss,
        },
        on: {
          input: function (event: any) {
            if (name) {
              self.$set(self.nestedValue, name, event);
            } else {
              self.nestedValue = event;
            }
            self.$emit('input', self.nestedValue);
          }
        }
      });
    case 'textarea':
      return createElement('ss-text-area', {
        domProps: {
          value: name ? self.nestedValue[name] : self.nestedValue
        },
        props: {
          ss,
        },
        on: {
          input: function (event: any) {
            if (name) {
              self.$set(self.nestedValue, name, event);
            } else {
              self.nestedValue = event;
            }
            self.$emit('input', self.nestedValue);
          }
        }
      });
    case 'textfield':
    default:
      return createElement('ss-text-field', {
        domProps: {
          value: name ? self.nestedValue[name] : self.nestedValue
        },
        props: {
          ss,
        },
        on: {
          input: function (event: any) {
            if (name) {
              self.$set(self.nestedValue, name, event);
            } else {
              self.nestedValue = event;
            }
            self.$emit('input', self.nestedValue);
          }
        }
      });
  }
}

function ssDebug(ss: Shapeshift, name?: string) {
  let level = Array(ss.depth + 1).join(' ') + '|-';

  let message = '';
  let type = `(${ss.widget})`;
  if (name) {
    message = name + type;
  } else {
    message = type;
  }
  console.log(level, message);
}