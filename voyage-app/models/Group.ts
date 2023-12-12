import Realm, {BSON, ObjectSchema} from 'realm';
import { Location } from './common/Location';
import { Transit } from './common/Transit';

export class Group extends Realm.Object {
    _id!: Realm.BSON.ObjectId;
    users!: Realm.List<Realm.BSON.ObjectId>;
    max_budget?: number;
    group_name!: string;
    destination!: Location;
    start_date!: Date;
    end_date!: Date;
    transit?: Transit;

    static groupSchema: ObjectSchema = {
        name: "groups",
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            users: 'objectId[]',
            max_budget: 'decimal?',
            group_name: 'string',
            destination: 'locations',
            start_date: 'date',
            end_date: 'date',
            transit: 'transits',
        }
    }
}

