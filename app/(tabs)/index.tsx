import { View, Text, Pressable, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useTheme from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { LinearGradient } from 'expo-linear-gradient';
import Header from "@/components/header";
import TodoInput from "@/components/todoInput";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";
import EmptyState from "@/components/EmptyState";

const index = () => {
  const { toggleDarkMode, colors } = useTheme();
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const [editingId, setEditingId] = React.useState<Id<"todos"> | null>(null);
  const [editText, setEditText] = React.useState("");
  const todos = useQuery(api.todos.getTodos);
  const isLoading = todos === undefined;

  const homeStyles = createHomeStyles(colors);
  const style = StyleSheet.create({
    title: {
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
  type Todo = Doc<"todos">;

  const handleToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleTodo({ id });
    } catch (error) {
      console.log("Error toggling todo", error);
      Alert.alert("Error", "Failed to toggle todo");
    }
  };
  const handleDeleteTodo = async (id: Id<"todos">) => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteTodo({ id }) },
    ]);
  };

  const handleEditTodo = (todo: Todo) => {
    setEditText(todo.text);
    setEditingId(todo._id);
  };
  const renderTodoItem = ({ item }: { item: Todo }) => {
    console.log(item);

    return (
      <View
        style={homeStyles.todoItemWrapper}
      >
        <LinearGradient colors={colors.gradients.surface} style={homeStyles.todoItem} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <TouchableOpacity
            style={homeStyles.checkbox} activeOpacity={0.7} onPress={() => { handleToggleTodo(item._id) }}>
            <LinearGradient
              colors={item?.isCompleted ? colors.gradients.success : colors.gradients.muted}
              style={[homeStyles.checkboxInner, { borderColor: item?.isCompleted ? 'transparent' : colors.border }]}>
              {item?.isCompleted && <Ionicons name="checkmark" size={16} color="#fff" />}
            </LinearGradient>
          </TouchableOpacity>
          <View style={homeStyles.todoTextContainer}>
            <Text
              style={[
                homeStyles.todoText,
                item.isCompleted && {
                  textDecorationLine: "line-through",
                  color: colors.textMuted,
                  opacity: 0.6,
                },
              ]}
            >
              {item.text}
            </Text>
            <View style={homeStyles.todoActions}>
              <TouchableOpacity onPress={() => handleEditTodo(item)} activeOpacity={0.8}>
                <LinearGradient colors={colors.gradients.warning} style={homeStyles.actionButton}>
                  <Ionicons name="pencil" size={14} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteTodo(item._id)} activeOpacity={0.8}>
                <LinearGradient colors={colors.gradients.danger} style={homeStyles.actionButton}>
                  <Ionicons name="trash" size={14} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

        </LinearGradient>
      </View>
    );
  }
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}  >
      <SafeAreaView style={homeStyles.safeArea}>
        <Header />
        <TodoInput />
        <FlatList
          data={todos}
          keyExtractor={(item) => item._id}
          style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent}
          renderItem={renderTodoItem}
           ListEmptyComponent={<EmptyState />}
        />
        <Pressable
          style={style.button}
          onPress={() => {
            toggleDarkMode();
          }}
        >
          <Text style={style.title}>Toggle Theme</Text>
        </Pressable>

      </SafeAreaView>
    </LinearGradient>

  );
};

export default index;
