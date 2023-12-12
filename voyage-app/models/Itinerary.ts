import Realm, { BSON, ObjectSchema } from "realm";

export class Itinerary extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  group_id!: Realm.BSON.ObjectId;
  date!: Date;
  created_at?: Date;
  updated_at?: Date;

  static itineraries: ObjectSchema = {
    name: "itineraries",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      group_id: "objectId",
      date: "date",
      created_at: "date?",
      updated_at: "date?"
    },
  };
}
