import Realm, { BSON, ObjectSchema } from "realm";

export class Location extends Realm.Object {
  lat!: number;
  long!: number;

  static locations: ObjectSchema = {
    name: "locations",
    properties: {
      lat: "double",
      long: "double",
    },
  };
}
