import { useUser } from "@realm/react";
import { useRealmApi } from "./useRealmApi";
/**
 * Hook for managing a user's group
 */

export function useGroupManager() {
  const user = useUser();
  const callRealmApi = useRealmApi(user);

  const createGroup = (name: string, creatorId: Realm.BSON.ObjectId) =>
    callRealmApi("createGroup", { name: name, creatorId: creatorId });

  const leaveGroup = (groupId: Realm.BSON.ObjectId) =>
    callRealmApi("leaveGroup", { groupId: groupId });

  const deleteGroup = (groupId: Realm.BSON.ObjectId) =>
    callRealmApi("deleteGroup", { groupId: groupId });

  const inviteGroupMember = (
    groupId: Realm.BSON.ObjectId,
    newMemberEmail: string
  ) => {
    callRealmApi("inviteGroupMember", {
      groupId: groupId,
      email: newMemberEmail,
    });
  };

  const respondToInvitation = (
    groupId: Realm.BSON.ObjectId,
    accept: boolean
  ) => {
    callRealmApi("respondToInvitation", { groupId: groupId, accept: accept });
  };

  const removeGroupMember = (
    groupId: Realm.BSON.ObjectId,
    userId: Realm.BSON.ObjectId
  ) => {
    callRealmApi("removeGroupMember", {
      groupId: groupId.toString(),
      userId: userId.toString(),
    });
  };

  return {
    createGroup,
    leaveGroup,
    deleteGroup,
    inviteGroupMember,
    respondToInvitation,
    removeGroupMember,
  };
}
