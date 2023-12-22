exports = async function({name, creatorId}){
  /**
   * Create a group with the given name.
   * Upon creation, the creator is immediate added into `trip_members` array of the group.
   * Then, _id of the group is added into `trip_groups` array of creator.
   * 
   * @param name string of the group name
   * @param creatorId string of the BSON ObjectId of creator
   */

  if (!(name && (typeof name === "string"))) {
    return { error : { message: "Please specify the name of the group" } };
  }

  if (!creatorId) {
    return { error : { message: "Group must have a creator" } };
  }

  if (creatorId.toString() !== context.user.id) {
    return { error: { message: "Something went wrong. Please try again." } };
  }

  var serviceName = "mongodb-atlas";
  var dbName = "voyage-app";
  var collName = "Groups";

  const groupsCollection = context.services.get(serviceName).db(dbName).collection(collName);
  const userCollection = context.services.get(serviceName).db(dbName).collection("Users");

  const newGroupId = new BSON.ObjectId();
  const creatorIdObject = BSON.ObjectId(creatorId);
  const newGroupDoc = {
    _id: newGroupId,
    group_name: name,
    creator_id: creatorIdObject,
    trip_members: [creatorIdObject],
  }

  try {
    const res = await groupsCollection.insertOne(newGroupDoc).then(userCollection.findOneAndUpdate({ _id: creatorIdObject }, {
      $addToSet: { trip_groups: newGroupId }
    }));
    return res
  } catch (err) {
    return { error: err.message };
  }

};