import Realm, { BSON, ObjectSchema } from "realm";
import { Location } from "./common/Location";
import { Amount } from "./common/Amount";

export class Accomodation extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  iti_id!: Realm.BSON.ObjectId;
  location!: Location;
  start_date!: Date;
  end_date!: Date;
  amount!: Amount;

  static accomodations: ObjectSchema = {
    name: "accomodations",
    primaryKey: '_id',
    properties: {
      _id: "objectId",
      iti_id: "objectId",
      location: "locations",
      amount: "amounts",
    },
  };
}
