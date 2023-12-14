import {
  View,
  Text,
  Pressable,
} from "react-native";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { SignedOut } from "@clerk/clerk-expo";

const AuthPage = () => {
  // const backgroundImage = "../assets/giphy.gif";
  return (
    <SignedOut>
      <View className="flex-1 justify-center items-center bg-stone-100">
        {/* <ImageBackground
        source={require(backgroundImage)}
        resizeMode="stretch"
        style={{ height: height, width: width }}
      > */}
        <View className="h-full w-full justify-around flex pt-40 pb-10 bg-stone-100">
          <View className="flex items-center pt-48">
            <Text
              style={{
                fontFamily: "SpaceGrotesk_700Bold",
              }}
              className="text-voyage-blue -tracking-widest text-8xl"
            >
              Voyage
            </Text>
          </View>

          <View className="flex items-center mx-4 space-y-4 pt-44">
            <Link href={"/(public)/login"} asChild>
              <Pressable className="rounded-2xl w-full items-center">
                <LinearGradient
                  colors={["#81DFDA", "#0081A7"]}
                  locations={[0.0, 0.8]}
                  start={[1.0, 1.0]}
                  end={[0.0, 0.0]}
                  className="rounded-3xl w-11/12 items-center px-4 py-3"
                >
                  <Text
                    style={{
                      fontFamily: "IBMPlexSans_500Medium",
                    }}
                    className="text-zinc-800 tracking-tightest text-lg"
                  >
                    Log in
                  </Text>
                </LinearGradient>
              </Pressable>
            </Link>
            <Text
              style={{
                fontFamily: "IBMPlexSans_500Medium",
              }}
              className="text-zinc-800 tracking-tightest text-m"
            >
              Or
            </Text>
            <Link href={"/(public)/register"} asChild>
              <Pressable className="rounded-3xl w-10/12 items-center px-2 py-2 flex-row bg-stone-300">
                <View className="ml-1">
                  <FontAwesome name="google" size={24} color="black" />
                </View>
                <Text
                  style={{
                    fontFamily: "IBMPlexSans_500Medium",
                  }}
                  className="text-zinc-800 tracking-tightest text-lg ml-14"
                >
                  Continue with Google
                </Text>
              </Pressable>
            </Link>
          </View>
        </View>
        {/* </ImageBackground> */}
      </View>
    </SignedOut>
  );
};

export default AuthPage;
