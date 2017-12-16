import { JSONSchema4 } from 'json-schema';
import { UISchema } from './types';

export default class Shapeshift {
  schema: JSONSchema4;
  uiSchema?: UISchema;

  constructor(schema: JSONSchema4, uiSchema?: UISchema) {
    this.schema = schema;
    this.uiSchema = uiSchema;
  }

  forEach(func: (name: string, schema: JSONSchema4, uiSchema: any) => void) {
    if (
      this.uiSchema &&
      this.uiSchema.order &&
      Array.isArray(this.uiSchema.order)
    ) {
      this.uiSchema.order.forEach(value => {
        func(value, this.schema.properties![value], this.uiSchema![value]);
      });
    }
  }
}
