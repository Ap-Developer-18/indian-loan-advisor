import { type SchemaTypeDefinition } from "sanity";
import consultation from "./consultation";
import newsletter from "./newsletter";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [consultation, newsletter],
};
