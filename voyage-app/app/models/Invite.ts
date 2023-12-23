import Realm, { BSON, ObjectSchema } from "realm";

/** Class representing a Trip invite */
export class Invite extends Realm.Object<Invite> {
  _id!: BSON.ObjectId;
  sender!: BSON.ObjectId;
  senderUsername!: string;
  receiver!: string;
  groupId!: BSON.ObjectId;
  groupName!: string;
  createdAt!: Date;

  static schema: ObjectSchema = {
    name: "Invites",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      sender: "objectId",
      senderUsername: { type: "string", mapTo: "sender_username" },
      receiver: "string",
      groupId: { type: "objectId", mapTo: "group_id" },
      group_name: { type: "string", mapTo: "group_name" },
      createdAt: { type: "date", mapTo: "created_at" },
    },
  };
}
