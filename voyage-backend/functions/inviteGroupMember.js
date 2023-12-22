exports = async function({groupId, newMemberEmail}){
  /**
   * Creates an invite document and added to Invites collection
   * 
   * @param groupId string ObjectId of group to invite member to
   * @param string email of the invited member
   */
  if (!groupId) {
    return {error: { message: "Please provide which group to invite the member to."}};
  }

  if (!newMemberEmail) {
    return { error: { message: "Please provide email address of the member to invite." }}
  }

  var serviceName = "mongodb-atlas";
  // Update these to reflect your db/collection
  var dbName = "voyage-app";
  var users = "Users";
  var invites = "Invites";
  var groups = "Groups"

  // Get a collection from the context
  var usersCollection = context.services.get(serviceName).db(dbName).collection(users);
  var invitesCollection = context.services.get(serviceName).db(dbName).collection(invites);
  var groupsCollection = context.services.get(serviceName).db(dbName).collection(groups);

  // Get user that called the function from context
  const user = context.user
  const senderUsername = user.custom_data.username
  const senderId = BSON.ObjectId(user.id)

  try {
    const groupDoc = await groupsCollection.findOne({ "_id": BSON.ObjectId(groupId) })
    if (!groupDoc) {
      // This already handles the case where a user sends an invite from the group he is not a part of.
      // Due to permissions of `Group`, the group is not visible to non-member users
      return { error: { message: "The group does not exist." }};
    }

    const newMemberUserDoc = await usersCollection.findOne({ email: newMemberEmail});
    if (!newMemberUserDoc) {
      return {error: { message: "User you are trying to invite does not exist" }}
    }

    if (newMemberUserDoc._id.toString() === user.id) {
      return { error: { message: "You cannot invite yourself." }}
    }

    const isAlreadyInvited = await invitesCollection.findOne({"receiver": newMemberEmail, "group_id": groupDoc._id})
    console.log(JSON.stringify(isAlreadyInvited))
    if (isAlreadyInvited) {
      return { error: { message: "An invitiation is already sent to the user" }}
    }

    const isAlreadyInGroup = await groupDoc.trip_members.some(member => member.toString() === newMemberUserDoc._id.toString());
    if (isAlreadyInGroup) {
      return { error: {message: "The user has already in your your group" }}
    }
    
    const newInviteDoc = {
      _id: BSON.ObjectId(),
      sender: senderId,
      sender_username: senderUsername,
      receiver: newMemberEmail,
      group_id: groupDoc._id,
      group_name: groupDoc.group_name,
      created_at: new Date()
    }

    await invitesCollection.insertOne(newInviteDoc);
    return { success: true };
  } catch (err) {
    return { error : err.message }
  }
};