import { type SchemaTypeDefinition } from "sanity";

import { componentSchemaTypes } from "./componentSchemas";
import { documentSchemaTypes } from "./documentSchemas";
import { moduleSchemaTypes } from "./moduleSchemas";

export const schemaTypes: { types: SchemaTypeDefinition[] } = {
  types: [
    ...componentSchemaTypes,
    ...documentSchemaTypes,
    ...moduleSchemaTypes,
  ],
};
