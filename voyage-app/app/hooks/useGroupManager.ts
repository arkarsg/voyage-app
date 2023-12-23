import { useUser } from "@realm/react";
import { useRealmApi } from "./useRealmApi";
/**
 * Hook for managing a user's group
 */

export function useGroupManager() {
  const user = useUser();
  const callRealmApi = useRealmApi(user);

  const createGroup = (name: string, creatorId: string) =>
    callRealmApi("createGroup", { name: name, creatorId: creatorId });

  const leaveGroup = (groupId: string) =>
    callRealmApi("leaveGroup", { groupId: groupId });

  const deleteGroup = (groupId: string) =>
    callRealmApi("deleteGroup", { groupId: groupId });

  const inviteGroupMember = (
    groupId: string,
    newMemberEmail: string
  ) => {
    callRealmApi("inviteGroupMember", {
      groupId: groupId,
      email: newMemberEmail,
    });
  };

  const respondToInvitation = (
    groupId: string,
    accept: boolean
  ) => {
    callRealmApi("respondToInvitation", { groupId: groupId, accept: accept });
  };

  const removeGroupMember = (
    groupId: string,
    userId: string
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
