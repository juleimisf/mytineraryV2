import { Stack } from 'expo-router';
import { STRINGS } from "../src/components/utils/strings";
import { Provider } from "react-redux";
import { store } from "../src/store/store"; 

export default function RootLayout() {

  return (
    <Provider store={store}> {/* 🔹 Envuelve la navegación con Redux */}
      <Stack>
      <Stack.Screen 
          name="auth/LoginScreen" 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="auth/RegisterScreen" 
          options={{ headerShown: false }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="cities/[name]" 
          options={{ 
            title: STRINGS.DETAIL_CITY_TOOLBAR,
            headerBackTitleVisible: false,
            headerBackTitle: STRINGS.BACK_OPTION,
          }} 
        />
      </Stack>
    </Provider>
  );
}

/*
import { STRINGS } from "../src/components/utils/strings";

import { Slot, Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../src/store/store"; 

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Slot >
      </Slot>
    </Provider>
  );
}*/