import Realm, { BSON, ObjectSchema } from "realm";

export class User extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  bio?: string;
  email!: string;
  username!: string;

  static users: ObjectSchema = {
    name: "users",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      bio: "string?",
      email: "string",
      username: "string",
    },
  };
}
