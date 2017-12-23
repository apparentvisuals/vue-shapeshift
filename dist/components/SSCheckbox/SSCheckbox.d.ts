import Vue, { VueConstructor } from 'vue';
import { Shapeshift } from '@shapeshift/core';
declare const SSCheckbox: VueConstructor<{
    nestedValue: boolean;
} & {
    value: boolean;
    ss: Shapeshift;
} & Vue>;
export default SSCheckbox;
