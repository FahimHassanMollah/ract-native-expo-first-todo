import { View, Text, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useTheme from "@/hooks/useTheme";

const index = () => {
  const { toggleDarkMode } = useTheme();
  return (
    <SafeAreaView>
      <View>
        <Text>index</Text>
        <Pressable
         style={{ marginTop: 20, padding: 10, backgroundColor: "lightgray" }}
          onPress={() => {
            toggleDarkMode();
          }}
        >
          <Text>Toggle Theme</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default index;
