import { Stack } from "expo-router";
import { RealmProvider } from "@realm/react";
import { Task } from "./models/Task";

export default function AppLayout() {
  return (
    <RealmProvider schema={[Task]}>
      <Stack />
    </RealmProvider>
  );
}
