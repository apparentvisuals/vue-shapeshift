import Vue, { VueConstructor } from 'vue';
import { Shapeshift } from '@shapeshift/core';
declare const SSTextField: VueConstructor<{
    nestedValue: string | number;
} & {
    value: string | number;
    ss: Shapeshift;
} & Vue>;
export default SSTextField;
