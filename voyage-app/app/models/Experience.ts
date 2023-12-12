import Realm, { BSON, ObjectSchema } from "realm";
import { Location } from "./common/Location";

export class Experience extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  iti_id!: Realm.BSON.ObjectId;
  creator_id!: Realm.BSON.ObjectId;
  start_time!: Date;
  end_time!: Date;
  location!: Location;
  tag?: string;
  notes?: string;
  created_at!: Date;
  updated_at?: Date;


  static itineraries: ObjectSchema = {
    name: "experiences",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      iti_id: "objectId",
      creator_id: "objectId",
      start_time: "date",
      end_time: "date",
      location: "locations",
      tag: "string?",
      notes: "string?",
      created_at: "date?",
      updated_at: "date?",
    },
  };
}
