import Realm, { BSON, ObjectSchema } from "realm";
import { Amount } from "./Amount";

export class ExpenseItem extends Realm.Object {
  title!: string;
  date!: Date;
  user!: Realm.BSON.ObjectId;
  tag?: string;
  amount!: Realm.List<Amount>;

  static expenseItems: ObjectSchema = {
    name: "ExpenseItems",
    properties: {
      title: "string",
      date: "date",
      user: "objectId",
      tag: "string?",
      amount: "amounts"
    },
  };
}
