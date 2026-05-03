import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#1D9E75' }}>
      <Tabs.Screen name="index" options={{ title: 'Touren' }} />
      <Tabs.Screen name="kunden" options={{ title: 'Kunden' }} />
    </Tabs>
  );
}