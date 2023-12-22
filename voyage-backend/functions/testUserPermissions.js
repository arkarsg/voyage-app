exports = async function(arg){
  // Run as user test1
  var serviceName = "mongodb-atlas";
  var dbName = "voyage-app";
  var collName = "Users";

  var collection = context.services.get(serviceName).db(dbName).collection(collName);
  // test2 user
  const anotherUser = BSON.ObjectId("6584198807779cccb5889076") // replace
  // Test ReadAll
  var findResult;
  // ReadOwn
  try {
    findResult = await collection.findOne(
      { "_id": BSON.ObjectId(context.user.id)},
    );
    console.log("ReadOwn success:", findResult)
  } catch (err) {
    console.log("Error occurred while executing read other:", err.message);
  }
  // ReadAll
  try {
    findResult = await collection.findOne(
      {"_id": anotherUser})
      console.log("ReadAll success:", findResult)
  } catch (err) {
    console.log("Error occurred while executing read other", err.message);
  }

  // writeOwn
  var writeResult;
  try {
    writeResult = await collection.findOneAndUpdate(
      {"_id": BSON.ObjectId(context.user.id)}, { "$set" : {"notes": "writeOwn2"}})
    console.log("WriteOwn success:", writeResult)
  } catch (err) {
    console.log("Error occurred while executing write own", err.message);
  }
    // write other expect error
  var writeOtherUser;
  try {
    writeOtherUser = await collection.findOneAndUpdate(
      {"_id": anotherUser}, { "$set" : {"notes": "writeOwn2"}})
    console.log("WriteOwn success:", writeOtherUser)
  } catch (err) {
    console.log("Expected write failure:", err.message);
  }
};