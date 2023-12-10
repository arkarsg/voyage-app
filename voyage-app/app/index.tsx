import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useQuery, useRealm } from "@realm/react";
import { useRef } from "react";
import { Task } from "./models/Task";

export default function App() {
  const realm = useRealm();
  const descriptionRef = useRef("");
  const addTask = () => {
    realm.write(() => {
      // create new task object
      const newTask = new Task(realm, descriptionRef.current);

      // clear input field
      descriptionRef.current = "";

      // return task object
      return newTask;
    });
  };

  const tasks = useQuery(Task);

  console.log(useQuery("Task"));
  return (
    <View style={{ height: Dimensions.get("screen").height - 132 }}>
      <Text style={styles.title}>TASK LIST</Text>
      {/* input for description */}
      <TextInput
        placeholder="Enter New Task"
        autoCapitalize="none"
        nativeID="description"
        multiline={true}
        numberOfLines={8}
        value={descriptionRef.current}
        onChangeText={(text) => {
          descriptionRef.current = text;
        }}
        style={styles.textInput}
      />
      {/*  button to save the new task */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          addTask();
        }}
      >
        <Text style={styles.buttonText}>SAVE TASK</Text>
      </TouchableOpacity>
      <Text>{JSON.stringify(tasks, null, 2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  title: {
    fontSize: 18,
    margin: 16,
    fontWeight: "700",
  },
  label: {
    marginBottom: 8,
    fontSize: 18,
    fontWeight: "500",
    // color: "#455fff",
  },
  textInput: {
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 4,
    // borderColor: "#455fff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 0,
    marginHorizontal: 16,
  },
  button: {
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 5,
    marginTop: 8,
    marginLeft: 16,
    width: 120,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 12,
  },
});
