exports = async function({ groupId }){
  const serviceName = "mongodb-atlas";
  const dbName = "voyage-app";
  const collName = "Groups";

  const collection = context.services.get(serviceName).db(dbName).collection(collName);
  const Users = context.services.get(serviceName).db(dbName).collection("Users");
  // get the relationships from the parent document, array of user ids
  const groupUsers = await collection.findOne({ "_id": groupId }, { "trip_members": 1})

  // remove group from all users in that group, finally, delete the group
  try {
    const removeFromUsers = await groupUsers.trip_members.forEach(userId => {
      Users.findOneAndUpdate({ "_id": userId}, { $pull : { "trip_groups": groupId }})
    })
    const removeGroup = collection.deleteOne({ "_id": groupId })
    return { result: removeGroup } 
  } catch (err) {
    return { error: err } 
  }
};