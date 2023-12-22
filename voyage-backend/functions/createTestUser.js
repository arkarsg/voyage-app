exports = async function(authEvent) {
  /*
    An Authentication Trigger will always call a function with an authEvent.
    Documentation on Triggers: https://www.mongodb.com/docs/atlas/app-services/triggers/
  */
  const users = context.services.get('mongodb-atlas').db('voyage-app').collection("Users")

  const newUserDoc = {
    _id: BSON.ObjectId(authEvent.user.id),
    clerk_id: "test-user",
    username: getUsername(authEvent.user.data.email),
    email: authEvent.user.data.email,
    trip_groups: [],
  }

  try {
    return await users.insertOne(newUserDoc);
  } catch (err) {
    console.error(err.message)
  }
};

const getUsername = (email) => email.split("@")[0]
