exports = async function({ groupId }){
  const serviceName = "mongodb-atlas";
  const dbName = "voyage-app";
  const groupsName = "Groups";
  const userName = "Users";
 
  // Get relevant collections from the context
  const groupsCollection = context.services.get(serviceName).db(dbName).collection(groupsName);
  const usersCollection = context.services.get(serviceName).db(dbName).collection(userName);
  // get _id of User that called the function
  const user = context.user.id;
  const members = await groupsCollection.findOne({ "_id": groupId }, { "_id": 0, "trip_members": 1})
  const memberCount = members.length
  
  try {
    if (memberCount - 1 === 0) { 
      const res = await groupsCollection.findOneAndUpdate({
        "_id": groupId
      }, { $pull: { trip_members: user}}).then(usersCollection.findOneAndUpdate({
        "_id": user
      }, { $pull: { trip_groups: groupId}})).finally(groupsCollection.deleteOne({ "_id": groupId }));
      return res;
    } else {
      const res = await groupsCollection.findOneAndUpdate({
        "_id": groupId
      }, { $pull: { trip_members: user}}).then(usersCollection.findOneAndUpdate({
        "_id": user
      }, { $pull: { trip_groups: groupId}}));
      return res
    }
  } catch (err) {
    return { error: err.message };
  }
};