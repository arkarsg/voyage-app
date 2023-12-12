import Realm, { BSON, ObjectSchema } from "realm";

export class Amount extends Realm.Object {
  currency!: string;
  value!: number;

  static amounts: ObjectSchema = {
    name: "amounts",
    properties: {
      currency: "string",
      value: "decimal",
    },
  };
}
