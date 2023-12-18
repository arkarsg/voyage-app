import Realm, { BSON, ObjectSchema } from "realm";

/** Class representing a Trip invite */
export class Invite extends Realm.Object<Invite> {
  groupId!: BSON.ObjectId;
  groupName!: string;
  senderUsername!: string;

  static schema: ObjectSchema = {
    name: "Invites",
    embedded: true,
    properties: {
      groupId: { type: "string", mapTo: "group_id" },
      group_name: { type: "string", mapTo: "group_name" },
      senderUsername: { type: "string", mapTo: "sender_username" },
    },
  };
}
