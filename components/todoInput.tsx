import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { api } from '@/convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';
import { createHomeStyles } from '@/assets/styles/home.styles';
import useTheme from '@/hooks/useTheme';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const todoInput = () => {
    const { colors } = useTheme();
    const homeStyles = createHomeStyles(colors);
    const todos = useQuery(api.todos.getTodos);
    const addTodo = useMutation(api.todos.addTodo);
    const [newTodo, setNewTodo] = React.useState("");

    const handleAddTodo = async (newTodo: string) => {
        await addTodo({ text: newTodo });
    };

    return (
        <View style={homeStyles.inputSection}>
            <View style={homeStyles.inputWrapper}>
                <TextInput
                    style={homeStyles.input}
                    placeholder="Add a new task"
                    placeholderTextColor={colors.textMuted}
                    value={newTodo}
                    onChangeText={setNewTodo}
                    onSubmitEditing={() => handleAddTodo(newTodo)}
                />
                <TouchableOpacity onPress={() => handleAddTodo(newTodo)} activeOpacity={0.8} disabled={!newTodo.trim()}>
                    <LinearGradient
                        colors={newTodo.trim() ? colors.gradients.primary : colors.gradients.muted}
                        style={[homeStyles.addButton, !newTodo.trim() && homeStyles.addButtonDisabled]}
                    >
                        <Ionicons name="add" size={24} color="#ffffff" />
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default todoInput