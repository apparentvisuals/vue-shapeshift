import { Shapeshift } from '@shapeshift/core';

export function getElement(createElement: any, ss: Shapeshift, name?: string) {
  switch (ss.widget) {
    case 'checkbox':
      return createElement('ss-checkbox', {
        props: {
          ss,
        }
      });
    case 'fieldset':
      return createElement('ss-field-set', {
        props: {
          name,
          ss,
        }
      });
    case 'textfield':
    default:
      return createElement('ss-text-field', {
        props: {
          ss,
        }
      });
  }
}