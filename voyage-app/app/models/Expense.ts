import Realm, { BSON, ObjectSchema } from "realm";
import { ExpenseItem } from "./common/ExpenseItem";

export class Expense extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  group_id!: Realm.BSON.ObjectId;
  expense_items?: Realm.List<ExpenseItem>;

  static users: ObjectSchema = {
    name: "expenses",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      group_id: "objectId",
      expense_items: "ExpenseItems[]?",
    },
  };
}
