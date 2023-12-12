import Realm, { BSON, ObjectSchema } from "realm";

export class Transit extends Realm.Object {
  carrier_details!: string;
  departure_date!: Date;
  arrival_date!: Date;
  transit_type!: string;

  static transits: ObjectSchema = {
    name: "transits",
    properties: {
      carrier_details: "string",
      departure_date: "date",
      arrival_date: "date",
      transit_type: "string"
    },
  };
}
