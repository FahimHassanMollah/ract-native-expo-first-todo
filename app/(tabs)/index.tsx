import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useTheme from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { LinearGradient } from 'expo-linear-gradient';
import Header from "@/components/header";
import TodoInput from "@/components/todoInput";

const index = () => {
  const { toggleDarkMode, colors } = useTheme();
  const todos = useQuery(api.todos.getTodos);
  console.log(todos);
  const addTodo = useMutation(api.todos.addTodo);
  const clearAllTodos = useMutation(api.todos.clearAllTodos);
  
  const homeStyles = createHomeStyles(colors);
  const style = StyleSheet.create({
    title : {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
    },
    button: {
      marginTop: 20,
      padding: 10,
      backgroundColor: colors.bg,
    },
  });

  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}  >
       <SafeAreaView style={homeStyles.safeArea}>
      <View>
        <Header />
        <TodoInput />
        <Pressable
         style={style.button}
          onPress={() => {
            toggleDarkMode();
          }}
        >
          <Text style={style.title}>Toggle Theme</Text>
        </Pressable>
        <Pressable
         style={{ marginTop: 20, padding: 10, backgroundColor: "lightgray" }}
          onPress={async () => {
            await addTodo({ text: "New Todo Item" });
          }}
        >
          <Text>Add Todo</Text>
        </Pressable>
        <Pressable
         style={{ marginTop: 20, padding: 10, backgroundColor: "lightgray" }}
          onPress={async () => {
            await clearAllTodos();
          }}
        >
          <Text>Clear All Todos</Text>
        </Pressable>
      </View>
    </SafeAreaView>
    </LinearGradient>
   
  );
};

export default index;
