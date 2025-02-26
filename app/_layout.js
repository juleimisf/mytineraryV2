/*import { Stack } from 'expo-router';
import { STRINGS } from '../components/utils/strings';

export default function RootLayout() {

  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen 
        name="cities/[name]" 
        options={{ 
          title: STRINGS.DETAIL_CITY_TOOLBAR,
          headerBackTitleVisible: false,
          headerBackTitle: STRINGS.BACK_OPTION,
        }} 
      />
    </Stack>
  );
}*/
import { STRINGS } from "../src/components/utils/strings";

import { Slot, Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../src/store/store"; 

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Slot >

      <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen 
        name="cities/[name]" 
        options={{ 
          title: STRINGS.DETAIL_CITY_TOOLBAR,
          headerBackTitleVisible: false,
          headerBackTitle: STRINGS.BACK_OPTION,
        }} 
      />
    </Stack> 
      </Slot>
    </Provider>
  );
}