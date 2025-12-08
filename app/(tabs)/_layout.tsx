import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';


const TabsLayout = () => {
    const { colors } = useTheme();
  return (
    <Tabs screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: 600,
        },
        tabBarStyle: {
            height: 90,
            backgroundColor: colors.surface,
            borderTopWidth: 2,
            borderTopColor: colors.border,
        },
        tabBarItemStyle: {
            paddingVertical: 15,
        },
    }}>
        <Tabs.Screen name="index" options={{ headerTitle: "Todos", tabBarLabel: "Todos" ,  tabBarIcon: ({ color, size }) => (
                <Ionicons name="flash-outline" size={24} color={color} />
              ),}} />
        <Tabs.Screen name="settings" options={{ headerTitle: "Settings", tabBarLabel: "Settings", tabBarIcon: ({ color, size }) => (
                <Ionicons name="settings" size={size} color={color} />
              ),}} />
    </Tabs>
  )
}

export default TabsLayout