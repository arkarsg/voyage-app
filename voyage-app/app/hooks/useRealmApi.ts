import { useCallback } from "react";
import { useNetInfo } from "@react-native-community/netinfo";
import Realm from "realm";
/**
 * A hook for communicating with MongoDB Realm backend
 */
export function useRealmApi(realmUser: Realm.User) {
  const { isConnected, isInternetReachable } = useNetInfo();
  const callRealmApi = useCallback(
    async (fn: string, args: Object) => {
      if (!realmUser) {
        return { error: { message: "You need to be logged in to continue." } };
      }
      const isOffline = !isConnected || !isInternetReachable;
      if (isOffline) {
        return {
          error: { message: "Please connect to the Internet to continue." },
        };
      }

      try {
        return await realmUser.callFunction(fn, args);
      } catch (err) {
        return err;
      }
    },
    [realmUser, isConnected, isInternetReachable]
  );
  return callRealmApi;
}
