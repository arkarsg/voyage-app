import {
  Dimensions,
  ImageBackground,
  View,
  Text,
  Pressable,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";

const LoginPage = () => {
  const { height, width } = Dimensions.get("window");
  const backgroundImage = "../assets/giphy.gif";
  const router = useRouter();

  const handlePress = () => {
    router.replace("overview");
  };

  return (
    <View className="flex-1 justify-center items-center bg-stone-900">
      <ImageBackground
        source={require(backgroundImage)}
        resizeMode="stretch"
        style={{ height: height, width: width }}
      >
        <View className="h-full w-full justify-around flex pt-40 pb-10 bg-[#000000a0]">
          <View className="flex items-center pt-48">
            <Text
              style={{
                fontFamily: "SpaceGrotesk_700Bold",
              }}
              className="text-voyage-purple -tracking-widest text-8xl"
            >
              Voyage
            </Text>
          </View>

          <View className="flex items-center mx-4 space-y-4 pt-44">
            <Pressable
              className="rounded-2xl w-full items-center"
              onPress={handlePress}
            >
              <LinearGradient
                colors={["#F2C2EE", "#D073D1", "#BA42C0"]}
                locations={[0.0, 0.4, 0.7]}
                start={[1.0, 1.0]}
                end={[0.0, 0.0]}
                className="rounded-3xl w-11/12 items-center px-4 py-3"
              >
                <Text
                  style={{
                    fontFamily: "IBMPlexSans_500Medium",
                  }}
                  className="text-black tracking-tightest text-lg"
                >
                  Log in
                </Text>
              </LinearGradient>
            </Pressable>
            <Text
              style={{
                fontFamily: "IBMPlexSans_500Medium",
              }}
              className="text-neutral-300 tracking-tightest text-m"
            >
              Or
            </Text>
            <Link href={"/register"} asChild>
              <Pressable className="rounded-3xl w-10/12 items-center px-2 py-2 flex-row bg-neutral-300">
                <View className="ml-1">
                  <FontAwesome name="google" size={24} color="black" />
                </View>
                <Text
                  style={{
                    fontFamily: "IBMPlexSans_500Medium",
                  }}
                  className="text-black tracking-tightest text-lg ml-14"
                >
                  Continue with Google
                </Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginPage;
