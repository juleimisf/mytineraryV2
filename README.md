# 🌍 MyItinerary - React Native Travel App

**MyItinerary** es un proyecto de práctica en **React Native** diseñado para explorar conceptos clave como navegación con `expo-router`, `Linking`, animaciones con `react-native-reanimated-carousel`, y manejo de `props`.

## 🚀 Tecnologías Utilizadas

- **[Expo Router](https://expo.github.io/router/docs)** - Manejo de rutas basado en archivos.
- **[Linking](https://reactnative.dev/docs/linking)** - Manejo de enlaces profundos y navegación externa.
- **[React Native Reanimated Carousel](https://github.com/dohooo/react-native-reanimated-carousel)** - Carruseles animados fluidos.
- **Props en React Native** - Comunicación eficiente entre componentes.

## 📂 Estructura del Proyecto

```plaintext
📦 MYITINERARY
 ┣ 📂 app
 ┃ ┣ 📂 (tabs)         # Contenedor de pantallas principales (home, settings, etc.)
 ┃ ┃ ┣ 📜 _layout.js   # Configuración general de la navegación en Tabs
 ┃ ┃ ┣ 📜 cities.js    # Pantalla principal de ciudades
 ┃ ┃ ┗ 📜 index.js     # Entrada de la navegación en tabs
 ┃ ┣ 📂 cities        # Rutas dinámicas de ciudades
 ┃ ┃ ┣ 📜 [name].js    # Detalle de cada ciudad
 ┃ ┃ ┗ 📜 _layout.js   # Configuración de la navegación en Cities
 ┣ 📂 assets          # Recursos estáticos (imágenes, iconos, etc.)
 ┣ 📂 components      # Componentes reutilizables
 ┃ ┣ 📂 Carousel
 ┃ ┃ ┗ 📜 index.js     # Carrusel animado de ciudades
 ┃ ┣ 📂 CityCard
 ┃ ┃ ┗ 📜 CityCard.js  # Tarjetas de presentación de ciudades
 ┃ ┣ 📂 Hero
 ┃ ┃ ┗ 📜 index.js     # Sección principal destacada
 ┃ ┗ 📂 utils
 ┃ ┃ ┣ 📜 alerts.js    # Utilidades para alertas
 ┃ ┃ ┗ 📜 strings.js   # Textos y cadenas reutilizables
 ┣ 📜 App.js           # Entrada principal del proyecto
 ┣ 📜 package.json     # Dependencias y configuración de Expo
 ┣ 📜 .gitignore       # Archivos a excluir del control de versiones
 ┣ 📜 .prettierrc      # Configuración de Prettier para formato de código
 ┗ 📜 README.md        # Este documento

