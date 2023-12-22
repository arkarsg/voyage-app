exports = async function({ groupId, accept}) {
  /**
   * Handles user's response to the invite.
   * 
   * @param groupId string _id of the group the user is invited to
   * @param accept boolean response of the user, true if user accepts, false otherwise
   */

  if (!groupId) {
    return { error : { message: "Please provide which group to respond to." }}
  }

  if (typeof accept !== "boolean") {
    return { error : { message: "Please provide whether to accept the invitation or not" }}
  }

  const serviceName = "mongodb-atlas";
  const dbName = "voyage-app";
  const groups = "Groups";
  const users = "Users";
  const invites = "Invites";
  // Get relevant collections from the context
  const groupsCollection = context.services.get(serviceName).db(dbName).collection(groups);
  const usersCollection = context.services.get(serviceName).db(dbName).collection(users);
  const invitesCollection = context.services.get(serviceName).db(dbName).collection(invites);

  // get _id of User that called the function and accepting the invitation
  const receiver = context.user.id; // string
  const receiverId = BSON.ObjectId(receiver) // ObjectId
  groupId = BSON.ObjectId(groupId);

  try {
    var res;
    if (accept) {
      const newMemberUserDoc = await usersCollection.findOne({ "_id" : receiverId });
      const isInvited = await invitesCollection.findOne({ "_id": groupId, "receiver": newMemberUserDoc.email })

      if (!isInvited) {
        return { error: { message: "You must be invited to the group before responding" } }
      }

      /** TO DO
       * The code below will never work since user is not a member of the group.
       * The group will never be visible to the user.
       * 
       * Solution: 
       * Create a function that runs as system.
       * To run a saved function type 'context.functions.execute(<function-name-string>, args...)'
       * 1. Validate group invite (System fn)
       * 2. If valid, add to group (System fn)
       */
      
      const groupDoc = await groupsCollection.findOne({ "_id": groupId});

      if (!groupDoc) {
        await removeInvitation(invitesCollection, receiverId, groupId);
        return { error : { message: "The group does not exist" } }
      }

      const isAlreadyAMember = groupDoc.trip_members.some(member => member._id.toString() === receiver)
      if (isAlreadyAMember) {
        await removeInvitation(invitesCollection, newMemberUserDoc.email, groupId);
        return { error: { message: "You are already a member of the group" }}
      }
      // add member to group
      await groupsCollection.updateOne({
        "_id": groupId
      }, {
        $push: { "trip_members": receiverId}});

      // add group to member
      await usersCollection.updateOne({
        "_id": receiverId
      }, {
        $push: { "trip_groups": groupId }
      })

      // remove invitation
      await removeInvitation(invitesCollection, newMemberUserDoc.email, groupId)
    } 
  } catch (err) {
    return { error: err.message }
  }
};

const removeInvitation = async (invitesCollection, email, groupId) => {
    invitesCollection.deleteOne({ "group_id": groupId, "receiver": email})
}
