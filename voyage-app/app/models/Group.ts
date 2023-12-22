import Realm, { BSON, ObjectSchema } from "realm";
import { User } from "./User";

/** Class representing a Trip Group */
export class Group extends Realm.Object<Group> {
  _id!: BSON.ObjectId;
  groupName!: string;
  creatorId!: BSON.ObjectId;
  tripMembers!: Realm.List<User>;

  static schema: ObjectSchema = {
    name: "Groups",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      group_name: { type: "string", mapTo: "group_name" },
      creatorId: { type: "objectId", mapTo: "creator_id" },
      tripMembers: {
        type: "list",
        objectType: "Users",
        mapTo: "trip_members",
        default: [],
      },
    },
  };
}
