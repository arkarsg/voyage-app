import Realm, { BSON, ObjectSchema } from "realm";
import { Group } from "./Group";
import { Invite } from "./Invite";

/** Class representing User  */
export class User extends Realm.Object<User> {
  _id!: BSON.ObjectId;
  clerkId!: string;
  username!: string;
  email!: string;
  tripGroups?: Realm.List<Group>;

  static schema: ObjectSchema = {
    name: "Users",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      clerkId: { type: "string", mapTo: "clerk_id" },
      username: "string",
      email: "string",
      tripGroups: { type: "list", objectType: "Groups", default: [], mapTo: 'trip_groups' },
    },
  };
}
