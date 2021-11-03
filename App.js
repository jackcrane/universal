// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import AppLoading from 'expo-app-loading';
import { useFonts, WorkSans_500Medium } from '@expo-google-fonts/work-sans';

import HomeScreen from './components/Home';

function _HomeScreen({route, navigation}) {
  return (
    <HomeScreen nav={navigation} route={route} />
  )
}

import CustomDrawerContent from './components/CustomDrawer'

// const Stack = createNativeStackNavigator();
// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawerContent {...props} />} >
        <Drawer.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
        {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}