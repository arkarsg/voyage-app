exports = async function(arg){
  var serviceName = "mongodb-atlas";

  // Update these to reflect your db/collection
  var dbName = "voyage-app";
  var collName = "Invites";

  var collection = context.services.get(serviceName).db(dbName).collection(collName);
  const sender = context.user
  const receiverEmail = "test2@example.com"

  var users = context.services.get(serviceName).db(dbName).collection("Users");
  const invitedUser = await users.findOne({ "email": receiverEmail})
  console.log(typeof invitedUser._id)
  console.log(typeof sender.id)
  // Can insert into Invites collection
  const newInviteDoc = {
    _id: new BSON.ObjectId(),
    sender: BSON.ObjectId(sender.id),
    sender_username: sender.custom_data.username,
    receiver: invitedUser._id,
    group_id: new BSON.ObjectId(), // dummy id
    group_name: "Read All Write All",
    created_at: new Date()
  }
  console.log(JSON.stringify(newInviteDoc))
  var insertRes;
  try {
    insertRes = await collection.insertOne(newInviteDoc)
  } catch(err) {
    console.log("Error occurred while executing insertOne:", err.message);
    return { error: err.message };
  }

  return { result: insertRes };
};