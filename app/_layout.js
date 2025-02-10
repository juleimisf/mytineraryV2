import { Stack } from 'expo-router';
import { STRINGS } from '../components/utils/strings';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen 
        name="cities/[name]" 
        options={({ route }) => ({ 
          title: route.params?.name || STRINGS.DETAIL_CITY_TOOLBAR,
          headerBackTitleVisible: false,
          headerBackTitle: STRINGS.BACK_OPTION,
        })} 
      />
    </Stack>
  );
}